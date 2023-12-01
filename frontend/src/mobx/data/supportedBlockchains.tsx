export const blockchainIds = ["eth", "op", "arb", "matic", "avax"] as const;
export type BlockchainId = (typeof blockchainIds)[number];


export const getBlockchainInfo = (bcId: BlockchainId) => {
  return supportedBlockchains[bcId];
};

export interface BlockchainInfo {
  id: string;
  label: string;
  img?: { sm: string; md: string };
}

export const supportedBlockchains: { [key in BlockchainId]: BlockchainInfo } = {
  eth: { id: "eth", label: "Ethereum", img: { sm: "", md: "" } },
  op: { id: "op", label: "Optimism", img: { sm: "", md: "" } },
  arb: { id: "arb", label: "Arbitrum", img: { sm: "", md: "" } },
  matic: { id: "matic", label: "Polygon", img: { sm: "", md: "" } },
  avax: { id: "avax", label: "Avalanche", img: { sm: "", md: "" } },
};
