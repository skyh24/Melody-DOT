import { NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { moonbaseAlpha } from "wagmi/chains";
import { melodyAbi } from "./contracts/abi";

const publicClient = createPublicClient({
	chain: moonbaseAlpha,
	transport: http(),
});

export async function POST(request: Request) {
	try {
		const { address, tokenUri } = await request.json();

		if (!address || !tokenUri) {
			return NextResponse.json(
				{ error: "Missing required parameters" },
				{ status: 400 },
			);
		}

		const contractAddress = process.env.CONTRACT_ADDRESS as `0x${string}`;

		if (!contractAddress) {
			return NextResponse.json(
				{ error: "Contract address not configured" },
				{ status: 500 },
			);
		}

		const data = await publicClient.simulateContract({
			address: contractAddress,
			abi: melodyAbi,
			functionName: "mint",
			args: [address as `0x${string}`, BigInt(1), tokenUri],
		});

		return NextResponse.json({ success: true, data });
	} catch (error) {
		console.error("Error minting token:", error);
		return NextResponse.json(
			{ error: "Failed to mint token" },
			{ status: 500 },
		);
	}
}
