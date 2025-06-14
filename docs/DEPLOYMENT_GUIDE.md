# M2 Marketplace Deployment Guide

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Configurable Parameters](#configurable-parameters)
4. [Deployment Process](#deployment-process)
5. [Creating Your Auction House](#creating-your-auction-house)
6. [Configuration Management](#configuration-management)
7. [Mainnet vs Devnet Differences](#mainnet-vs-devnet-differences)
8. [Post-Deployment Setup](#post-deployment-setup)
9. [Testing Your Deployment](#testing-your-deployment)
10. [Troubleshooting](#troubleshooting)

---

## Overview

This guide walks you through deploying the M2 marketplace program as your own NFT marketplace. The M2 program supports multiple auction houses, allowing you to run your own marketplace instance with custom fee structures, referral systems, and configuration.

**Important Note:** The M2 program itself is deployed once per network, but each marketplace operator creates their own **Auction House** account that defines their marketplace's configuration and fee structure.

---

## Prerequisites

### Required Tools
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.16.25/install)"

# Install Anchor CLI
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install 0.29.0
avm use 0.29.0

# Install Node.js (for client-side integration)
# Download from https://nodejs.org/ or use your package manager
```

### Required Wallets and Keys
1. **Deployer Wallet**: Solana wallet with sufficient SOL for deployment (~5-10 SOL)
2. **Authority Wallet**: Will control your auction house (can be same as deployer)
3. **Treasury Wallet**: Will receive marketplace fees
4. **Notary Wallet** (optional): For transaction validation

---

## Configurable Parameters

### 1. Auction House Configuration

#### **creator** (Pubkey)
- **Type**: Wallet address
- **Purpose**: The original creator of the auction house (used in PDA derivation)
- **Recommendation**: Use your main marketplace authority wallet
- **Cannot be changed after creation**

#### **authority** (Pubkey)
- **Type**: Wallet address  
- **Purpose**: Can update auction house settings
- **Recommendation**: Use a secure multisig wallet for production
- **Can be updated via `updateAuctionHouse`**

#### **treasury_withdrawal_destination** (Pubkey)
- **Type**: Wallet address
- **Purpose**: Where collected fees can be withdrawn to
- **Recommendation**: Use a secure treasury wallet, different from authority
- **Can be updated via `updateAuctionHouse`**

#### **notary** (Pubkey)
- **Type**: Wallet address
- **Purpose**: Optional third-party validator for transactions
- **Recommendation**: Leave as default (11111111111111111111111111111111) if not needed
- **Can be updated via `updateAuctionHouse`**

### 2. Fee Structure

#### **seller_fee_basis_points** (u16)
- **Type**: Basis points (1/100th of a percent)
- **Range**: 0 - 10,000 (0% - 100%)
- **Purpose**: Platform fee charged on sales
- **Recommendation**: 250-500 (2.5% - 5%) is typical for NFT marketplaces
- **Example**: 250 = 2.5% fee

#### **buyer_referral_bp** (u16)
- **Type**: Basis points
- **Range**: 0 - seller_fee_basis_points
- **Purpose**: Portion of platform fee given to buyer referrers
- **Recommendation**: 25-100 (0.25% - 1%)

#### **seller_referral_bp** (u16)
- **Type**: Basis points
- **Range**: 0 - seller_fee_basis_points  
- **Purpose**: Portion of platform fee given to seller referrers
- **Recommendation**: 25-100 (0.25% - 1%)

#### **requires_notary** (bool)
- **Type**: Boolean
- **Purpose**: Whether transactions require notary validation
- **Recommendation**: false for most use cases

#### **nprob** (u8)
- **Type**: 0-100
- **Purpose**: Notary enforcement probability percentage
- **Recommendation**: 0 if notary not required

### 3. Payment Tokens

The program supports specific payment tokens defined in `constants.rs`:

#### Mainnet Tokens:
- **USDC**: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
- **Marinade SOL**: `mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So`
- **Jito SOL**: `J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn`
- **HXD**: `3dgCCb15HMQSA4Pn3Tfii5vRk7aRqTH95LJjxzsG2Mug`
- **Bonk**: `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263`

#### Devnet Tokens:
- **Devnet USDC**: `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`
- **Devnet HXD**: `2taiJMsZVH9UWG31DASLE3qZdpiq7BsmAVRoC8kNKgyR`

---

## Deployment Process

### Step 1: Environment Setup

```bash
# Clone the repository
git clone <repository-url>
cd m2

# Set up Solana configuration
solana config set --url devnet  # or mainnet-beta for production

# Check your wallet
solana address
solana balance
```

### Step 2: Configure Anchor.toml

Edit `Anchor.toml` to set your deployment target:

```toml
[provider]
cluster = "devnet"  # or "mainnet-beta"
wallet = "~/.config/solana/id.json"  # or path to your wallet

[programs.devnet]
m2 = "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K"

[programs.mainnet-beta]  
m2 = "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K"
```

### Step 3: Build and Deploy Program

```bash
# Build the program
anchor build

# Deploy to chosen network
anchor deploy --provider.cluster devnet
# or
anchor deploy --provider.cluster mainnet-beta
```

### Step 4: Update IDL and Types

```bash
# Generate updated IDL and TypeScript types
anchor run update_idl
```

---

## Creating Your Auction House

Since the M2 program doesn't include an auction house creation instruction, you need to create one manually. Here's a JavaScript/TypeScript script to create your auction house:

### auction-house-setup.js

```javascript
const anchor = require('@coral-xyz/anchor');
const { PublicKey, SystemProgram, LAMPORTS_PER_SOL } = require('@solana/web3.js');

// Configuration - CHANGE THESE VALUES
const config = {
  // Your marketplace configuration
  creator: new PublicKey("YOUR_CREATOR_WALLET_HERE"),
  authority: new PublicKey("YOUR_AUTHORITY_WALLET_HERE"), 
  treasuryWithdrawalDestination: new PublicKey("YOUR_TREASURY_WALLET_HERE"),
  notary: new PublicKey("11111111111111111111111111111111"), // Default if no notary
  
  // Fee structure (in basis points, 100 = 1%)
  sellerFeeBasisPoints: 250,  // 2.5% marketplace fee
  buyerReferralBp: 50,        // 0.5% to buyer referrers
  sellerReferralBp: 50,       // 0.5% to seller referrers
  requiresNotary: false,
  nprob: 0
};

async function createAuctionHouse() {
  // Initialize Anchor
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  
  const program = anchor.workspace.M2;
  const programId = program.programId;
  
  // Derive auction house PDA
  const [auctionHouse, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("m2"), config.creator.toBuffer()],
    programId
  );
  
  // Derive treasury PDA
  const [auctionHouseTreasury, treasuryBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("m2"), auctionHouse.toBuffer(), Buffer.from("treasury")],
    programId
  );
  
  console.log("Auction House Address:", auctionHouse.toString());
  console.log("Treasury Address:", auctionHouseTreasury.toString());
  
  // Create auction house account manually
  const auctionHouseAccount = {
    auctionHouseTreasury,
    treasuryWithdrawalDestination: config.treasuryWithdrawalDestination,
    authority: config.authority,
    creator: config.creator,
    notary: config.notary,
    bump,
    treasuryBump,
    sellerFeeBasisPoints: config.sellerFeeBasisPoints,
    buyerReferralBp: config.buyerReferralBp,
    sellerReferralBp: config.sellerReferralBp,
    requiresNotary: config.requiresNotary,
    nprob: config.nprob
  };
  
  // Calculate rent for auction house
  const rentExemption = await provider.connection.getMinimumBalanceForRentExemption(
    8 + 32 + 32 + 32 + 32 + 32 + 1 + 1 + 2 + 2 + 2 + 1 + 1 + 219 // AuctionHouse size
  );
  
  // Create account
  const createAccountIx = SystemProgram.createAccount({
    fromPubkey: provider.wallet.publicKey,
    newAccountPubkey: auctionHouse,
    lamports: rentExemption,
    space: 8 + 32 + 32 + 32 + 32 + 32 + 1 + 1 + 2 + 2 + 2 + 1 + 1 + 219,
    programId
  });
  
  // Initialize auction house data
  const tx = new anchor.web3.Transaction().add(createAccountIx);
  
  await provider.sendAndConfirm(tx, []);
  
  // Write data to account (this would need to be done through a custom instruction)
  console.log("Auction house account created successfully!");
  console.log("You'll need to initialize the account data through a custom instruction.");
  
  return {
    auctionHouse,
    auctionHouseTreasury,
    config: auctionHouseAccount
  };
}

createAuctionHouse().catch(console.error);
```

### Alternative: Using Rust for Auction House Creation

Create a separate Rust program or script to initialize auction houses:

```rust
// In a separate crate or as part of your client
use anchor_lang::prelude::*;
use solana_program::system_instruction;

pub fn create_auction_house(
    program_id: &Pubkey,
    creator: &Pubkey,
    authority: &Pubkey,
    treasury_withdrawal_destination: &Pubkey,
    seller_fee_basis_points: u16,
    // ... other params
) -> Result<(Pubkey, Pubkey)> {
    // Derive PDAs
    let (auction_house, bump) = Pubkey::find_program_address(
        &[b"m2", creator.as_ref()],
        program_id
    );
    
    let (auction_house_treasury, treasury_bump) = Pubkey::find_program_address(
        &[b"m2", auction_house.as_ref(), b"treasury"],
        program_id
    );
    
    // Create and initialize account
    // ... implementation details
    
    Ok((auction_house, auction_house_treasury))
}
```

---

## Configuration Management

### Updating Auction House Settings

After creating your auction house, you can update settings using the `updateAuctionHouse` instruction:

```javascript
async function updateAuctionHouse(newConfig) {
  const updateTx = await program.methods
    .updateAuctionHouse(
      newConfig.sellerFeeBasisPoints,
      newConfig.buyerReferralBp, 
      newConfig.sellerReferralBp,
      newConfig.requiresNotary,
      newConfig.nprob
    )
    .accounts({
      payer: provider.wallet.publicKey,
      notary: newConfig.notary,
      authority: currentAuthority.publicKey,
      newAuthority: newConfig.authority,
      treasuryWithdrawalDestination: newConfig.treasuryWithdrawalDestination,
      auctionHouse: auctionHouseAddress,
      systemProgram: SystemProgram.programId
    })
    .signers([currentAuthority])
    .rpc();
    
  console.log("Auction house updated:", updateTx);
}
```

---

## Mainnet vs Devnet Differences

### Network Configuration

| Aspect | Devnet | Mainnet-Beta |
|--------|--------|--------------|
| **RPC URL** | `https://api.devnet.solana.com` | `https://api.mainnet-beta.solana.com` |
| **Program ID** | Same for both networks | `M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K` |
| **Payment Tokens** | Devnet test tokens | Real tokens (USDC, SOL, etc.) |
| **Gas Costs** | Free/minimal | Real SOL cost |
| **Risk** | No financial risk | Real money at stake |

### Payment Token Differences

**Devnet:**
- Use test USDC: `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`
- Test tokens can be minted for free
- No real value

**Mainnet:**
- Use real USDC: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
- Real economic value
- Actual user funds at risk

### Deployment Commands

```bash
# Devnet deployment
solana config set --url devnet
anchor deploy --provider.cluster devnet

# Mainnet deployment  
solana config set --url mainnet-beta
anchor deploy --provider.cluster mainnet-beta
```

---

## Post-Deployment Setup

### 1. Verify Deployment

```bash
# Check program deployment
solana program show M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K

# Verify auction house creation
solana account <YOUR_AUCTION_HOUSE_ADDRESS>
```

### 2. Fund Accounts

```bash
# Ensure authority wallet has SOL for transactions
solana transfer <AMOUNT> <AUTHORITY_WALLET> --allow-unfunded-recipient

# Airdrop SOL on devnet for testing
solana airdrop 2 <WALLET_ADDRESS>
```

### 3. Test Basic Operations

```javascript
// Test auction house configuration
const auctionHouseData = await program.account.auctionHouse.fetch(auctionHouseAddress);
console.log("Auction House Config:", auctionHouseData);

// Verify fee structure
console.log("Seller Fee:", auctionHouseData.sellerFeeBasisPoints, "bp");
console.log("Buyer Referral:", auctionHouseData.buyerReferralBp, "bp");
console.log("Seller Referral:", auctionHouseData.sellerReferralBp, "bp");
```

---

## Testing Your Deployment

### 1. Create Test NFTs (Devnet Only)

```bash
# Install Metaplex CLI
npm install -g @metaplex-foundation/js-cli

# Create test NFT
metaplex create-nft \
  --name "Test NFT" \
  --symbol "TEST" \
  --description "Test NFT for marketplace" \
  --image <IMAGE_URL> \
  --cluster devnet
```

### 2. Test Trading Operations

```javascript
// Test complete trading flow
async function testMarketplace() {
  // 1. Create seller listing
  const sellTx = await program.methods.sell(/* params */).rpc();
  
  // 2. Create buyer bid
  const buyTx = await program.methods.buyV2(/* params */).rpc();
  
  // 3. Execute sale
  const executeTx = await program.methods.executeSaleV2(/* params */).rpc();
  
  console.log("Trading test completed successfully!");
}
```

### 3. Verify Fee Collection

```bash
# Check treasury balance
solana balance <TREASURY_ADDRESS>

# Monitor fee accumulation
watch -n 10 "solana balance <TREASURY_ADDRESS>"
```

---

## Troubleshooting

### Common Issues

#### 1. "Program deploy failed"
```bash
# Solution: Ensure sufficient SOL balance
solana balance
solana airdrop 5  # On devnet only
```

#### 2. "Invalid auction house"
- Check PDA derivation uses correct creator address
- Verify auction house account exists and is initialized
- Confirm program ID matches deployed version

#### 3. "Invalid payment mint"
- Ensure payment token is in VALID_PAYMENT_MINTS list
- Use correct token addresses for network (devnet vs mainnet)
- Verify token account is properly initialized

#### 4. "Insufficient fees"
- Check buyer has enough balance for purchase + fees
- Verify fee calculations don't exceed 100%
- Ensure referral fees don't exceed total platform fee

### Debugging Tools

```bash
# Check program logs
solana logs M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K

# Verify account data
anchor account auction_house <AUCTION_HOUSE_ADDRESS>

# Check transaction details
solana confirm <TRANSACTION_SIGNATURE> -v
```

### Support Resources

1. **Anchor Documentation**: https://anchor-lang.com/
2. **Solana Cookbook**: https://solanacookbook.com/
3. **SPL Token Guide**: https://spl.solana.com/token
4. **Metaplex Docs**: https://docs.metaplex.com/

---

## Security Considerations

### Pre-Deployment Checklist

- [ ] Audit fee calculation logic
- [ ] Test with small amounts first
- [ ] Verify authority controls
- [ ] Check PDA derivations
- [ ] Test edge cases (zero amounts, expired listings)
- [ ] Validate referral system
- [ ] Confirm treasury access controls

### Production Recommendations

1. **Use Multisig Wallets** for authority and treasury
2. **Start with Conservative Fees** (2-3%) and adjust based on usage
3. **Monitor Treasury Regularly** for unexpected behavior  
4. **Implement Circuit Breakers** for high-value transactions
5. **Regular Security Audits** of configuration changes
6. **Backup Recovery Plans** for key management

---

This deployment guide provides everything needed to launch your own M2-powered NFT marketplace. Remember to thoroughly test on devnet before deploying to mainnet with real user funds.