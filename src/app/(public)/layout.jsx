import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveTicker from "@/components/LiveTicker";

export default function PublicLayout({ children }) {
  return (
    <div className="bg-[#080C14] text-slate-100 min-h-screen flex flex-col antialiased">
      <LiveTicker />
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}