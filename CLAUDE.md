# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Build the program:
```sh
anchor build
```

Run tests:
```sh
anchor test
```

Update IDL and types after building:
```sh
anchor run update_idl
```

## Architecture

This is the M2 marketplace smart contract, a Solana program built with Anchor framework. The program facilitates NFT trading with support for multiple token standards.

### Program Structure

- **Entry points**: All public functions in `programs/m2/src/lib.rs` represent Anchor instruction handlers
- **Instruction modules**: 
  - `m2_ins/` - Standard NFT marketplace operations
  - `mip1_ins/` - Programmable NFT (pNFT) operations using Metaplex MIP-1
  - `ocp_ins/` - Open Creator Protocol NFT operations
- **Core components**:
  - `states.rs` - Account state definitions and PDA seeds
  - `constants.rs` - Program constants and prefixes
  - `utils/` - Shared utility functions for transfers and validations

### Trading Flow

The marketplace supports three main trading patterns:
1. **Buy Now**: `deposit` → `buy_v2` → `execute_sale_v2`
2. **Change Price**: `sell` (updates existing listing)
3. **Accept Offer**: `sell` → `execute_sale_v2`

### Token Standard Support

- Standard NFTs: Use `sell`, `cancel_sell`, `execute_sale_v2`
- Programmable NFTs (MIP-1): Use `mip1_sell`, `mip1_cancel_sell`, `mip1_execute_sale_v2`
- OCP NFTs: Use `ocp_sell`, `ocp_cancel_sell`, `ocp_execute_sale_v2`

### Key PDA Accounts

- **escrow_payment_account**: Holds buyer funds during transactions
- **buyer_trade_state**: Tracks buyer bids and offers
- **seller_trade_state**: Tracks seller listings
- **auction_house_treasury**: Collects marketplace fees

## Development Notes

- Program ID: `M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K`
- Built on Anchor 0.29.0 with Solana 1.16.25
- Clippy configured to allow up to 15 function arguments
- IDL and TypeScript types are generated in `src/idl/` and `src/types/`