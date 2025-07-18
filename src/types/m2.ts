export type M2 = {
  "version": "0.1.0",
  "name": "m2",
  "instructions": [
    {
      "name": "withdrawFromTreasury",
      "accounts": [
        {
          "name": "treasuryWithdrawalDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouseTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateAuctionHouse",
      "accounts": [
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "newAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryWithdrawalDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sellerFeeBasisPoints",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "buyerReferralBp",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "sellerReferralBp",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "requiresNotary",
          "type": {
            "option": "bool"
          }
        },
        {
          "name": "nprob",
          "type": {
            "option": "u8"
          }
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowPaymentBump",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowPaymentBump",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sellerStateBump",
          "type": "u8"
        },
        {
          "name": "programAsSignerBump",
          "type": "u8"
        },
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "sellerStateExpiry",
          "type": "i64"
        }
      ]
    },
    {
      "name": "cancelSell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "sellerStateExpiry",
          "type": "i64"
        }
      ]
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyerStateBump",
          "type": "u8"
        },
        {
          "name": "escrowPaymentBump",
          "type": "u8"
        },
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "buyerStateExpiry",
          "type": "i64"
        }
      ]
    },
    {
      "name": "buyV2",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "buyerStateExpiry",
          "type": "i64"
        },
        {
          "name": "buyerCreatorRoyaltyBp",
          "type": "u16"
        },
        {
          "name": "extraArgs",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "cancelBuy",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "buyerStateExpiry",
          "type": "i64"
        }
      ]
    },
    {
      "name": "ocpSell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpMintState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ocpPolicy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpFreezeAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cmtProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "OCPSellArgs"
          }
        }
      ]
    },
    {
      "name": "ocpCancelSell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ocpMintState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ocpPolicy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpFreezeAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cmtProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "ocpExecuteSaleV2",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouseTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerEscrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ocpMintState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ocpPolicy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpFreezeAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cmtProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "OCPExecuteSaleV2Args"
          }
        }
      ]
    },
    {
      "name": "executeSaleV2",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReceiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouseTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowPaymentBump",
          "type": "u8"
        },
        {
          "name": "programAsSignerBump",
          "type": "u8"
        },
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "buyerStateExpiry",
          "type": "i64"
        },
        {
          "name": "sellerStateExpiry",
          "type": "i64"
        },
        {
          "name": "makerFeeBp",
          "type": "i16"
        },
        {
          "name": "takerFeeBp",
          "type": "u16"
        }
      ]
    },
    {
      "name": "mip1Sell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "migrationSellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "escrow mode for init sell:        we transfer from token_account to token_ata",
            "escrow mode for change price:     token_account is the same as token_ata",
            "migration mode for change price:  token_ata is not used, because we only need token_account which is owned by program_as_signer"
          ]
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "edition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "MIP1SellArgs"
          }
        }
      ]
    },
    {
      "name": "mip1ExecuteSaleV2",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReceiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouseTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerEscrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "edition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "MIP1ExecuteSaleV2Args"
          }
        }
      ]
    },
    {
      "name": "mip1CancelSell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "should always be ATA of (mint, wallet)"
          ]
        },
        {
          "name": "tokenAccountTemp",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "should always be ATA of (mint, program_as_signer)"
          ]
        },
        {
          "name": "tempTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "edition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "buyerTradeState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "auctionHouseKey",
            "type": "publicKey"
          },
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "buyerReferral",
            "type": "publicKey"
          },
          {
            "name": "buyerPrice",
            "type": "u64"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenSize",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "expiry",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "sellerTradeState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "auctionHouseKey",
            "type": "publicKey"
          },
          {
            "name": "seller",
            "type": "publicKey"
          },
          {
            "name": "sellerReferral",
            "type": "publicKey"
          },
          {
            "name": "buyerPrice",
            "type": "u64"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          },
          {
            "name": "tokenSize",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "expiry",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "sellerTradeStateV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "auctionHouseKey",
            "type": "publicKey"
          },
          {
            "name": "seller",
            "type": "publicKey"
          },
          {
            "name": "sellerReferral",
            "type": "publicKey"
          },
          {
            "name": "buyerPrice",
            "type": "u64"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          },
          {
            "name": "tokenSize",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "expiry",
            "type": "i64"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "auctionHouse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "auctionHouseTreasury",
            "type": "publicKey"
          },
          {
            "name": "treasuryWithdrawalDestination",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "notary",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "treasuryBump",
            "type": "u8"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "buyerReferralBp",
            "type": "u16"
          },
          {
            "name": "sellerReferralBp",
            "type": "u16"
          },
          {
            "name": "requiresNotary",
            "type": "bool"
          },
          {
            "name": "nprob",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "buyerTradeStateV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "auctionHouseKey",
            "type": "publicKey"
          },
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "buyerReferral",
            "type": "publicKey"
          },
          {
            "name": "buyerPrice",
            "type": "u64"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenSize",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "expiry",
            "type": "i64"
          },
          {
            "name": "buyerCreatorRoyaltyBp",
            "type": "u16"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "MIP1ExecuteSaleV2Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "makerFeeBp",
            "type": "i16"
          },
          {
            "name": "takerFeeBp",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "MIP1SellArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "expiry",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "OCPExecuteSaleV2Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "makerFeeBp",
            "type": "i16"
          },
          {
            "name": "takerFeeBp",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "OCPSellArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "expiry",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PublicKeyMismatch",
      "msg": "PublicKeyMismatch"
    },
    {
      "code": 6001,
      "name": "InvalidMintAuthority",
      "msg": "InvalidMintAuthority"
    },
    {
      "code": 6002,
      "name": "UninitializedAccount",
      "msg": "UninitializedAccount"
    },
    {
      "code": 6003,
      "name": "IncorrectOwner",
      "msg": "IncorrectOwner"
    },
    {
      "code": 6004,
      "name": "PublicKeysShouldBeUnique",
      "msg": "PublicKeysShouldBeUnique"
    },
    {
      "code": 6005,
      "name": "StatementFalse",
      "msg": "StatementFalse"
    },
    {
      "code": 6006,
      "name": "NotRentExempt",
      "msg": "NotRentExempt"
    },
    {
      "code": 6007,
      "name": "NumericalOverflow",
      "msg": "NumericalOverflow"
    },
    {
      "code": 6008,
      "name": "ExpectedSolAccount",
      "msg": "Expected a sol account but got an spl token account instead"
    },
    {
      "code": 6009,
      "name": "CannotExchangeSOLForSol",
      "msg": "Cannot exchange sol for sol"
    },
    {
      "code": 6010,
      "name": "SOLWalletMustSign",
      "msg": "If paying with sol, sol wallet must be signer"
    },
    {
      "code": 6011,
      "name": "CannotTakeThisActionWithoutAuctionHouseSignOff",
      "msg": "Cannot take this action without auction house signing too"
    },
    {
      "code": 6012,
      "name": "NoPayerPresent",
      "msg": "No payer present on this txn"
    },
    {
      "code": 6013,
      "name": "DerivedKeyInvalid",
      "msg": "Derived key invalid"
    },
    {
      "code": 6014,
      "name": "MetadataDoesntExist",
      "msg": "Metadata doesn't exist"
    },
    {
      "code": 6015,
      "name": "InvalidTokenAmount",
      "msg": "Invalid token amount"
    },
    {
      "code": 6016,
      "name": "BothPartiesNeedToAgreeToSale",
      "msg": "Both parties need to agree to this sale"
    },
    {
      "code": 6017,
      "name": "CannotMatchFreeSalesWithoutAuctionHouseOrSellerSignoff",
      "msg": "Cannot match free sales unless the auction house or seller signs off"
    },
    {
      "code": 6018,
      "name": "SaleRequiresSigner",
      "msg": "This sale requires a signer"
    },
    {
      "code": 6019,
      "name": "OldSellerNotInitialized",
      "msg": "Old seller not initialized"
    },
    {
      "code": 6020,
      "name": "SellerATACannotHaveDelegate",
      "msg": "Seller ata cannot have a delegate set"
    },
    {
      "code": 6021,
      "name": "BuyerATACannotHaveDelegate",
      "msg": "Buyer ata cannot have a delegate set"
    },
    {
      "code": 6022,
      "name": "NoValidSignerPresent",
      "msg": "No valid signer present"
    },
    {
      "code": 6023,
      "name": "InvalidBasisPoints",
      "msg": "Invalid BP"
    },
    {
      "code": 6024,
      "name": "InvalidNotary",
      "msg": "Invalid notary"
    },
    {
      "code": 6025,
      "name": "EmptyTradeState",
      "msg": "Empty trade state"
    },
    {
      "code": 6026,
      "name": "InvalidExpiry",
      "msg": "Invalid expiry"
    },
    {
      "code": 6027,
      "name": "InvalidPrice",
      "msg": "Invalid price"
    },
    {
      "code": 6028,
      "name": "InvalidRemainingAccountsWithoutProgramAsSigner",
      "msg": "Invalid remainning accounts without program_as_signer"
    },
    {
      "code": 6029,
      "name": "InvalidBump",
      "msg": "Invalid bump"
    },
    {
      "code": 6030,
      "name": "InvalidCreateAuctionHouseNonce",
      "msg": "Invalid create auction house nonce"
    },
    {
      "code": 6031,
      "name": "InvalidAccountState",
      "msg": "Invalid account state"
    },
    {
      "code": 6032,
      "name": "InvalidDiscriminator",
      "msg": "Invalid discriminator"
    },
    {
      "code": 6033,
      "name": "InvalidPlatformFeeBp",
      "msg": "Invalid platform fee bp"
    },
    {
      "code": 6034,
      "name": "InvalidTokenMint",
      "msg": "Invalid token mint"
    },
    {
      "code": 6035,
      "name": "InvalidTokenStandard",
      "msg": "Invalid token standard"
    },
    {
      "code": 6036,
      "name": "Deprecated",
      "msg": "Deprecated"
    },
    {
      "code": 6037,
      "name": "MissingRemainingAccount",
      "msg": "Missing remaining account"
    }
  ]
};

