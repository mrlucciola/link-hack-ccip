import { Contract, HDNodeWallet, TransactionLike, Transaction } from "ethers";
// interfaces
import { BaseAddress } from "../../../../mobx/interfaces/address";
import { senderCcipAddress } from "../../../../mobx/data/contract";
import {
  TestnetId,
  fetchGasAmount,
  fetchGasPrice,
} from "../../../../mobx/data/supportedBlockchains";
import { ReviewTxnStore } from "../store";
import { EnabledAddr } from "../../interfaces";

/** @deprecated incomplete */
export async function buildAndSignTxn(
  this: ReviewTxnStore,
  contract: Contract,
  amtToSendRemaining: number,
  /** Contains the signer + provider */
  srcAddress: EnabledAddr,
  /** Contains the signer + provider */
  dstAddress: BaseAddress
): Promise<Transaction> {
  console.log("contract addr:", await contract.getAddress());
  console.log("amountsToSend", amtToSendRemaining);
  console.log("Destination:", dstAddress.blockchainId, dstAddress.value);

  const unsignedTxnData = "";
  // const encoded = contract.methods
  //   .sendAssets(dstAddress.value, dstAddress.blockchainId, token, amt, decimals)
  //   .encodeABI();

  const userWallet: HDNodeWallet = this.root.user.getUserWallet(
    srcAddress.value
  );

  const unsignedTxn: TransactionLike<string> = {
    data: unsignedTxnData,
    to: senderCcipAddress[srcAddress.blockchainId as TestnetId],
    gasLimit: (await fetchGasAmount()) * 1.1,
    gasPrice: await fetchGasPrice(srcAddress.blockchainId),
    nonce: await userWallet.getNonce(),
    signature: userWallet.signMessageSync(unsignedTxnData), // Signature.from(userWallet.signMessageSync(unsignedTxnData))
  };

  return Transaction.from(unsignedTxn);
}
