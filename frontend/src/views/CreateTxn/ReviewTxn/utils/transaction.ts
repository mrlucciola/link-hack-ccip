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
import { StagedAddrToken } from "../../interfaces";

/** @deprecated incomplete */
export async function buildAndSignTxn(
  this: ReviewTxnStore,
  contract: Contract,
  amtToSendRemaining: number,
  /** Contains the signer + provider */
  srcToken: StagedAddrToken,
  /** Contains the signer + provider */
  dstAddress: BaseAddress
): Promise<Transaction> {
  console.log("contract addr:", await contract.getAddress());
  console.log("amountsToSend", amtToSendRemaining);
  console.log("Destination:", dstAddress.blockchainId, dstAddress.value);

  const unsignedTxnData = "";
  // const unsignedTxnData = contract.methods
  //   .sendAssets(dstAddress.value, dstAddress.blockchainId, token, amt, decimals)
  //   .encodeABI();
  const tokenWallet: HDNodeWallet = this.root.user.getWallet(srcToken);

  const unsignedTxn: TransactionLike<string> = {
    data: unsignedTxnData,
    to: senderCcipAddress[srcToken.blockchainId as TestnetId],
    gasLimit: (await fetchGasAmount()) * 1.1,
    gasPrice: await fetchGasPrice(srcToken.blockchainId),
    nonce: await tokenWallet.getNonce(),
    signature: tokenWallet.signMessageSync(unsignedTxnData), // Signature.from(userWallet.signMessageSync(unsignedTxnData))
  };

  return Transaction.from(unsignedTxn);
}
