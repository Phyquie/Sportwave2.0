"use client";
//@ts-nocheck
import Link from "next/link";
import { usePathname } from "next/navigation";
import LocationButton from "./locationButton";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        {/* Company Name */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-white hover:text-gray-200 transition"
        >
          SportWave
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-lg font-semibold transition ${
                pathname === item.href
                  ? "text-white bg-black px-4 py-1 rounded-full"
                  : "text-white hover:text-gray-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Location Button */}
        <div className="flex items-center space-x-4">
          <LocationButton />
          
          {/* Login Button */}
          <Link
            href="/sign-in"
            className="px-5 py-2 rounded-full text-lg font-semibold bg-white text-black 
                       hover:bg-gray-200 active:scale-95 transition transform"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}