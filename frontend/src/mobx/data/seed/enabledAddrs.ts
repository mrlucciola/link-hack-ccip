// const sendAddrs = useCreateTxnStore((s) => s.enabledAddrs);
import { TestnetId } from "../supportedBlockchains";
import { TokenId } from "../tokens";

/** @deprecated delete seed data */
export const userAddrsToEnable: {
  addr: string;
  blockchainId: TestnetId;
  tokenId: TokenId;
  amt: number;
}[] = [
  { addr: "0xic939d0x98f02123", blockchainId:"maticMumbai", amt: 11111.1111, tokenId: "usdc" },

  { addr: "0x8us93i09dlwpi09d", blockchainId:"avaxFuji", amt: 20000, tokenId: "usdc" },
  { addr: "0x8us93i09dlwpi09d", blockchainId:"avaxFuji", amt: 1.1, tokenId: "link" },
  { addr: "0x8us93i09dlwpi09d", blockchainId:"avaxFuji", amt: 123.9998, tokenId: "aave" },

  { addr: "0xXyzzoj29d8f02098", blockchainId:"opGoerli", amt: 2993.9829, tokenId: "usdc" },
  { addr: "0xXyzzoj29d8f02098", blockchainId:"opGoerli", amt: 338.132, tokenId: "aave" },

  { addr: "0xabczoj29d8f02456", blockchainId:"ethSepolia", amt: 22.4884, tokenId: "usdc" },
  { addr: "0xabczoj29d8f02456", blockchainId:"ethSepolia", amt: 0.25123, tokenId: "aave" },
  { addr: "0xabczoj29d8f02456", blockchainId:"ethSepolia", amt: 0.0005, tokenId: "link" },
];
