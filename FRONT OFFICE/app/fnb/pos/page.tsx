"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Smartphone,
  Users,
  Clock,
  CheckCircle,
  Bed,
  Receipt,
  Split,
  Search,
  Zap,
  Star,
  Timer,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

const tables = [
  { id: 1, number: "T1", seats: 4, status: "available", section: "Main Dining", revenue: 0 },
  {
    id: 2,
    number: "T2",
    seats: 2,
    status: "occupied",
    section: "Main Dining",
    customer: "John Doe",
    time: "45 min",
    revenue: 125,
  },
  { id: 3, number: "T3", seats: 6, status: "reserved", section: "Main Dining", time: "7:30 PM", revenue: 0 },
  { id: 4, number: "T4", seats: 4, status: "available", section: "Main Dining", revenue: 0 },
  {
    id: 5,
    number: "T5",
    seats: 8,
    status: "occupied",
    section: "VIP Section",
    customer: "Smith Family",
    time: "20 min",
    revenue: 280,
  },
  { id: 6, number: "T6", seats: 2, status: "cleaning", section: "VIP Section", revenue: 0 },
  { id: 7, number: "B1", seats: 6, status: "available", section: "Bar Area", revenue: 0 },
  {
    id: 8,
    number: "B2",
    seats: 4,
    status: "occupied",
    section: "Bar Area",
    customer: "Business Meeting",
    time: "1h 15min",
    revenue: 340,
  },
]