export const IDL: M2 = {
  "version": "0.1.0",
  "name": "m2",
  "instructions": [
    {
      "name": "withdrawFromTreasury",
      "accounts": [
        {
          "name": "treasuryWithdrawalDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouseTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateAuctionHouse",
      "accounts": [
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "newAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryWithdrawalDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sellerFeeBasisPoints",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "buyerReferralBp",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "sellerReferralBp",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "requiresNotary",
          "type": {
            "option": "bool"
          }
        },
        {
          "name": "nprob",
          "type": {
            "option": "u8"
          }
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowPaymentBump",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowPaymentBump",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sellerStateBump",
          "type": "u8"
        },
        {
          "name": "programAsSignerBump",
          "type": "u8"
        },
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "sellerStateExpiry",
          "type": "i64"
        }
      ]
    },
    {
      "name": "cancelSell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "sellerStateExpiry",
          "type": "i64"
        }
      ]
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyerStateBump",
          "type": "u8"
        },
        {
          "name": "escrowPaymentBump",
          "type": "u8"
        },
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "buyerStateExpiry",
          "type": "i64"
        }
      ]
    },
    {
      "name": "buyV2",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "buyerStateExpiry",
          "type": "i64"
        },
        {
          "name": "buyerCreatorRoyaltyBp",
          "type": "u16"
        },
        {
          "name": "extraArgs",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "cancelBuy",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "buyerStateExpiry",
          "type": "i64"
        }
      ]
    },
    {
      "name": "ocpSell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpMintState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ocpPolicy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpFreezeAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cmtProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "OCPSellArgs"
          }
        }
      ]
    },
    {
      "name": "ocpCancelSell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ocpMintState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ocpPolicy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpFreezeAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cmtProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "ocpExecuteSaleV2",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouseTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerEscrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ocpMintState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ocpPolicy",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpFreezeAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ocpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cmtProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "OCPExecuteSaleV2Args"
          }
        }
      ]
    },
    {
      "name": "executeSaleV2",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReceiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouseTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "escrowPaymentBump",
          "type": "u8"
        },
        {
          "name": "programAsSignerBump",
          "type": "u8"
        },
        {
          "name": "buyerPrice",
          "type": "u64"
        },
        {
          "name": "tokenSize",
          "type": "u64"
        },
        {
          "name": "buyerStateExpiry",
          "type": "i64"
        },
        {
          "name": "sellerStateExpiry",
          "type": "i64"
        },
        {
          "name": "makerFeeBp",
          "type": "i16"
        },
        {
          "name": "takerFeeBp",
          "type": "u16"
        }
      ]
    },
    {
      "name": "mip1Sell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "migrationSellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "escrow mode for init sell:        we transfer from token_account to token_ata",
            "escrow mode for change price:     token_account is the same as token_ata",
            "migration mode for change price:  token_ata is not used, because we only need token_account which is owned by program_as_signer"
          ]
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "edition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "MIP1SellArgs"
          }
        }
      ]
    },
    {
      "name": "mip1ExecuteSaleV2",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReceiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "auctionHouseTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerEscrowPaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerReferral",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "edition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "MIP1ExecuteSaleV2Args"
          }
        }
      ]
    },
    {
      "name": "mip1CancelSell",
      "accounts": [
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "notary",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "programAsSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auctionHouse",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "should always be ATA of (mint, wallet)"
          ]
        },
        {
          "name": "tokenAccountTemp",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "should always be ATA of (mint, program_as_signer)"
          ]
        },
        {
          "name": "tempTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "edition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorizationRules",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "buyerTradeState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "auctionHouseKey",
            "type": "publicKey"
          },
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "buyerReferral",
            "type": "publicKey"
          },
          {
            "name": "buyerPrice",
            "type": "u64"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenSize",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "expiry",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "sellerTradeState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "auctionHouseKey",
            "type": "publicKey"
          },
          {
            "name": "seller",
            "type": "publicKey"
          },
          {
            "name": "sellerReferral",
            "type": "publicKey"
          },
          {
            "name": "buyerPrice",
            "type": "u64"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          },
          {
            "name": "tokenSize",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "expiry",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "sellerTradeStateV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "auctionHouseKey",
            "type": "publicKey"
          },
          {
            "name": "seller",
            "type": "publicKey"
          },
          {
            "name": "sellerReferral",
            "type": "publicKey"
          },
          {
            "name": "buyerPrice",
            "type": "u64"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          },
          {
            "name": "tokenSize",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "expiry",
            "type": "i64"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "auctionHouse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "auctionHouseTreasury",
            "type": "publicKey"
          },
          {
            "name": "treasuryWithdrawalDestination",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "notary",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "treasuryBump",
            "type": "u8"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "buyerReferralBp",
            "type": "u16"
          },
          {
            "name": "sellerReferralBp",
            "type": "u16"
          },
          {
            "name": "requiresNotary",
            "type": "bool"
          },
          {
            "name": "nprob",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "buyerTradeStateV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "auctionHouseKey",
            "type": "publicKey"
          },
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "buyerReferral",
            "type": "publicKey"
          },
          {
            "name": "buyerPrice",
            "type": "u64"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenSize",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "expiry",
            "type": "i64"
          },
          {
            "name": "buyerCreatorRoyaltyBp",
            "type": "u16"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "MIP1ExecuteSaleV2Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "makerFeeBp",
            "type": "i16"
          },
          {
            "name": "takerFeeBp",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "MIP1SellArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "expiry",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "OCPExecuteSaleV2Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "makerFeeBp",
            "type": "i16"
          },
          {
            "name": "takerFeeBp",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "OCPSellArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "expiry",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PublicKeyMismatch",
      "msg": "PublicKeyMismatch"
    },
    {
      "code": 6001,
      "name": "InvalidMintAuthority",
      "msg": "InvalidMintAuthority"
    },
    {
      "code": 6002,
      "name": "UninitializedAccount",
      "msg": "UninitializedAccount"
    },
    {
      "code": 6003,
      "name": "IncorrectOwner",
      "msg": "IncorrectOwner"
    },
    {
      "code": 6004,
      "name": "PublicKeysShouldBeUnique",
      "msg": "PublicKeysShouldBeUnique"
    },
    {
      "code": 6005,
      "name": "StatementFalse",
      "msg": "StatementFalse"
    },
    {
      "code": 6006,
      "name": "NotRentExempt",
      "msg": "NotRentExempt"
    },
    {
      "code": 6007,
      "name": "NumericalOverflow",
      "msg": "NumericalOverflow"
    },
    {
      "code": 6008,
      "name": "ExpectedSolAccount",
      "msg": "Expected a sol account but got an spl token account instead"
    },
    {
      "code": 6009,
      "name": "CannotExchangeSOLForSol",
      "msg": "Cannot exchange sol for sol"
    },
    {
      "code": 6010,
      "name": "SOLWalletMustSign",
      "msg": "If paying with sol, sol wallet must be signer"
    },
    {
      "code": 6011,
      "name": "CannotTakeThisActionWithoutAuctionHouseSignOff",
      "msg": "Cannot take this action without auction house signing too"
    },
    {
      "code": 6012,
      "name": "NoPayerPresent",
      "msg": "No payer present on this txn"
    },
    {
      "code": 6013,
      "name": "DerivedKeyInvalid",
      "msg": "Derived key invalid"
    },
    {
      "code": 6014,
      "name": "MetadataDoesntExist",
      "msg": "Metadata doesn't exist"
    },
    {
      "code": 6015,
      "name": "InvalidTokenAmount",
      "msg": "Invalid token amount"
    },
    {
      "code": 6016,
      "name": "BothPartiesNeedToAgreeToSale",
      "msg": "Both parties need to agree to this sale"
    },
    {
      "code": 6017,
      "name": "CannotMatchFreeSalesWithoutAuctionHouseOrSellerSignoff",
      "msg": "Cannot match free sales unless the auction house or seller signs off"
    },
    {
      "code": 6018,
      "name": "SaleRequiresSigner",
      "msg": "This sale requires a signer"
    },
    {
      "code": 6019,
      "name": "OldSellerNotInitialized",
      "msg": "Old seller not initialized"
    },
    {
      "code": 6020,
      "name": "SellerATACannotHaveDelegate",
      "msg": "Seller ata cannot have a delegate set"
    },
    {
      "code": 6021,
      "name": "BuyerATACannotHaveDelegate",
      "msg": "Buyer ata cannot have a delegate set"
    },
    {
      "code": 6022,
      "name": "NoValidSignerPresent",
      "msg": "No valid signer present"
    },
    {
      "code": 6023,
      "name": "InvalidBasisPoints",
      "msg": "Invalid BP"
    },
    {
      "code": 6024,
      "name": "InvalidNotary",
      "msg": "Invalid notary"
    },
    {
      "code": 6025,
      "name": "EmptyTradeState",
      "msg": "Empty trade state"
    },
    {
      "code": 6026,
      "name": "InvalidExpiry",
      "msg": "Invalid expiry"
    },
    {
      "code": 6027,
      "name": "InvalidPrice",
      "msg": "Invalid price"
    },
    {
      "code": 6028,
      "name": "InvalidRemainingAccountsWithoutProgramAsSigner",
      "msg": "Invalid remainning accounts without program_as_signer"
    },
    {
      "code": 6029,
      "name": "InvalidBump",
      "msg": "Invalid bump"
    },
    {
      "code": 6030,
      "name": "InvalidCreateAuctionHouseNonce",
      "msg": "Invalid create auction house nonce"
    },
    {
      "code": 6031,
      "name": "InvalidAccountState",
      "msg": "Invalid account state"
    },
    {
      "code": 6032,
      "name": "InvalidDiscriminator",
      "msg": "Invalid discriminator"
    },
    {
      "code": 6033,
      "name": "InvalidPlatformFeeBp",
      "msg": "Invalid platform fee bp"
    },
    {
      "code": 6034,
      "name": "InvalidTokenMint",
      "msg": "Invalid token mint"
    },
    {
      "code": 6035,
      "name": "InvalidTokenStandard",
      "msg": "Invalid token standard"
    },
    {
      "code": 6036,
      "name": "Deprecated",
      "msg": "Deprecated"
    },
    {
      "code": 6037,
      "name": "MissingRemainingAccount",
      "msg": "Missing remaining account"
    }
  ]
};
