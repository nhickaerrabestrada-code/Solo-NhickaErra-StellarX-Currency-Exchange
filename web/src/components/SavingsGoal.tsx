"use client";

export default function SavingsGoal({
  publicKey,
}: {
  publicKey: string | null;
}) {


  return (
    <div className="rounded border p-5">

      <h2 className="text-lg font-bold">
        Savings Goal
      </h2>


      <p className="text-gray-600">
        Wallet:
        {" "}
        {publicKey ?? "Not connected"}
      </p>


      <p className="mt-3">
        Smart contract feature coming soon.
      </p>

    </div>
  );
}
