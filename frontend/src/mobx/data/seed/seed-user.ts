import { Contact } from "../../interfaces";
import { UserAddress, newAddress } from "../../interfaces/address";
import { newAddrToken } from "../../interfaces/token";

const seedAddrs: UserAddress[] = [
  newAddress("0xic939d0x98f02123", "maticMumbai", "", {
    usdc: newAddrToken("usdc", "maticMumbai", "0xic939d0x98f02123", 11111.1111),
  }),
  newAddress("0x8us93i09dlwpi09d", "avaxFuji", "Personal (Avalanche)", {
    usdc: newAddrToken("usdc", "avaxFuji", "0x8us93i09dlwpi09d", 20000),
    aave: newAddrToken("aave", "avaxFuji", "0x8us93i09dlwpi09d", 123.9998),
    link: newAddrToken("link", "avaxFuji", "0x8us93i09dlwpi09d", 1.1),
  }),
  newAddress("0xXyzzoj29d8f02098", "opGoerli", "Personal (Optimism)", {
    usdc: newAddrToken("usdc", "opGoerli", "0xXyzzoj29d8f02098", 2993.9829),
    aave: newAddrToken("aave", "opGoerli", "0xXyzzoj29d8f02098", 338.132),
  }),
  newAddress("0xabczoj29d8f02456", "ethSepolia", "NFT Drops", {
    usdc: newAddrToken("usdc", "ethSepolia", "0xabczoj29d8f02456", 22.4884),
    aave: newAddrToken("aave", "ethSepolia", "0xabczoj29d8f02456", 0.25123),
    link: newAddrToken("link", "ethSepolia", "0xabczoj29d8f02456", 0.0005),
  }),
];
export const seedAddressesMap: Map<string, UserAddress> = new Map<
  string,
  UserAddress
>(seedAddrs.map((a) => [a.value, a]));

const seedContacts: Contact[] = [
  {
    id: "jdoe",
    fullName: "John Doe",
    addresses: [
      newAddress("0xd0xk3nf8ww", "maticMumbai", "Primary address", {
        usdc: newAddrToken("usdc", "maticMumbai", "0xd0xk3nf8ww", 84.3),
        aave: newAddrToken("aave", "maticMumbai", "0xd0xk3nf8ww", 789.52194),
        link: newAddrToken("link", "maticMumbai", "0xd0xk3nf8ww", 30.42341),
      }),
    ],
  },
  {
    id: "franksinatra",
    fullName: "Frank Sinatra",
    addresses: [
      newAddress("0x9din3hduc8", "avaxFuji", "NFT address", {
        usdc: newAddrToken("usdc", "avaxFuji", "0x9din3hduc8", 492),
        aave: newAddrToken("aave", "avaxFuji", "0x9din3hduc8", 456),
      }),
      newAddress("0x0dj1i28fu4", "ethSepolia", "Dropbox", {
        link: newAddrToken("link", "ethSepolia", "0x0dj1i28fu4", 20.2),
      }),
    ],
  },
  {
    id: "cdeli",
    fullName: "Corner Deli",
    addresses: [
      newAddress("0x800acjwkj3", "avaxFuji", "Dropbox: vendors"),
      newAddress("0xoxj901b389", "avaxFuji", "Dropbox: customers (Arbitrum)", {
        usdc: newAddrToken("usdc", "avaxFuji", "0xoxj901b389", 29481.32),
      }),
      newAddress("0xoxj901b389", "opGoerli", "Dropbox: customers (Optimism)", {
        usdc: newAddrToken("usdc", "opGoerli", "0xoxj901b389", 59209.11),
      }),
      newAddress("0xzoj29d8f02", "maticMumbai", "Treasury", {
        link: newAddrToken("link", "maticMumbai", "0xzoj29d8f02", 6.251),
      }),
    ],
  },
  {
    id: "alice",
    fullName: "Alice",
    addresses: [newAddress("0xd8cj3nsovy", "maticMumbai", "Main")],
  },
  {
    id: "bobb",
    fullName: "Bob Burnquist",
    addresses: [newAddress("0xa0xl4n67x8", "avaxFuji", "Personal")],
  },
];
export const seedContactsMap: Map<string, Contact> = new Map<string, Contact>(
  seedContacts.map((c) => [c.id, c])
);
