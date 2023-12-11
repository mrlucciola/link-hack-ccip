export interface BlockchainInfo<T extends TestnetId> {
  id: T;
  label: string;
  symbol: string;
  img?: { sm: string; md: string };
  contracts?: {
    walletSrc: {
      address: string;
    };
    /** @deprecated unused */
    walletDst: {
      address: string;
    };
  };
  /** @deprecated unused */
  feeTokens?: {
    [key: string]: { address: string; decimals: number };
  };
}

/** transitioning to purely testnet for MVP, then re-integrating. */
// export const blockchainIds = ["eth", "op", "arb", "matic", "avax"] as const;
// export type BlockchainId = (typeof blockchainIds)[number];
export const testnetIds = [
  "ethSepolia",
  "opGoerli",
  "maticMumbai",
  "avaxFuji",
] as const;
export type TestnetId = (typeof testnetIds)[number];

export const supportedBlockchains: {
  [key in TestnetId]: BlockchainInfo<TestnetId>;
} = {
  ethSepolia: {
    id: "ethSepolia",
    label: "Ethereum (Sepolia)",
    symbol: "eth",
    img: { sm: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png", md: "" },
    contracts: {
      walletSrc: { address: "<walletSrc not set>" },
      walletDst: { address: "<walletDst not set>" },
    },
    feeTokens: {
      link: {
        address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
        decimals: 18,
      },
      weth: {
        address: "0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534",
        decimals: 18,
      },
    },
  },
  opGoerli: {
    id: "opGoerli",
    label: "Optimism (Goerli)",
    symbol: "op",
    img: { sm: "https://external-content.duckduckgo.com/ip3/www.optimism.io.ico", md: "" },
    contracts: {
      walletSrc: { address: "<walletSrc not set>" },
      walletDst: { address: "<walletDst not set>" },
    },
    feeTokens: {
      link: {
        address: "0xdc2CC710e42857672E7907CF474a69B63B93089f",
        decimals: 18,
      },
      weth: {
        address: "0x4200000000000000000000000000000000000006",
        decimals: 18,
      },
    },
  },
  maticMumbai: {
    id: "maticMumbai",
    label: "Polygon (Mumbai)",
    symbol: "matic",
    img: { sm: "https://external-content.duckduckgo.com/ip3/polygon.technology.ico", md: "" },
    contracts: {
      walletSrc: { address: "<walletSrc not set>" },
      walletDst: { address: "<walletDst not set>" },
    },
    feeTokens: {
      link: {
        address: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        decimals: 18,
      },
      wmatic: {
        address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
        decimals: 18,
      },
    },
  },
  avaxFuji: {
    id: "avaxFuji",
    label: "Avalanche (Fuji)",
    symbol: "avax",
    img: { sm: "https://external-content.duckduckgo.com/ip3/www.avax.network.ico", md: "" },
    contracts: {
      walletSrc: { address: "<walletSrc not set>" },
      walletDst: { address: "<walletDst not set>" },
    },
    feeTokens: {
      link: {
        address: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
        decimals: 18,
      },
      wavax: {
        address: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
        decimals: 18,
      },
    },
  },
};

export const getBlockchainInfo = (bcId: TestnetId) => {
  return supportedBlockchains[bcId];
};

/** @deprecated replace with actual call */
export const fetchGasAmount = () => {
  // @todo replace with real fetch

  return 500000;
};
/** @deprecated replace with actual call */
export const fetchGasPrice = async (_blockchainId: TestnetId) => {
  // @todo replace with real fetch

  return 2000000000;
};
export const fetchTxnCost = async (blockchainId: TestnetId) => {
  // @todo replace with real fetch
  const txnCostLookup: { [key in TestnetId]: number } = {
    ethSepolia: 1.04,
    opGoerli: 0.005,
    maticMumbai: 0.01,
    avaxFuji: 0.003,
  };

  return txnCostLookup[blockchainId];
};
