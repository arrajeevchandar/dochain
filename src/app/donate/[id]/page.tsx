'use client';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

// Local campaign data; could be imported from a data file or fetched
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

export default function DonatePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.push('/auth/signin');
        }
    }, [session, status]);

    const { id } = useParams(); 
    const campaign = campaigns.find((c) => c.id === id);
    const [amount, setAmount] = useState(''); // string is fine for input
    const [message, setMessage] = useState<React.ReactNode>(''); // <-- Allows JSX

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const donationData = {
            campaignId: campaign?.id,
            campaignTitle: campaign?.title,
            amount,
            timestamp: new Date().toISOString(),
            // Optionally add user info if available
        };
        fetch('/api/pinataUpload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: donationData }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ipfsHash) {
                    setMessage(
                        <>
                            Thank you for donating ${amount} to{' '}
                            <strong>{campaign?.title}</strong>.<br />
                            Your donation receipt is pinned on IPFS: <br />
                            <a
                                href={data.gatewayUrl}
                                className="underline text-blue-500"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {data.gatewayUrl}
                            </a>
                        </>
                    );
                } else {
                    setMessage(
                        <span className="text-red-500">
                            Donation failed:{' '}
                            {data.error || 'Could not pin to IPFS.'}
                        </span>
                    );
                }
                setAmount(''); // Optionally clear the input
            });
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
                    <p className="mb-4 text-lg text-yellow-200">
                        {campaign.description}
                    </p>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-3 text-red-400">
                        Campaign not found
                    </h1>
                </>
            )}

            <form onSubmit={handleSubmit}>
                <label className="block mb-2 font-semibold">
                    Donation Amount ($)
                </label>
                <input
                    type="number"
                    className="border p-2 rounded w-full mb-4"
                    placeholder="Enter amount"
                    min={1}
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 font-bold block w-full"
                >
                    Donate Now
                </button>
            </form>
            {message && (
                <div className="mt-4 text-green-500 font-semibold text-center">
                    {message}
                </div>
            )}
        </div>
    );
}
