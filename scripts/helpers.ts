import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import bs58 from 'bs58';

export const PROGRAM_ID = new PublicKey('M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K');

// Valid payment mints for different networks
export const VALID_PAYMENT_MINTS = {
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

/**
 * Utility functions for M2 marketplace deployment and interaction
 */
export class M2Helpers {
  /**
   * Load a keypair from a base58 encoded private key string
   */
  static loadKeypairFromBase58(privateKeyString: string): Keypair {
    try {
      const privateKeyBytes = bs58.decode(privateKeyString);
      return Keypair.fromSecretKey(privateKeyBytes);
    } catch (error) {
      throw new Error(`Invalid private key format. Expected base58 encoded string.`);
    }
  }

  /**
   * Derive auction house PDA from creator public key
   */
  static deriveAuctionHouse(creator: PublicKey, programId: PublicKey = PROGRAM_ID): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('m2'), creator.toBuffer()],
      programId
    );
  }

  /**
   * Derive auction house treasury PDA
   */
  static deriveAuctionHouseTreasury(auctionHouse: PublicKey, programId: PublicKey = PROGRAM_ID): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('m2'), auctionHouse.toBuffer(), Buffer.from('treasury')],
      programId
    );
  }

  /**
   * Derive program as signer PDA
   */
  static deriveProgramAsSigner(auctionHouse: PublicKey, programId: PublicKey = PROGRAM_ID): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('m2'), auctionHouse.toBuffer(), Buffer.from('signer')],
      programId
    );
  }

  /**
   * Derive buyer trade state PDA
   */
  static deriveBuyerTradeState(
    auctionHouse: PublicKey,
    buyer: PublicKey,
    tokenMint: PublicKey,
    paymentMint: PublicKey,
    buyerPrice: anchor.BN,
    tokenSize: anchor.BN,
    buyerStateExpiry: anchor.BN,
    programId: PublicKey = PROGRAM_ID
  ): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from('m2'),
        auctionHouse.toBuffer(),
        buyer.toBuffer(),
        tokenMint.toBuffer(),
        paymentMint.toBuffer(),
        Buffer.from('buyer_trade_state'),
        buyerPrice.toArrayLike(Buffer, 'le', 8),
        tokenSize.toArrayLike(Buffer, 'le', 8),
        buyerStateExpiry.toArrayLike(Buffer, 'le', 8)
      ],
      programId
    );
  }

  /**
   * Derive seller trade state PDA
   */
  static deriveSellerTradeState(
    auctionHouse: PublicKey,
    seller: PublicKey,
    tokenMint: PublicKey,
    paymentMint: PublicKey,
    buyerPrice: anchor.BN,
    tokenSize: anchor.BN,
    sellerStateExpiry: anchor.BN,
    programId: PublicKey = PROGRAM_ID
  ): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from('m2'),
        auctionHouse.toBuffer(),
        seller.toBuffer(),
        tokenMint.toBuffer(),
        paymentMint.toBuffer(),
        Buffer.from('seller_trade_state'),
        buyerPrice.toArrayLike(Buffer, 'le', 8),
        tokenSize.toArrayLike(Buffer, 'le', 8),
        sellerStateExpiry.toArrayLike(Buffer, 'le', 8)
      ],
      programId
    );
  }

  /**
   * Derive escrow payment account PDA
   */
  static deriveEscrowPaymentAccount(
    auctionHouse: PublicKey,
    buyer: PublicKey,
    paymentMint: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from('m2'),
        auctionHouse.toBuffer(),
        buyer.toBuffer(),
        paymentMint.toBuffer(),
        Buffer.from('escrow_payment_account')
      ],
      programId
    );
  }

  /**
   * Validate that a payment mint is allowed for the given network
   */
  static isValidPaymentMint(paymentMint: PublicKey, network: string): boolean {
    const validMints = VALID_PAYMENT_MINTS[network as keyof typeof VALID_PAYMENT_MINTS] || [];
    return validMints.includes(paymentMint.toString());
  }

  /**
   * Get default RPC URL for a network
   */
  static getDefaultRpcUrl(network: string): string {
    switch (network) {
      case 'mainnet-beta':
        return 'https://api.mainnet-beta.solana.com';
      case 'devnet':
        return 'https://api.devnet.solana.com';
      case 'testnet':
        return 'https://api.testnet.solana.com';
      case 'localnet':
        return 'http://127.0.0.1:8899';
      default:
        return 'https://api.devnet.solana.com';
    }
  }

  /**
   * Get explorer URL for a transaction
   */
  static getExplorerUrl(signature: string, network: string): string {
    const baseUrl = network === 'mainnet-beta' 
      ? 'https://explorer.solana.com'
      : `https://explorer.solana.com/?cluster=${network}`;
    return `${baseUrl}/tx/${signature}`;
  }

  /**
   * Get explorer URL for an account
   */
  static getAccountExplorerUrl(address: PublicKey, network: string): string {
    const baseUrl = network === 'mainnet-beta' 
      ? 'https://explorer.solana.com'
      : `https://explorer.solana.com/?cluster=${network}`;
    return `${baseUrl}/address/${address.toString()}`;
  }

  /**
   * Convert basis points to percentage
   */
  static basisPointsToPercent(basisPoints: number): number {
    return basisPoints / 100;
  }

  /**
   * Convert percentage to basis points
   */
  static percentToBasisPoints(percent: number): number {
    return Math.round(percent * 100);
  }

  /**
   * Calculate fee amount from total and basis points
   */
  static calculateFee(total: anchor.BN, feeBasisPoints: number): anchor.BN {
    return total.mul(new anchor.BN(feeBasisPoints)).div(new anchor.BN(10000));
  }

  /**
   * Validate auction house configuration
   */
  static validateAuctionHouseConfig(config: {
    sellerFeeBasisPoints: number;
    buyerReferralBp: number;
    sellerReferralBp: number;
    nprob: number;
  }): string[] {
    const errors: string[] = [];

    // Check seller fee bounds
    if (config.sellerFeeBasisPoints < 0 || config.sellerFeeBasisPoints > 10000) {
      errors.push('Seller fee must be between 0 and 10000 basis points (0% - 100%)');
    }

    // Check referral fees don't exceed total fee
    const totalReferralFees = config.buyerReferralBp + config.sellerReferralBp;
    if (totalReferralFees > config.sellerFeeBasisPoints) {
      errors.push('Total referral fees cannot exceed marketplace fee');
    }

    // Check individual referral fees
    if (config.buyerReferralBp < 0) {
      errors.push('Buyer referral fee cannot be negative');
    }
    if (config.sellerReferralBp < 0) {
      errors.push('Seller referral fee cannot be negative');
    }

    // Check notary probability
    if (config.nprob < 0 || config.nprob > 100) {
      errors.push('Notary probability must be between 0 and 100');
    }

    return errors;
  }

  /**
   * Wait for transaction confirmation with retry logic
   */
  static async confirmTransaction(
    connection: Connection, 
    signature: string, 
    commitment: anchor.web3.Commitment = 'confirmed',
    maxRetries: number = 3
  ): Promise<void> {
    let retries = 0;
    
    while (retries < maxRetries) {
      try {
        const confirmation = await connection.confirmTransaction(signature, commitment);
        
        if (confirmation.value.err) {
          throw new Error(`Transaction failed: ${confirmation.value.err}`);
        }
        
        return; // Success
      } catch (error) {
        retries++;
        if (retries >= maxRetries) {
          throw new Error(`Failed to confirm transaction after ${maxRetries} retries: ${error}`);
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 2000 * retries));
      }
    }
  }

  /**
   * Get account data with error handling
   */
  static async getAccountInfo(
    connection: Connection, 
    publicKey: PublicKey
  ): Promise<anchor.web3.AccountInfo<Buffer> | null> {
    try {
      return await connection.getAccountInfo(publicKey);
    } catch (error) {
      console.warn(`Failed to get account info for ${publicKey.toString()}: ${error}`);
      return null;
    }
  }

  /**
   * Check if an account exists and is initialized
   */
  static async accountExists(connection: Connection, publicKey: PublicKey): Promise<boolean> {
    const accountInfo = await this.getAccountInfo(connection, publicKey);
    return accountInfo !== null && accountInfo.data.length > 0;
  }

  /**
   * Format lamports to SOL with specified decimal places
   */
  static lamportsToSol(lamports: number, decimals: number = 4): string {
    return (lamports / anchor.web3.LAMPORTS_PER_SOL).toFixed(decimals);
  }

  /**
   * Format SOL to lamports
   */
  static solToLamports(sol: number): number {
    return Math.round(sol * anchor.web3.LAMPORTS_PER_SOL);
  }
}

export default M2Helpers;