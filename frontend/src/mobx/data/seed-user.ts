import { Contact, newAddress } from "../interfaces";

export const contactInit: [string, Contact][] = [
  [
    "user1",
    {
      id: "user1",
      fullName: "john doe",
      addresses: [newAddress("0xd0xk3nf8ww", "op", "johns friend arthur")],
    },
  ],
  [
    "user2",
    {
      id: "user2",
      fullName: "frank sinatra",
      addresses: [
        newAddress("0x9din3hduc8", "eth", "cristina"),
        newAddress("0x0dj1i28fu4", "eth", ""),
      ],
    },
  ],
  [
    "user3",
    {
      id: "user3",
      fullName: "silvia",
      addresses: [
        newAddress("0x800acjwkj3", "arb", "patrick"),
        newAddress("0xoxj901b389", "eth", "taylor"),
        newAddress("0xzoj29d8f02", "op", "travis"),
      ],
    },
  ],
  [
    "user4",
    {
      id: "user4",
      fullName: "alice",
      addresses: [newAddress("0xd8cj3nsovy", "matic", "bob")],
    },
  ],
  [
    "user5",
    {
      id: "user5",
      fullName: "bob",
      addresses: [newAddress("0xa0xl4n67x8", "avax", "alice")],
    },
  ],
];
