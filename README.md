Project init is a [Vite](https://vitejs.dev) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi).

## Case Study

This is a DApp that allows users to swap tokens either from ETH to tokens WETH or tokens WETH to ETH. This DApp is built using vite, wagmi, and Chakra-ui.

# Installation
To install and run this application locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/plvannemanja/vite-wagmi-weth.git
```

2. Navigate to the project directory:

```
cd vite-wagmi-weth
```

3. Install the dependencies:

```
npm install
```

4. Start the development server:

```
npm run dev
```
## Environment Variables

To run this project, you will need to add environment variables. rename the `.env.example` file for all the environment variables required to `.env` file.
VITE_WC_PROJECT_ID=
VITE_WC_TENDERLY_ADMIN_RPC_URL=
VITE_WC_TENDERLY_PUBLIC_RPC_URL=

## Project description
- Vite for lightweight
- State Management with React Context
- ChakraUI for seamless component
- web3modal for interactive wallect connect
- Error handling in web3 transaction