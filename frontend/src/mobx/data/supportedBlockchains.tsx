export interface BlockchainInfo {
  id: BlockchainId;
  label: string;
  img?: { sm: string; md: string };
}

export const blockchainIds = ["eth", "op", "arb", "matic", "avax"] as const;
export type BlockchainId = (typeof blockchainIds)[number];

export const supportedBlockchains: { [key in BlockchainId]: BlockchainInfo } = {
  eth: { id: "eth", label: "Ethereum", img: { sm: "", md: "" } },
  op: { id: "op", label: "Optimism", img: { sm: "", md: "" } },
  arb: { id: "arb", label: "Arbitrum", img: { sm: "", md: "" } },
  matic: { id: "matic", label: "Polygon", img: { sm: "", md: "" } },
  avax: { id: "avax", label: "Avalanche", img: { sm: "", md: "" } },
};

export const getBlockchainInfo = (bcId: BlockchainId) => {
  return supportedBlockchains[bcId];
};

export const fetchTxnCost = (blockchainId: BlockchainId) => {
  // @todo replace with real fetch
  const txnCostLookup: { [key in BlockchainId]: number } = {
    eth: 21.8249,
    op: 2.2843,
    arb: 2.7891,
    matic: 4.8986,
    avax: 1.9237,
  };

  return txnCostLookup[blockchainId];
};
