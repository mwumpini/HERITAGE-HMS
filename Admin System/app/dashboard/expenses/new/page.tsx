'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'

const expenseCategories = [
  "Asset", "Audit Fees", "Cleaning and Sanitation", "Directors Remuneration", "Donation",
  "Electricity Water and Gas", "Generator - Fuel and Repairs", "Medical Expenses",
  "Newspaper and Periodicals", "Outsourcing", "Postage and Telephone", "Property Rate",
  "Purchases", "Registration and Council Levy", "Repairs and Renovation - Building",
  "SSNIT and Tier 2", "Ghana Tourism Levy", "Repairs -Equipment", "Salaries and Wages",
  "Security Expenses", "Staff Uniform", "Subscriptions", "Travelling and Transport",
  "Vehicle Running Expenses", "Printing and Stationery", "Director Drawings",
  "Fees and Fines", "Hiring Charges"
]

export default function NewExpensePage() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    paymentDetails: '',
    supplier: '',
    amount: '',
    category: '',
    vatType: 'standard',
    mop: 'cash',
    isWithholding: false,
    withholdingType: 'goods'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const amount = parseFloat(formData.amount)
    const VAT_STANDARD_RATE = 0.15
    const VAT_FLAT_RATE = 0.03

    let vatExclusiveAmount = 0
    let inputVat = 0

    if (formData.vatType === 'standard') {
      const vatDenominator = 1 + VAT_STANDARD_RATE
      vatExclusiveAmount = amount / vatDenominator
      inputVat = amount - vatExclusiveAmount
    } else if (formData.vatType === 'flat') {
      inputVat = amount * VAT_FLAT_RATE
      vatExclusiveAmount = amount
    } else {
      inputVat = 0
      vatExclusiveAmount = amount
    }

    const existingExpenses = JSON.parse(localStorage.getItem('ghanaTaxExpenses') || '[]')
    const nextId = existingExpenses.length > 0 ? Math.max(...existingExpenses.map((e: any) => e.id)) + 1 : 1

    const expense = {
      id: nextId,
      date: formData.date,
      paymentDetails: formData.paymentDetails,
      supplier: formData.supplier,
      amount,
      category: formData.category,
      vatType: formData.vatType,
      mop: formData.mop,
      isWithholding: formData.isWithholding,
      withholdingType: formData.isWithholding ? formData.withholdingType : null,
      vatExclusiveAmount,
      inputVat
    }

    existingExpenses.push(expense)
    localStorage.setItem('ghanaTaxExpenses', JSON.stringify(existingExpenses))

    setIsLoading(false)
    setSuccess(true)

    setTimeout(() => {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        paymentDetails: '',
        supplier: '',
        amount: '',
        category: '',
        vatType: 'standard',
        mop: 'cash',
        isWithholding: false,
        withholdingType: 'goods'
      })
      setSuccess(false)
    }, 2000)
  }

  const handleChange = (name: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">New Expense</h1>
          <p className="text-gray-600">Record a new expense transaction</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
          <CardDescription>
            Enter the expense information to calculate input VAT automatically
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <Alert className="mb-6 border-emerald-200 bg-emerald-50">
              <AlertDescription className="text-emerald-800">
                Expense recorded successfully! Input VAT has been calculated.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDetails">Payment Details</Label>
              <Input
                id="paymentDetails"
                placeholder="e.g., Invoice #12345"
                value={formData.paymentDetails}
                onChange={(e) => handleChange('paymentDetails', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                placeholder="e.g., Office Supplies Co."
                value={formData.supplier}
                onChange={(e) => handleChange('supplier', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (GHS)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="Total amount on invoice"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Expense Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vatType">Input VAT Type</Label>
              <Select value={formData.vatType} onValueChange={(value) => handleChange('vatType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Rate (15%)</SelectItem>
                  <SelectItem value="flat">Flat Rate (3%)</SelectItem>
                  <SelectItem value="zero">Zero Rated (0%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mop">Mode of Payment</Label>
              <Select value={formData.mop} onValueChange={(value) => handleChange('mop', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">CASH</SelectItem>
                  <SelectItem value="bank">BANK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="withholding"
                checked={formData.isWithholding}
                onCheckedChange={(checked) => handleChange('isWithholding', checked as boolean)}
              />
              <Label htmlFor="withholding">Withholding Tax</Label>
            </div>

            {formData.isWithholding && (
              <div className="space-y-2">
                <Label htmlFor="withholdingType">Withholding Type</Label>
                <Select value={formData.withholdingType} onValueChange={(value) => handleChange('withholdingType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="goods">Goods</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="works">Works</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? (
                'Recording Expense...'
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Record Expense
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
