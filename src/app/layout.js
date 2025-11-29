import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import SoundPlayer from "@/components/SoundPlayer";
import LoadingScreen from "@/components/LoadingScreen";
import WelcomeModal from "@/components/WelcomeModal";
import { UserProvider } from "@/context/UserContext";
import OfflineIndicator from "@/components/OfflineIndicator";

export const metadata = {
  title: "Lumind - Your Mental Health Companion",
  description: "A safe space to track mood, breathe, and find peace.",
  manifest: "/manifest.json", 
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png', 
  },
  themeColor: "#f0fdfa", 
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
            <OfflineIndicator />
            <Footer />
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
