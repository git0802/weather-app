import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Get instant weather updates and forecasts for any location.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const am = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const currentStatus = Number(new Date().getHours().toFixed());

  return (
    <html
      lang="en"
      className={`bg-${
        currentStatus >= 0 && currentStatus <= 12 ? "black" : "black"
      }`}
    >
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>

      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7051464837195925"
        crossorigin="anonymous"
      ></script>
      <Script src="../components/twitter-pixel.js" strategy="lazyOnload" />

      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
