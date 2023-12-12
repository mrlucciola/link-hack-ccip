import { TestnetId } from "./supportedBlockchains";

export class TokenData {
  constructor(
    public id: TokenId,
    public label: string,
    public fullName: string,
    public mktValue: number,
    public blockchains: TestnetId[],
    public address?: { [key in TestnetId]?: string },
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
  address,
  img,
}: Omit<TokenData, "variants">) => {
  return new TokenData(
    id,
    label,
    fullName,
    mktValue,
    Array.from(new Set(blockchains)), // remove dups
    address,
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
    address: {
      maticMumbai: "0x52D800ca262522580CeBAD275395ca6e7598C014",
      avaxFuji: "0xCaC7Ffa82c0f43EBB0FC11FCd32123EcA46626cf",
      opGoerli: "0x69529987FA4A075D0C00B0128fa848dc9ebbE9CE",
      ethSepolia: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
    },
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
  }),
  aave: newTokenData({
    id: "aave",
    label: "AAVE",
    fullName: "AAVE Token",
    mktValue: 99.9876,
    blockchains: ["ethSepolia", "avaxFuji"],
    address: {
      maticMumbai: "0x1558c6FadDe1bEaf0f6628BDd1DFf3461185eA24",
      ethSepolia: "0x88541670E55cC00bEEFD87eB59EDd1b7C511AC9a",
      opGoerli: "0x20288ac1Ef7711448DF03283E6B580710E73393a",
      avaxFuji: "0xfB4CeA030Fa61FC435E922CFDc4bF9C80456E19b",
    },
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/7278.png",
  }),
  link: newTokenData({
    id: "link",
    label: "LINK",
    fullName: "Chainlink Token",
    mktValue: 20.3918,
    blockchains: ["ethSepolia", "avaxFuji", "maticMumbai", "opGoerli"],
    address: {
      avaxFuji: "0x3A38c4d0444b5fFcc5323b2e86A21aBaaf5FbF26",
      ethSepolia: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
      opGoerli: "0xdc2CC710e42857672E7907CF474a69B63B93089f",
      maticMumbai: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    },
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
  }),
  // usdc: newTokenData({
  //   id: "usdc",
  //   label: "USDC",
  //   fullName: "USD Coin",
  //   mktValue: 0.9989,
  //   blockchains: ["arb", "avax", "eth", "matic", "op"],
  //   address:{""},
  // }),
  // aave: newTokenData({
  //   id: "aave",
  //   label: "AAVE",
  //   fullName: "AAVE Token",
  //   mktValue: 99.9876,
  //   blockchains: ["arb", "avax", "eth", "matic", "op"],
  //   address:{""},
  // }),
  // mkr: newTokenData({
  //   id: "mkr",
  //   label: "MKR",
  //   fullName: "MakerDAO Token",
  //   mktValue: 1200.3918,
  //   blockchains: ["avax", "eth", "matic"],
  //   address:{""},
  // }),
};

export const lookupTokenMktValue = (tokenId: TokenId): number =>
  tokensData[tokenId].mktValue;
export const getTokenInfo = (tokenId: TokenId): TokenData =>
  tokensData[tokenId];
