import { Contact, newAddress } from "../interfaces";

export const contactInit: [string, Contact][] = [
  [
    "jdoe",
    {
      id: "jdoe",
      fullName: "John Doe",
      addresses: [newAddress("0xd0xk3nf8ww", "op", "Primary address")],
    },
  ],
  [
    "franksinatra",
    {
      id: "franksinatra",
      fullName: "Frank Sinatra",
      addresses: [
        newAddress("0x9din3hduc8", "eth", "NFT address"),
        newAddress("0x0dj1i28fu4", "eth", "Dropbox"),
      ],
    },
  ],
  [
    "cdeli",
    {
      id: "cdeli",
      fullName: "Corner Deli",
      addresses: [
        newAddress("0x800acjwkj3", "arb", "Dropbox: vendors"),
        newAddress("0xoxj901b389", "eth", "Dropbox: customers"),
        newAddress("0xzoj29d8f02", "matic", "Treasury"),
      ],
    },
  ],
  [
    "alice",
    {
      id: "alice",
      fullName: "Alice",
      addresses: [newAddress("0xd8cj3nsovy", "matic", "Main")],
    },
  ],
  [
    "bobb",
    {
      id: "bobb",
      fullName: "Bob Burnquist",
      addresses: [newAddress("0xa0xl4n67x8", "avax", "Personal")],
    },
  ],
];
