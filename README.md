# Blockchain Component

This is a simple React component that implements a basic blockchain. It allows you to add blocks to the chain and displays information about each block, including the nonce, data, block hash, and previous hash.

## How it Works

The component uses the js-sha256 library to generate hash values for each block. When you add a block, the component calculates the hash value for the new block by combining the data, the previous hash value, and a nonce value. It then increments the nonce value until the hash value starts with four zeros ("0000"), which is the mining difficulty level.

## Screenshots

![Screenshot (25)](https://user-images.githubusercontent.com/102033829/227724215-2c8e2f48-8d1a-4e78-ac2b-27afa566b456.png)

![Screenshot (26)](https://user-images.githubusercontent.com/102033829/227724264-7e9ae499-2289-4021-8634-96e3641de456.png)
