import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "MindEase",
  description: "Your Mental Wellness Companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-background">
      <body className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-1">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
