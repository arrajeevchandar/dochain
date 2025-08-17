import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data } = await req.json(); // data: JSON object to pin
    const apiKey = process.env.PINATA_API_KEY;
    const apiSecret = process.env.PINATA_SECRET;
    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: "Missing Pinata API keys." }, { status: 500 });
    }
    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "pinata_api_key": apiKey,
        "pinata_secret_api_key": apiSecret
      },
      body: JSON.stringify({ pinataContent: data })
    });
    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.error }, { status: 500 });
    }
    const result = await res.json();
    return NextResponse.json({ ipfsHash: result.IpfsHash, gatewayUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}` }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
