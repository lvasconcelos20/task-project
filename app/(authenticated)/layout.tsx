"use client";

import Navbar from "@/containers/NavBar/navBar";
import  AuthenticatedOnlyFeatureWrapper from "@/components/templates/Authenticated/authenticated";

const authMenuItems = [
  {
    label: "Home",
    href: "/home"
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    < AuthenticatedOnlyFeatureWrapper>
    <main className="flex h-screen w-full flex-col items-center justify-center">
        <Navbar menuItems={authMenuItems}/>
        {children}
      </main>
    </ AuthenticatedOnlyFeatureWrapper>
  );
}
