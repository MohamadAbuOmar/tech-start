"use client";

import * as React from "react";
import {Image, Layers, Radio, Video, Home} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { NavMain } from "./nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface NavItem {
  title: string;
  url: string;
  icon?: React.ElementType;
  items?: NavItem[];
  isActive?: boolean;
}

const data: { navMain: NavItem[] } = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Pages",
      url: "#",
      icon: Layers,
      items: [
        {
          title: "Home|Hero",
          url: "/admin/pages/home",
        },
        {
          title: "Home|StatsUpCount",
          url: "/admin/pages/stats",
        },
        {
          title: "Home|Programs",
          url: "/admin/pages/programs",
        },
        {
          title: "Footer",
          url: "/admin/pages/footer",
        },
        {
          title: "Palestinian IT Leads",
          url: "/admin/beneficiaries",
        },
        {
          title: "About Us",
          url: "/admin/pages/about",
        },
        {
          title: "Focus Areas",
          url: "/admin/pages/focusareas",
        },
        {
          title: "Team Members",
          url: "/admin/pages/team",
        },
        {
          title: "Work With Us",
          url: "/admin/pages/work-with-us",
        },
        {
          title: "Contact Submissions",
          url: "/admin/pages/contact-submissions",
        },
        {
          title: "Complaints Submissions",
          url: "/admin/complaints",
        },
        {
          title: "FAQ Management",
          url: "/admin/pages/faq",
        },
        {
          title: "Safeguards",
          url: "/admin/safeguards",
        },
      ],
    },
    {
      title: "Media Center",
      url: "#",
      icon: Radio,
      items: [
        {
          title: "Create A Blog",
          url: "/admin/blog/create",
        },
        {
          title: "All Blogs",
          url: "/admin/blog",
        },
      ],
    },
    {
      title: "Gallery",
      url: "#",
      icon: Image,
      items: [
        {
          title: "Image Gallery",
          url: "#",
          icon: Image,
          items: [
            {
              title: "All Images",
              url: "/admin/ImageGallery",
            },
            {
              title: "Create Image Gallery",
              url: "/admin/ImageGallery/create",
            },
          ],
        },
        {
          title: "Video Gallery",
          url: "#",
          icon: Video,
          items: [
            {
              title: "All Videos",
              url: "/admin/VideoGallery",
            },
            {
              title: "Create Video Gallery",
              url: "/admin/VideoGallery/create",
            },
          ],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMainWithActive = React.useMemo(() => {
    const markActive = (items: NavItem[]): NavItem[] => {
      return items.map(item => ({
        ...item,
        isActive: item.url === pathname || (item.items && markActive(item.items).some(subItem => subItem.isActive)),
        items: item.items ? markActive(item.items) : undefined
      }));
    };
    return markActive(data.navMain);
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMainWithActive} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-center h-16">
          <Button asChild variant="outline" className="w-full mx-4">
            <Link href="/">Back to Front</Link>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

