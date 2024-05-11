import { Blinker } from "next/font/google";

export const blinker = Blinker({
	variable: "--font-blinker",
	weight: [
		"100",
		"200",
		"300",
		"400",
		"600",
		"700",
		"800",
	],
	subsets: ["latin"],
});