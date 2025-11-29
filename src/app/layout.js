import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import SoundPlayer from "@/components/SoundPlayer";
import LoadingScreen from "@/components/LoadingScreen";
import WelcomeModal from "@/components/WelcomeModal";
import { UserProvider } from "@/context/UserContext";

export const metadata = {
  title: "MindEase",
  description: "Your Mental Wellness Companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <div className="min-h-screen w-full relative overflow-hidden flex flex-col">
          <LoadingScreen />
          <UserProvider>
            <WelcomeModal />
            <Navbar />
            <main className="flex-1">{children}</main>
            <SoundPlayer />
            <MobileDock />
            <Footer />
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
