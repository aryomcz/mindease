import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import SoundPlayer from "@/components/SoundPlayer";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata = {
  title: "MindEase",
  description: "Your Mental Wellness Companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <LoadingScreen />
        <Navbar />
        <main className="flex-1">{children}</main>
        <SoundPlayer />
        <MobileDock />
        <Footer />
      </body>
    </html>
  );
}
