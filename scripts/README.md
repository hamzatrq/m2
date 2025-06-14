# M2 Marketplace Deployment Scripts

## Overview

This directory contains interactive TypeScript scripts to deploy and manage your own M2 NFT marketplace. The scripts provide a user-friendly CLI interface with detailed explanations of each configuration option.

## Quick Start

### 1. Install Dependencies

```bash
cd scripts
npm install
```

### 2. Set Up Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your private keys and configuration
nano .env
```

### 3. Deploy Your Marketplace

```bash
# Interactive deployment (recommended)
npm run deploy

# Non-interactive deployment (uses .env values)
NON_INTERACTIVE=true npm run deploy
```

### 4. Verify Deployment

```bash
# Verify your marketplace is working correctly
npm run verify
```

## Environment Configuration

### Required Private Keys (Base58 format)

Generate private keys using Solana CLI:
```bash
# Generate a new keypair
solana-keygen new --outfile deployer.json

# Get the private key in base58 format  
solana-keygen pubkey deployer.json  # This shows public key
# For private key, look inside the JSON file - it's the array of numbers that needs to be converted to base58
```

Or use an existing wallet:
```bash
# Export from Phantom/Solflare (they usually provide base58 format)
# Or convert from JSON array format to base58 using online tools
```

### Configuration Explanations

#### **DEPLOYER_PRIVATE_KEY**
- **Purpose**: Pays for all deployment transactions
- **Requirements**: Needs ~0.1-0.5 SOL for deployment costs
- **Security**: Can be a temporary wallet, only used for deployment

#### **CREATOR_PRIVATE_KEY** 
- **Purpose**: Becomes the permanent creator of your auction house
- **Important**: Cannot be changed after deployment! Used in PDA derivation
- **Recommendation**: Use your main marketplace authority wallet
- **Security**: Should be your most secure wallet

#### **AUTHORITY_PRIVATE_KEY**
- **Purpose**: Can update marketplace settings after deployment
- **Changeable**: Yes, via updateAuctionHouse instruction
- **Recommendation**: Use a multisig wallet for production
- **Functions**: Can modify fees, notary settings, treasury destination

#### **TREASURY_PRIVATE_KEY**
- **Purpose**: Receives all marketplace fees
- **Changeable**: Yes, authority can update the treasury destination
- **Recommendation**: Use a secure, separate wallet from authority
- **Note**: This is where your marketplace revenue goes

#### **NOTARY_PRIVATE_KEY** (Optional)
- **Purpose**: Provides third-party validation for transactions
- **When to use**: For high-security marketplaces or compliance requirements
- **Recommendation**: Leave empty unless you specifically need notary functionality
- **Cost**: Adds complexity and requires additional signatures

## Fee Structure Guide

### Basis Points Explanation
- **100 basis points = 1%**
- **250 basis points = 2.5%** (recommended for most marketplaces)
- **500 basis points = 5%** (higher fee, suitable for premium services)

### Fee Types

#### **Marketplace Fee (seller_fee_basis_points)**
- **Range**: 0-10,000 (0%-100%)
- **Typical**: 250-500 (2.5%-5%)
- **Purpose**: Your main revenue source
- **Charged**: On every sale

#### **Referral Fees**
- **Buyer Referral**: Rewards people who bring buyers
- **Seller Referral**: Rewards people who bring sellers  
- **Constraint**: Total referrals ≤ marketplace fee
- **Typical**: 25-100 basis points each (0.25%-1%)

### Fee Examples

**Conservative Setup (2.5% total)**:
```
SELLER_FEE_BASIS_POINTS=250    # 2.5% marketplace fee
BUYER_REFERRAL_BP=50           # 0.5% to buyer referrers
SELLER_REFERRAL_BP=50          # 0.5% to seller referrers
# Net marketplace revenue: 1.5%
```

**Standard Setup (3% total)**:
```
SELLER_FEE_BASIS_POINTS=300    # 3% marketplace fee  
BUYER_REFERRAL_BP=75           # 0.75% to buyer referrers
SELLER_REFERRAL_BP=75          # 0.75% to seller referrers
# Net marketplace revenue: 1.5%
```

**Premium Setup (5% total)**:
```
SELLER_FEE_BASIS_POINTS=500    # 5% marketplace fee
BUYER_REFERRAL_BP=100          # 1% to buyer referrers  
SELLER_REFERRAL_BP=100         # 1% to seller referrers
# Net marketplace revenue: 3%
```

## Network Configuration

### Devnet (Testing)
```bash
SOLANA_NETWORK=devnet
# Free SOL available via: solana airdrop 2
# Test tokens available
# No real financial risk
```

### Mainnet-Beta (Production)
```bash
SOLANA_NETWORK=mainnet-beta
# Real SOL required
# Real tokens and user funds
# Production-ready
```

## Security Best Practices

### Wallet Security
1. **Use Hardware Wallets**: For authority and treasury in production
2. **Multisig Recommended**: For authority wallet especially
3. **Separate Concerns**: Different wallets for different purposes
4. **Backup Everything**: Store private keys securely

### Configuration Security
1. **Start Conservative**: Lower fees initially, increase based on demand
2. **Test on Devnet**: Always test thoroughly before mainnet
3. **Monitor Treasury**: Set up alerts for treasury balance changes
4. **Regular Audits**: Review configuration periodically

## Script Features

### Interactive CLI
- **Step-by-step guidance**: Explains each configuration option
- **Input validation**: Prevents invalid configurations
- **Preview mode**: Shows configuration before deployment
- **Error handling**: Clear error messages and troubleshooting

### Non-Interactive Mode
- **Automated deployment**: For CI/CD pipelines
- **Environment-driven**: Uses .env file for all configuration
- **Scriptable**: Can be integrated into larger deployment workflows

### Verification Tools
- **Account checking**: Verifies all related accounts exist
- **Configuration validation**: Ensures settings are correct
- **Network connectivity**: Tests connection to Solana network
- **Explorer integration**: Provides links to view accounts

## Troubleshooting

### Common Issues

#### "Insufficient SOL balance"
```bash
# Check your balance
solana balance

