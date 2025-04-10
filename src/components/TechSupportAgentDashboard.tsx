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
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench,
  Settings,
  Users,
  LifeBuoy,
  Smartphone,
  ArrowRight,
  BarChart3,
} from "lucide-react";

interface TechSupportAgentDashboardProps {
  userRole?: string;
}

const TechSupportAgentDashboard: React.FC<TechSupportAgentDashboardProps> = ({
  userRole = "tech_support_agent",
}) => {
  const [activeTab, setActiveTab] = useState("assigned");

  // Mock data - in a real app, this would come from API calls
  const mockTickets = [
    {
      id: "TKT-1234",
      customer: "Amit Kumar",
      device: "AB123456",
      issue: "Device not connecting to network",
      status: "open",
      priority: "high",
      createdAt: "2023-09-15T10:30:00",
      assignedAt: "2023-09-15T11:15:00",
    },
    {
      id: "TKT-1235",
      customer: "Priya Singh",
      device: "AB789012",
      issue: "Battery draining too quickly",
      status: "in_progress",
      priority: "medium",
      createdAt: "2023-09-14T14:20:00",
      assignedAt: "2023-09-14T15:45:00",
    },
    {
      id: "TKT-1236",
      customer: "Rahul Sharma",
      device: "AB345678",
      issue: "Firmware update failed",
      status: "waiting_for_customer",
      priority: "medium",
      createdAt: "2023-09-13T09:10:00",
      assignedAt: "2023-09-13T10:30:00",
    },
  ];

  const mockDeviceData = {
    id: "AB123456",
    customer: "Amit Kumar",
    model: "Autobox Pro",
    firmware: "v2.4.1",
    lastConnected: "2023-09-15T09:45:00",
    status: "online",
    batteryLevel: 75,
    signalStrength: 85,
    diagnostics: [
      { name: "Network Connection", status: "good" },
      { name: "GPS Signal", status: "good" },
      { name: "Sensor Array", status: "warning" },
      { name: "Storage", status: "good" },
    ],
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Open
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            In Progress
          </Badge>
        );
      case "waiting_for_customer":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Waiting for Customer
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Resolved
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700">
            {status}
          </Badge>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Low
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700">
            {priority}
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-slate-900 text-white py-8 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Tech Support Agent Dashboard
              </h1>
              <div className="flex items-center mt-2">
                <Badge className="bg-primary text-primary-foreground mr-2">
                  Agent Portal
                </Badge>
                <span className="text-sm text-slate-300">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                My Profile
              </Button>
              <Button>New Ticket</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <Card className="bg-white/10 border-0 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Assigned Tickets</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <LifeBuoy className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-0 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Resolved Today</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-0 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Avg. Response Time</p>
                    <p className="text-2xl font-bold">28 min</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-400" />
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
            defaultValue="assigned"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="assigned" className="flex items-center gap-2">
                <LifeBuoy className="h-4 w-4" />
                <span>Assigned Tickets</span>
              </TabsTrigger>
              <TabsTrigger
                value="device_debug"
                className="flex items-center gap-2"
              >
                <Smartphone className="h-4 w-4" />
                <span>Device Debugging</span>
              </TabsTrigger>
              <TabsTrigger
                value="knowledge_base"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                <span>Knowledge Base</span>
              </TabsTrigger>
              <TabsTrigger
                value="performance"
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span>My Performance</span>
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Assigned Tickets Section */}
              <TabsContent value="assigned" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle>Assigned Tickets</CardTitle>
                        <CardDescription>
                          Manage and resolve customer support tickets
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search tickets..."
                            className="pl-8 h-9 w-full md:w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{ticket.id}</h3>
                                {getStatusBadge(ticket.status)}
                                {getPriorityBadge(ticket.priority)}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {ticket.customer} • Device: {ticket.device}
                              </p>
                              <p className="mt-2">{ticket.issue}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                Assigned:{" "}
                                {new Date(ticket.assignedAt).toLocaleString()}
                              </span>
                              <Button>
                                Resolve
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Device Debugging Section */}
              <TabsContent value="device_debug" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Debugging Console</CardTitle>
                    <CardDescription>
                      Diagnose and troubleshoot device issues remotely
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-4">
                            Device Information
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Device ID
                              </span>
                              <span className="font-medium">
                                {mockDeviceData.id}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Customer
                              </span>
                              <span className="font-medium">
                                {mockDeviceData.customer}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Model
                              </span>
                              <span className="font-medium">
                                {mockDeviceData.model}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Firmware
                              </span>
                              <span className="font-medium">
                                {mockDeviceData.firmware}
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
                                {mockDeviceData.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Last Connected
                              </span>
                              <span className="font-medium">
                                {new Date(
                                  mockDeviceData.lastConnected,
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-4">Device Health</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Battery Level</span>
                                <span className="text-sm font-medium">
                                  {mockDeviceData.batteryLevel}%
                                </span>
                              </div>
                              <Progress
                                value={mockDeviceData.batteryLevel}
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Signal Strength</span>
                                <span className="text-sm font-medium">
                                  {mockDeviceData.signalStrength}%
                                </span>
                              </div>
                              <Progress
                                value={mockDeviceData.signalStrength}
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-4">Diagnostics</h3>
                          <div className="space-y-2">
                            {mockDeviceData.diagnostics.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 border-b last:border-0"
                              >
                                <span>{item.name}</span>
                                {item.status === "good" ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700"
                                  >
                                    Good
                                  </Badge>
                                ) : item.status === "warning" ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-amber-50 text-amber-700"
                                  >
                                    Warning
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="bg-red-50 text-red-700"
                                  >
                                    Error
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-4">Debug Console</h3>
                          <div className="bg-slate-950 text-slate-300 p-4 rounded-md font-mono text-sm h-[200px] overflow-y-auto">
                            <div className="text-green-400">
                              &gt; Connecting to device {mockDeviceData.id}...
                            </div>
                            <div>&gt; Connection established</div>
                            <div>&gt; Fetching device logs...</div>
                            <div className="text-amber-400">
                              &gt; WARNING: Sensor array reporting intermittent
                              readings
                            </div>
                            <div>
                              &gt; Running diagnostics on sensor array...
                            </div>
                            <div>
                              &gt; Diagnostic complete. See report above.
                            </div>
                            <div className="mt-2">
                              &gt; <span className="animate-pulse">_</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline">
                              <Wrench className="h-4 w-4 mr-2" />
                              Run Diagnostics
                            </Button>
                            <Button variant="outline">
                              <Settings className="h-4 w-4 mr-2" />
                              Configure
                            </Button>
                            <Button>
                              <AlertCircle className="h-4 w-4 mr-2" />
                              Reset Device
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Knowledge Base Section - Placeholder */}
              <TabsContent value="knowledge_base" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Knowledge Base</CardTitle>
                    <CardDescription>
                      Access technical documentation and troubleshooting guides
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-8 text-center">
                      <h3 className="text-lg font-medium mb-2">
                        Knowledge Base Coming Soon
                      </h3>
                      <p className="text-muted-foreground">
                        This section is under development. Check back later for
                        access to technical documentation and troubleshooting
                        guides.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Section - Placeholder */}
              <TabsContent value="performance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Performance</CardTitle>
                    <CardDescription>
                      Track your support metrics and performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-8 text-center">
                      <h3 className="text-lg font-medium mb-2">
                        Performance Metrics Coming Soon
                      </h3>
                      <p className="text-muted-foreground">
                        This section is under development. Check back later to
                        view your support metrics and performance statistics.
                      </p>
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

export default TechSupportAgentDashboard;
