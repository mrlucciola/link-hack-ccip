import { Address } from "./address";

/** @deprecated incomplete */
export class Transaction {
  constructor(public address: Address) {}
}
/** @deprecated incomplete */
export const newTransaction = (address: Address): Transaction => {
  return new Transaction(address);
};
/** @deprecated incomplete */
export class SignedTransaction {
  constructor(public address: Address, public transaction: Transaction) {}
}
/** @deprecated incomplete */
export const newSignedTransaction = (
  address: Address,
  transaction: Transaction
): SignedTransaction => {
  return new SignedTransaction(address, transaction);
};
