"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Hotel, UtensilsCrossed, Brush, Wrench, User, Settings, LogOut } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/contexts/auth-context"

const departments = [
  {
    id: "front-office",
    name: "Front Office",
    icon: Hotel,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "food-beverage",
    name: "Food & Beverage",
    icon: UtensilsCrossed,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "housekeeping-maintenance",
    name: "Housekeeping & Maintenance",
    icon: Brush,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "security",
    name: "Security",
    icon: Wrench,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: "administration",
    name: "Administration",
    icon: User,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: "system-admin",
    name: "System Admin",
    icon: Settings,
    bgColor: "bg-gray-100",
    iconColor: "text-gray-600",
  },
]

function DashboardContent() {
  const { user, logout, setUserDepartment } = useAuth()
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(user?.department || null)

  const handleAccessDepartment = () => {
    if (selectedDepartment) {
      setUserDepartment(selectedDepartment)
      // Navigate to department-specific dashboard instead of showing alert
      window.location.href = `/dashboard/${selectedDepartment}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Hotel className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Hotel Management System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2 bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-4 pt-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Department Dashboard</h2>
            <p className="text-lg text-gray-600">Select your department to access the management tools.</p>
          </div>

          {/* Department Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {departments.map((department) => {
              const Icon = department.icon
              const isSelected = selectedDepartment === department.id

              return (
                <Card
                  key={department.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected ? "ring-2 ring-blue-500 border-blue-500 shadow-lg" : "hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedDepartment(department.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-20 h-20 rounded-full ${department.bgColor} flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className={`w-10 h-10 ${department.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{department.name}</h3>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center">
            <Button
              onClick={handleAccessDepartment}
              disabled={!selectedDepartment}
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Access Department
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HotelSystemDashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
