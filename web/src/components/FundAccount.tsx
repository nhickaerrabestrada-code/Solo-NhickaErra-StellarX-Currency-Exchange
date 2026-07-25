'use client';

import { useState } from "react";
import { fundTestnetAccount } from "@/lib/stellar";

export default function FundAccount({
  publicKey,
}: {
  publicKey: string | null;
}) {

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  async function fund(){

    if(!publicKey){
      setError("Connect wallet first");
      return;
    }

    try{

      setLoading(true);
      setError("");

      await fundTestnetAccount(publicKey);

      alert("Account funded!");

    }catch(e){

      setError(
        e instanceof Error 
        ? e.message 
        : "Funding failed"
      );

    }finally{
      setLoading(false);
    }

  }


  return(
    <div>

      <button
        onClick={fund}
        disabled={loading}
        className="rounded bg-yellow-400 px-4 py-2"
      >

      {
        loading
        ? "Funding..."
        : "Fund Testnet Account"
      }

      </button>


      {
        error &&
        <p className="text-red-500">
          {error}
        </p>
      }

    </div>
  )

}
