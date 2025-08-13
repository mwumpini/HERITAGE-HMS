"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChefHat,
  Clock,
  CheckCircle,
  AlertTriangle,
  Flame,
  Snowflake,
  Utensils,
  Coffee,
  Timer,
  Play,
  RotateCcw,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

// Sample kitchen orders data
const initialOrders = [
  {
    id: "KOT-001",
    tableNumber: "T7",
    orderNumber: "#1234",
    items: [
      { name: "Jollof Rice with Chicken", quantity: 2, station: "hot", modifiers: ["Extra spicy", "No onions"] },
      { name: "Grilled Salmon", quantity: 1, station: "grill", modifiers: ["Medium rare"] },
    ],
    status: "new",
    priority: "urgent",
    orderTime: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    estimatedTime: 20,
    customer: "John Doe",
    specialInstructions: "Customer has nut allergy",
  },
  {
    id: "KOT-002",
    tableNumber: "T12",
    orderNumber: "#1235",
    items: [
      { name: "Banku with Tilapia", quantity: 1, station: "hot", modifiers: [] },
      { name: "Kelewele", quantity: 1, station: "cold", modifiers: ["Extra spicy"] },
    ],
    status: "preparing",
    priority: "normal",
    orderTime: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    estimatedTime: 15,
    customer: "Jane Smith",
    specialInstructions: "",
  },
  {
    id: "KOT-003",
    tableNumber: "T3",
    orderNumber: "#1236",
    items: [
      { name: "Waakye", quantity: 2, station: "hot", modifiers: ["Extra stew"] },
      { name: "Spring Rolls", quantity: 1, station: "cold", modifiers: [] },
    ],
    status: "ready",
    priority: "normal",
    orderTime: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    estimatedTime: 18,
    customer: "Business Meeting",
    specialInstructions: "",
  },
  {
    id: "KOT-004",
    tableNumber: "B2",
    orderNumber: "#1237",
    items: [
      { name: "Chicken Wings", quantity: 3, station: "grill", modifiers: ["Buffalo sauce"] },
      { name: "Fresh Orange Juice", quantity: 2, station: "cold", modifiers: [] },
    ],
    status: "new",
    priority: "normal",
    orderTime: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    estimatedTime: 12,
    customer: "Bar Customer",
    specialInstructions: "",
  },
]

