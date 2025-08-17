import { ethers } from "ethers";

// Returns an Ethers provider (MetaMask if available, fallback to public RPC)
export function getProvider() {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    // MetaMask or another injected wallet
    return new ethers.BrowserProvider((window as any).ethereum);
  } else {
    // Read-only fallback: replace with your chain's public RPC if needed
    return new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");
  }
}
