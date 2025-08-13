"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Home,
  ShoppingCart,
  Receipt,
  Package,
  Users,
  Calculator,
  MapPin,
  Wallet,
  BarChart3,
  UserCheck,
  Settings,
  HelpCircle,
  ChevronDown,
  Shield,
  Building2,
  FileText,
  DollarSign,
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
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { getCurrentUser, logout } from "@/lib/auth"
import type { UserRole } from "@/types/auth"

const navigationData = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      roles: [
        "administrator", // Added administrator role to main navigation
        "management",
        "supervisor",
        "frontdesk",
        "sales",
        "storekeeper",
        "officer",
        "accountant",
        "viewer",
      ] as UserRole[],
    },
  ],
  business: [
    {
      title: "Sales",
      icon: ShoppingCart,
      roles: ["administrator", "management", "supervisor", "frontdesk", "sales"] as UserRole[], // Added administrator role
      items: [
        {
          title: "View Sales",
          url: "/dashboard/sales",
          roles: ["administrator", "management", "supervisor", "frontdesk", "sales", "accountant"] as UserRole[],
        },
        {
          title: "New Sale",
          url: "/dashboard/sales/new",
          roles: ["administrator", "management", "supervisor", "frontdesk", "sales"] as UserRole[],
        },
        {
          title: "Customers",
          url: "/dashboard/sales/customers",
          roles: ["administrator", "management", "supervisor", "frontdesk", "sales"] as UserRole[],
        },
      ],
    },
    {
      title: "Expenses",
      icon: Receipt,
      roles: ["administrator", "management", "supervisor", "accountant", "officer"] as UserRole[], // Added administrator role
      items: [
        {
          title: "View Expenses",
          url: "/dashboard/expenses",
          roles: ["administrator", "management", "supervisor", "accountant", "officer"] as UserRole[],
        },
        {
          title: "New Expense",
          url: "/dashboard/expenses/new",
          roles: ["administrator", "management", "supervisor", "accountant", "officer"] as UserRole[],
        },
      ],
    },
    {
      title: "Inventory",
      icon: Package,
      roles: ["administrator", "management", "supervisor", "storekeeper", "officer"] as UserRole[], // Added administrator role
      items: [
        {
          title: "Stock Overview",
          url: "/dashboard/inventory",
          roles: ["administrator", "management", "supervisor", "storekeeper", "officer"] as UserRole[],
        },
        {
          title: "New Inventory Item",
          url: "/dashboard/inventory/new",
          roles: ["administrator", "management", "supervisor", "storekeeper"] as UserRole[],
        },
        {
          title: "Stock Entry",
          url: "/dashboard/inventory/entry",
          roles: ["administrator", "management", "supervisor", "storekeeper"] as UserRole[],
        },
        {
          title: "Stock Sheet",
          url: "/dashboard/inventory/sheet",
          roles: ["administrator", "management", "supervisor", "storekeeper", "officer"] as UserRole[],
        },
        {
          title: "Stock Transfers",
          url: "/dashboard/inventory/transfers",
          roles: ["administrator", "management", "supervisor", "storekeeper"] as UserRole[],
        },
        {
          title: "Requisitions",
          url: "/dashboard/inventory/requisitions",
          roles: ["administrator", "management", "supervisor", "storekeeper", "officer"] as UserRole[],
        },
        {
          title: "Purchase Orders",
          url: "/dashboard/inventory/purchase-orders",
          roles: ["administrator", "management", "supervisor"] as UserRole[],
        },
        {
          title: "Suppliers",
          url: "/dashboard/inventory/suppliers",
          roles: ["administrator", "management", "supervisor", "storekeeper"] as UserRole[],
        },
        {
          title: "Recipe Calculator",
          url: "/dashboard/inventory/recipe-calculator",
          roles: ["administrator", "management", "supervisor", "storekeeper"] as UserRole[],
        },
      ],
    },
    {
      title: "Front Desk",
      icon: Users,
      roles: ["administrator", "management", "supervisor", "frontdesk"] as UserRole[], // Added front desk operations
      items: [
        {
          title: "Guest Management",
          url: "/dashboard/frontdesk",
          roles: ["administrator", "management", "supervisor", "frontdesk"] as UserRole[],
        },
      ],
    },
    {
      title: "Payroll",
      icon: Users,
      roles: ["administrator", "management", "supervisor", "accountant"] as UserRole[], // Added administrator role
      items: [
        {
          title: "Staff Management",
          url: "/dashboard/payroll/staff-management",
          roles: ["administrator", "management", "supervisor"] as UserRole[],
        },
        {
          title: "Payroll (PAYE)",
          url: "/dashboard/payroll",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "SSNIT",
          url: "/dashboard/payroll/ssnit",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "Income Tax",
          url: "/dashboard/payroll/income-tax",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "Tier 2 & 3 Pensions",
          url: "/dashboard/payroll/tier2-3",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
      ],
    },
  ],
  accounting: [
    {
      title: "Accounting & Finance",
      icon: Calculator,
      roles: ["administrator", "management", "accountant"] as UserRole[],
      items: [
        {
          title: "Overview",
          url: "/dashboard/accounting",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "Financial Reports",
          url: "/dashboard/accounting/reports",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "Chart of Accounts",
          url: "/dashboard/accounting/chart-of-accounts",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "Journal Entries",
          url: "/dashboard/accounting/journal",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "Accounts Payable",
          url: "/dashboard/accounting/payables",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "Accounts Receivable",
          url: "/dashboard/accounting/receivables",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "Fixed Assets",
          url: "/dashboard/accounting/assets",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
      ],
    },
  ],
  compliance: [
    {
      title: "GRA",
      icon: FileText,
      roles: ["administrator", "management", "accountant"] as UserRole[], // Added administrator role
      items: [
        {
          title: "VAT Return",
          url: "/dashboard/gra/vat",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "GRA Levies",
          url: "/dashboard/gra/levies",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
      ],
    },
    {
      title: "GTA",
      icon: MapPin,
      roles: ["administrator", "management", "accountant"] as UserRole[], // Added administrator role
      items: [
        {
          title: "Tourism Levy",
          url: "/dashboard/gta/tourism",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
      ],
    },
    {
      title: "Withholding Tax",
      icon: Wallet,
      roles: ["administrator", "management", "accountant"] as UserRole[], // Added administrator role
      items: [
        {
          title: "View Records",
          url: "/dashboard/withholding",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "New Record",
          url: "/dashboard/withholding/new",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
      ],
    },
  ],
  reports: [
    {
      title: "Reports",
      icon: BarChart3,
      roles: ["administrator", "management", "supervisor", "accountant"] as UserRole[], // Added administrator role
      items: [
        {
          title: "Reports Overview",
          url: "/dashboard/reports",
          roles: ["administrator", "management", "supervisor", "accountant", "sales", "frontdesk"] as UserRole[],
        },
        {
          title: "Sales Reports and Analysis",
          url: "/dashboard/reports/sales",
          roles: ["administrator", "management", "supervisor", "sales", "accountant"] as UserRole[],
        },
        {
          title: "Expenses Reports",
          url: "/dashboard/reports/expenses",
          roles: ["administrator", "management", "supervisor", "accountant"] as UserRole[],
        },
        {
          title: "Payroll Reports",
          url: "/dashboard/reports/payroll",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
        {
          title: "Tax & Compliance Reports",
          url: "/dashboard/reports/tax-compliance",
          roles: ["administrator", "management", "accountant"] as UserRole[],
        },
      ],
    },
  ],
  admin: [
    {
      title: "User Management",
      icon: UserCheck,
      roles: ["administrator", "management"] as UserRole[], // Added administrator role
      items: [
        {
          title: "All Users",
          url: "/dashboard/users",
          roles: ["administrator", "management"] as UserRole[],
        },
        {
          title: "Add User",
          url: "/dashboard/users/new",
          roles: ["administrator", "management"] as UserRole[],
        },
        {
          title: "Authorisers",
          url: "/dashboard/users/authorisers",
          roles: ["administrator", "management"] as UserRole[],
        },
      ],
    },
  ],
  settings: [
    {
      title: "Settings",
      icon: Settings,
      roles: [
        "administrator", // Added administrator role
        "management",
        "supervisor",
        "frontdesk",
        "sales",
        "storekeeper",
        "officer",
        "accountant",
        "viewer",
      ] as UserRole[],
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
          roles: [
            "administrator", // Added administrator role
            "management",
            "supervisor",
            "frontdesk",
            "sales",
            "storekeeper",
            "officer",
            "accountant",
            "viewer",
          ] as UserRole[],
        },
        {
          title: "Company",
          url: "/dashboard/settings/company",
          roles: ["administrator", "management"] as UserRole[], // Added administrator role
        },
        {
          title: "Subscription",
          url: "/dashboard/subscription",
          roles: ["administrator", "management"] as UserRole[], // Added administrator role
        },
      ],
    },
    {
      title: "Help & Support",
      url: "/dashboard/help",
      icon: HelpCircle,
      roles: [
        "administrator", // Added administrator role
        "management",
        "supervisor",
        "frontdesk",
        "sales",
        "storekeeper",
        "officer",
        "accountant",
        "viewer",
      ] as UserRole[],
    },
  ],
}

const hasAccessToItem = (item: any, userRole: UserRole | undefined): boolean => {
  if (!userRole || !item.roles) return true
  if (userRole === "administrator") return true
  return item.roles.includes(userRole)
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  const userRole = user?.role as UserRole
  const isManagement = userRole === "management" || userRole === "administrator" // Administrator is also management
  const canAccessAdmin = isManagement

  const handleExport = () => {
    // Export functionality
    console.log("Exporting data...")
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-sidebar-primary-foreground">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-orange-600">Kali Syn</span>
                  <span className="truncate text-xs text-muted-foreground">Syncing Ghana's Hospitality</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.main
                .filter((item) => hasAccessToItem(item, userRole))
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Business Operations */}
        <SidebarGroup>
          <SidebarGroupLabel>Business Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.business
                .filter((item) => hasAccessToItem(item, userRole))
                .map((item) => (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.items?.some((subItem) => pathname.startsWith(subItem.url))}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items
                            ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                            .map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {(userRole === "administrator" || userRole === "management" || userRole === "accountant") && (
          <SidebarGroup>
            <SidebarGroupLabel>Accounting & Finance</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.accounting
                  .filter((item) => hasAccessToItem(item, userRole))
                  .map((item) => (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.items?.some((subItem) => pathname.startsWith(subItem.url))}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items
                              ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                              .map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {(userRole === "administrator" || userRole === "management" || userRole === "accountant") && (
          <SidebarGroup>
            <SidebarGroupLabel>Tax & Compliance</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.compliance
                  .filter((item) => hasAccessToItem(item, userRole))
                  .map((item) => (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.items?.some((subItem) => pathname.startsWith(subItem.url))}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items
                              ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                              .map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.reports
                .filter((item) => hasAccessToItem(item, userRole))
                .map((item) => (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.items?.some((subItem) => pathname.startsWith(subItem.url))}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items
                            ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                            .map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {(userRole === "administrator" || userRole === "management") && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.admin
                  .filter((item) => hasAccessToItem(item, userRole))
                  .map((item) => (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.items?.some((subItem) => pathname.startsWith(subItem.url))}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items
                              ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                              .map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ))}
                {/* Audit Trail - Management and Administrator only */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/audit"}>
                    <Link href="/audit">
                      <Shield />
                      <span>Audit Trail</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Settings & Support */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings & Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.settings
                .filter((item) => hasAccessToItem(item, userRole))
                .map((item) =>
                  item.items ? (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.items?.some((subItem) => pathname.startsWith(subItem.url))}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items
                              ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                              .map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.url}>
                        <Link href={item.url!}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
                )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button variant="outline" onClick={handleExport} className="w-full justify-start bg-transparent">
              <DollarSign className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-red-600 hover:text-red-700"
            >
              <span>Logout</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
