// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function executeSignedTransaction(
        bytes memory signedTransaction
    ) external onlyOwner {
        // The signedTransaction parameter should contain the signed transaction data
        // Here, you can use a library like ECDSA to verify the signature and execute the transaction.
        // For simplicity, let's assume that the signed transaction is a valid Ethereum transaction.

        // Extracting the recipient address and transaction data from the signed transaction
        address recipient;
        bytes memory data;
        assembly {
            recipient := mload(add(signedTransaction, 32))
            data := add(signedTransaction, 64)
        }

        // Executing the transaction
        (bool success, ) = recipient.call{value: 0, gas: gasleft()}(data);
        require(success, "Transaction execution failed");
    }
}
