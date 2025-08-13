"use client"

import type * as React from "react"
import {
  Calendar,
  FileText,
  Users,
  LayoutTemplate,
  Settings,
  Home,
  Bell,
  HelpCircle,
  Building,
  CreditCard,
  BarChart3,
  Bed,
  Coffee,
  ChefHat,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Sample data for the sidebar
const data = {
  user: {
    name: "Hotel Manager",
    email: "mwumpini@gmail.com",
    avatar: "/placeholder.svg?height=32&width=32&text=MH",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "F&B Management",
      url: "/fnb",
      icon: ChefHat,
      badge: "12",
      items: [
        {
          title: "F&B Dashboard",
          url: "/fnb",
        },
        {
          title: "Restaurant POS",
          url: "/fnb/pos",
        },
        {
          title: "Kitchen Display",
          url: "/fnb/kitchen",
        },
        {
          title: "Bar Management",
          url: "/fnb/bar",
        },
        {
          title: "Menu & Recipes",
          url: "/fnb/menu",
        },
        {
          title: "Inventory",
          url: "/fnb/inventory",
        },
        {
          title: "Procurement",
          url: "/fnb/procurement",
        },
        {
          title: "Table Management",
          url: "/fnb/tables",
        },
        {
          title: "Staff Scheduling",
          url: "/fnb/staff",
        },
      ],
    },
    {
      title: "Rooms",
      url: "/rooms",
      icon: Bed,
      items: [
        {
          title: "All Rooms (50)",
          url: "/rooms",
        },
        {
          title: "Add Room",
          url: "/rooms/new",
        },
        {
          title: "Availability",
          url: "/rooms/availability",
        },
        {
          title: "Maintenance",
          url: "/rooms/maintenance",
        },
      ],
    },
    {
      title: "Bookings",
      url: "/bookings",
      icon: Calendar,
      badge: "23",
      items: [
        {
          title: "All Bookings",
          url: "/bookings",
        },
        {
          title: "New Booking",
          url: "/bookings/new",
        },
        {
          title: "Group Booking",
          url: "/bookings/group",
        },
        {
          title: "Workflow",
          url: "/bookings/workflow",
        },
        {
          title: "Check-ins Today",
          url: "/bookings/checkins",
        },
        {
          title: "Check-outs Today",
          url: "/bookings/checkouts",
        },
      ],
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: FileText,
      badge: "5",
      items: [
        {
          title: "All Invoices",
          url: "/invoices",
        },
        {
          title: "Create Invoice",
          url: "/invoices/new",
        },
        {
          title: "Proforma Invoices",
          url: "/invoices/proforma",
        },
        {
          title: "Receipts",
          url: "/invoices/receipts",
        },
        {
          title: "Overdue",
          url: "/invoices/overdue",
        },
      ],
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Users,
      items: [
        {
          title: "All Clients",
          url: "/clients",
        },
        {
          title: "Add Client",
          url: "/clients/new",
        },
        {
          title: "VIP Clients",
          url: "/clients/vip",
        },
        {
          title: "Corporate Clients",
          url: "/clients/corporate",
        },
      ],
    },
    {
      title: "Services & Facilities",
      url: "/services",
      icon: Coffee,
      items: [
        {
          title: "All Services",
          url: "/services",
        },
        {
          title: "Restaurant & Bar",
          url: "/fnb",
        },
        {
          title: "Pool Services",
          url: "/services/pool",
        },
        {
          title: "Massage Parlor",
          url: "/services/massage",
        },
        {
          title: "Nightclub",
          url: "/services/nightclub",
        },
        {
          title: "Vehicle Rental",
          url: "/services/vehicles",
        },
        {
          title: "Mini Shop",
          url: "/services/shop",
        },
      ],
    },
    {
      title: "Events & Conferences",
      url: "/events",
      icon: Building,
      items: [
        {
          title: "All Events",
          url: "/events",
        },
        {
          title: "New Event",
          url: "/events/new",
        },
        {
          title: "Hall 1 (70 pax)",
          url: "/events/venues/hall1",
        },
        {
          title: "Hall 2 (30 pax)",
          url: "/events/venues/hall2",
        },
        {
          title: "Hall 3 (15 pax)",
          url: "/events/venues/hall3",
        },
        {
          title: "Function Schedule",
          url: "/events/schedule",
        },
        {
          title: "Equipment & AV",
          url: "/events/equipment",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Templates",
      url: "/templates",
      icon: LayoutTemplate,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart3,
      items: [
        {
          title: "All Reports",
          url: "/reports",
        },
        {
          title: "Function Schedule",
          url: "/reports/function-schedule",
        },
        {
          title: "Financial Reports",
          url: "/reports/financial",
        },
        {
          title: "Occupancy Reports",
          url: "/reports/occupancy",
        },
        {
          title: "F&B Reports",
          url: "/reports/fnb",
        },
      ],
    },
    {
      title: "Payments",
      url: "/payments",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  navSupport: [
    {
      title: "Help Center",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
      badge: "3",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Building className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mamani Hotel</span>
                  <span className="truncate text-xs">Management System</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <Collapsible key={item.title} asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support Navigation */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSupport.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={data.user.avatar || "/placeholder.svg"} alt={data.user.name} />
                    <AvatarFallback className="rounded-lg">MH</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{data.user.name}</span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
