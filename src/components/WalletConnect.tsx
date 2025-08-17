'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function WalletConnect() {
  const { data: session } = useSession();
  const router = useRouter();

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected on mount, but only if user is signed in
  useEffect(() => {
    if (!session) {
      setWalletAddress(null); // Clear wallet if not signed in
      return;
    }
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      (window as any).ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        });
    }
  }, [session]);

  // Connect wallet function
  async function connectWallet() {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    try {
      if (!(window as any).ethereum) {
        setError('MetaMask not detected. Please install it.');
        return;
      }

      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });
      setWalletAddress(accounts[0]);
      setError(null);
    } catch (err) {
      setError('User rejected wallet connection.');
    }
  }

  // Disconnect wallet clears wallet address locally
  function disconnectWallet() {
    setWalletAddress(null);
    setError(null);
  }

  return (
    <div>
      {walletAddress ? (
        <div className="flex items-center space-x-3">
          <p className="text-cyan-300 font-mono">
            Connected: {walletAddress.substring(0, 6)}...
            {walletAddress.substring(walletAddress.length - 4)}
          </p>
          <button
            onClick={disconnectWallet}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-cyan-400 text-black px-4 py-1 rounded font-bold hover:bg-cyan-600 transition"
        >
          Connect Wallet
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
