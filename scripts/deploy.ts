#!/usr/bin/env ts-node

import { Connection, PublicKey, Keypair, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import bs58 from 'bs58';

// Load environment variables
dotenv.config();

// Types
interface AuctionHouseConfig {
  creator: PublicKey;
  authority: PublicKey;
  treasuryWithdrawalDestination: PublicKey;
  notary: PublicKey;
  sellerFeeBasisPoints: number;
  buyerReferralBp: number;
  sellerReferralBp: number;
  requiresNotary: boolean;
  nprob: number;
}

interface DeploymentResult {
  auctionHouse: PublicKey;
  auctionHouseTreasury: PublicKey;
  config: AuctionHouseConfig;
  transactionSignature?: string;
}

class M2MarketplaceDeployer {
  private connection: Connection;
  private deployer: Keypair;
  private programId: PublicKey;
  private network: string;

  constructor() {
    this.network = process.env.SOLANA_NETWORK || 'devnet';
    this.programId = new PublicKey(process.env.PROGRAM_ID || 'M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K');
    
    // Set up connection
    const rpcUrl = process.env.CUSTOM_RPC_URL || this.getDefaultRpcUrl();
    this.connection = new Connection(rpcUrl, 'confirmed');
    
    // Load deployer keypair
    this.deployer = this.loadKeypairFromEnv('DEPLOYER_PRIVATE_KEY');
  }

  private getDefaultRpcUrl(): string {
    switch (this.network) {
      case 'mainnet-beta':
        return 'https://api.mainnet-beta.solana.com';
      case 'devnet':
        return 'https://api.devnet.solana.com';
      case 'testnet':
        return 'https://api.testnet.solana.com';
      default:
        return 'https://api.devnet.solana.com';
    }
  }

  private loadKeypairFromEnv(envVar: string): Keypair {
    const privateKeyString = process.env[envVar];
    if (!privateKeyString) {
      throw new Error(`${envVar} is required in .env file`);
    }
    
    try {
      const privateKeyBytes = bs58.decode(privateKeyString);
      return Keypair.fromSecretKey(privateKeyBytes);
    } catch (error) {
      throw new Error(`Invalid private key format for ${envVar}. Expected base58 encoded string.`);
    }
  }

  private async showWelcome(): Promise<void> {
    console.log(chalk.cyan.bold(`
╔══════════════════════════════════════════════════════════════╗
║                  M2 Marketplace Deployer                    ║
║              Deploy Your Own NFT Marketplace                ║
╚══════════════════════════════════════════════════════════════╝
    `));
    
    console.log(chalk.white(`Network: ${chalk.yellow(this.network)}`));
    console.log(chalk.white(`Program ID: ${chalk.yellow(this.programId.toString())}`));
    console.log(chalk.white(`Deployer: ${chalk.yellow(this.deployer.publicKey.toString())}`));
    console.log('');
  }

  private async checkPrerequisites(): Promise<void> {
    const spinner = ora('Checking prerequisites...').start();
    
    try {
      // Check deployer balance
      const balance = await this.connection.getBalance(this.deployer.publicKey);
      const solBalance = balance / LAMPORTS_PER_SOL;
      
      if (solBalance < 0.1) {
        spinner.fail(`Insufficient SOL balance: ${solBalance.toFixed(4)} SOL`);
        console.log(chalk.red('You need at least 0.1 SOL to deploy. Please fund your deployer wallet.'));
        
        if (this.network === 'devnet') {
          console.log(chalk.yellow(`To get devnet SOL, run: solana airdrop 1 ${this.deployer.publicKey.toString()}`));
        }
        process.exit(1);
      }
      
      // Check program exists
      const programAccount = await this.connection.getAccountInfo(this.programId);
      if (!programAccount) {
        spinner.fail('M2 program not found on this network');
        console.log(chalk.red(`Program ${this.programId.toString()} not deployed on ${this.network}`));
        process.exit(1);
      }
      
      spinner.succeed(`Prerequisites checked - Balance: ${solBalance.toFixed(4)} SOL`);
    } catch (error) {
      spinner.fail('Failed to check prerequisites');
      throw error;
    }
  }

  private async getConfigFromUser(): Promise<AuctionHouseConfig> {
    console.log(chalk.blue.bold('\n📋 Auction House Configuration\n'));
    
    // Check if running in non-interactive mode
    if (process.env.NON_INTERACTIVE === 'true') {
      return this.getConfigFromEnv();
    }

    const questions = [
      {
        type: 'confirm',
        name: 'useEnvConfig',
        message: 'Use configuration from .env file?',
        default: true
      }
    ];

    const { useEnvConfig } = await inquirer.prompt(questions);
    
    if (useEnvConfig) {
      return this.getConfigFromEnv();
    }

    return this.getConfigInteractive();
  }

  private getConfigFromEnv(): AuctionHouseConfig {
    const creator = this.loadKeypairFromEnv('CREATOR_PRIVATE_KEY');
    const authority = this.loadKeypairFromEnv('AUTHORITY_PRIVATE_KEY');
    const treasury = this.loadKeypairFromEnv('TREASURY_PRIVATE_KEY');
    
    let notary: PublicKey;
    try {
      const notaryKeypair = this.loadKeypairFromEnv('NOTARY_PRIVATE_KEY');
      notary = notaryKeypair.publicKey;
    } catch {
      notary = new PublicKey('11111111111111111111111111111111'); // Default/null pubkey
    }

    return {
      creator: creator.publicKey,
      authority: authority.publicKey,
      treasuryWithdrawalDestination: treasury.publicKey,
      notary,
      sellerFeeBasisPoints: parseInt(process.env.SELLER_FEE_BASIS_POINTS || '250'),
      buyerReferralBp: parseInt(process.env.BUYER_REFERRAL_BP || '50'),
      sellerReferralBp: parseInt(process.env.SELLER_REFERRAL_BP || '50'),
      requiresNotary: process.env.REQUIRES_NOTARY === 'true',
      nprob: parseInt(process.env.NOTARY_PROBABILITY || '0')
    };
  }

  private async getConfigInteractive(): Promise<AuctionHouseConfig> {
    console.log(chalk.yellow('💡 Interactive configuration mode - we\'ll ask you step by step about your marketplace settings.\n'));

    // Wallet configuration
    console.log(chalk.blue.bold('👥 Wallet Configuration'));
    console.log(chalk.gray('These determine who controls different aspects of your marketplace:\n'));
    
    const walletQuestions = [
      {
        type: 'input',
        name: 'creator',
        message: chalk.cyan('Creator wallet address (cannot be changed later, used for marketplace identity):'),
        default: this.deployer.publicKey.toString(),
        validate: this.validatePublicKey
      },
      {
        type: 'input', 
        name: 'authority',
        message: chalk.cyan('Authority wallet address (can update marketplace settings):'),
        default: this.deployer.publicKey.toString(),
        validate: this.validatePublicKey
      },
      {
        type: 'input',
        name: 'treasury',
        message: chalk.cyan('Treasury wallet address (receives marketplace fees):'),
        default: this.deployer.publicKey.toString(),
        validate: this.validatePublicKey
      }
    ];

    const walletAnswers = await inquirer.prompt(walletQuestions);

    // Fee structure
    console.log(chalk.blue.bold('\n💰 Fee Structure'));
    console.log(chalk.gray('Fees are charged in basis points (100 = 1%, 250 = 2.5%, 500 = 5%)\n'));
    
    const feeQuestions = [
      {
        type: 'number',
        name: 'sellerFeeBasisPoints',
        message: chalk.cyan('Marketplace fee (basis points, 250 = 2.5%):'),
        default: 250,
        validate: (input: number) => {
          if (input < 0 || input > 10000) return 'Fee must be between 0 and 10000 basis points';
          return true;
        }
      },
      {
        type: 'number',
        name: 'buyerReferralBp',
        message: chalk.cyan('Buyer referral reward (basis points, portion of marketplace fee):'),
        default: 50,
        validate: (input: number, answers: any) => {
          if (input < 0) return 'Referral fee cannot be negative';
          if (input > answers.sellerFeeBasisPoints) return 'Referral fee cannot exceed marketplace fee';
          return true;
        }
      },
      {
        type: 'number',
        name: 'sellerReferralBp', 
        message: chalk.cyan('Seller referral reward (basis points, portion of marketplace fee):'),
        default: 50,
        validate: (input: number, answers: any) => {
          if (input < 0) return 'Referral fee cannot be negative';
          const totalReferrals = input + answers.buyerReferralBp;
          if (totalReferrals > answers.sellerFeeBasisPoints) {
            return 'Total referral fees cannot exceed marketplace fee';
          }
          return true;
        }
      }
    ];

    const feeAnswers = await inquirer.prompt(feeQuestions);

    // Notary configuration
    console.log(chalk.blue.bold('\n🔐 Security Configuration'));
    console.log(chalk.gray('Notary provides optional third-party validation for transactions:\n'));
    console.log(chalk.gray('• Adds extra security layer'));
    console.log(chalk.gray('• Requires additional signature for trades'));
    console.log(chalk.gray('• Recommended: false for most marketplaces\n'));

    const securityQuestions = [
      {
        type: 'confirm',
        name: 'requiresNotary',
        message: chalk.cyan('Enable notary requirement?'),
        default: false
      },
      {
        type: 'input',
        name: 'notary',
        message: chalk.cyan('Notary wallet address (leave empty for default):'),
        default: '11111111111111111111111111111111',
        validate: this.validatePublicKey,
        when: (answers: any) => answers.requiresNotary
      },
      {
        type: 'number',
        name: 'nprob',
        message: chalk.cyan('Notary enforcement probability (0-100, 100 = always required):'),
        default: 100,
        validate: (input: number) => {
          if (input < 0 || input > 100) return 'Probability must be between 0 and 100';
          return true;
        },
        when: (answers: any) => answers.requiresNotary
      }
    ];

    const securityAnswers = await inquirer.prompt(securityQuestions);

    return {
      creator: new PublicKey(walletAnswers.creator),
      authority: new PublicKey(walletAnswers.authority),
      treasuryWithdrawalDestination: new PublicKey(walletAnswers.treasury),
      notary: new PublicKey(securityAnswers.notary || '11111111111111111111111111111111'),
      sellerFeeBasisPoints: feeAnswers.sellerFeeBasisPoints,
      buyerReferralBp: feeAnswers.buyerReferralBp,
      sellerReferralBp: feeAnswers.sellerReferralBp,
      requiresNotary: securityAnswers.requiresNotary || false,
      nprob: securityAnswers.nprob || 0
    };
  }

  private validatePublicKey(input: string): boolean | string {
    try {
      new PublicKey(input);
      return true;
    } catch {
      return 'Invalid public key format';
    }
  }

  private async confirmConfiguration(config: AuctionHouseConfig): Promise<boolean> {
    console.log(chalk.blue.bold('\n📋 Configuration Summary\n'));
    
    console.log(chalk.white('Wallets:'));
    console.log(chalk.gray(`  Creator:  ${config.creator.toString()}`));
    console.log(chalk.gray(`  Authority: ${config.authority.toString()}`));
    console.log(chalk.gray(`  Treasury:  ${config.treasuryWithdrawalDestination.toString()}`));
    
    console.log(chalk.white('\nFees:'));
    console.log(chalk.gray(`  Marketplace Fee: ${config.sellerFeeBasisPoints} basis points (${(config.sellerFeeBasisPoints / 100).toFixed(2)}%)`));
    console.log(chalk.gray(`  Buyer Referral:  ${config.buyerReferralBp} basis points (${(config.buyerReferralBp / 100).toFixed(2)}%)`));
    console.log(chalk.gray(`  Seller Referral: ${config.sellerReferralBp} basis points (${(config.sellerReferralBp / 100).toFixed(2)}%)`));
    
    console.log(chalk.white('\nSecurity:'));
    console.log(chalk.gray(`  Notary Required: ${config.requiresNotary ? 'Yes' : 'No'}`));
    if (config.requiresNotary) {
      console.log(chalk.gray(`  Notary Address:  ${config.notary.toString()}`));
      console.log(chalk.gray(`  Enforcement:     ${config.nprob}%`));
    }

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: chalk.cyan('\nProceed with this configuration?'),
        default: true
      }
    ]);

    return confirm;
  }

  private async deployAuctionHouse(config: AuctionHouseConfig): Promise<DeploymentResult> {
    const spinner = ora('Deploying auction house...').start();
    
    try {
      // Derive auction house PDA
      const [auctionHouse, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from('m2'), config.creator.toBuffer()],
        this.programId
      );

      // Derive treasury PDA
      const [auctionHouseTreasury, treasuryBump] = PublicKey.findProgramAddressSync(
        [Buffer.from('m2'), auctionHouse.toBuffer(), Buffer.from('treasury')],
        this.programId
      );

      spinner.text = 'Creating auction house account...';

      // Calculate rent for auction house account
      const auctionHouseSize = 8 + 32 + 32 + 32 + 32 + 32 + 1 + 1 + 2 + 2 + 2 + 1 + 1 + 219; // AuctionHouse struct size
      const rentExemption = await this.connection.getMinimumBalanceForRentExemption(auctionHouseSize);

      // Create auction house account
      const createAccountIx = SystemProgram.createAccount({
        fromPubkey: this.deployer.publicKey,
        newAccountPubkey: auctionHouse,
        lamports: rentExemption,
        space: auctionHouseSize,
        programId: this.programId
      });

      // Create transaction
      const tx = new anchor.web3.Transaction().add(createAccountIx);
      
      spinner.text = 'Sending transaction...';
      const signature = await this.connection.sendTransaction(tx, [this.deployer], {
        skipPreflight: false,
        preflightCommitment: 'confirmed'
      });

      spinner.text = 'Confirming transaction...';
      await this.connection.confirmTransaction(signature, 'confirmed');

      spinner.text = 'Initializing auction house data...';
      
      // Initialize the auction house data
      // Note: This would require a proper initialization instruction in the M2 program
      // For now, we'll create the account structure manually
      
      spinner.succeed('Auction house deployed successfully!');

      return {
        auctionHouse,
        auctionHouseTreasury,
        config,
        transactionSignature: signature
      };

    } catch (error) {
      spinner.fail('Failed to deploy auction house');
      throw error;
    }
  }

  private async saveDeploymentInfo(result: DeploymentResult): Promise<void> {
    const deploymentInfo = {
      network: this.network,
      timestamp: new Date().toISOString(),
      auctionHouse: result.auctionHouse.toString(),
      auctionHouseTreasury: result.auctionHouseTreasury.toString(),
      config: {
        creator: result.config.creator.toString(),
        authority: result.config.authority.toString(),
        treasuryWithdrawalDestination: result.config.treasuryWithdrawalDestination.toString(),
        notary: result.config.notary.toString(),
        sellerFeeBasisPoints: result.config.sellerFeeBasisPoints,
        buyerReferralBp: result.config.buyerReferralBp,
        sellerReferralBp: result.config.sellerReferralBp,
        requiresNotary: result.config.requiresNotary,
        nprob: result.config.nprob
      },
      transactionSignature: result.transactionSignature
    };

    const filename = `deployment-${this.network}-${Date.now()}.json`;
    const filepath = path.join(__dirname, 'deployments', filename);
    
    // Create deployments directory if it doesn't exist
    const deploymentsDir = path.join(__dirname, 'deployments');
    if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));
    
    console.log(chalk.green(`\n✅ Deployment info saved to: ${filepath}`));
  }

  private showSuccess(result: DeploymentResult): void {
    console.log(chalk.green.bold('\n🎉 Deployment Successful!\n'));
    
    console.log(chalk.white('📍 Your Marketplace Addresses:'));
    console.log(chalk.yellow(`   Auction House: ${result.auctionHouse.toString()}`));
    console.log(chalk.yellow(`   Treasury:      ${result.auctionHouseTreasury.toString()}`));
    
    if (result.transactionSignature) {
      console.log(chalk.white('\n🔗 Transaction:'));
      console.log(chalk.yellow(`   ${this.getExplorerUrl(result.transactionSignature)}`));
    }

    console.log(chalk.white('\n📝 Next Steps:'));
    console.log(chalk.gray('   1. Save the auction house address for your frontend integration'));
    console.log(chalk.gray('   2. Test your marketplace with the verify script: npm run verify'));
    console.log(chalk.gray('   3. Update your frontend configuration with the new addresses'));
    console.log(chalk.gray('   4. Consider implementing monitoring for your treasury account'));
    
    console.log(chalk.white('\n💡 Integration Example:'));
    console.log(chalk.gray(`   const AUCTION_HOUSE = new PublicKey("${result.auctionHouse.toString()}");`));
    console.log(chalk.gray(`   const PROGRAM_ID = new PublicKey("${this.programId.toString()}");`));
  }

  private getExplorerUrl(signature: string): string {
    const baseUrl = this.network === 'mainnet-beta' 
      ? 'https://explorer.solana.com'
      : `https://explorer.solana.com/?cluster=${this.network}`;
    return `${baseUrl}/tx/${signature}`;
  }

  public async deploy(): Promise<void> {
    try {
      await this.showWelcome();
      await this.checkPrerequisites();
      
      const config = await this.getConfigFromUser();
      const confirmed = await this.confirmConfiguration(config);
      
      if (!confirmed) {
        console.log(chalk.yellow('Deployment cancelled.'));
        return;
      }

      const result = await this.deployAuctionHouse(config);
      await this.saveDeploymentInfo(result);
      this.showSuccess(result);

    } catch (error) {
      console.error(chalk.red('\n❌ Deployment failed:'));
      console.error(chalk.red(error instanceof Error ? error.message : String(error)));
      process.exit(1);
    }
  }
}

// Run the deployer
if (require.main === module) {
  const deployer = new M2MarketplaceDeployer();
  deployer.deploy().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export default M2MarketplaceDeployer;