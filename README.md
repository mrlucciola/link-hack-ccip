# FLIP Wallet 
**User-friendly cross-chain wallet powered by CCIP**

<img src="https://github.com/mrlucciola/link-hack-ccip/assets/94624740/317f24a2-8f40-4cca-877d-b62612c5d49b" width="100" height="100" alt="dolphin_">

## About

Produced as part of Chainlink's Constellation 2023 hackathon.
Flip revolutionizes the web3 experience by streamlining transactions, ensuring a seamless interaction for users of various expertise levels using Chainlink's Cross-Chain Interoperability Protocol (CCIP).

## Features

- **Web3 Wallet Management**: Manage your cryptocurrencies and tokens directly from your browser.
- **Cross-Chain Transactions**: Seamlessly send and receive assets across different blockchains with the security and efficiency of Chainlink's CCIP.
- **Intuitive User Interface**: A user-friendly experience, designed for both blockchain beginners and experienced users.

## Usage

Follow these steps to set up and use the FLIP Wallet on your system:

1. **Clone the Repository**: First, clone the repository to your local machine using the following command:
   ```bash
   git clone https://github.com/mrlucciola/link-hack-ccip.git
   ```
2. **Navigate to the Directory**: Once cloning is complete, navigate to the created directory:
   ```bash
   cd link-hack-ccip
   ```
3. **Install Dependencies**: Install all the necessary dependencies for the project using Yarn:
   ```bash
   yarn
   ```
4. **Go to the Frontend Folder**: Change to the frontend directory:
   ```bash
   cd  /frontend
   ```
5. **Create an `.env.local` file**: Create a `.env.local` file in the frontend directory. Use the `.env.example` file as a template for setting up your environment variables.

6. **Start the Development Server**: Run the development server using Yarn:
   ```bash
   yarn dev
   ```
7. **Load the Extension in Chrome**: Open Chrome and navigate to the Extensions management page. You can usually find this by clicking the menu in the top right corner, then selecting `More tools > Extensions`.

8. **Load Unpacked Extension**: In the Extensions page, enable `Developer mode`, then click on `Load unpacked`. Navigate to the `/dist` folder located at `/link-hack-ccip/frontend/dist` and select it.

Congratulations! You have successfully set up and loaded FLIP Wallet. Welcome to FLIP!

   

## Disclaimer

FLIP Wallet is a work in progress. Do not use on a Mainnet network. The developers are not responsible for any losses incurred by using this software.
