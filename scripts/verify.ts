#!/usr/bin/env ts-node

import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { M2Helpers } from './helpers';

// Load environment variables
dotenv.config();

interface AuctionHouseData {
  auctionHouseTreasury: PublicKey;
  treasuryWithdrawalDestination: PublicKey;
  authority: PublicKey;
  creator: PublicKey;
  notary: PublicKey;
  bump: number;
  treasuryBump: number;
  sellerFeeBasisPoints: number;
  buyerReferralBp: number;
  sellerReferralBp: number;
  requiresNotary: boolean;
  nprob: number;
}

interface VerificationResult {
  auctionHouse: PublicKey;
  exists: boolean;
  data?: AuctionHouseData;
  treasury: {
    address: PublicKey;
    exists: boolean;
    balance: number;
  };
  programAs: {
    signer: PublicKey;
    exists: boolean;
  };
  validPaymentMints: string[];
  errors: string[];
  warnings: string[];
}

class M2MarketplaceVerifier {
  private connection: Connection;
  private network: string;
  private programId: PublicKey;

  constructor() {
    this.network = process.env.SOLANA_NETWORK || 'devnet';
    this.programId = new PublicKey(process.env.PROGRAM_ID || 'M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K');
    
    // Set up connection
    const rpcUrl = process.env.CUSTOM_RPC_URL || M2Helpers.getDefaultRpcUrl(this.network);
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  private async showWelcome(): Promise<void> {
    console.log(chalk.cyan.bold(`
╔══════════════════════════════════════════════════════════════╗
║                M2 Marketplace Verifier                      ║
║             Verify Your Deployment Status                   ║
╚══════════════════════════════════════════════════════════════╝
    `));
    
    console.log(chalk.white(`Network: ${chalk.yellow(this.network)}`));
    console.log(chalk.white(`Program ID: ${chalk.yellow(this.programId.toString())}`));
    console.log('');
  }

  private async getAuctionHouseAddress(): Promise<PublicKey> {
    // Check for recent deployments
    const deploymentsDir = path.join(__dirname, 'deployments');
    let recentDeployments: string[] = [];
    
    if (fs.existsSync(deploymentsDir)) {
      recentDeployments = fs.readdirSync(deploymentsDir)
        .filter(file => file.includes(this.network) && file.endsWith('.json'))
        .sort()
        .reverse()
        .slice(0, 3); // Show last 3 deployments
    }

    const questions: any[] = [
      {
        type: 'list',
        name: 'source',
        message: 'How would you like to specify the auction house?',
        choices: [
          { name: 'Enter auction house address manually', value: 'manual' },
          { name: 'Derive from creator address', value: 'derive' },
          ...(recentDeployments.length > 0 ? [{ name: 'Use recent deployment', value: 'recent' }] : [])
        ]
      }
    ];

    const { source } = await inquirer.prompt(questions);

    switch (source) {
      case 'manual':
        const { auctionHouse } = await inquirer.prompt([
          {
            type: 'input',
            name: 'auctionHouse',
            message: 'Enter auction house address:',
            validate: (input: string) => {
              try {
                new PublicKey(input);
                return true;
              } catch {
                return 'Invalid public key format';
              }
            }
          }
        ]);
        return new PublicKey(auctionHouse);

      case 'derive':
        const { creator } = await inquirer.prompt([
          {
            type: 'input',
            name: 'creator',
            message: 'Enter creator address to derive auction house:',
            validate: (input: string) => {
              try {
                new PublicKey(input);
                return true;
              } catch {
                return 'Invalid public key format';
              }
            }
          }
        ]);
        const [derived] = M2Helpers.deriveAuctionHouse(new PublicKey(creator), this.programId);
        return derived;

      case 'recent':
        const { deployment } = await inquirer.prompt([
          {
            type: 'list',
            name: 'deployment',
            message: 'Select a recent deployment:',
            choices: recentDeployments.map(file => {
              const content = JSON.parse(fs.readFileSync(path.join(deploymentsDir, file), 'utf8'));
              return {
                name: `${content.auctionHouse} (${new Date(content.timestamp).toLocaleString()})`,
                value: content.auctionHouse
              };
            })
          }
        ]);
        return new PublicKey(deployment);

      default:
        throw new Error('Invalid selection');
    }
  }

  private async verifyAuctionHouse(auctionHouse: PublicKey): Promise<VerificationResult> {
    const spinner = ora('Verifying auction house...').start();
    
    const result: VerificationResult = {
      auctionHouse,
      exists: false,
      treasury: {
        address: new PublicKey('11111111111111111111111111111111'),
        exists: false,
        balance: 0
      },
      programAs: {
        signer: new PublicKey('11111111111111111111111111111111'),
        exists: false
      },
      validPaymentMints: [],
      errors: [],
      warnings: []
    };

    try {
      // Check auction house account
      spinner.text = 'Checking auction house account...';
      const auctionHouseAccount = await M2Helpers.getAccountInfo(this.connection, auctionHouse);
      
      if (!auctionHouseAccount) {
        result.errors.push('Auction house account does not exist');
        spinner.fail('Auction house not found');
        return result;
      }

      if (auctionHouseAccount.owner.toString() !== this.programId.toString()) {
        result.errors.push(`Auction house owned by wrong program: ${auctionHouseAccount.owner.toString()}`);
      }

      result.exists = true;

      // Try to parse auction house data (this would need the actual program interface)
      // For now, we'll derive and check the related accounts
      
      // Derive and check treasury
      spinner.text = 'Checking treasury account...';
      const [treasuryPda] = M2Helpers.deriveAuctionHouseTreasury(auctionHouse, this.programId);
      result.treasury.address = treasuryPda;
      
      const treasuryAccount = await M2Helpers.getAccountInfo(this.connection, treasuryPda);
      if (treasuryAccount) {
        result.treasury.exists = true;
        result.treasury.balance = treasuryAccount.lamports;
      } else {
        result.warnings.push('Treasury account not found (will be created on first fee collection)');
      }

      // Derive and check program as signer
      spinner.text = 'Checking program as signer...';
      const [programAsSigner] = M2Helpers.deriveProgramAsSigner(auctionHouse, this.programId);
      result.programAs.signer = programAsSigner;
      result.programAs.exists = await M2Helpers.accountExists(this.connection, programAsSigner);
      
      if (!result.programAs.exists) {
        result.warnings.push('Program as signer account not found (will be created when needed)');
      }

      // Check valid payment mints for this network
      spinner.text = 'Checking payment mint configuration...';
      const validMints = M2Helpers.getValidPaymentMints(this.network);
      result.validPaymentMints = validMints;

      // Verify payment mint accounts exist
      for (const mintAddress of validMints) {
        if (mintAddress === '11111111111111111111111111111111') continue; // Skip native SOL
        
        const mintExists = await M2Helpers.accountExists(this.connection, new PublicKey(mintAddress));
        if (!mintExists) {
          result.warnings.push(`Payment mint ${mintAddress} not found on ${this.network}`);
        }
      }

      spinner.succeed('Verification completed');
      return result;

    } catch (error) {
      spinner.fail('Verification failed');
      result.errors.push(`Verification error: ${error instanceof Error ? error.message : String(error)}`);
      return result;
    }
  }

  private async checkProgramDeployment(): Promise<void> {
    const spinner = ora('Checking M2 program deployment...').start();
    
    try {
      const programAccount = await M2Helpers.getAccountInfo(this.connection, this.programId);
      
      if (!programAccount) {
        spinner.fail(`M2 program not deployed on ${this.network}`);
        console.log(chalk.red(`Program ${this.programId.toString()} not found`));
        console.log(chalk.yellow('The M2 program must be deployed before creating auction houses.'));
        process.exit(1);
      }

      if (!programAccount.executable) {
        spinner.fail('M2 program account is not executable');
        process.exit(1);
      }

      spinner.succeed(`M2 program found and executable`);
    } catch (error) {
      spinner.fail('Failed to check program deployment');
      throw error;
    }
  }

  private displayResults(result: VerificationResult): void {
    console.log(chalk.blue.bold('\n📋 Verification Results\n'));

    // Auction House Status
    console.log(chalk.white('🏛️  Auction House:'));
    console.log(chalk.gray(`   Address: ${result.auctionHouse.toString()}`));
    console.log(chalk.gray(`   Status:  ${result.exists ? chalk.green('✅ Found') : chalk.red('❌ Not Found')}`));
    console.log(chalk.gray(`   Explorer: ${M2Helpers.getAccountExplorerUrl(result.auctionHouse, this.network)}`));

    // Treasury Status
    console.log(chalk.white('\n💰 Treasury:'));
    console.log(chalk.gray(`   Address: ${result.treasury.address.toString()}`));
    console.log(chalk.gray(`   Status:  ${result.treasury.exists ? chalk.green('✅ Found') : chalk.yellow('⚠️  Not Found')}`));
    if (result.treasury.exists) {
      console.log(chalk.gray(`   Balance: ${M2Helpers.lamportsToSol(result.treasury.balance)} SOL`));
    }

    // Program As Signer
    console.log(chalk.white('\n🔐 Program As Signer:'));
    console.log(chalk.gray(`   Address: ${result.programAs.signer.toString()}`));
    console.log(chalk.gray(`   Status:  ${result.programAs.exists ? chalk.green('✅ Found') : chalk.yellow('⚠️  Not Found')}`));

    // Payment Mints
    console.log(chalk.white('\n💳 Valid Payment Tokens:'));
    result.validPaymentMints.forEach(mint => {
      const name = this.getTokenName(mint);
      console.log(chalk.gray(`   ${name}: ${mint}`));
    });

    // Configuration (if we have the data)
    if (result.data) {
      console.log(chalk.white('\n⚙️  Configuration:'));
      console.log(chalk.gray(`   Creator:      ${result.data.creator.toString()}`));
      console.log(chalk.gray(`   Authority:    ${result.data.authority.toString()}`));
      console.log(chalk.gray(`   Treasury Dest: ${result.data.treasuryWithdrawalDestination.toString()}`));
      console.log(chalk.gray(`   Marketplace Fee: ${result.data.sellerFeeBasisPoints} bp (${M2Helpers.basisPointsToPercent(result.data.sellerFeeBasisPoints)}%)`));
      console.log(chalk.gray(`   Buyer Referral:  ${result.data.buyerReferralBp} bp (${M2Helpers.basisPointsToPercent(result.data.buyerReferralBp)}%)`));
      console.log(chalk.gray(`   Seller Referral: ${result.data.sellerReferralBp} bp (${M2Helpers.basisPointsToPercent(result.data.sellerReferralBp)}%)`));
      console.log(chalk.gray(`   Notary Required: ${result.data.requiresNotary ? 'Yes' : 'No'}`));
      if (result.data.requiresNotary) {
        console.log(chalk.gray(`   Notary Address:  ${result.data.notary.toString()}`));
        console.log(chalk.gray(`   Enforcement:     ${result.data.nprob}%`));
      }
    }

    // Errors
    if (result.errors.length > 0) {
      console.log(chalk.red.bold('\n❌ Errors:'));
      result.errors.forEach(error => {
        console.log(chalk.red(`   • ${error}`));
      });
    }

    // Warnings
    if (result.warnings.length > 0) {
      console.log(chalk.yellow.bold('\n⚠️  Warnings:'));
      result.warnings.forEach(warning => {
        console.log(chalk.yellow(`   • ${warning}`));
      });
    }

    // Status Summary
    console.log(chalk.white.bold('\n📊 Summary:'));
    if (result.exists && result.errors.length === 0) {
      console.log(chalk.green('   ✅ Auction house is properly deployed and configured'));
      console.log(chalk.white('\n🚀 Next Steps:'));
      console.log(chalk.gray('   • Integrate the auction house address into your frontend'));
      console.log(chalk.gray('   • Test marketplace functionality with small transactions'));
      console.log(chalk.gray('   • Monitor treasury account for fee collection'));
      console.log(chalk.gray('   • Set up monitoring for your marketplace activity'));
    } else if (result.exists && result.errors.length > 0) {
      console.log(chalk.yellow('   ⚠️  Auction house exists but has configuration issues'));
      console.log(chalk.gray('   • Review and fix the errors listed above'));
      console.log(chalk.gray('   • Use the updateAuctionHouse instruction to fix configuration'));
    } else {
      console.log(chalk.red('   ❌ Auction house not found or improperly configured'));
      console.log(chalk.gray('   • Run the deployment script: npm run deploy'));
      console.log(chalk.gray('   • Ensure you have sufficient SOL for deployment'));
    }
  }

  private getTokenName(mintAddress: string): string {
    const tokenNames: { [key: string]: string } = {
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 'USDC',
      'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So': 'mSOL (Marinade)',
      'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn': 'JitoSOL',
      '3dgCCb15HMQSA4Pn3Tfii5vRk7aRqTH95LJjxzsG2Mug': 'HXD',
      'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': 'BONK',
      '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU': 'USDC (Devnet)',
      '2taiJMsZVH9UWG31DASLE3qZdpiq7BsmAVRoC8kNKgyR': 'HXD (Devnet)',
      'BJqwwqWHcA5pXAnsAnG6mMiRqKzNcg36LG4bvcqbi3PP': 'Test Token 1',
      'CmmV5QXtqiaGQoca58HsKM2tP9qGQcAAh7gHwzZ68MBS': 'Test Token 2',
      '11111111111111111111111111111111': 'SOL (Native)'
    };
    
    return tokenNames[mintAddress] || 'Unknown Token';
  }

  private async performConnectivityTest(): Promise<void> {
    const spinner = ora('Testing network connectivity...').start();
    
    try {
      const version = await this.connection.getVersion();
      const slot = await this.connection.getSlot();
      
      spinner.succeed(`Connected to ${this.network} - Slot: ${slot}, Version: ${version['solana-core']}`);
    } catch (error) {
      spinner.fail('Network connectivity test failed');
      throw error;
    }
  }

  public async verify(): Promise<void> {
    try {
      await this.showWelcome();
      await this.performConnectivityTest();
      await this.checkProgramDeployment();
      
      const auctionHouse = await this.getAuctionHouseAddress();
      const result = await this.verifyAuctionHouse(auctionHouse);
      
      this.displayResults(result);

    } catch (error) {
      console.error(chalk.red('\n❌ Verification failed:'));
      console.error(chalk.red(error instanceof Error ? error.message : String(error)));
      process.exit(1);
    }
  }
}

// Add the missing method to M2Helpers
declare module './helpers' {
  namespace M2Helpers {
    function getValidPaymentMints(network: string): string[];
  }
}

// Extend M2Helpers with the missing method
M2Helpers.getValidPaymentMints = function(network: string): string[] {
  const VALID_PAYMENT_MINTS = {
    'mainnet-beta': [
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
      'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',  // Marinade SOL
      'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn', // Jito SOL
      '3dgCCb15HMQSA4Pn3Tfii5vRk7aRqTH95LJjxzsG2Mug', // HXD
      'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', // Bonk
      '11111111111111111111111111111111'              // Native SOL
    ],
    'devnet': [
      '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU', // Devnet USDC
      '2taiJMsZVH9UWG31DASLE3qZdpiq7BsmAVRoC8kNKgyR', // Devnet HXD
      'BJqwwqWHcA5pXAnsAnG6mMiRqKzNcg36LG4bvcqbi3PP', // Test token 1
      'CmmV5QXtqiaGQoca58HsKM2tP9qGQcAAh7gHwzZ68MBS', // Test token 2
      '11111111111111111111111111111111'              // Native SOL
    ]
  };
  
  return VALID_PAYMENT_MINTS[network as keyof typeof VALID_PAYMENT_MINTS] || VALID_PAYMENT_MINTS.devnet;
};

// Run the verifier
if (require.main === module) {
  const verifier = new M2MarketplaceVerifier();
  verifier.verify().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export default M2MarketplaceVerifier;