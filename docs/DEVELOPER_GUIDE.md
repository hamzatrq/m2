# M2 Marketplace - Complete Developer Guide

## Table of Contents
1. [Introduction & Overview](#introduction--overview)
2. [Why M2 is Better Than Simple Auction Houses](#why-m2-is-better-than-simple-auction-houses)
3. [Architecture Deep Dive](#architecture-deep-dive)
4. [Core Concepts](#core-concepts)
5. [Program States & Data Structures](#program-states--data-structures)
6. [Trading Flows](#trading-flows)
7. [Token Standards Support](#token-standards-support)
8. [Security & Validation](#security--validation)
9. [Code Walkthrough](#code-walkthrough)
10. [Development Guide](#development-guide)

---

## Introduction & Overview

M2 is a sophisticated NFT marketplace smart contract built on Solana using the Anchor framework. Unlike simple auction houses that only handle basic buy/sell operations, M2 is designed as a comprehensive trading platform that supports multiple NFT standards, complex fee structures, referral systems, and advanced trading patterns.

**Key Facts:**
- Program ID: `M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K`
- Built with Anchor 0.29.0
- Supports Solana 1.16.25
- Written in Rust with comprehensive error handling
- Supports 3 different NFT standards

## Why M2 is Better Than Simple Auction Houses

### 1. **Multi-Standard NFT Support**
While simple auction houses typically only support standard SPL tokens, M2 supports:
- **Standard NFTs** (SPL Token standard)
- **Programmable NFTs (pNFTs)** using Metaplex MIP-1 standard
- **Open Creator Protocol (OCP) NFTs** for enhanced creator rights

### 2. **Advanced Trading Patterns**
Simple auction houses are usually limited to basic auctions. M2 supports:
- **Instant Buy/Sell** (like a traditional marketplace)
- **Bid/Offer System** (buyers can place bids, sellers can place asks)
- **Price Updates** (sellers can change prices without recreating listings)
- **Escrow Management** (funds are safely held until trade completion)

### 3. **Sophisticated Fee Structure**
- **Maker/Taker Fees** (different fees for buyers vs sellers)
- **Referral System** (rewards for bringing buyers/sellers)
- **Dynamic Fee Calculation** (fees can vary based on conditions)
- **Creator Royalties** (automatic payment to NFT creators)

### 4. **Enterprise Features**
- **Notary System** (optional third-party validation)
- **Expiration Handling** (automatic cleanup of expired trades)
- **State Migration** (ability to upgrade trade state structures)
- **Multi-Payment Token Support** (trade in USDC, SOL, and other tokens)

### 5. **Security & Validation**
- **Comprehensive Input Validation**
- **PDA (Program Derived Address) Security**
- **Account Ownership Verification**
- **Proper Escrow Management**
- **Protection Against Common Exploits**

---

## Architecture Deep Dive

### Program Structure
```
programs/m2/src/
├── lib.rs              # Entry point - all public instruction handlers
├── states.rs           # Account state definitions and PDA seeds
├── constants.rs        # Configuration values and valid payment tokens
├── errors.rs           # Custom error definitions
├── utils/              # Shared utility functions
│   ├── generic.rs      # General validation and helper functions
│   └── transfer.rs     # Token transfer logic
├── m2_ins/             # Standard NFT marketplace instructions
├── mip1_ins/           # Programmable NFT (MIP-1) instructions
└── ocp_ins/            # Open Creator Protocol NFT instructions
```

### Key Design Patterns

#### 1. **Instruction Separation by Token Standard**
The program separates instructions based on NFT type:
- `m2_ins/` handles standard NFTs
- `mip1_ins/` handles programmable NFTs with special transfer rules
- `ocp_ins/` handles OCP NFTs with creator protocol enforcement

#### 2. **State Versioning**
The program supports multiple versions of trade states:
- `BuyerTradeState` vs `BuyerTradeStateV2`
- `SellerTradeState` vs `SellerTradeStateV2`
- This allows for seamless upgrades without breaking existing trades

#### 3. **PDA (Program Derived Address) Security**
All critical accounts are PDAs derived from predictable seeds, preventing unauthorized access and ensuring account uniqueness.

---

## Core Concepts

### 1. **Auction House**
The central configuration account that defines:
- Fee structure (maker/taker fees, referral rates)
- Authority (who can modify settings)
- Treasury (where fees are collected)
- Notary requirements (optional third-party validation)

### 2. **Trade States**
- **Buyer Trade State**: Records a buyer's bid/offer for an NFT
- **Seller Trade State**: Records a seller's listing for an NFT
- Both contain price, expiration, referral info, and payment token

### 3. **Escrow Payment Account**
A PDA that holds buyer funds during the trading process. Funds are:
- Deposited when a buyer places a bid
- Held securely until trade completion or withdrawal
- Distributed to seller, fees, and royalties upon sale execution

### 4. **Program as Signer (PAS)**
A special PDA that acts as the program's authority for:
- Transferring NFTs from sellers to buyers
- Managing escrow funds
- Executing complex multi-step transactions atomically

---

## Program States & Data Structures

### AuctionHouse (Main Configuration)
```rust
pub struct AuctionHouse {
    pub auction_house_treasury: Pubkey,           // Where fees go
    pub treasury_withdrawal_destination: Pubkey,  // Who can withdraw fees
    pub authority: Pubkey,                        // Who can update settings
    pub creator: Pubkey,                          // Original creator
    pub notary: Pubkey,                          // Optional validator
    pub bump: u8,                                // PDA bump seed
    pub treasury_bump: u8,                       // Treasury PDA bump
    pub seller_fee_basis_points: u16,           // Platform fee (in BP)
    pub buyer_referral_bp: u16,                 // Buyer referral reward
    pub seller_referral_bp: u16,                // Seller referral reward
    pub requires_notary: bool,                  // Whether notary validation required
    pub nprob: u8,                              // Notary enforcement probability
}
```

### BuyerTradeStateV2 (Buyer's Bid/Offer)
```rust
pub struct BuyerTradeStateV2 {
    pub auction_house_key: Pubkey,              // Which auction house
    pub buyer: Pubkey,                          // Buyer's wallet
    pub buyer_referral: Pubkey,                 // Who referred this buyer
    pub buyer_price: u64,                       // How much buyer will pay
    pub token_mint: Pubkey,                     // Which NFT mint
    pub token_size: u64,                        // Amount (usually 1 for NFTs)
    pub bump: u8,                               // PDA bump seed
    pub expiry: i64,                            // When bid expires (Unix timestamp)
    pub buyer_creator_royalty_bp: u16,          // Royalty basis points buyer agrees to
    pub payment_mint: Pubkey,                   // Currency (SOL, USDC, etc.)
}
```

### SellerTradeStateV2 (Seller's Listing)
```rust
pub struct SellerTradeStateV2 {
    pub auction_house_key: Pubkey,              // Which auction house
    pub seller: Pubkey,                         // Seller's wallet
    pub seller_referral: Pubkey,                // Who referred this seller
    pub buyer_price: u64,                       // Asking price
    pub token_mint: Pubkey,                     // Which NFT mint
    pub token_account: Pubkey,                  // Seller's token account
    pub token_size: u64,                        // Amount being sold
    pub bump: u8,                               // PDA bump seed
    pub expiry: i64,                            // When listing expires
    pub payment_mint: Pubkey,                   // Accepted currency
}
```

---

## Trading Flows

### Flow 1: Buy Now (Instant Purchase)
```
1. Seller creates listing     → sell()
2. Buyer deposits funds       → deposit()
3. Buyer purchases instantly  → buy_v2()
4. Sale executes atomically   → execute_sale_v2()
```

### Flow 2: Bid/Offer System
```
1. Buyer places bid          → buy_v2() (creates buyer trade state)
2. Seller sees bid and accepts → sell() (creates seller trade state matching bid)
3. Sale executes             → execute_sale_v2()
```

### Flow 3: Price Update
```
1. Seller has existing listing → Previous sell() call
2. Seller changes price       → sell() (updates existing listing)
3. Buyer purchases at new price → Standard flow continues
```

### Flow 4: Withdrawal/Cancellation
```
- Buyer withdraws bid        → cancel_buy()
- Seller cancels listing     → cancel_sell()
- Buyer withdraws funds      → withdraw()
```

---

## Token Standards Support

### 1. Standard NFTs (m2_ins/)
**Instructions:** `sell`, `cancel_sell`, `buy`, `buy_v2`, `execute_sale_v2`

These are regular SPL tokens with:
- Standard transfer mechanics
- Simple ownership validation
- Basic metadata support

### 2. Programmable NFTs - MIP-1 (mip1_ins/)
**Instructions:** `mip1_sell`, `mip1_cancel_sell`, `mip1_execute_sale_v2`

These have enhanced features:
- **Transfer Rules**: Can have custom transfer restrictions
- **Token Records**: Additional metadata about delegation and state
- **Delegate Roles**: Different types of authorities (Sale, Transfer, etc.)
- **State Tracking**: Locked, Unlocked, Listed states

**Key Differences:**
- Must validate Token Record accounts
- Require proper delegate authority for transfers
- Have additional CPI calls to Token Metadata program

### 3. Open Creator Protocol NFTs (ocp_ins/)
**Instructions:** `ocp_sell`, `ocp_cancel_sell`, `ocp_execute_sale_v2`

Focus on creator rights:
- **Policy Enforcement**: Creators can set transfer policies
- **Royalty Guarantees**: Enforceable creator royalties
- **Marketplace Restrictions**: Creators can restrict which marketplaces can trade their NFTs

**Key Differences:**
- Must validate OCP Policy accounts
- Additional creator royalty calculations
- Policy-based transfer restrictions

---

## Security & Validation

### Input Validation
The program extensively validates all inputs:

```rust
// Price validation
if buyer_price > MAX_PRICE {
    return Err(ErrorCode::InvalidPrice.into());
}

// Payment mint validation  
if !VALID_PAYMENT_MINTS.contains(payment_mint.key) {
    return Err(ErrorCode::InvalidTokenMint.into());
}

// Expiry validation
if expiry > 0 && expiry <= Clock::get()?.unix_timestamp {
    return Err(ErrorCode::InvalidExpiry.into());
}
```

### Account Ownership Verification
```rust
// Ensures accounts are owned by expected programs
pub fn assert_owned_by(account: &AccountInfo, owner: &Pubkey) -> Result<()> {
    if account.owner != owner {
        Err(ErrorCode::IncorrectOwner.into())
    } else {
        Ok(())
    }
}
```

### PDA Validation
```rust
// Verifies PDA derivation is correct
pub fn assert_derivation(program_id: &Pubkey, account: &AccountInfo, path: &[&[u8]]) -> Result<u8> {
    let (key, bump) = Pubkey::find_program_address(path, program_id);
    if key != *account.key {
        return Err(ErrorCode::DerivedKeyInvalid.into());
    }
    Ok(bump)
}
```

### Token Account Security
```rust
// Validates Associated Token Accounts
pub fn assert_is_ata(
    ata: &AccountInfo,
    wallet: &Pubkey,
    mint: &Pubkey,
    optional_owner: &Pubkey,
) -> Result<spl_token::state::Account> {
    // Checks:
    // 1. Owned by SPL Token program
    // 2. Proper mint association
    // 3. Correct derivation from wallet + mint
    // 4. Account is initialized
}
```

---

## Code Walkthrough

### Entry Point (lib.rs:16-194)
The `declare_id!` macro defines the program's on-chain address. The `#[program]` module contains all public instruction handlers that external clients can call.

**Key Pattern:**
```rust
pub fn sell<'info>(
    ctx: Context<'_, '_, '_, 'info, Sell<'info>>,
    _seller_state_bump: u8,
    program_as_signer_bump: u8,
    buyer_price: u64,
    token_size: u64,
    seller_state_expiry: i64,
) -> Result<()> {
    m2_ins::sell::handle(ctx, program_as_signer_bump, buyer_price, token_size, seller_state_expiry)
}
```
Each public function just delegates to the actual implementation in the appropriate module.

### Constants Configuration (constants.rs:1-36)
```rust
pub const MAX_PRICE: u64 = 8000000 * 1000000000;  // 8 billion lamports max
pub const DEFAULT_MAKER_FEE_BP: i16 = 0;          // Makers pay no fee
pub const DEFAULT_TAKER_FEE_BP: u16 = 250;        // Takers pay 2.5%
```

**Valid Payment Tokens:** The program maintains a whitelist of accepted payment tokens. In production, this includes USDC, mSOL, Jito SOL, HXD, and Bonk.

### Error Handling (errors.rs:1-118)
Custom error codes provide specific feedback:
```rust
#[error_code]
pub enum ErrorCode {
    #[msg("PublicKeyMismatch")]
    PublicKeyMismatch,                    // Error 6000
    #[msg("Both parties need to agree to this sale")]
    BothPartiesNeedToAgreeToSale,         // Error 6055
    // ... 37 total error types
}
```

### Utility Functions Deep Dive

#### Fee Calculation (utils/generic.rs:214-297)
```rust
pub fn pay_auction_house_fees<'a>(
    auction_house: &anchor_lang::prelude::Account<'a, AuctionHouse>,
    // ... other params
    size: u64,  // Sale price
) -> Result<u64> {
    // Calculate referral fees
    let buyer_referral_fee = (buyer_referral_bp as u128 * size as u128) / 10000;
    let seller_referral_fee = (seller_referral_bp as u128 * size as u128) / 10000;
    
    // Platform fee = total fee - referral fees
    let treasury_fee = (treasury_bp as u128 * size as u128) / 10000 
        - buyer_referral_fee - seller_referral_fee;
    
    // Transfer fees using invoke_signed
    // ...
}
```

#### Token Transfer Logic (utils/transfer.rs:35-49)
The `transfer_token` function is the heart of NFT transfers:
```rust
pub(crate) fn transfer_token<'refs, 'a>(
    amount: &u64,
    payer: &'refs AccountInfo<'a>,
    source_authority: &'refs AccountInfo<'a>,
    close_account_rent_receiver: &'refs AccountInfo<'a>,
    optional_new_authority: Option<&'refs AccountInfo<'a>>,
    destination_owner: DestinationSpecifier<'refs, 'a>,  // Key or AccountInfo
    mint: &'refs AccountInfo<'a>,
    source_token_account: &'refs AccountInfo<'a>,
    destination_token_account: &'refs AccountInfo<'a>,
    token_program: &'refs AccountInfo<'a>,
    system_program: &'refs AccountInfo<'a>,
    optional_new_owner: Option<&Pubkey>,
    signer_seeds: &[&[&[u8]]],
) -> Result<spl_token::state::Account>
```

This function:
1. Creates destination token account if needed
2. Transfers the NFT using SPL Token program
3. Handles account closure and rent recovery
4. Sets new authority if specified

---

## Development Guide

### Prerequisites
- Rust toolchain
- Solana CLI tools
- Anchor framework 0.29.0
- Node.js (for testing)

### Building the Program
```bash
# Install dependencies and build
anchor build

# Update IDL and TypeScript types
anchor run update_idl
```

### Testing
```bash
# Run all tests
anchor test

# Run specific test files
cargo test --manifest-path=programs/m2/Cargo.toml
```

### Deployment
```bash
# Deploy to devnet
anchor deploy --provider.cluster devnet

# Deploy to mainnet (requires mainnet RPC)
anchor deploy --provider.cluster mainnet-beta
```

### Common Development Tasks

#### Adding New Payment Tokens
1. Update `VALID_PAYMENT_MINTS` in `constants.rs`
2. Rebuild and redeploy program
3. Update client-side validation

#### Modifying Fee Structure
1. Update default fee constants in `constants.rs`
2. Modify `pay_auction_house_fees` logic if needed
3. Test fee calculations thoroughly

#### Adding New NFT Standard Support
1. Create new instruction module (e.g., `new_standard_ins/`)
2. Implement required instructions following existing patterns
3. Add CPI calls to the new standard's programs
4. Update entry point in `lib.rs`

### PDA Derivation Patterns
The program uses consistent PDA patterns:

```rust
// Buyer Trade State
["m2", auction_house.key(), buyer.key(), token_mint.key(), payment_mint.key(), "buyer_trade_state", &buyer_price.to_le_bytes(), &token_size.to_le_bytes(), &buyer_state_expiry.to_le_bytes()]

// Seller Trade State  
["m2", auction_house.key(), seller.key(), token_mint.key(), payment_mint.key(), "seller_trade_state", &buyer_price.to_le_bytes(), &token_size.to_le_bytes(), &seller_state_expiry.to_le_bytes()]

// Escrow Payment Account
["m2", auction_house.key(), buyer.key(), payment_mint.key(), "escrow_payment_account"]

// Program as Signer
["m2", auction_house.key(), "signer"]
```

### Testing Strategy
1. **Unit Tests**: Test individual utility functions
2. **Integration Tests**: Test complete instruction flows
3. **Multi-Standard Tests**: Verify each NFT standard works correctly
4. **Error Case Tests**: Verify proper error handling
5. **Fee Calculation Tests**: Ensure math is correct

### Common Pitfalls to Avoid
1. **Account Ordering**: Anchor account structs must match instruction account order
2. **PDA Bump Verification**: Always verify PDA bumps for security
3. **Overflow Protection**: Use `checked_*` math operations
4. **Account Ownership**: Verify account ownership before operations
5. **Rent Exemption**: Ensure accounts have sufficient rent
6. **Token Account Delegation**: Check for unexpected delegates

---

## Conclusion

M2 represents a sophisticated approach to NFT marketplace infrastructure on Solana. Its multi-standard support, advanced fee structures, and comprehensive security measures make it suitable for enterprise-grade NFT trading platforms.

The modular architecture allows for easy extension to support new NFT standards, while the robust validation and error handling ensure safe operation even with complex trading scenarios.

For developers working on this codebase, understanding the PDA patterns, fee calculation logic, and multi-standard support is crucial for successful development and maintenance.