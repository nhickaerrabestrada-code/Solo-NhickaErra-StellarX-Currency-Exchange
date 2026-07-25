'use client';

export default function ConnectWallet({
  publicKey,
  connecting,
  error,
  connect,
  disconnect,
}: {
  publicKey: string | null;
  connecting: boolean;
  error: string | null;
  connect: () => void;
  disconnect: () => void;
}) {

  return (
    <div className="rounded border p-6 space-y-4">

      <h2 className="text-lg font-semibold">
        Wallet Connection
      </h2>

      {publicKey ? (
        <>
          <p className="break-all text-sm">
            Connected:
            <br />
            {publicKey}
          </p>

          <button
            onClick={disconnect}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={connect}
          disabled={connecting}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}
