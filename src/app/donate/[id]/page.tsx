'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import WalletConnect from '@/components/WalletConnect';
import { ethers } from 'ethers';

// Campaigns data unchanged
const campaigns = [
  {
    id: 'c1',
    title: 'Clean Water for Africa',
    description: 'Building wells to bring clean water.',
    image: '/africa.png',
  },
  {
    id: 'c2',
    title: 'Solar Energy for Schools',
    description: 'Solar panels for remote schools.',
    image: '/solar.png',
  },
  {
    id: 'c3',
    title: 'Healthcare Improvement',
    description: 'Medical supplies for clinics.',
    image: '/health.png',
  },
];

// YOUR Sepolia campaign/test wallet address here
const CAMPAIGN_WALLET = '0x00ed998780Fc14C7F1d808766Feb7420237B3052'; // <--- REPLACE THIS!

export default function DonatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const campaign = campaigns.find((c) => c.id === id);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState<React.ReactNode>('');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  // Set wallet address from child
  function handleWallet(addr: string) {
    setWalletAddress(addr);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!walletAddress) {
      setMessage(<span className="text-red-500">Connect your wallet first!</span>);
      return;
    }
    if (!amount || Number(amount) < 0.001) {
      setMessage(<span className="text-red-500">Minimum amount is 0.001 ETH.</span>);
      return;
    }

    try {
      // Prompt for Sepolia
      if (
        (window as any)?.ethereum &&
        (window as any).ethereum.networkVersion !== '11155111'
      ) {
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }],
        });
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: CAMPAIGN_WALLET,
        value: ethers.parseEther(amount),
      });

      setMessage(
        <>
          Transaction sent!
          <br />
          <a
            href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            View transaction (Etherscan)
          </a>
        </>
      );

      setAmount('');
    } catch (err: any) {
      setMessage(
        <span className="text-red-500">
          Error sending transaction: {err?.message || String(err)}
        </span>
      );
    }
  }

  return (
    <div className="max-w-lg mx-auto py-16">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="mb-6 px-4 py-2 bg-cyan-400 text-black rounded hover:bg-cyan-500 font-semibold"
      >
        ← Back to Home
      </button>
      <WalletConnect signedIn={!!session} onWallet={handleWallet} />
      {campaign ? (
        <>
          <Image
            src={campaign.image}
            alt={campaign.title}
            width={360}
            height={220}
            className="rounded-xl border-2 border-yellow-400 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold mb-3 text-cyan-400">
            {campaign.title}
          </h1>
          <p className="mb-4 text-lg text-yellow-200">{campaign.description}</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-3 text-red-400">
            Campaign not found
          </h1>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Donation Amount (ETH)</label>
        <input
          type="number"
          className="border p-2 rounded w-full mb-4"
          placeholder="Enter amount"
          min={0.001}
          step={0.001}
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 font-bold block w-full cursor-pointer"
        >
          Donate Now
        </button>
      </form>
      {message && (
        <div className="mt-4 font-semibold text-center">{message}</div>
      )}
    </div>
  );
}
