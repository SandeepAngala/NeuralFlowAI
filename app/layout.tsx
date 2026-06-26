import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neuralflow-ai.vercel.app"),
  title: "NeuralFlow AI — Intelligent Data Automation Platform",
  description: "Automate enterprise data pipelines with AI. Real-time sync, auto-schema detection, multi-cloud orchestration. Start free.",
  keywords: "AI automation, data pipeline, machine learning, enterprise automation, NeuralFlow",
  openGraph: {
    title: "NeuralFlow AI",
    description: "Next-gen AI data automation platform",
    type: "website",
    url: "https://neuralflow-ai.vercel.app",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NeuralFlow AI Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuralFlow AI",
    description: "Intelligent Data Automation Platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="anim-page">
        {children}
      </body>
    </html>
  );
}
