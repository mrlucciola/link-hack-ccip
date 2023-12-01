import { Contact } from "../interfaces";

export const contactInit: [string, Contact][] = [
  [
    "user1",
    {
      id: "user1",
      fullName: "john doe",
      addresses: [{ value: "0xd0xk3nf8ww", blockchainId: "op" }],
    },
  ],
  [
    "user2",
    {
      id: "user2",
      fullName: "frank sinatra",
      addresses: [
        { value: "0x9din3hduc8", blockchainId: "eth" },
        { value: "0x0dj1i28fu4", blockchainId: "eth" },
      ],
    },
  ],
  [
    "user3",
    {
      id: "user3",
      fullName: "silvia",
      addresses: [
        { value: "0x800acjwkj3", blockchainId: "arb" },
        { value: "0xoxj901b389", blockchainId: "eth" },
        { value: "0xzoj29d8f02", blockchainId: "op" },
      ],
    },
  ],
  [
    "user4",
    {
      id: "user4",
      fullName: "alice",
      addresses: [{ value: "0xd8cj3nsovy", blockchainId: "matic" }],
    },
  ],
  [
    "user5",
    {
      id: "user5",
      fullName: "bob",
      addresses: [{ value: "0xa0xl4n67x8", blockchainId: "avax" }],
    },
  ],
];
