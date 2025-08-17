'use client';

import { useState, useEffect } from 'react';

interface WalletConnectProps {
    signedIn: boolean; // <-- Require this prop to check sign-in
    onWallet?: (address: string) => void;
}

export default function WalletConnect({
    signedIn = false,
    onWallet,
}: WalletConnectProps) {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).ethereum) {
            (window as any).ethereum
                .request({ method: 'eth_accounts' })
                .then((accounts: string[]) => {
                    if (accounts.length > 0) {
                        setWalletAddress(accounts[0]); // Use the first account string
                        onWallet && onWallet(accounts[0]); // Pass first account to parent!
                    }
                });
        }
    }, [onWallet]);

    async function connectWallet() {
        if (!signedIn) {
            setError('You must sign in before connecting your wallet.');
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
            onWallet && onWallet(accounts);
        } catch (err) {
            setError('User rejected wallet connection.');
        }
    }

    function disconnectWallet() {
        setWalletAddress(null);
        setError(null);
        onWallet && onWallet('');
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
