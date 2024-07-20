import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["300", "400", "500", "700"],
});

// Font files can be colocated inside of `pages`
const fontHeading = LocalFont({
	src: "../assets/fonts/CalSans-SemiBold.woff2",
	variable: "--font-heading",
});

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		"Next.js",
		"React",
		"Tailwind CSS",
		"Server Components",
		"Radix UI",
		"Prisma",
		"TypeScript",
		"Clerk",
		"Authentication",
		"Vercel",
	],
	authors: [
		{
			name: "keiprojects",
			url: "https://keiprojects.com",
		},
	],
	creator: "keiprojects",

	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [`${siteConfig.url}/og.jpg`],
		creator: "@keiprojects",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
					fontHeading.variable
				)}>
				{children}
			</body>
		</html>
	);
}
