import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@/source/config/firebase";

import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import AuthProvider from "@/source/store/providers/Auth";
import QueryClientProviderApp from "@/source/store/providers/QueryClientApp";
import UserProvider from "@/source/store/providers/User";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EvoDeck",
  description: "evodeck"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProviderApp>
        <AuthProvider>
          <UserProvider>
            <body className={inter.className}>
              <ToastContainer />
              {children}
            </body>
          </UserProvider>
        </AuthProvider>
      </QueryClientProviderApp>
    </html>
  );
}
