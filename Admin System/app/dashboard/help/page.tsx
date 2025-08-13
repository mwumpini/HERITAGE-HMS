'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, MessageCircle, Book, Video } from 'lucide-react'
import Link from 'next/link'

export default function HelpPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle contact form submission
    alert('Thank you for your message! We will get back to you soon.')
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
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-gray-600">Get help with your Ghana Tax Calculator</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Get in touch with our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Phone Support</p>
                <p className="text-sm text-gray-600">+233 24 123 4567</p>
                <p className="text-xs text-gray-500">Mon-Fri, 8:00 AM - 6:00 PM GMT</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-gray-600">support@ghanataxcalculator.com</p>
                <p className="text-xs text-gray-500">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Office Address</p>
                <p className="text-sm text-gray-600">123 Liberation Road</p>
                <p className="text-sm text-gray-600">Accra, Ghana</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Business Hours</p>
                <p className="text-sm text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-sm text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                <p className="text-sm text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>We'll get back to you as soon as possible</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Your first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Your last name" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What can we help you with?" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Please describe your issue or question in detail..."
                  rows={5}
                  required 
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Quick Help Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Help Resources</CardTitle>
          <CardDescription>Find answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Book className="h-8 w-8 text-emerald-600" />
              <div className="text-center">
                <p className="font-medium">User Guide</p>
                <p className="text-xs text-gray-600">Step-by-step instructions</p>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Video className="h-8 w-8 text-emerald-600" />
              <div className="text-center">
                <p className="font-medium">Video Tutorials</p>
                <p className="text-xs text-gray-600">Watch how-to videos</p>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <MessageCircle className="h-8 w-8 text-emerald-600" />
              <div className="text-center">
                <p className="font-medium">FAQ</p>
                <p className="text-xs text-gray-600">Frequently asked questions</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Common Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Common Issues & Solutions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h4 className="font-medium">How do I calculate VAT correctly?</h4>
            <p className="text-sm text-gray-600 mt-1">
              VAT is calculated at 15% on the VAT-inclusive amount. The system automatically calculates this when you enter your sales data.
            </p>
          </div>

          <div className="border-l-4 border-emerald-500 pl-4">
            <h4 className="font-medium">What are the current levy rates?</h4>
            <p className="text-sm text-gray-600 mt-1">
              NHIL: 2.5%, GETFund: 2.5%, COVID-19 Levy: 1%, Tourism Levy: 1%. These are automatically applied to your gross sales.
            </p>
          </div>

          <div className="border-l-4 border-emerald-500 pl-4">
            <h4 className="font-medium">How do I export my reports?</h4>
            <p className="text-sm text-gray-600 mt-1">
              Go to any report page (VAT Return, GRA Levies, etc.) and click the "Export CSV" button to download your data.
            </p>
          </div>

          <div className="border-l-4 border-emerald-500 pl-4">
            <h4 className="font-medium">Can I delete incorrect entries?</h4>
            <p className="text-sm text-gray-600 mt-1">
              Yes, you can delete entries from the Sales Log and Expenses Log pages using the delete button next to each entry.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
