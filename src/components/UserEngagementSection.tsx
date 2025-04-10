import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Phone, Users, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface UserEngagementSectionProps {
  onAccountCreation?: (phoneNumber: string) => void;
}

const UserEngagementSection = ({
  onAccountCreation = () => {},
}: UserEngagementSectionProps) => {
  const [activeTab, setActiveTab] = useState("savings");
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [currentAction, setCurrentAction] = useState<string>("");

  // Mock data
  const carModels = [
    "Honda City",
    "Hyundai Creta",
    "Maruti Swift",
    "Toyota Innova",
    "Tata Nexon",
  ];
  const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric"];
  const drivingStyles = ["City", "Highway", "Mixed"];
  const technicians = [
    {
      id: 1,
      name: "Raj Mechanics",
      distance: "2.3 km",
      rating: 4.8,
      installations: 124,
    },
    {
      id: 2,
      name: "AutoTech Solutions",
      distance: "3.5 km",
      rating: 4.6,
      installations: 98,
    },
    {
      id: 3,
      name: "SpeedFix Garage",
      distance: "4.1 km",
      rating: 4.7,
      installations: 156,
    },
  ];
  const existingUsers = [
    {
      id: 1,
      name: "Amit Singh",
      carModel: "Honda City",
      plan: "Gold",
      joinedMonths: 8,
    },
    {
      id: 2,
      name: "Priya Sharma",
      carModel: "Hyundai Creta",
      plan: "Silver",
      joinedMonths: 14,
    },
    {
      id: 3,
      name: "Rahul Verma",
      carModel: "Toyota Innova",
      plan: "Gold",
      joinedMonths: 6,
    },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleAction = (action: string) => {
    setCurrentAction(action);
    setShowOtpDialog(true);
  };

  const handleVerifyOtp = () => {
    // In a real app, you would verify the OTP with a backend service
    // For now, we'll just simulate a successful verification
    onAccountCreation(phoneNumber);
    setShowOtpDialog(false);

    // Handle the specific action that was initiated
    switch (currentAction) {
      case "calculate":
        // Show savings calculation result
        break;
      case "callback":
        // Show callback confirmation
        break;
      case "connect":
        // Connect with existing user
        break;
      case "findTechnician":
        // Show technician details
        break;
      default:
        break;
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Explore Autobox Benefits
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how Autobox can transform your driving experience with our
            interactive tools and community features.
          </p>
        </motion.div>

        <Tabs
          defaultValue="savings"
          className="w-full max-w-4xl mx-auto"
          onValueChange={handleTabChange}
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="savings" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Savings Calculator</span>
              <span className="inline sm:hidden">Savings</span>
            </TabsTrigger>
            <TabsTrigger value="callback" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Request Callback</span>
              <span className="inline sm:hidden">Callback</span>
            </TabsTrigger>
            <TabsTrigger value="connect" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Connect with Users</span>
              <span className="inline sm:hidden">Connect</span>
            </TabsTrigger>
            <TabsTrigger
              value="technicians"
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Find Technicians</span>
              <span className="inline sm:hidden">Technicians</span>
            </TabsTrigger>
          </TabsList>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="savings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Calculate Your Potential Savings</CardTitle>
                  <CardDescription>
                    See how much you could save with Autobox based on your
                    driving habits.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="car-model">Car Model</Label>
                      <Select>
                        <SelectTrigger id="car-model">
                          <SelectValue placeholder="Select your car model" />
                        </SelectTrigger>
                        <SelectContent>
                          {carModels.map((model) => (
                            <SelectItem key={model} value={model}>
                              {model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuel-type">Fuel Type</Label>
                      <Select>
                        <SelectTrigger id="fuel-type">
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          {fuelTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthly-distance">
                        Monthly Distance (km)
                      </Label>
                      <Input
                        id="monthly-distance"
                        type="number"
                        placeholder="e.g. 1000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="driving-style">Driving Style</Label>
                      <Select>
                        <SelectTrigger id="driving-style">
                          <SelectValue placeholder="Select driving style" />
                        </SelectTrigger>
                        <SelectContent>
                          {drivingStyles.map((style) => (
                            <SelectItem key={style} value={style}>
                              {style}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleAction("calculate")}
                    className="w-full"
                  >
                    Calculate Savings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="callback" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Request a Callback</CardTitle>
                  <CardDescription>
                    Our experts will call you to discuss how Autobox can enhance
                    your driving experience.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferred-time">
                      Preferred Time for Callback
                    </Label>
                    <Select>
                      <SelectTrigger id="preferred-time">
                        <SelectValue placeholder="Select preferred time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">
                          Morning (9 AM - 12 PM)
                        </SelectItem>
                        <SelectItem value="afternoon">
                          Afternoon (12 PM - 4 PM)
                        </SelectItem>
                        <SelectItem value="evening">
                          Evening (4 PM - 7 PM)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleAction("callback")}
                    className="w-full"
                  >
                    Request Callback
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="connect" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Connect with Existing Users</CardTitle>
                  <CardDescription>
                    Hear from real users about their experience with Autobox.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {existingUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-start p-4 border rounded-lg hover:bg-accent/10 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{user.name}</h4>
                            <Badge variant="secondary">{user.plan}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {user.carModel} • {user.joinedMonths} months with
                            Autobox
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("connect")}
                        >
                          Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-muted-foreground">
                    Connect with users who have similar vehicles and driving
                    habits
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="technicians" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Find Nearby Technicians</CardTitle>
                  <CardDescription>
                    Locate certified technicians in your area for installation
                    and support.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Your Pincode</Label>
                    <div className="flex gap-2">
                      <Input
                        id="pincode"
                        placeholder="Enter your pincode"
                        className="flex-1"
                      />
                      <Button variant="outline">Search</Button>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h4 className="font-medium">Technicians near you</h4>
                    {technicians.map((tech) => (
                      <div
                        key={tech.id}
                        className="flex items-start p-4 border rounded-lg hover:bg-accent/10 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{tech.name}</h4>
                            <span className="text-sm text-muted-foreground">
                              {tech.distance}
                            </span>
                          </div>
                          <p className="text-sm">
                            ⭐ {tech.rating} • {tech.installations}{" "}
                            installations
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("findTechnician")}
                        >
                          Contact
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </Tabs>

        <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify your phone number</DialogTitle>
              <DialogDescription>
                We've sent a verification code to your WhatsApp on {phoneNumber}
                .
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  placeholder="Enter the 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowOtpDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleVerifyOtp}>Verify & Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <Button variant="default" size="lg" className="group">
            Upgrade Your Vehicle Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default UserEngagementSection;
