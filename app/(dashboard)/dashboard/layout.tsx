"use client";

import Sidebar from "@/components/sidebar";
import "../../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <SidebarProvider>
          <Sidebar />
         { children }
        </SidebarProvider>
      </body>
    </html>
  );
}
