// const sendAddrs = useCreateTxnStore((s) => s.enabledAddrs);
import { TokenId } from "../tokens";

export const userAddrsToEnable: {
  addr: string;
  tokenId: TokenId;
  amt: number;
}[] = [
  { addr: "0xic939d0x98f02123", amt: 11111.1111, tokenId: "usdc" },

  { addr: "0x8us93i09dlwpi09d", amt: 20000, tokenId: "usdc" },
  { addr: "0x8us93i09dlwpi09d", amt: 1.1, tokenId: "link" },
  { addr: "0x8us93i09dlwpi09d", amt: 123.9998, tokenId: "aave" },

  { addr: "0xXyzzoj29d8f02098", amt: 2993.9829, tokenId: "usdc" },
  { addr: "0xXyzzoj29d8f02098", amt: 338.132, tokenId: "aave" },

  { addr: "0xabczoj29d8f02456", amt: 22.4884, tokenId: "usdc" },
  { addr: "0xabczoj29d8f02456", amt: 0.25123, tokenId: "aave" },
  { addr: "0xabczoj29d8f02456", amt: 0.0005, tokenId: "link" },
];
