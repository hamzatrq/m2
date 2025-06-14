#!/bin/bash

# M2 Marketplace Deployment Setup Script
# This script helps set up the environment for deploying M2 marketplace

set -e

echo "🚀 M2 Marketplace Deployment Setup"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${BLUE}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 16+ first.${NC}"
    echo "Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo -e "${RED}❌ Node.js version $NODE_VERSION found. Please upgrade to Node.js 16+${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) found${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install npm.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm $(npm --version) found${NC}"

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Check if Solana CLI is installed
echo -e "${BLUE}Checking Solana CLI installation...${NC}"
if ! command -v solana &> /dev/null; then
    echo -e "${YELLOW}⚠️  Solana CLI not found.${NC}"
    echo "To install Solana CLI, run:"
    echo "sh -c \"\$(curl -sSfL https://release.solana.com/v1.16.25/install)\""
    echo ""
    echo "Then add to your PATH and restart terminal."
    echo "You can continue without Solana CLI, but you'll need it for key management."
else
    echo -e "${GREEN}✅ Solana CLI $(solana --version | head -n1) found${NC}"
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}Creating .env file from template...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env file with your configuration before deploying${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Create deployments directory
if [ ! -d deployments ]; then
    mkdir deployments
    echo -e "${GREEN}✅ Created deployments directory${NC}"
fi

# Check network connectivity
echo -e "${BLUE}Testing network connectivity...${NC}"
if curl -s --max-time 5 https://api.devnet.solana.com > /dev/null; then
    echo -e "${GREEN}✅ Devnet connectivity OK${NC}"
else
    echo -e "${YELLOW}⚠️  Could not connect to Solana devnet${NC}"
fi

if curl -s --max-time 5 https://api.mainnet-beta.solana.com > /dev/null; then
    echo -e "${GREEN}✅ Mainnet connectivity OK${NC}"
else
    echo -e "${YELLOW}⚠️  Could not connect to Solana mainnet${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Edit .env file with your private keys and configuration"
echo "2. Run: npm run deploy"
echo "3. Verify with: npm run verify"
echo ""
echo -e "${YELLOW}Important reminders:${NC}"
echo "• Keep your private keys secure and never commit them to version control"
echo "• Test on devnet first before deploying to mainnet"
echo "• Ensure you have sufficient SOL for deployment costs"
echo ""
echo -e "${BLUE}For help getting started:${NC}"
echo "• Read README.md in this directory"
echo "• Check .env.example for configuration details"
echo "• Use 'solana airdrop 2' to get devnet SOL for testing"