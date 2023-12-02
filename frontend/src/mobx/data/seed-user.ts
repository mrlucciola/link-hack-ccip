import { Contact, newAddress, Address } from "../interfaces";

const seedAddrs: Address[] = [
  newAddress("0xic939d0x98f02123", "matic", ""),
  newAddress("0xabczoj29d8f02456", "eth", "Treasury"),
  newAddress("0xXyzzoj29d8f02098", "op", "Personal"),
];
export const seedAddressesMap: Map<string, Address> = new Map<string, Address>(
  seedAddrs.map((a) => [a.value, a])
);

const seedContacts: Contact[] = [
  {
    id: "jdoe",
    fullName: "John Doe",
    addresses: [newAddress("0xd0xk3nf8ww", "op", "Primary address")],
  },
  {
    id: "franksinatra",
    fullName: "Frank Sinatra",
    addresses: [
      newAddress("0x9din3hduc8", "eth", "NFT address"),
      newAddress("0x0dj1i28fu4", "eth", "Dropbox"),
    ],
  },
  {
    id: "cdeli",
    fullName: "Corner Deli",
    addresses: [
      newAddress("0x800acjwkj3", "arb", "Dropbox: vendors"),
      newAddress("0xoxj901b389", "eth", "Dropbox: customers"),
      newAddress("0xzoj29d8f02", "matic", "Treasury"),
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
