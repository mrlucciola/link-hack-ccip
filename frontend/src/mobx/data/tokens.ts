import { TestnetId } from "./supportedBlockchains";

export class TokenData {
  constructor(
    public id: TokenId,
    public label: string,
    public fullName: string,
    public mktValue: number,
    public blockchains: TestnetId[],
    public img?: string
  ) {}
  get variants(): string[] {
    return this.blockchains.map((bc) => `${bc}-${this.id}`);
  }
}
export const newTokenData = ({
  id,
  label,
  fullName,
  mktValue,
  blockchains,
  img,
}: Omit<TokenData, "variants">) => {
  return new TokenData(
    id,
    label,
    fullName,
    mktValue,
    Array.from(new Set(blockchains)), // remove dups
    img
  );
};

export const tokenIds = ["usdc", "aave", "link"] as const;
export type TokenId = (typeof tokenIds)[number];

export const tokensData: { [key in TokenId]: TokenData } = {
  usdc: newTokenData({
    id: "usdc",
    label: "USDC",
    fullName: "USD Coin",
    mktValue: 0.9989,
    blockchains: ["ethSepolia", "avaxFuji", "maticMumbai", "opGoerli"],
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
  }),
  aave: newTokenData({
    id: "aave",
    label: "AAVE",
    fullName: "AAVE Token",
    mktValue: 99.9876,
    blockchains: ["ethSepolia", "avaxFuji", "maticMumbai"],
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/7278.png",
  }),
  link: newTokenData({
    id: "link",
    label: "LINK",
    fullName: "Chainlink Token",
    mktValue: 20.3918,
    blockchains: ["ethSepolia", "avaxFuji", "maticMumbai", "opGoerli"],
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
  }),
  // usdc: newTokenData({
  //   id: "usdc",
  //   label: "USDC",
  //   fullName: "USD Coin",
  //   mktValue: 0.9989,
  //   blockchains: ["arb", "avax", "eth", "matic", "op"],
  // }),
  // aave: newTokenData({
  //   id: "aave",
  //   label: "AAVE",
  //   fullName: "AAVE Token",
  //   mktValue: 99.9876,
  //   blockchains: ["arb", "avax", "eth", "matic", "op"],
  // }),
  // mkr: newTokenData({
  //   id: "mkr",
  //   label: "MKR",
  //   fullName: "MakerDAO Token",
  //   mktValue: 1200.3918,
  //   blockchains: ["avax", "eth", "matic"],
  // }),
};

export const lookupTokenMktValue = (tokenId: TokenId): number =>
  tokensData[tokenId].mktValue;
export const getTokenInfo = (tokenId: TokenId): TokenData =>
  tokensData[tokenId];
