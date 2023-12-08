"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProviderRpcUrl = exports.getPrivateKey = void 0;
var env_enc_1 = require("@chainlink/env-enc");
var getProviderRpcUrl = function (network) {
    (0, env_enc_1.config)();
    var rpcUrl;
    switch (network) {
        case "ethereumMainnet":
            rpcUrl = process.env.ETHEREUM_MAINNET_RPC_URL;
            break;
        case "ethereumSepolia":
            rpcUrl = process.env.ETHEREUM_SEPOLIA_RPC_URL;
            break;
        case "optimismMainnet":
            rpcUrl = process.env.OPTIMISM_MAINNET_RPC_URL;
            break;
        case "optimismGoerli":
            rpcUrl = process.env.OPTIMISM_GOERLI_RPC_URL;
            break;
        case "arbitrumTestnet":
            rpcUrl = process.env.ARBITRUM_TESTNET_RPC_URL;
            break;
        case "avalancheMainnet":
            rpcUrl = process.env.AVALANCHE_MAINNET_RPC_URL;
            break;
        case "avalancheFuji":
            rpcUrl = process.env.AVALANCHE_FUJI_RPC_URL;
            break;
        case "polygonMainnet":
            rpcUrl = process.env.POLYGON_MAINNET_RPC_URL;
            break;
        case "polygonMumbai":
            rpcUrl = process.env.POLYGON_MUMBAI_RPC_URL;
            break;
        default:
            throw new Error("Unknown network: " + network);
    }
    if (!rpcUrl)
        throw new Error("rpcUrl empty for network ".concat(network, " - check your environment variables"));
    return rpcUrl;
};
exports.getProviderRpcUrl = getProviderRpcUrl;
var getPrivateKey = function () {
    (0, env_enc_1.config)();
    var privateKey = process.env.PRIVATE_KEY;
    if (!privateKey)
        throw new Error("private key not provided - check your environment variables");
    return privateKey;
};
exports.getPrivateKey = getPrivateKey;
