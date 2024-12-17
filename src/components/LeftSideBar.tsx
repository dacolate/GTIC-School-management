"use client";

import {
  Home,
  Users,
  DollarSign,
  BookOpen,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  //   SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Users, label: "Students", href: "/students" },
  { icon: DollarSign, label: "Payments", href: "/payments" },
  { icon: BookOpen, label: "Classes", href: "/classes" },
  { icon: Calendar, label: "Schedule", href: "/schedule" },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      {/* <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2">School Manager</h2>
      </SidebarHeader> */}
      <SidebarContent>
        <div className="flex items-center text-2xl font-extrabold pt-4">
          <GraduationCap className="mr-2 h-10 w-10" />
          <span className="">GTIC</span>
        </div>
        <SidebarMenu className="py-4">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href} className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarTrigger className="absolute top-4 right-4 md:hidden" />
    </Sidebar>
  );
}
