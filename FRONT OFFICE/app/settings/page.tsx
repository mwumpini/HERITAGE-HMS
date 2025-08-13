import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Upload } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <p className="text-gray-600">Manage Mamani Hotel settings and preferences</p>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hotel Information</CardTitle>
                <CardDescription>Basic information about Mamani Hotel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hotel-name">Hotel Name</Label>
                    <Input id="hotel-name" defaultValue="Mamani Hotel" />
                  </div>
                  <div>
                    <Label htmlFor="hotel-email">Email</Label>
                    <Input id="hotel-email" type="email" defaultValue="mwumpini@gmail.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hotel-phone">Phone</Label>
                    <Input id="hotel-phone" defaultValue="0540222273" />
                  </div>
                  <div>
                    <Label htmlFor="hotel-website">Website</Label>
                    <Input id="hotel-website" placeholder="www.mamanihotel.com" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="hotel-address">Address</Label>
                  <Textarea id="hotel-address" defaultValue="Hse Num PL 485, Gurugu, Tamale Northern Region, Ghana" />
                </div>
                <div>
                  <Label htmlFor="hotel-logo">Hotel Logo</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="hotel-logo" type="file" accept="image/*" />
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hotel Capacity & Facilities</CardTitle>
                <CardDescription>Configure hotel capacity and available facilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="total-rooms">Total Rooms</Label>
                    <Input id="total-rooms" type="number" defaultValue="50" />
                  </div>
                  <div>
                    <Label htmlFor="hall1-capacity">Hall 1 Capacity</Label>
                    <Input id="hall1-capacity" type="number" defaultValue="70" />
                  </div>
                  <div>
                    <Label htmlFor="hall2-capacity">Hall 2 Capacity</Label>
                    <Input id="hall2-capacity" type="number" defaultValue="30" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="hall3-capacity">Hall 3 Capacity</Label>
                    <Input id="hall3-capacity" type="number" defaultValue="15" />
                  </div>
                  <div>
                    <Label htmlFor="pool-capacity">Pool Capacity</Label>
                    <Input id="pool-capacity" type="number" placeholder="50" />
                  </div>
                  <div>
                    <Label htmlFor="restaurant-capacity">Restaurant Capacity</Label>
                    <Input id="restaurant-capacity" type="number" placeholder="80" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Available Facilities</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="pool" defaultChecked />
                      <Label htmlFor="pool">Swimming Pool</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="restaurant" defaultChecked />
                      <Label htmlFor="restaurant">Restaurant & Bar</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="massage" defaultChecked />
                      <Label htmlFor="massage">Massage Parlor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="nightclub" defaultChecked />
                      <Label htmlFor="nightclub">Nightclub</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="vehicles" defaultChecked />
                      <Label htmlFor="vehicles">Vehicle Rental</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="shop" defaultChecked />
                      <Label htmlFor="shop">Mini Shop</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="wifi" defaultChecked />
                      <Label htmlFor="wifi">Free WiFi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="airport-pickup" defaultChecked />
                      <Label htmlFor="airport-pickup">Airport Pickup</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice Settings</CardTitle>
                <CardDescription>Configure invoice defaults and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                    <Input id="invoice-prefix" defaultValue="MH-INV-" />
                  </div>
                  <div>
                    <Label htmlFor="next-invoice-number">Next Invoice Number</Label>
                    <Input id="next-invoice-number" type="number" defaultValue="001" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="default-template">Default Template</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mamani-classic">Mamani Classic</SelectItem>
                        <SelectItem value="modern-luxury">Modern Luxury</SelectItem>
                        <SelectItem value="business-formal">Business Formal</SelectItem>
                        <SelectItem value="boutique-style">Boutique Style</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="default-currency">Default Currency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ghs">GHS (GH₵)</SelectItem>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                    <Input id="tax-rate" type="number" defaultValue="12.5" />
                  </div>
                  <div>
                    <Label htmlFor="payment-terms">Payment Terms (Days)</Label>
                    <Input id="payment-terms" type="number" defaultValue="30" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="invoice-notes">Default Invoice Notes</Label>
                  <Textarea
                    id="invoice-notes"
                    defaultValue="Thank you for choosing Mamani Hotel. Payment is due within 30 days. We appreciate your business!"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email preferences and templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from-email">From Email</Label>
                    <Input id="from-email" type="email" defaultValue="noreply@mamanihotel.com" />
                  </div>
                  <div>
                    <Label htmlFor="from-name">From Name</Label>
                    <Input id="from-name" defaultValue="Mamani Hotel" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-send-invoices" defaultChecked />
                  <Label htmlFor="auto-send-invoices">Automatically send invoices via email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="send-payment-reminders" defaultChecked />
                  <Label htmlFor="send-payment-reminders">Send payment reminders for overdue invoices</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications">Email notifications for new bookings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="welcome-emails" defaultChecked />
                  <Label htmlFor="welcome-emails">Send welcome emails to new guests</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Rates & Pricing</CardTitle>
                <CardDescription>Configure default rates for hotel services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hall1-rate">Hall 1 Hourly Rate (GH₵)</Label>
                    <Input id="hall1-rate" type="number" placeholder="200" />
                  </div>
                  <div>
                    <Label htmlFor="hall2-rate">Hall 2 Hourly Rate (GH₵)</Label>
                    <Input id="hall2-rate" type="number" placeholder="150" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hall3-rate">Hall 3 Hourly Rate (GH₵)</Label>
                    <Input id="hall3-rate" type="number" placeholder="100" />
                  </div>
                  <div>
                    <Label htmlFor="airport-pickup-rate">Airport Pickup Rate (GH₵)</Label>
                    <Input id="airport-pickup-rate" type="number" placeholder="50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicle-rental-rate">Vehicle Rental Daily Rate (GH₵)</Label>
                    <Input id="vehicle-rental-rate" type="number" placeholder="300" />
                  </div>
                  <div>
                    <Label htmlFor="massage-rate">Massage Service Rate (GH₵)</Label>
                    <Input id="massage-rate" type="number" placeholder="80" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="booking-notifications" defaultChecked />
                  <Label htmlFor="booking-notifications">New booking notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="payment-notifications" defaultChecked />
                  <Label htmlFor="payment-notifications">Payment received notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="overdue-notifications" defaultChecked />
                  <Label htmlFor="overdue-notifications">Overdue invoice notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-notifications" defaultChecked />
                  <Label htmlFor="maintenance-notifications">Maintenance alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="daily-summary" defaultChecked />
                  <Label htmlFor="daily-summary">Daily summary emails</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="conference-reminders" defaultChecked />
                  <Label htmlFor="conference-reminders">Conference hall booking reminders</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
