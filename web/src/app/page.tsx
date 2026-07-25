'use client';

import { useWallet } from "@/hooks/useWallet";
import ConnectWallet from "@/components/ConnectWallet";
import BalanceCard from "@/components/BalanceCard";


export default function Home() {

  const {
    publicKey,
    connecting,
    error,
    connect,
    disconnect
  } = useWallet();


  return (
    <main className="min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-8">
        StellarX Workshop
      </h1>


      <div className="space-y-6">


        <ConnectWallet
          publicKey={publicKey}
          connecting={connecting}
          error={error}
          connect={connect}
          disconnect={disconnect}
        />


        <BalanceCard
          publicKey={publicKey}
        />


      </div>


    </main>
  );
}