const menuCategories = [
  {
    id: "appetizers",
    name: "Appetizers",
    icon: "🥗",
    items: [
      {
        id: 1,
        name: "Spring Rolls",
        price: 25,
        description: "Crispy vegetable spring rolls with sweet chili sauce",
        popular: true,
        prepTime: 8,
      },
      {
        id: 2,
        name: "Chicken Wings",
        price: 35,
        description: "Spicy buffalo wings with blue cheese dip",
        popular: true,
        prepTime: 12,
      },
      { id: 3, name: "Kelewele", price: 20, description: "Spiced fried plantain cubes", popular: false, prepTime: 6 },
    ],
  },
  {
    id: "mains",
    name: "Main Courses",
    icon: "🍽️",
    items: [
      {
        id: 4,
        name: "Jollof Rice with Chicken",
        price: 45,
        description: "Traditional jollof rice with grilled chicken",
        popular: true,
        prepTime: 20,
      },
      {
        id: 5,
        name: "Banku with Tilapia",
        price: 55,
        description: "Fresh tilapia with banku and pepper sauce",
        popular: true,
        prepTime: 25,
      },
      {
        id: 6,
        name: "Waakye",
        price: 40,
        description: "Rice and beans with stew and sides",
        popular: false,
        prepTime: 18,
      },
      {
        id: 7,
        name: "Grilled Salmon",
        price: 85,
        description: "Atlantic salmon with vegetables and rice",
        popular: false,
        prepTime: 22,
      },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "🥤",
    items: [
      { id: 8, name: "Club Beer", price: 15, description: "Local premium beer", popular: true, prepTime: 2 },
      {
        id: 9,
        name: "Fresh Orange Juice",
        price: 18,
        description: "Freshly squeezed orange juice",
        popular: false,
        prepTime: 3,
      },
      {
        id: 10,
        name: "Cocktail Special",
        price: 35,
        description: "House special cocktail",
        popular: true,
        prepTime: 5,
      },
      { id: 11, name: "Soft Drinks", price: 12, description: "Coca-Cola, Sprite, Fanta", popular: false, prepTime: 1 },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "🍰",
    items: [
      {
        id: 12,
        name: "Chocolate Cake",
        price: 25,
        description: "Rich chocolate cake with vanilla ice cream",
        popular: false,
        prepTime: 5,
      },
      {
        id: 13,
        name: "Fruit Salad",
        price: 20,
        description: "Fresh seasonal fruit salad",
        popular: false,
        prepTime: 4,
      },
    ],
  },
]

export default function RestaurantPOS() {
  const [selectedTable, setSelectedTable] = useState(null)
  const [currentOrder, setCurrentOrder] = useState([])
  const [activeCategory, setActiveCategory] = useState("appetizers")
  const [showPayment, setShowPayment] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showPopularOnly, setShowPopularOnly] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [orderStartTime, setOrderStartTime] = useState(null)
  const [orderType, setOrderType] = useState("dine-in") // dine-in, room-service, walk-in
  const [guestInfo, setGuestInfo] = useState(null)
  const [roomNumber, setRoomNumber] = useState("")
  const [showGuestLookup, setShowGuestLookup] = useState(false)

  const hotelGuests = [
    { roomNumber: "101", guestName: "John Smith", checkIn: "2024-01-10", checkOut: "2024-01-15", status: "checked-in" },
    { roomNumber: "205", guestName: "Jane Doe", checkIn: "2024-01-12", checkOut: "2024-01-14", status: "checked-in" },
    {
      roomNumber: "312",
      guestName: "Business Corp",
      checkIn: "2024-01-11",
      checkOut: "2024-01-16",
      status: "checked-in",
    },
    {
      roomNumber: "408",
      guestName: "Smith Family",
      checkIn: "2024-01-09",
      checkOut: "2024-01-13",
      status: "checked-in",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredMenuItems = useMemo(() => {
    const category = menuCategories.find((cat) => cat.id === activeCategory)
    if (!category) return []

    return category.items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPopular = !showPopularOnly || item.popular
      return matchesSearch && matchesPopular
    })
  }, [activeCategory, searchTerm, showPopularOnly])

  const addToOrder = (item) => {
    if (!orderStartTime) setOrderStartTime(new Date())

    const existingItem = currentOrder.find((orderItem) => orderItem.id === item.id)
    if (existingItem) {
      setCurrentOrder((prev) =>
        prev.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem,
        ),
      )
    } else {
      setCurrentOrder((prev) => [...prev, { ...item, quantity: 1 }])
    }
  }

  const removeFromOrder = (itemId) => {
    const existingItem = currentOrder.find((orderItem) => orderItem.id === itemId)
    if (existingItem && existingItem.quantity > 1) {
      setCurrentOrder((prev) =>
        prev.map((orderItem) =>
          orderItem.id === itemId ? { ...orderItem, quantity: orderItem.quantity - 1 } : orderItem,
        ),
      )
    } else {
      setCurrentOrder((prev) => prev.filter((orderItem) => orderItem.id !== itemId))
    }
  }

  const orderCalculations = useMemo(() => {
    const subtotal = currentOrder.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const serviceCharge = orderType === "room-service" ? subtotal * 0.1 : 0 // 10% service charge for room service
    const tax = (subtotal + serviceCharge) * 0.125
    const total = subtotal + serviceCharge + tax
    const estimatedPrepTime = Math.max(...currentOrder.map((item) => item.prepTime || 10))
    const deliveryTime = orderType === "room-service" ? 15 : 0 // Additional 15 min for room service delivery

    return { subtotal, serviceCharge, tax, total, estimatedPrepTime, deliveryTime }
  }, [currentOrder, orderType])

  const generateKOT = () => {
    const kotItems = currentOrder.filter((item) =>
      ["appetizers", "mains", "desserts"].some((cat) =>
        menuCategories.find((c) => c.id === cat)?.items.some((i) => i.id === item.id),
      ),
    )

    if (kotItems.length > 0) {
      console.log("KOT Generated:", {
        orderNumber: `KOT-${Date.now()}`,
        table: selectedTable?.number || `Room ${roomNumber}`,
        orderType,
        items: kotItems,
        specialInstructions: "",
        timestamp: new Date().toISOString(),
      })
      // In real implementation, this would send to kitchen printer/display
    }
  }

  const generateBOT = () => {
    const botItems = currentOrder.filter((item) =>
      menuCategories.find((c) => c.id === "beverages")?.items.some((i) => i.id === item.id),
    )

    if (botItems.length > 0) {
      console.log("BOT Generated:", {
        orderNumber: `BOT-${Date.now()}`,
        table: selectedTable?.number || `Room ${roomNumber}`,
        orderType,
        items: botItems,
        timestamp: new Date().toISOString(),
      })
      // In real implementation, this would send to bar printer/display
    }
  }

  const lookupGuest = (room) => {
    const guest = hotelGuests.find((g) => g.roomNumber === room && g.status === "checked-in")
    if (guest) {
      setGuestInfo(guest)
      setRoomNumber(room)
      return true
    }
    return false
  }

  const getTableStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 border-green-300 text-green-800 hover:bg-green-200"
      case "occupied":
        return "bg-red-100 border-red-300 text-red-800 hover:bg-red-200"
      case "reserved":
        return "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
      case "cleaning":
        return "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/fnb">F&B Management</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/fnb/pos">Restaurant POS</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center space-x-3 px-4">
          <Select value={orderType} onValueChange={setOrderType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dine-in">Dine-In</SelectItem>
              <SelectItem value="room-service">Room Service</SelectItem>
              <SelectItem value="walk-in">Walk-In</SelectItem>
            </SelectContent>
          </Select>

          {selectedTable && orderType === "dine-in" && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <Users className="w-3 h-3 mr-1" />
              {selectedTable.number}
            </Badge>
          )}

          {guestInfo && orderType === "room-service" && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              <Bed className="w-3 h-3 mr-1" />
              Room {guestInfo.roomNumber} - {guestInfo.guestName}
            </Badge>
          )}

          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            System Online
          </Badge>
          <Badge variant="outline" className="hidden sm:flex">
            <Clock className="w-3 h-3 mr-1" />
            {currentTime.toLocaleTimeString()}
          </Badge>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Tables & Menu */}
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue={orderType === "room-service" ? "menu" : "tables"} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
              <TabsTrigger value="tables" disabled={orderType === "room-service"}>
                Table Management
              </TabsTrigger>
              <TabsTrigger value="menu">Menu Items</TabsTrigger>
              <TabsTrigger value="room-service" disabled={orderType !== "room-service"}>
                Room Service
              </TabsTrigger>
            </TabsList>

            {/* Room Service Tab */}
            <TabsContent value="room-service" className="flex-1 p-4 pt-2">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Bed className="mr-2 h-5 w-5" />
                    Room Service Orders
                  </CardTitle>
                  <CardDescription>Enter room number to start room service order</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter room number..."
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => {
                          if (lookupGuest(roomNumber)) {
                            // Guest found
                          } else {
                            alert("Guest not found or not checked in")
                          }
                        }}
                      >
                        Lookup Guest
                      </Button>
                    </div>

                    {guestInfo && (
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">Room {guestInfo.roomNumber}</h3>
                              <p className="text-sm text-gray-600">{guestInfo.guestName}</p>
                              <p className="text-xs text-gray-500">
                                Check-in: {guestInfo.checkIn} | Check-out: {guestInfo.checkOut}
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Verified Guest</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {hotelGuests.map((guest) => (
                        <Card
                          key={guest.roomNumber}
                          className={`cursor-pointer hover:shadow-md transition-all ${
                            guestInfo?.roomNumber === guest.roomNumber ? "border-blue-500 bg-blue-50" : ""
                          }`}
                          onClick={() => {
                            setGuestInfo(guest)
                            setRoomNumber(guest.roomNumber)
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">Room {guest.roomNumber}</h4>
                                <p className="text-sm text-gray-600">{guest.guestName}</p>
                                <p className="text-xs text-gray-500">Until {guest.checkOut}</p>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                {guest.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Table Management Tab */}
            <TabsContent value="tables" className="flex-1 p-4 pt-2">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5" />
                    Restaurant Floor Plan
                  </CardTitle>
                  <CardDescription>
                    Select a table to start taking orders • {tables.filter((t) => t.status === "occupied").length} of{" "}
                    {tables.length} tables occupied
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-y-auto">
                  <div className="space-y-6">
                    {["Main Dining", "VIP Section", "Bar Area"].map((section) => (
                      <div key={section}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{section}</h3>
                          <Badge variant="outline" className="text-xs">
                            Revenue: GH₵
                            {tables.filter((t) => t.section === section).reduce((sum, t) => sum + (t.revenue || 0), 0)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {tables
                            .filter((table) => table.section === section)
                            .map((table) => (
                              <div
                                key={table.id}
                                onClick={() => setSelectedTable(table)}
                                className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                  selectedTable?.id === table.id
                                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                    : getTableStatusColor(table.status)
                                }`}
                              >
                                <div className="text-center">
                                  <div className="font-bold text-base sm:text-lg">{table.number}</div>
                                  <div className="text-xs sm:text-sm text-gray-600">{table.seats} seats</div>
                                  {table.customer && (
                                    <div className="text-xs mt-1">
                                      <div className="font-medium truncate">{table.customer}</div>
                                      <div className="text-gray-500">{table.time}</div>
                                      {table.revenue > 0 && (
                                        <div className="text-green-600 font-medium">GH₵{table.revenue}</div>
                                      )}
                                    </div>
                                  )}
                                  {table.status === "reserved" && (
                                    <div className="text-xs mt-1 text-yellow-700">{table.time}</div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Menu Items Tab */}
            <TabsContent value="menu" className="flex-1 p-4 pt-2">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">Menu Items</CardTitle>
                      <CardDescription>
                        {selectedTable ? `Adding items for ${selectedTable.number}` : "Select a table first"}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search menu..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 w-40"
                        />
                      </div>
                      <Button
                        variant={showPopularOnly ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowPopularOnly(!showPopularOnly)}
                        className="bg-transparent"
                      >
                        <Star className="w-4 h-4 mr-1" />
                        Popular
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="overflow-y-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {menuCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "outline"}
                        onClick={() => setActiveCategory(category.id)}
                        className="bg-transparent text-sm"
                        size="sm"
                      >
                        <span className="mr-1">{category.icon}</span>
                        {category.name}
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMenuItems.map((item) => (
                      <Card key={item.id} className="cursor-pointer hover:shadow-md transition-all hover:scale-105">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              {item.popular && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                            </div>
                            <span className="font-bold text-green-600 text-sm">GH₵{item.price}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {item.prepTime}min
                            </Badge>
                          </div>
                          <Button
                            onClick={() => addToOrder(item)}
                            disabled={!selectedTable && orderType !== "room-service"}
                            className="w-full"
                            size="sm"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add to Order
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredMenuItems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <p>No items found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Current Order */}
        <div className="w-80 sm:w-96 bg-white border-l flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Current Order
            </h2>
            {selectedTable && orderType === "dine-in" && (
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600">
                  Table: {selectedTable.number} ({selectedTable.seats} seats)
                </p>
                {orderStartTime && (
                  <Badge variant="outline" className="text-xs">
                    <Timer className="w-3 h-3 mr-1" />
                    {Math.floor((currentTime - orderStartTime) / 1000 / 60)}m
                  </Badge>
                )}
              </div>
            )}
            {guestInfo && orderType === "room-service" && (
              <div className="mt-1">
                <p className="text-sm text-gray-600">
                  Room Service: {guestInfo.roomNumber} - {guestInfo.guestName}
                </p>
                <Badge variant="outline" className="text-xs mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  Est. Delivery: {orderCalculations.estimatedPrepTime + orderCalculations.deliveryTime}min
                </Badge>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {currentOrder.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p>No items in order</p>
                <p className="text-sm">Select a table and add menu items</p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentOrder.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        {item.popular && <Star className="w-3 h-3 text-yellow-500 fill-current flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-600">GH₵{item.price} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => removeFromOrder(item.id)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => addToOrder(item)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="ml-3 text-right">
                      <p className="font-semibold text-sm">GH₵{item.price * item.quantity}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setCurrentOrder(currentOrder.filter((orderItem) => orderItem.id !== item.id))}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {currentOrder.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span>Subtotal:</span>
                  <span>GH₵{orderCalculations.subtotal.toFixed(2)}</span>
                </div>
                {orderCalculations.serviceCharge > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span>Service Charge (10%):</span>
                    <span>GH₵{orderCalculations.serviceCharge.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm">
                  <span>Tax (12.5%):</span>
                  <span>GH₵{orderCalculations.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Est. {orderType === "room-service" ? "Delivery" : "Prep"} Time:</span>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {orderType === "room-service"
                      ? `${orderCalculations.estimatedPrepTime + orderCalculations.deliveryTime}min`
                      : `${orderCalculations.estimatedPrepTime}min`}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>GH₵{orderCalculations.total.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" className="bg-transparent text-sm" size="sm">
                    <Split className="w-4 h-4 mr-1" />
                    Split Bill
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent text-sm"
                    size="sm"
                    onClick={() => {
                      generateKOT()
                      generateBOT()
                    }}
                  >
                    <Receipt className="w-4 h-4 mr-1" />
                    Print KOT/BOT
                  </Button>
                </div>

                <Dialog open={showPayment} onOpenChange={setShowPayment}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Process Payment - GH₵{orderCalculations.total.toFixed(2)}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Process Payment</DialogTitle>
                      <DialogDescription>
                        {orderType === "dine-in" && selectedTable && `Table ${selectedTable.number}`}
                        {orderType === "room-service" &&
                          guestInfo &&
                          `Room ${guestInfo.roomNumber} - ${guestInfo.guestName}`}
                        {orderType === "walk-in" && "Walk-in Customer"}
                        {" • Total: GH₵"}
                        {orderCalculations.total.toFixed(2)}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-20 flex-col bg-transparent hover:bg-green-50">
                          <Banknote className="w-6 h-6 mb-1" />
                          <span className="text-sm">Cash</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col bg-transparent hover:bg-blue-50">
                          <CreditCard className="w-6 h-6 mb-1" />
                          <span className="text-sm">Card</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col bg-transparent hover:bg-purple-50">
                          <Smartphone className="w-6 h-6 mb-1" />
                          <span className="text-sm">Mobile Money</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-20 flex-col bg-transparent hover:bg-orange-50"
                          disabled={!guestInfo && orderType !== "room-service"}
                        >
                          <Bed className="w-6 h-6 mb-1" />
                          <span className="text-sm">Room Charge</span>
                        </Button>
                      </div>

                      {(orderType === "room-service" || guestInfo) && (
                        <div className="space-y-2">
                          <Label htmlFor="room-number">Room Number</Label>
                          <Select value={guestInfo?.roomNumber || ""}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select room" />
                            </SelectTrigger>
                            <SelectContent>
                              {hotelGuests.map((guest) => (
                                <SelectItem key={guest.roomNumber} value={guest.roomNumber}>
                                  Room {guest.roomNumber} - {guest.guestName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => setShowPayment(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => {
                            if (guestInfo && orderType === "room-service") {
                              console.log("Room charge posted:", {
                                roomNumber: guestInfo.roomNumber,
                                guestName: guestInfo.guestName,
                                amount: orderCalculations.total,
                                items: currentOrder,
                                timestamp: new Date().toISOString(),
                              })
                            }
                            generateKOT()
                            generateBOT()
                            setCurrentOrder([])
                            setShowPayment(false)
                            setSelectedTable(null)
                            setOrderStartTime(null)
                            if (orderType === "room-service") {
                              setGuestInfo(null)
                              setRoomNumber("")
                            }
                          }}
                        >
                          <Zap className="w-4 h-4 mr-1" />
                          Complete Payment
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