export default function KitchenDisplaySystem() {
  const [orders, setOrders] = useState(initialOrders)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeStation, setActiveStation] = useState("all")

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getElapsedTime = (orderTime) => {
    const elapsed = Math.floor((currentTime - orderTime) / 1000 / 60)
    return elapsed
  }

  const getStatusColor = (status, elapsed, estimated) => {
    if (status === "ready") return "bg-green-100 border-green-300"
    if (elapsed > estimated) return "bg-red-100 border-red-300"
    if (elapsed > estimated * 0.8) return "bg-yellow-100 border-yellow-300"
    return "bg-blue-100 border-blue-300"
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStationIcon = (station) => {
    switch (station) {
      case "hot":
        return <Flame className="w-4 h-4" />
      case "cold":
        return <Snowflake className="w-4 h-4" />
      case "grill":
        return <Utensils className="w-4 h-4" />
      case "bar":
        return <Coffee className="w-4 h-4" />
      default:
        return <ChefHat className="w-4 h-4" />
    }
  }

  const filteredOrders =
    activeStation === "all"
      ? orders
      : orders.filter((order) => order.items.some((item) => item.station === activeStation))

  const ordersByStatus = {
    new: filteredOrders.filter((order) => order.status === "new"),
    preparing: filteredOrders.filter((order) => order.status === "preparing"),
    ready: filteredOrders.filter((order) => order.status === "ready"),
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex h-16 shrink-0 items-center gap-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 text-white" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-gray-600" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/" className="text-gray-300">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/fnb" className="text-gray-300">
                  F&B Management
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/fnb/kitchen" className="text-white">
                  Kitchen Display
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center space-x-4 px-4">
          <Badge variant="outline" className="bg-green-900 text-green-300 border-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Kitchen Online
          </Badge>
          <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
            <Clock className="w-3 h-3 mr-1" />
            {currentTime.toLocaleTimeString()}
          </Badge>
        </div>
      </header>

      <div className="p-4">
        {/* Kitchen Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Orders</p>
                  <p className="text-2xl font-bold text-white">{orders.filter((o) => o.status !== "ready").length}</p>
                </div>
                <ChefHat className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Urgent Orders</p>
                  <p className="text-2xl font-bold text-red-400">
                    {orders.filter((o) => o.priority === "urgent").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Ready to Serve</p>
                  <p className="text-2xl font-bold text-green-400">
                    {orders.filter((o) => o.status === "ready").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Prep Time</p>
                  <p className="text-2xl font-bold text-yellow-400">16 min</p>
                </div>
                <Timer className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Station Filter */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={activeStation === "all" ? "default" : "outline"}
            onClick={() => setActiveStation("all")}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            All Stations
          </Button>
          <Button
            variant={activeStation === "hot" ? "default" : "outline"}
            onClick={() => setActiveStation("hot")}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            <Flame className="w-4 h-4 mr-1" />
            Hot Station
          </Button>
          <Button
            variant={activeStation === "cold" ? "default" : "outline"}
            onClick={() => setActiveStation("cold")}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            <Snowflake className="w-4 h-4 mr-1" />
            Cold Station
          </Button>
          <Button
            variant={activeStation === "grill" ? "default" : "outline"}
            onClick={() => setActiveStation("grill")}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            <Utensils className="w-4 h-4 mr-1" />
            Grill Station
          </Button>
        </div>

        {/* Orders Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Orders */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-red-400 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              New Orders ({ordersByStatus.new.length})
            </h2>
            <div className="space-y-4">
              {ordersByStatus.new.map((order) => {
                const elapsed = getElapsedTime(order.orderTime)
                return (
                  <Card
                    key={order.id}
                    className={`${getStatusColor(order.status, elapsed, order.estimatedTime)} border-2 ${
                      order.priority === "urgent" ? "ring-2 ring-red-500" : ""
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-900">
                          {order.tableNumber} - {order.orderNumber}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getPriorityColor(order.priority)} text-white`}>{order.priority}</Badge>
                          <Badge variant="outline" className="bg-white">
                            {elapsed}m
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                            <div className="flex items-center space-x-2">
                              {getStationIcon(item.station)}
                              <div>
                                <p className="font-medium text-gray-900">
                                  {item.quantity}x {item.name}
                                </p>
                                {item.modifiers.length > 0 && (
                                  <p className="text-xs text-gray-600">{item.modifiers.join(", ")}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {order.specialInstructions && (
                        <div className="mb-4 p-2 bg-yellow-100 rounded border border-yellow-300">
                          <p className="text-sm font-medium text-yellow-800">Special Instructions:</p>
                          <p className="text-sm text-yellow-700">{order.specialInstructions}</p>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => updateOrderStatus(order.id, "preparing")}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Start Prep
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Preparing Orders */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-yellow-400 flex items-center">
              <Timer className="mr-2 h-5 w-5" />
              Preparing ({ordersByStatus.preparing.length})
            </h2>
            <div className="space-y-4">
              {ordersByStatus.preparing.map((order) => {
                const elapsed = getElapsedTime(order.orderTime)
                return (
                  <Card
                    key={order.id}
                    className={`${getStatusColor(order.status, elapsed, order.estimatedTime)} border-2`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-900">
                          {order.tableNumber} - {order.orderNumber}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getPriorityColor(order.priority)} text-white`}>{order.priority}</Badge>
                          <Badge variant="outline" className="bg-white">
                            {elapsed}m
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                            <div className="flex items-center space-x-2">
                              {getStationIcon(item.station)}
                              <div>
                                <p className="font-medium text-gray-900">
                                  {item.quantity}x {item.name}
                                </p>
                                {item.modifiers.length > 0 && (
                                  <p className="text-xs text-gray-600">{item.modifiers.join(", ")}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => updateOrderStatus(order.id, "new")}
                          variant="outline"
                          className="flex-1 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Hold
                        </Button>
                        <Button
                          onClick={() => updateOrderStatus(order.id, "ready")}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Ready
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Ready Orders */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-400 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Ready to Serve ({ordersByStatus.ready.length})
            </h2>
            <div className="space-y-4">
              {ordersByStatus.ready.map((order) => {
                const elapsed = getElapsedTime(order.orderTime)
                return (
                  <Card key={order.id} className="bg-green-100 border-2 border-green-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-900">
                          {order.tableNumber} - {order.orderNumber}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-600 text-white">READY</Badge>
                          <Badge variant="outline" className="bg-white">
                            {elapsed}m
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                            <div className="flex items-center space-x-2">
                              {getStationIcon(item.station)}
                              <div>
                                <p className="font-medium text-gray-900">
                                  {item.quantity}x {item.name}
                                </p>
                                {item.modifiers.length > 0 && (
                                  <p className="text-xs text-gray-600">{item.modifiers.join(", ")}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        onClick={() => setOrders(orders.filter((o) => o.id !== order.id))}
                        className="w-full bg-gray-600 hover:bg-gray-700"
                      >
                        Order Served
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
