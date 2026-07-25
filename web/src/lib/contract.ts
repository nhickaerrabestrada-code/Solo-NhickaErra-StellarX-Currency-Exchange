import {
  Contract,
  rpc,
  TransactionBuilder,
  Networks,
} from "@stellar/stellar-sdk";

import {
  SERVER,
  NETWORK_PASSPHRASE,
  CONTRACT_ID,
} from "./stellar";


export const contract = new Contract(CONTRACT_ID);


export async function getContractValue(
  publicKey: string
) {

  if (!CONTRACT_ID) {
    throw new Error("Contract ID is missing");
  }


  const account = await SERVER.loadAccount(publicKey);


  const transaction = new TransactionBuilder(
    account,
    {
      fee: "100",
      networkPassphrase: NETWORK_PASSPHRASE,
    }
  )
  .setTimeout(30)
  .build();


  return transaction;

}
