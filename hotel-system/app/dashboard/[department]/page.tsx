"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/contexts/auth-context"
import {
  Hotel,
  UtensilsCrossed,
  Brush,
  Wrench,
  User,
  Settings,
  ArrowLeft,
  Calendar,
  Users,
  BarChart3,
  FileText,
} from "lucide-react"

const departmentConfig = {
  "front-office": {
    name: "Front Office",
    icon: Hotel,
    color: "blue",
    features: [
      { name: "Room Management", icon: Hotel, description: "Manage room bookings and availability" },
      { name: "Guest Check-in/out", icon: Users, description: "Handle guest arrivals and departures" },
      { name: "Reservations", icon: Calendar, description: "View and manage reservations" },
      { name: "Reports", icon: BarChart3, description: "Generate occupancy and revenue reports" },
    ],
  },
  "food-beverage": {
    name: "Food & Beverage",
    icon: UtensilsCrossed,
    color: "green",
    features: [
      { name: "Menu Management", icon: FileText, description: "Update menus and pricing" },
      { name: "Order Processing", icon: UtensilsCrossed, description: "Handle restaurant orders" },
      { name: "Inventory", icon: BarChart3, description: "Track food and beverage inventory" },
      { name: "Staff Scheduling", icon: Users, description: "Manage F&B staff schedules" },
    ],
  },
  housekeeping: {
    name: "Housekeeping",
    icon: Brush,
    color: "purple",
    features: [
      { name: "Room Status", icon: Hotel, description: "Track room cleaning status" },
      { name: "Task Assignment", icon: FileText, description: "Assign cleaning tasks to staff" },
      { name: "Inventory Management", icon: BarChart3, description: "Manage cleaning supplies" },
      { name: "Staff Schedule", icon: Calendar, description: "Schedule housekeeping staff" },
    ],
  },
  "security-maintenance": {
    name: "Security & Maintenance",
    icon: Wrench,
    color: "orange",
    features: [
      { name: "Maintenance Requests", icon: Wrench, description: "Handle repair and maintenance requests" },
      { name: "Security Logs", icon: FileText, description: "Monitor security incidents" },
      { name: "Equipment Status", icon: BarChart3, description: "Track equipment condition" },
      { name: "Staff Management", icon: Users, description: "Manage security and maintenance staff" },
    ],
  },
  administration: {
    name: "Administration",
    icon: User,
    color: "indigo",
    features: [
      { name: "Staff Management", icon: Users, description: "Manage all hotel staff" },
      { name: "Financial Reports", icon: BarChart3, description: "View financial analytics" },
      { name: "Policy Management", icon: FileText, description: "Update hotel policies" },
      { name: "Scheduling", icon: Calendar, description: "Coordinate department schedules" },
    ],
  },
  "system-admin": {
    name: "System Admin",
    icon: Settings,
    color: "gray",
    features: [
      { name: "User Management", icon: Users, description: "Manage system users and permissions" },
      { name: "System Settings", icon: Settings, description: "Configure system parameters" },
      { name: "Backup & Recovery", icon: FileText, description: "Manage data backups" },
      { name: "System Monitoring", icon: BarChart3, description: "Monitor system performance" },
    ],
  },
}

function DepartmentDashboard() {
  const params = useParams()
  const { user, logout } = useAuth()
  const departmentId = params.department as string

  const department = departmentConfig[departmentId as keyof typeof departmentConfig]

  if (!department) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Department Not Found</h1>
          <Button onClick={() => (window.location.href = "/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const Icon = department.icon

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/")} className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Icon className={`w-8 h-8 text-${department.color}-600 mr-3`} />
              <h1 className="text-xl font-semibold text-gray-900">{department.name} Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to {department.name}</h2>
          <p className="text-gray-600">Manage your department operations from this dashboard.</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {department.features.map((feature, index) => {
            const FeatureIcon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div
                    className={`w-12 h-12 bg-${department.color}-100 rounded-lg flex items-center justify-center mb-3`}
                  >
                    <FeatureIcon className={`w-6 h-6 text-${department.color}-600`} />
                  </div>
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Staff Online</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DepartmentPage() {
  return (
    <AuthGuard>
      <DepartmentDashboard />
    </AuthGuard>
  )
}
