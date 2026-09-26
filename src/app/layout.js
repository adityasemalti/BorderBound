import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoteModal from "@/components/VoteModal";
import AuthModal from "@/components/AuthModal";
import LiveTicker from "@/components/LiveTicker";

export const metadata = {
  metadataBase: new URL("https://theborderbound.in"),

  title: {
    default: "THE BORDERBOUND - Official Registration & Voting Platform",
    template: "%s ",
  },

  description:
    "India chooses who gets the opportunity. THE BORDERBOUND decides who survives it. Register as a contestant and vote live for your top favorites.",

  keywords: [
    "The Borderbound",
    "Borderbound",
    "Borderbound 2026",
    "Borderbound reality show",
    "Borderbound contestants",
    "Borderbound registration",
    "Borderbound voting",
    "reality competition India",
    "reality show India",
    "survival reality show",
  ],

  authors: [
    {
      name: "THE BORDERBOUND",
    },
  ],

  creator: "THE BORDERBOUND",
  publisher: "THE BORDERBOUND",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://theborderbound.in",
  },

  openGraph: {
    title: "THE BORDERBOUND - Official Registration & Voting Platform",
    description:
      "Register as a contestant and vote live for your top favorites in THE BORDERBOUND.",
    url: "https://theborderbound.in",
    siteName: "THE BORDERBOUND",
    locale: "en_IN",
    type: "website",

    // images: [
    //   {
    //     url: "/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "THE BORDERBOUND - Reality Competition",
    //   },
    // ],
  },

  // twitter: {
  //   card: "summary_large_image",
  //   title: "THE BORDERBOUND - Official Registration & Voting Platform",
  //   description:
  //     "Register as a contestant and vote live for your top favorites in THE BORDERBOUND.",
  //   images: ["/og-image.jpg"],
  // },

icons:{
  icons:"public/img.png"
}
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#080C14] text-slate-100 min-h-screen flex flex-col antialiased">
        <LiveTicker />

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Global Modals */}
        <VoteModal />
        <AuthModal />
      </body>
    </html>
  );
}