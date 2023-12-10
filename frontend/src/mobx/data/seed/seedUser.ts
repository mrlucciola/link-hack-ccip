import { Contact } from "../../interfaces";
import { UserAddress } from "../../interfaces/address";
import { AddrToken, newAddrToken } from "../../interfaces/token";
import { UserWallet, newWalletFromMnemonic } from "../../interfaces/wallet";
import { TestnetId } from "../supportedBlockchains";
import { TokenId } from "../tokens";
import {
  testSeedPhrase1,
  testSeedPhrase2,
  testSeedPhrase3,
} from "./hiddenSeedPhrase";

const anonWallet = newWalletFromMnemonic(
  testSeedPhrase3,
  "another person's wallet"
);

export const seedRootWallets: UserWallet[] = [
  newWalletFromMnemonic(testSeedPhrase1, "first wallet"),
  newWalletFromMnemonic(testSeedPhrase2, "my other wallet"),
];

let addrCt = 0;
const initAddress = (
  label: string,
  rootWallet: UserWallet,
  idx: number,
  blockchainId: TestnetId,
  partialTokens: { [key in TokenId]?: Pick<AddrToken, "id" | "amount"> }
) => {
  const derivWallet = rootWallet.deriveChild(1);

  const tokens = {} as { [key in TokenId]: AddrToken };

  Object.values(partialTokens).forEach(({ id, amount }) => {
    const newToken = newAddrToken(
      id,
      blockchainId,
      derivWallet.address,
      amount
    );

    tokens[id] = newToken;
  });

  idx++;

  return new UserAddress(
    derivWallet.address,
    blockchainId,
    derivWallet,
    tokens,
    label
  );
};

/** @deprecated delete seed data */
export const seedAddrs: UserAddress[] = [
  initAddress("", seedRootWallets[0], addrCt, "maticMumbai", {
    usdc: { id: "usdc", amount: 11111.1111 },
  }),
  initAddress("Personal (Avalanche)", seedRootWallets[0], addrCt, "avaxFuji", {
    usdc: { id: "usdc", amount: 20000 },
    aave: { id: "aave", amount: 123.9998 },
    link: { id: "link", amount: 1.1 },
  }),
  initAddress("Personal (Optimism)", seedRootWallets[0], addrCt, "opGoerli", {
    usdc: { id: "usdc", amount: 2993.9829 },
    aave: { id: "aave", amount: 338.132 },
  }),
  initAddress("NFT Drops", seedRootWallets[0], addrCt, "ethSepolia", {
    usdc: { id: "usdc", amount: 22.4884 },
    aave: { id: "aave", amount: 0.25123 },
    link: { id: "link", amount: 0.0005 },
  }),
];

let addrCt3 = 0;
const seedContacts: Contact[] = [
  {
    id: "jdoe",
    fullName: "John Doe",
    addresses: [
      initAddress("Primary address", anonWallet, addrCt3, "maticMumbai", {
        usdc: { id: "usdc", amount: 84.3 },
        aave: { id: "aave", amount: 789.52194 },
        link: { id: "link", amount: 30.42341 },
      }),
    ],
  },
  {
    id: "franksinatra",
    fullName: "Frank Sinatra",
    addresses: [
      initAddress("NFT address", anonWallet, addrCt3, "avaxFuji", {
        usdc: { id: "usdc", amount: 492 },
        aave: { id: "aave", amount: 456 },
      }),
      initAddress("Dropbox", anonWallet, addrCt3, "ethSepolia", {
        link: { id: "link", amount: 20.2 },
      }),
    ],
  },
  {
    id: "cdeli",
    fullName: "Corner Deli",
    addresses: [
      initAddress("Dropbox: vendors", anonWallet, addrCt3, "avaxFuji", {}),
      initAddress(
        "Dropbox: customers (Arbitrum)",
        anonWallet,
        addrCt3,
        "avaxFuji",
        {
          usdc: { id: "usdc", amount: 29481.32 },
        }
      ),
      initAddress(
        "Dropbox: customers (Optimism)",
        anonWallet,
        addrCt3,
        "opGoerli",
        {
          usdc: { id: "usdc", amount: 59209.11 },
        }
      ),
      initAddress("Treasury", anonWallet, addrCt3, "maticMumbai", {
        link: { id: "link", amount: 6.251 },
      }),
    ],
  },
  {
    id: "alice",
    fullName: "Alice",
    addresses: [initAddress("Main", anonWallet, addrCt3, "maticMumbai", {})],
  },
  {
    id: "bobb",
    fullName: "Bob Burnquist",
    addresses: [initAddress("Personal", anonWallet, addrCt3, "avaxFuji", {})],
  },
];
export const seedContactsMap: Map<string, Contact> = new Map<string, Contact>(
  seedContacts.map((c) => [c.id, c])
);
