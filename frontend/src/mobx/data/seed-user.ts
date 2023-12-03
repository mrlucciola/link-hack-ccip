import { Contact } from "../interfaces";
import {
  AddrToken,
  Address,
  newAddrToken,
  newAddress,
} from "../interfaces/address";

const seedAddrs: Address[] = [
  newAddress({
    value: "0xic939d0x98f02123",
    blockchainId: "matic",
    label: "",
    get tokens(): AddrToken[] {
      return [
        newAddrToken(
          { id: "usdc", blockchainId: this.blockchainId, amount: 11111.1111 },
          this.value
        ),
      ];
    },
  }),
  newAddress({
    value: "0x8us93i09dlwpi09d",
    blockchainId: "avax",
    label: "Personal (Avalanche)",
    get tokens(): AddrToken[] {
      return [
        newAddrToken(
          { id: "usdc", blockchainId: this.blockchainId, amount: 20000 },
          this.value
        ),
        newAddrToken(
          { id: "aave", blockchainId: this.blockchainId, amount: 123.9998 },
          this.value
        ),
        newAddrToken(
          { id: "mkr", blockchainId: this.blockchainId, amount: 1.1 },
          this.value
        ),
      ];
    },
  }),
  newAddress({
    value: "0xXyzzoj29d8f02098",
    blockchainId: "op",
    label: "Personal (Optimism)",
    get tokens(): AddrToken[] {
      return [
        newAddrToken(
          { id: "usdc", blockchainId: this.blockchainId, amount: 2993.9829 },
          this.value
        ),
        newAddrToken(
          { id: "aave", blockchainId: this.blockchainId, amount: 338.132 },
          this.value
        ),
      ];
    },
  }),
  newAddress({
    value: "0xabczoj29d8f02456",
    blockchainId: "eth",
    label: "NFT Drops",
    get tokens(): AddrToken[] {
      return [
        newAddrToken(
          { id: "usdc", blockchainId: this.blockchainId, amount: 22.4884 },
          this.value
        ),
        newAddrToken(
          { id: "aave", blockchainId: this.blockchainId, amount: 0.25123 },
          this.value
        ),
        newAddrToken(
          { id: "mkr", blockchainId: this.blockchainId, amount: 0.0005 },
          this.value
        ),
      ];
    },
  }),
];
export const seedAddressesMap: Map<string, Address> = new Map<string, Address>(
  seedAddrs.map((a) => [a.value, a])
);

const seedContacts: Contact[] = [
  {
    id: "jdoe",
    fullName: "John Doe",
    addresses: [
      newAddress({
        value: "0xd0xk3nf8ww",
        blockchainId: "matic",
        label: "Primary address",
        get tokens(): AddrToken[] {
          return [
            newAddrToken(
              { id: "usdc", blockchainId: this.blockchainId, amount: 84.3 },
              this.value
            ),
            newAddrToken(
              {
                id: "aave",
                blockchainId: this.blockchainId,
                amount: 789.52194,
              },
              this.value
            ),
            newAddrToken(
              {
                id: "mkr",
                blockchainId: this.blockchainId,
                amount: 30.42341,
              },
              this.value
            ),
          ];
        },
      }),
    ],
  },
  {
    id: "franksinatra",
    fullName: "Frank Sinatra",
    addresses: [
      newAddress({
        value: "0x9din3hduc8",
        blockchainId: "avax",
        label: "NFT address",
        get tokens(): AddrToken[] {
          return [
            newAddrToken(
              { id: "usdc", blockchainId: this.blockchainId, amount: 492 },
              this.value
            ),
            newAddrToken(
              { id: "aave", blockchainId: this.blockchainId, amount: 456 },
              this.value
            ),
          ];
        },
      }),
      newAddress({
        value: "0x0dj1i28fu4",
        blockchainId: "eth",
        label: "Dropbox",
        get tokens(): AddrToken[] {
          return [
            newAddrToken(
              { id: "mkr", blockchainId: this.blockchainId, amount: 20.2 },
              this.value
            ),
          ];
        },
      }),
    ],
  },
  {
    id: "cdeli",
    fullName: "Corner Deli",
    addresses: [
      newAddress({
        value: "0x800acjwkj3",
        blockchainId: "arb",
        label: "Dropbox: vendors",
      }),
      newAddress({
        value: "0xoxj901b389",
        blockchainId: "arb",
        label: "Dropbox: customers (Arbitrum)",
        get tokens(): AddrToken[] {
          return [
            newAddrToken(
              { id: "usdc", blockchainId: this.blockchainId, amount: 29481.32 },
              this.value
            ),
          ];
        },
      }),
      newAddress({
        value: "0xoxj901b389",
        blockchainId: "op",
        label: "Dropbox: customers (Optimism)",
        get tokens(): AddrToken[] {
          return [
            newAddrToken(
              { id: "usdc", blockchainId: this.blockchainId, amount: 59209.11 },
              this.value
            ),
          ];
        },
      }),
      newAddress({
        value: "0xzoj29d8f02",
        blockchainId: "matic",
        label: "Treasury",
        get tokens(): AddrToken[] {
          return [
            newAddrToken(
              { id: "mkr", blockchainId: this.blockchainId, amount: 6.251 },
              this.value
            ),
          ];
        },
      }),
    ],
  },
  {
    id: "alice",
    fullName: "Alice",
    addresses: [
      newAddress({
        value: "0xd8cj3nsovy",
        blockchainId: "matic",
        label: "Main",
      }),
    ],
  },
  {
    id: "bobb",
    fullName: "Bob Burnquist",
    addresses: [
      newAddress({
        value: "0xa0xl4n67x8",
        blockchainId: "avax",
        label: "Personal",
      }),
    ],
  },
];
export const seedContactsMap: Map<string, Contact> = new Map<string, Contact>(
  seedContacts.map((c) => [c.id, c])
);
