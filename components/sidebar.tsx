"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSidebarStore } from "../store/sidebarStore";
import { useRouter } from "next/navigation";
import { FiHome, FiCalendar, FiUsers, FiHeart, FiUser, FiSettings, FiHeadphones } from "react-icons/fi";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const mainOptions = [
  { label: "Home", value: "feed", href: "/dashboard/feed", icon: <FiHome /> },
  { label: "Event", value: "event", href: "/dashboard/event", icon: <FiCalendar /> },
  { label: "Report", value: "report", href: "/dashboard/report", icon: <FiUsers /> },
  { label: "Team", value: "team", href: "/dashboard/team", icon: <FiUsers /> },
{ label: "Settings", value: "settings", href: "/dashboard/settings", icon: <FiSettings /> },


];
export default function AppSidebar() {
  const { active, setActive } = useSidebarStore();
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  const handleClick = (value: string, href: string) => {
    setActive(value);
    router.push(href);
  };

  type OptionType = {
    label: string;
    value: string;
    href: string;
    icon: React.ReactNode;
  };

  const renderMenuItems = (options: OptionType[]) => {
    return options.map((opt) => (
      <SidebarMenuItem key={opt.value}>
        <SidebarMenuButton
          asChild
          isActive={active === opt.value}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            active === opt.value 
              ? "bg-white/10 text-white font-semibold" 
              : "hover:bg-white/5 text-gray-600"
          }`}
          onClick={() => handleClick(opt.value, opt.href)}
        >
          <Link href={opt.href} className="flex items-center gap-4 px-2">
            <span className="text-xl">{opt.icon}</span>
            <span>{opt.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
  };

  return (
    <Sidebar className="border-r bg-[#f8f7fc] dark:bg-[#171625] text-gray-800 dark:text-white min-h-screen">
        {/* Logo / Brand */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="text-xl font-bold px-2 py-4 text-indigo-600 dark:text-indigo-400">SportWave</div>
          </SidebarGroupLabel>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-6 mb-2 px-2">MAIN</div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(mainOptions)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
       
        
        {/* Other Options */}
       

      {/* User Profile Footer */}
      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 px-4 py-4 mt-auto">
        {isSignedIn && (
          <Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors" href={`/dashboard/profile`}>
            <Avatar className="border-2 border-indigo-500">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
              <AvatarFallback className="bg-indigo-100 text-indigo-700">{user?.firstName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">{user?.fullName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </Link>
        )}

        {/* Sign out */}
        <SignOutButton>
          <Button 
            variant="ghost" 
            size="sm"
            className="w-full mt-3 text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
          >
            Log out
          </Button>
        </SignOutButton>
      </SidebarFooter>
    </Sidebar>
  );
}
