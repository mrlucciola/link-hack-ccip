export interface BlockchainInfo<T extends BlockchainId | TestnetId> {
  id: T;
  label: string;
  img?: { sm: string; md: string };
  contracts?: {
    walletSrc: {
      address: string;
    };
    /** @deprecated unused */
    walletDst: {
      address: string;
    };
    /** @deprecated unused */
    ccipRouter: {
      address: string;
      chainSelector: string;
    };
  };
  /** @deprecated unused */
  feeTokens?: {
    [key: string]: { address: string; decimals: number };
  };
}

export const blockchainIds = ["eth", "op", "arb", "matic", "avax"] as const;
export const testnetIds = [
  "ethSepolia",
  "opGoerli",
  "maticMumbai",
  "avaxFuji",
] as const;
export type BlockchainId = (typeof blockchainIds)[number];
export type TestnetId = (typeof testnetIds)[number];

// @todo combine with `supported-testnets` var
export const supportedBlockchains: {
  [key in BlockchainId | TestnetId]: BlockchainInfo<BlockchainId | TestnetId>;
} = {
  eth: { id: "eth", label: "Ethereum", img: { sm: "", md: "" } },
  op: { id: "op", label: "Optimism", img: { sm: "", md: "" } },
  arb: { id: "arb", label: "Arbitrum", img: { sm: "", md: "" } },
  matic: { id: "matic", label: "Polygon", img: { sm: "", md: "" } },
  avax: { id: "avax", label: "Avalanche", img: { sm: "", md: "" } },
  ethSepolia: {
    id: "ethSepolia",
    label: "Sepolia (Ethereum)",
    img: { sm: "", md: "" },
    contracts: {
      walletSrc: { address: "<walletSrc not set>" },
      walletDst: { address: "<walletDst not set>" },
      ccipRouter: {
        address: "0xd0daae2231e9cb96b94c8512223533293c3693bf",
        chainSelector: "16015286601757825753",
      },
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
    // ccipBnM: {
    //   address: "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
    //   decimals: 18,
    // },
    // ccipLnM: {
    //   address: "0x466D489b6d36E7E3b824ef491C225F5830E81cC1",
    //   decimals: 18,
    // },
  },
  opGoerli: {
    id: "opGoerli",
    label: "Goerli (Optimism)",
    img: { sm: "", md: "" },
    contracts: {
      walletSrc: { address: "<walletSrc not set>" },
      walletDst: { address: "<walletDst not set>" },
      ccipRouter: {
        address: "0xeb52e9ae4a9fb37172978642d4c141ef53876f26",
        chainSelector: "2664363617261496610",
      },
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
    label: "Mumbai (Polygon)",
    img: { sm: "", md: "" },
    contracts: {
      walletSrc: { address: "<walletSrc not set>" },
      walletDst: { address: "<walletDst not set>" },
      ccipRouter: {
        address: "0x70499c328e1e2a3c41108bd3730f6670a44595d1",
        chainSelector: "12532609583862916517",
      },
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
    label: "Fuji (Avalanche)",
    img: { sm: "", md: "" },
    contracts: {
      walletSrc: { address: "<walletSrc not set>" },
      walletDst: { address: "<walletDst not set>" },
      ccipRouter: {
        address: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
        chainSelector: "14767482510784806043",
      },
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

export const getBlockchainInfo = (bcId: BlockchainId | TestnetId) => {
  return supportedBlockchains[bcId];
};

/** @deprecated replace with actual call */
export const fetchGasAmount = () => {
  // @todo replace with real fetch

  return 500000;
};
/** @deprecated replace with actual call */
export const fetchGasPrice = async (
  _blockchainId: BlockchainId | TestnetId
) => {
  // @todo replace with real fetch

  return 2000000000;
};
export const fetchTxnCost = async (blockchainId: BlockchainId | TestnetId) => {
  // @todo replace with real fetch
  const txnCostLookup: { [key in BlockchainId | TestnetId]: number } = {
    eth: 21.8249,
    op: 2.2843,
    arb: 2.7891,
    matic: 4.8986,
    avax: 1.9237,
    ethSepolia: 1,
    opGoerli: 1,
    maticMumbai: 1,
    avaxFuji: 1,
  };

  return txnCostLookup[blockchainId];
};
