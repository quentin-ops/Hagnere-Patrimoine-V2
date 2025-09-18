import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SecondHeader } from "@/components/second-header";
import { DevS3Uploader } from "@/components/dev-s3-uploader";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Hagnéré Patrimoine - Conseil en gestion de patrimoine",
  description: "Optimisez votre patrimoine avec nos experts. Stratégies fiscales, investissements immobiliers et accompagnement personnalisé.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <SecondHeader />
            <main className="flex-1">
              <SiteBreadcrumb />
              {children}
            </main>
            <DevS3Uploader />
          </div>
        </Providers>
      </body>
    </html>
  );
}
