import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoteModal from "@/components/VoteModal";
import AuthModal from "@/components/AuthModal";
import LiveTicker from "@/components/LiveTicker";

export const metadata = {
  title: "THE BORDERBOUND - Official Registration & Voting Platform",
  description:
    "India chooses who gets the opportunity. The Borderbound decides who survives it. Register as a contestant and vote live for your top favorites.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#080C14] text-slate-100 min-h-screen flex flex-col antialiased">
        {/* <LiveTicker />
        <Navbar /> */}
        <main className="flex-1">{children}</main>
        {/* <Footer /> */}

        {/* Global Modals */}
        <VoteModal />
        <AuthModal />
      </body>
    </html>
  );
}
