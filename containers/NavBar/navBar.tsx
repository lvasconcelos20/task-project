"use client";

import { useState } from "react";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

import Button from "@/components/atoms/Button/button";
import useAuth from "@/source/hooks/useAuth";

import { NavbarProps, ResponsiveMenuProps } from "./types";

function ResponsiveMenu({ menuItems, onCloseMenu }: ResponsiveMenuProps) {

  const pathname = usePathname();
  const { logoutUser, loading } = useAuth();
  

  return (
    <div className="absolute inset-0 z-30 flex h-screen w-screen items-center justify-center bg-white lg:hidden">
      <button onClick={onCloseMenu} className="absolute right-4 top-6">
        <FiX size={32} color="#1681BC" />
      </button>
      <ul className="flex flex-col gap-8">
        {menuItems.map((button) => (
          <li
            key={button.label}
            className=" flex cursor-pointer justify-center text-base font-bold transition-colors"
          >
            <Link
              href={button.href}
              className={`text-center ${
                pathname === button.href && " border-b-4"
              }`}
            >
              {button.label}
            </Link>
            
          </li>
        ))}
  
         
        
        <Button onClick={logoutUser} loading={loading.logout}>
          LOGOUT
        </Button>
      </ul>
    </div>
  );
}

export default function Navbar({ menuItems}: NavbarProps) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logoutUser, loading } = useAuth();
  

  return (
    <nav className=" fixed top-0 z-50 flex h-20 w-full items-center justify-between   bg-[#4A709C]">
      <div className="flex h-full items-center gap-10">
      
         <Image src={'/logomini.png'} alt="logo" width={200} height={80}/>
       
      </div>
   
    
      <div className="hidden lg:block">
       
        <Button onClick={logoutUser} loading={loading.logout} className="border-none bg-transparent" >
        <IoIosLogOut  size={24} className="text-white "/>
        </Button>
      </div>
     
      {!isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen((prevState) => !prevState)}
          className="block cursor-pointer lg:hidden"
        >
          <FiMenu size={32} color="#fff" />
        </button>
      )}
      {isMenuOpen && (
        <ResponsiveMenu
          onCloseMenu={() => setIsMenuOpen(false)}
          menuItems={menuItems}
        />
      )}
    </nav>
  );
}