# On devnet, get free SOL
solana airdrop 2

# On mainnet, transfer SOL to your deployer wallet
```

#### "Invalid private key format"
- Ensure private keys are in base58 format
- Check for extra spaces or newlines in .env file
- Verify the private key corresponds to the intended wallet

#### "Program not found"
- Verify you're on the correct network (devnet vs mainnet)
- Check the program ID is correct
- Ensure the M2 program is deployed on your target network

#### "Transaction failed"
- Check network connectivity
- Verify sufficient SOL for transaction fees
- Try again - temporary network issues are common

### Getting Help

1. **Review error messages**: Scripts provide detailed error information
2. **Check logs**: Look at transaction signatures in explorer
3. **Verify configuration**: Use the verify script to check deployment
4. **Network status**: Check Solana network status for outages

## Advanced Usage

### Custom RPC Endpoints

For better performance, use a dedicated RPC provider:

```bash
# Helius
CUSTOM_RPC_URL=https://rpc.helius.xyz/?api-key=YOUR_KEY

# QuickNode  
CUSTOM_RPC_URL=https://your-endpoint.solana-mainnet.quiknode.pro/YOUR_KEY/

# Alchemy
CUSTOM_RPC_URL=https://solana-mainnet.g.alchemy.com/v2/YOUR_KEY
```

### Programmatic Usage

```typescript
import M2MarketplaceDeployer from './deploy';

const deployer = new M2MarketplaceDeployer();
await deployer.deploy();
```

### Integration with CI/CD

```yaml
# GitHub Actions example
- name: Deploy M2 Marketplace
  env:
    DEPLOYER_PRIVATE_KEY: ${{ secrets.DEPLOYER_PRIVATE_KEY }}
    CREATOR_PRIVATE_KEY: ${{ secrets.CREATOR_PRIVATE_KEY }}
    # ... other env vars
    NON_INTERACTIVE: true
  run: |
    cd scripts
    npm install
    npm run deploy
```

## File Structure

```
scripts/
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env.example          # Environment template
├── deploy.ts             # Main deployment script
├── verify.ts             # Verification script
├── helpers.ts            # Utility functions
├── README.md             # This file
└── deployments/          # Saved deployment info (created automatically)
    ├── deployment-devnet-1234567890.json
    └── deployment-mainnet-1234567890.json
```

## Next Steps After Deployment

1. **Save Important Information**:
   - Auction house address
   - Treasury address
   - Transaction signatures

2. **Frontend Integration**:
   ```typescript
   const AUCTION_HOUSE = new PublicKey("YOUR_AUCTION_HOUSE_ADDRESS");
   const PROGRAM_ID = new PublicKey("M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K");
   ```

3. **Testing**:
   - Create test NFT listings
   - Test buy/sell flows
   - Verify fee collection

4. **Monitoring**:
   - Set up treasury balance monitoring
   - Track marketplace activity
   - Monitor for unusual transactions

5. **Documentation**:
   - Document your marketplace configuration
   - Create user guides for your platform
   - Set up customer support processes