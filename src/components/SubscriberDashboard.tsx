import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  GaugeCircle,
  Car,
  Bell,
  Wallet,
  Wrench,
  Settings,
  Calendar,
  Award,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";

interface SubscriberDashboardProps {
  userRole?: string;
}

const SubscriberDashboard: React.FC<SubscriberDashboardProps> = ({
  userRole = "subscriber",
}) => {
  const [activeTab, setActiveTab] = useState("info");

  // Mock data - in a real app, this would come from API calls
  const mockUserData = {
    name: "Amit Kumar",
    subscriptionPlan: "Gold",
    validUntil: "2024-12-31",
    benefits: {
      kmTracked: 12450,
      fuelSaved: 245,
      co2Reduced: 567,
    },
    vehicle: {
      id: "MH01AB1234",
      make: "Honda",
      model: "City",
      year: 2022,
      deviceId: "AB123456",
    },
    device: {
      status: "active",
      lastUpdated: "2023-09-15T10:30:00",
      batteryLevel: 85,
    },
    rewardPoints: 1250,
    rewardPointsExpiry: "2024-06-30",
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with user info and benefits */}
      <header className="bg-slate-900 text-white py-8 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {mockUserData.name}
              </h1>
              <div className="flex items-center mt-2">
                <Badge className="bg-primary text-primary-foreground mr-2">
                  {mockUserData.subscriptionPlan} Plan
                </Badge>
                <span className="text-sm text-slate-300">
                  Valid until{" "}
                  {new Date(mockUserData.validUntil).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                Manage Subscription
              </Button>
              <Button>Upgrade Plan</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <Card className="bg-white/10 border-0 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Distance Tracked</p>
                    <p className="text-2xl font-bold">
                      {mockUserData.benefits.kmTracked} km
                    </p>
                  </div>
                  <GaugeCircle className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-0 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Fuel Saved</p>
                    <p className="text-2xl font-bold">
                      {mockUserData.benefits.fuelSaved} L
                    </p>
                  </div>
                  <GaugeCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-0 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">CO₂ Reduced</p>
                    <p className="text-2xl font-bold">
                      {mockUserData.benefits.co2Reduced} kg
                    </p>
                  </div>
                  <GaugeCircle className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      {/* Main dashboard content */}
      <main className="py-8 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <Tabs
            defaultValue="info"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span>Vehicle Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="operational"
                className="flex items-center gap-2"
              >
                <Wallet className="h-4 w-4" />
                <span>Operational & Financial</span>
              </TabsTrigger>
              <TabsTrigger value="device" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Device</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <LifeBuoy className="h-4 w-4" />
                <span>Support</span>
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Info Section */}
              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle & Registration Information</CardTitle>
                    <CardDescription>
                      Details about your vehicle and Autobox device
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Vehicle Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Registration Number
                            </span>
                            <span className="font-medium">
                              {mockUserData.vehicle.id}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Make</span>
                            <span className="font-medium">
                              {mockUserData.vehicle.make}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Model</span>
                            <span className="font-medium">
                              {mockUserData.vehicle.model}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Year</span>
                            <span className="font-medium">
                              {mockUserData.vehicle.year}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-medium">Device Information</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Device ID
                            </span>
                            <span className="font-medium">
                              {mockUserData.vehicle.deviceId}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Status
                            </span>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700"
                            >
                              {mockUserData.device.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Last Updated
                            </span>
                            <span className="font-medium">
                              {new Date(
                                mockUserData.device.lastUpdated,
                              ).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Battery Level
                            </span>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={mockUserData.device.batteryLevel}
                                className="w-24 h-2"
                              />
                              <span className="text-sm">
                                {mockUserData.device.batteryLevel}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Offers & Announcements</CardTitle>
                    <CardDescription>
                      Latest offers and important announcements for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-blue-50">
                        <div className="flex items-start gap-3">
                          <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-800">
                              New Feature Alert!
                            </h4>
                            <p className="text-sm text-blue-700 mt-1">
                              We've added a new "Eco Mode" feature to all Gold
                              tier subscriptions. Try it out today to save even
                              more fuel!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg bg-green-50">
                        <div className="flex items-start gap-3">
                          <Bell className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-800">
                              Limited Time Offer
                            </h4>
                            <p className="text-sm text-green-700 mt-1">
                              Upgrade to a 3-year plan and get 20% off! Offer
                              valid until June 30, 2024.
                            </p>
                            <Button
                              variant="outline"
                              className="mt-2 text-green-700 border-green-300 hover:bg-green-100"
                            >
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Operational & Financial Section - Placeholder for now */}
              <TabsContent value="operational" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Management</CardTitle>
                    <CardDescription>
                      Manage your subscription plan and payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">
                            Current Plan: {mockUserData.subscriptionPlan}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Valid until{" "}
                            {new Date(
                              mockUserData.validUntil,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">Change Tier</Button>
                          <Button>Recharge</Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium flex items-center gap-2">
                          <Award className="h-5 w-5 text-amber-500" />
                          Reward Points
                        </h3>
                        <div className="p-4 border rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="text-2xl font-bold">
                                {mockUserData.rewardPoints} points
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Expires on{" "}
                                {new Date(
                                  mockUserData.rewardPointsExpiry,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <Button>Claim Rewards</Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">Service Requests</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-muted/50">
                            <CardContent className="pt-6">
                              <div className="flex flex-col items-center text-center">
                                <LifeBuoy className="h-8 w-8 mb-2" />
                                <h4 className="font-medium">Support Ticket</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                  Need help with your device?
                                </p>
                                <Button variant="outline" className="w-full">
                                  Raise Ticket
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/50">
                            <CardContent className="pt-6">
                              <div className="flex flex-col items-center text-center">
                                <Car className="h-8 w-8 mb-2" />
                                <h4 className="font-medium">
                                  Migration Request
                                </h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                  Moving to a new vehicle?
                                </p>
                                <Button variant="outline" className="w-full">
                                  Request Migration
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/50">
                            <CardContent className="pt-6">
                              <div className="flex flex-col items-center text-center">
                                <Calendar className="h-8 w-8 mb-2" />
                                <h4 className="font-medium">
                                  Pause Subscription
                                </h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                  Up to 15 days per year
                                </p>
                                <Button variant="outline" className="w-full">
                                  Pause Now
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Device Section - Placeholder for now */}
              <TabsContent value="device" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Activity History</CardTitle>
                    <CardDescription>
                      Complete history of your device activities and status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Current Status</h3>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700"
                        >
                          {mockUserData.device.status}
                        </Badge>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">Recent Activity</h3>
                        <div className="space-y-4">
                          {/* This would be a map over actual activity data */}
                          <div className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Wrench className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium">
                                  Maintenance Check
                                </h4>
                                <span className="text-sm text-muted-foreground">
                                  2023-09-10
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Routine maintenance check performed by
                                technician Rahul S.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="bg-green-100 p-2 rounded-full">
                              <Settings className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium">Firmware Update</h4>
                                <span className="text-sm text-muted-foreground">
                                  2023-08-25
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Device firmware updated to version 2.4.1
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Wallet className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium">
                                  Subscription Renewed
                                </h4>
                                <span className="text-sm text-muted-foreground">
                                  2023-07-15
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Gold plan subscription renewed for 12 months
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center mt-4">
                          <Button variant="outline">View Full History</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configure Device</CardTitle>
                    <CardDescription>
                      Customize your device settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Configure your device settings to optimize performance
                        and customize your experience.
                      </p>
                      <Button>
                        Open Configuration Panel{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Support Section - Placeholder for now */}
              <TabsContent value="support" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Support Center</CardTitle>
                    <CardDescription>
                      Get help with your Autobox device and subscription
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex flex-col items-center text-center">
                            <LifeBuoy className="h-10 w-10 mb-4 text-primary" />
                            <h3 className="font-medium text-lg mb-2">
                              Contact Support
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Our support team is available 24/7 to help you
                              with any issues.
                            </p>
                            <Button className="w-full">Contact Support</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex flex-col items-center text-center">
                            <Wrench className="h-10 w-10 mb-4 text-primary" />
                            <h3 className="font-medium text-lg mb-2">
                              Troubleshooting Guide
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Find solutions to common issues with our
                              troubleshooting guide.
                            </p>
                            <Button variant="outline" className="w-full">
                              View Guide
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SubscriberDashboard;
