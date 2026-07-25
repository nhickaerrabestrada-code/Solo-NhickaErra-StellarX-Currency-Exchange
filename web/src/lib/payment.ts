import {
  Asset,
  Keypair,
  Operation,
  TransactionBuilder,
  Networks,
  Horizon,
} from '@stellar/stellar-sdk';


export type AssetCode = 'XLM' | 'USDC';


const server =
  new Horizon.Server(
    'https://horizon-testnet.stellar.org'
  );


export const NETWORK_PASSPHRASE =
  Networks.TESTNET;



export async function buildPaymentXDR(
  source: string,
  destination: string,
  amount: string,
  assetCode: AssetCode
) {


  const account =
    await server.loadAccount(source);



  const asset =
    assetCode === 'XLM'
      ? Asset.native()
      : new Asset(
          'USDC',
          'GBBD47IF6IXH3E5QZJ3D7Y7K7VQJ6L5E5J5Z4Y6YQ7J6Z7J7J7J7J7'
        );



  const transaction =
    new TransactionBuilder(
      account,
      {
        fee: '100',
        networkPassphrase:
          NETWORK_PASSPHRASE,
      }
    )
      .addOperation(
        Operation.payment({
          destination,
          asset,
          amount,
        })
      )
      .setTimeout(180)
      .build();



  return transaction.toXDR();

}





export async function submitSignedXDR(
  signedXDR: string
) {


  const transaction =
    TransactionBuilder.fromXDR(
      signedXDR,
      NETWORK_PASSPHRASE
    );



  const result =
    await server.submitTransaction(
      transaction
    );



  return result.hash;

}





export async function pollTransaction(
  hash: string
) {


  let attempts = 0;



  while (attempts < 20) {


    try {


      const result =
        await server
          .transactions()
          .transaction(hash)
          .call();



      return result;



    } catch {

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 3000)
      );

    }


    attempts++;

  }



  throw new Error(
    'Transaction confirmation timeout'
  );

}






export async function addTrustline(
  publicKey: string
) {


  throw new Error(
    'Trustline setup requires wallet signing and issuer configuration.'
  );


}
