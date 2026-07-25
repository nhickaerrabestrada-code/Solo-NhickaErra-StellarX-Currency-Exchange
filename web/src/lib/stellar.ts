import { Horizon } from "@stellar/stellar-sdk";


export const NETWORK_PASSPHRASE =
  "Test SDF Network ; September 2015";


export const SERVER = new Horizon.Server(
  "https://horizon-testnet.stellar.org"
);


// Temporary contract id
// Replace this later if your project has a deployed contract
export const CONTRACT_ID = "";


export async function fundTestnetAccount(
  publicKey: string
) {

  const response = await fetch(
    `https://friendbot.stellar.org/?addr=${publicKey}`
  );


  if (!response.ok) {
    throw new Error("Friendbot funding failed");
  }


  return response.json();

}
