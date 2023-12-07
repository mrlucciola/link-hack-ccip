import { Contact } from "../../interfaces";
import { UserAddress, newAddress } from "../../interfaces/address";
import { newAddrToken } from "../../interfaces/token";

const seedAddrs: UserAddress[] = [
  newAddress("0xic939d0x98f02123", "matic", "", {
    usdc: newAddrToken("usdc", "matic", "0xic939d0x98f02123", 11111.1111),
  }),
  newAddress("0x8us93i09dlwpi09d", "avax", "Personal (Avalanche)", {
    usdc: newAddrToken("usdc", "avax", "0x8us93i09dlwpi09d", 20000),
    aave: newAddrToken("aave", "avax", "0x8us93i09dlwpi09d", 123.9998),
    mkr: newAddrToken("mkr", "avax", "0x8us93i09dlwpi09d", 1.1),
  }),
  newAddress("0xXyzzoj29d8f02098", "op", "Personal (Optimism)", {
    usdc: newAddrToken("usdc", "op", "0xXyzzoj29d8f02098", 2993.9829),
    aave: newAddrToken("aave", "op", "0xXyzzoj29d8f02098", 338.132),
  }),
  newAddress("0xabczoj29d8f02456", "eth", "NFT Drops", {
    usdc: newAddrToken("usdc", "eth", "0xabczoj29d8f02456", 22.4884),
    aave: newAddrToken("aave", "eth", "0xabczoj29d8f02456", 0.25123),
    mkr: newAddrToken("mkr", "eth", "0xabczoj29d8f02456", 0.0005),
  }),
];
export const seedAddressesMap: Map<string, UserAddress> = new Map<string, UserAddress>(
  seedAddrs.map((a) => [a.value, a])
);

const seedContacts: Contact[] = [
  {
    id: "jdoe",
    fullName: "John Doe",
    addresses: [
      newAddress("0xd0xk3nf8ww", "matic", "Primary address", {
        usdc: newAddrToken("usdc", "matic", "0xd0xk3nf8ww", 84.3),
        aave: newAddrToken("aave", "matic", "0xd0xk3nf8ww", 789.52194),
        mkr: newAddrToken("mkr", "matic", "0xd0xk3nf8ww", 30.42341),
      }),
    ],
  },
  {
    id: "franksinatra",
    fullName: "Frank Sinatra",
    addresses: [
      newAddress("0x9din3hduc8", "avax", "NFT address", {
        usdc: newAddrToken("usdc", "avax", "0x9din3hduc8", 492),
        aave: newAddrToken("aave", "avax", "0x9din3hduc8", 456),
      }),
      newAddress("0x0dj1i28fu4", "eth", "Dropbox", {
        mkr: newAddrToken("mkr", "avax", "0x9din3hduc8", 20.2),
      }),
    ],
  },
  {
    id: "cdeli",
    fullName: "Corner Deli",
    addresses: [
      newAddress("0x800acjwkj3", "arb", "Dropbox: vendors"),
      newAddress("0xoxj901b389", "arb", "Dropbox: customers (Arbitrum)", {
        usdc: newAddrToken("usdc", "arb", "0xoxj901b389", 29481.32),
      }),
      newAddress("0xoxj901b389", "op", "Dropbox: customers (Optimism)", {
        usdc: newAddrToken("usdc", "op", "0xoxj901b389", 59209.11),
      }),
      newAddress("0xzoj29d8f02", "matic", "Treasury", {
        mkr: newAddrToken("mkr", "matic", "0xzoj29d8f02", 6.251),
      }),
    ],
  },
  {
    id: "alice",
    fullName: "Alice",
    addresses: [newAddress("0xd8cj3nsovy", "matic", "Main")],
  },
  {
    id: "bobb",
    fullName: "Bob Burnquist",
    addresses: [newAddress("0xa0xl4n67x8", "avax", "Personal")],
  },
];
export const seedContactsMap: Map<string, Contact> = new Map<string, Contact>(
  seedContacts.map((c) => [c.id, c])
);
