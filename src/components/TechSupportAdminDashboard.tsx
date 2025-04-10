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
  BarChart3,
  Users,
  Car,
  Server,
  Settings,
  Ticket,
  Award,
  UserCheck,
  Search,
  Filter,
  Download,
} from "lucide-react";

interface TechSupportAdminDashboardProps {
  userRole?: string;
}

const TechSupportAdminDashboard: React.FC<TechSupportAdminDashboardProps> = ({
  userRole = "tech_support_admin",
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in a real app, this would come from API calls
  const mockData = {
    authorizedFunds: {
      thisWeek: 12500,
      thisMonth: 45000,
      overall: 245000,
    },
    executivePerformance: [
      {
        name: "Rahul Singh",
        ticketsResolved: 45,
        avgResolutionTime: "2h 15m",
        customerSatisfaction: 4.8,
      },
      {
        name: "Priya Sharma",
        ticketsResolved: 38,
        avgResolutionTime: "1h 45m",
        customerSatisfaction: 4.9,
      },
      {
        name: "Amit Kumar",
        ticketsResolved: 42,
        avgResolutionTime: "2h 30m",
        customerSatisfaction: 4.7,
      },
    ],
    devices: [
      {
        id: "DEV-001",
        subscriberEmail: "john@example.com",
        vehicleRegNo: "MH01AB1234",
        status: "active",
        soldBy: "direct",
        installedBy: "authorized-tech-001",
      },
      {
        id: "DEV-002",
        subscriberEmail: "sarah@example.com",
        vehicleRegNo: "MH02CD5678",
        status: "inactive",
        soldBy: "merchant-001",
        installedBy: "self",
      },
      {
        id: "DEV-003",
        subscriberEmail: "mike@example.com",
        vehicleRegNo: "MH03EF9012",
        status: "active",
        soldBy: "merchant-002",
        installedBy: "merchant-002",
      },
    ],
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-slate-900 text-white py-8 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Tech Support Admin Dashboard
              </h1>
              <div className="flex items-center mt-2">
                <Badge className="bg-primary text-primary-foreground mr-2">
                  Admin Access
                </Badge>
                <span className="text-sm text-slate-300">
                  Full technical support capabilities
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                Generate Reports
              </Button>
              <Button>System Settings</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <Card className="bg-white/10 border-0 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Funds This Week</p>
                    <p className="text-2xl font-bold">
                      ₹{mockData.authorizedFunds.thisWeek.toLocaleString()}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-0 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Funds This Month</p>
                    <p className="text-2xl font-bold">
                      ₹{mockData.authorizedFunds.thisMonth.toLocaleString()}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-0 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Overall Funds</p>
                    <p className="text-2xl font-bold">
                      ₹{mockData.authorizedFunds.overall.toLocaleString()}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-400" />
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
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="devices" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span>Devices</span>
              </TabsTrigger>
              <TabsTrigger value="server" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                <span>Server Management</span>
              </TabsTrigger>
              <TabsTrigger
                value="subscribers"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span>Subscribers</span>
              </TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                <span>Tickets</span>
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Executive Performance</CardTitle>
                    <CardDescription>
                      Monitor the performance of tech support executives
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">
                              Tickets Resolved
                            </th>
                            <th className="text-left py-3 px-4">
                              Avg. Resolution Time
                            </th>
                            <th className="text-left py-3 px-4">
                              Customer Satisfaction
                            </th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockData.executivePerformance.map((exec, index) => (
                            <tr
                              key={index}
                              className="border-b hover:bg-muted/50"
                            >
                              <td className="py-3 px-4">{exec.name}</td>
                              <td className="py-3 px-4">
                                {exec.ticketsResolved}
                              </td>
                              <td className="py-3 px-4">
                                {exec.avgResolutionTime}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={exec.customerSatisfaction * 20}
                                    className="w-24 h-2"
                                  />
                                  <span>{exec.customerSatisfaction}/5</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Devices Tab */}
              <TabsContent value="devices" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle>Device Management</CardTitle>
                        <CardDescription>
                          View and manage all devices in the system
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Search className="h-4 w-4 mr-2" />
                          Search
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Device ID</th>
                            <th className="text-left py-3 px-4">
                              Subscriber Email
                            </th>
                            <th className="text-left py-3 px-4">
                              Vehicle Reg No.
                            </th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Sold By</th>
                            <th className="text-left py-3 px-4">
                              Installed By
                            </th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockData.devices.map((device, index) => (
                            <tr
                              key={index}
                              className="border-b hover:bg-muted/50"
                            >
                              <td className="py-3 px-4">{device.id}</td>
                              <td className="py-3 px-4">
                                {device.subscriberEmail}
                              </td>
                              <td className="py-3 px-4">
                                {device.vehicleRegNo}
                              </td>
                              <td className="py-3 px-4">
                                <Badge
                                  variant="outline"
                                  className={`${device.status === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                                >
                                  {device.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">{device.soldBy}</td>
                              <td className="py-3 px-4">
                                {device.installedBy}
                              </td>
                              <td className="py-3 px-4">
                                <Button variant="outline" size="sm">
                                  Manage
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Server Management Tab - Placeholder */}
              <TabsContent value="server" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Server Management</CardTitle>
                    <CardDescription>
                      Manage vehicle firmware and versions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      This section allows you to add or delete vehicle firmware
                      and manage firmware versions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Button>
                        <Server className="mr-2 h-4 w-4" /> Add New Firmware
                      </Button>
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" /> Manage Versions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Subscribers Management Tab - Placeholder */}
              <TabsContent value="subscribers" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscribers Management</CardTitle>
                    <CardDescription>
                      Manage subscriber tiers, validity, and rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      This section allows you to manage subscriber accounts,
                      change tiers, adjust validity, and add reward points.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button>
                        <Users className="mr-2 h-4 w-4" /> Manage Subscribers
                      </Button>
                      <Button variant="outline">
                        <Award className="mr-2 h-4 w-4" /> Configure Rewards
                      </Button>
                      <Button variant="outline">
                        <UserCheck className="mr-2 h-4 w-4" /> Agent Permissions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tickets Management Tab - Placeholder */}
              <TabsContent value="tickets" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tickets Management</CardTitle>
                    <CardDescription>
                      View and manage support tickets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      This section allows you to view open tickets, update
                      tickets, and close tickets. This is integrated with Zoho
                      Desk.
                    </p>
                    <Button>
                      <Ticket className="mr-2 h-4 w-4" /> View Open Tickets
                    </Button>
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

export default TechSupportAdminDashboard;
