'use client';

import { useEffect, useState } from "react";
import { SERVER } from "@/lib/stellar";


export default function BalanceCard({
  publicKey,
}: {
  publicKey: string | null;
}) {

  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    async function loadBalance() {

      if (!publicKey) {
        setBalance("0");
        return;
      }


      try {

        setLoading(true);


        const account = await SERVER.loadAccount(publicKey);


        const native = account.balances.find(
          (item) => item.asset_type === "native"
        );


        if (native && "balance" in native) {
          setBalance(native.balance);
        }


      } catch (error) {

        console.error(error);
        setBalance("0");

      } finally {

        setLoading(false);

      }

    }


    loadBalance();


  }, [publicKey]);


  return (

    <div className="rounded border p-6">

      <h2 className="text-lg font-semibold">
        Balance
      </h2>


      {
        !publicKey
        ? (
          <p>
            Connect wallet to view balance
          </p>
        )
        :
        (
          <p>
            {
              loading
              ? "Loading..."
              : `${balance} XLM`
            }
          </p>
        )
      }


    </div>

  );

}
