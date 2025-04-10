import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Car,
  Calendar,
  Package,
  MapPin,
  Percent,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PlanComparisonTable from "./PlanComparisonTable";

type Stage = {
  id: number;
  title: string;
  icon: React.ReactNode;
};

type PurchaseOption = "subscription" | "one-time";
type SubscriptionTier = "bronze" | "silver" | "gold";
type SubscriptionDuration = "1" | "3";
type InstallOption = "diy" | "technician" | "merchant";
type PaymentOption = "full" | "partial";

const PurchaseFlow = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    fuelType: "",
    year: "",
  });
  const [purchaseOption, setPurchaseOption] =
    useState<PurchaseOption>("subscription");
  const [subscriptionTier, setSubscriptionTier] =
    useState<SubscriptionTier>("bronze");
  const [subscriptionDuration, setSubscriptionDuration] =
    useState<SubscriptionDuration>("1");
  const [installOption, setInstallOption] = useState<InstallOption>("diy");
  const [pincode, setPincode] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", mobile: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [paymentOption, setPaymentOption] = useState<PaymentOption>("full");
  const [totalCost, setTotalCost] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  // Mock data for technicians
  const technicians = [
    { id: 1, name: "Rahul Sharma", rating: 4.8, distance: "2.3 km" },
    { id: 2, name: "Priya Patel", rating: 4.9, distance: "3.5 km" },
    { id: 3, name: "Amit Kumar", rating: 4.7, distance: "4.1 km" },
  ];

  const stages: Stage[] = [
    { id: 1, title: "Car Details", icon: <Car className="h-5 w-5" /> },
    { id: 2, title: "Purchase Type", icon: <Package className="h-5 w-5" /> },
    { id: 3, title: "Subscription", icon: <Calendar className="h-5 w-5" /> },
    { id: 4, title: "Installation", icon: <MapPin className="h-5 w-5" /> },
    { id: 5, title: "Discounts", icon: <Percent className="h-5 w-5" /> },
    { id: 6, title: "Payment", icon: <CreditCard className="h-5 w-5" /> },
  ];

  // Calculate total cost based on selections
  React.useEffect(() => {
    let cost = 0;

    if (purchaseOption === "one-time") {
      cost = 10000; // One-time purchase cost
    } else {
      // Add device security deposit
      cost += 2000;

      // Add subscription cost based on tier
      if (subscriptionTier === "bronze") cost += 500;
      else if (subscriptionTier === "silver") cost += 1000;
      else if (subscriptionTier === "gold") cost += 2000;

      // Apply 10% discount for 3-year subscription
      if (subscriptionDuration === "3") {
        const subscriptionCost =
          subscriptionTier === "bronze"
            ? 500
            : subscriptionTier === "silver"
              ? 1000
              : 2000;
        cost += subscriptionCost * 2 * 0.9; // 10% discount on additional 2 years
      }
    }

    // Add installation cost
    if (installOption === "technician" || installOption === "merchant") {
      cost += 500;
    }

    // Apply new user discount
    if (!hasAccount && discountApplied) {
      cost -= 500;
    }

    setTotalCost(cost);
  }, [
    purchaseOption,
    subscriptionTier,
    subscriptionDuration,
    installOption,
    hasAccount,
    discountApplied,
  ]);

  const handleNext = () => {
    if (currentStage < stages.length) {
      // Skip subscription stage if one-time purchase is selected
      if (currentStage === 2 && purchaseOption === "one-time") {
        setCurrentStage(4);
      } else {
        setCurrentStage(currentStage + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStage > 1) {
      // Skip subscription stage if one-time purchase is selected
      if (currentStage === 4 && purchaseOption === "one-time") {
        setCurrentStage(2);
      } else {
        setCurrentStage(currentStage - 1);
      }
    }
  };

  const handleSendOTP = () => {
    // Simulate OTP sending
    setOtpSent(true);
  };

  const handleVerifyOTP = () => {
    // Simulate OTP verification
    setHasAccount(true);
    setDiscountApplied(true);
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case 1: // Car Details
        return (
          <div className="space-y-4">
            <CardTitle>Enter Your Car Details</CardTitle>
            <CardDescription>
              Please provide information about your vehicle
            </CardDescription>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Car Brand</Label>
                <Select
                  value={carDetails.brand}
                  onValueChange={(value) =>
                    setCarDetails({ ...carDetails, brand: value })
                  }
                >
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                    <SelectItem value="hyundai">Hyundai</SelectItem>
                    <SelectItem value="tata">Tata</SelectItem>
                    <SelectItem value="mahindra">Mahindra</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Car Model</Label>
                <Select
                  value={carDetails.model}
                  onValueChange={(value) =>
                    setCarDetails({ ...carDetails, model: value })
                  }
                >
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="swift">Swift</SelectItem>
                    <SelectItem value="i20">i20</SelectItem>
                    <SelectItem value="nexon">Nexon</SelectItem>
                    <SelectItem value="xuv300">XUV300</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select
                  value={carDetails.fuelType}
                  onValueChange={(value) =>
                    setCarDetails({ ...carDetails, fuelType: value })
                  }
                >
                  <SelectTrigger id="fuelType">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Manufacturing Year</Label>
                <Select
                  value={carDetails.year}
                  onValueChange={(value) =>
                    setCarDetails({ ...carDetails, year: value })
                  }
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i} value={`${2024 - i}`}>
                        {2024 - i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2: // Purchase Type
        return (
          <div className="space-y-4">
            <CardTitle>Choose Purchase Type</CardTitle>
            <CardDescription>
              Select between subscription or one-time purchase
            </CardDescription>

            <Tabs defaultValue="comparison" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
                <TabsTrigger value="selection">Make Selection</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Feature</th>
                        <th className="text-center p-2">Subscription</th>
                        <th className="text-center p-2">One-Time Purchase</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Cost</td>
                        <td className="text-center p-2">
                          Lower initial cost + monthly fee
                        </td>
                        <td className="text-center p-2">Higher upfront cost</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Feature Updates</td>
                        <td className="text-center p-2">
                          <Check className="inline h-4 w-4 text-green-500" />{" "}
                          Included
                        </td>
                        <td className="text-center p-2">
                          <span className="text-red-500">✕</span> Not available
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Customization</td>
                        <td className="text-center p-2">
                          <Check className="inline h-4 w-4 text-green-500" />{" "}
                          Full control
                        </td>
                        <td className="text-center p-2">
                          <span className="text-red-500">✕</span> Limited
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Warranty</td>
                        <td className="text-center p-2">
                          <Check className="inline h-4 w-4 text-green-500" />{" "}
                          Included
                        </td>
                        <td className="text-center p-2">
                          <span className="text-red-500">✕</span> Purchased
                          separately
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Tier Options</td>
                        <td className="text-center p-2">
                          Bronze, Silver, Gold
                        </td>
                        <td className="text-center p-2">Basic only</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="selection" className="space-y-4">
                <RadioGroup
                  value={purchaseOption}
                  onValueChange={(value) =>
                    setPurchaseOption(value as PurchaseOption)
                  }
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                    <RadioGroupItem value="subscription" id="subscription" />
                    <Label
                      htmlFor="subscription"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium">Subscription</div>
                      <div className="text-sm text-muted-foreground">
                        Choose from Bronze, Silver, or Gold tiers with regular
                        updates
                      </div>
                    </Label>
                    <Badge>Recommended</Badge>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time" className="flex-1 cursor-pointer">
                      <div className="font-medium">One-Time Purchase</div>
                      <div className="text-sm text-muted-foreground">
                        Pay once for basic features without updates
                      </div>
                    </Label>
                    <div className="text-sm font-medium">₹10,000</div>
                  </div>
                </RadioGroup>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 3: // Subscription
        return (
          <div className="space-y-4">
            <CardTitle>Choose Subscription Plan</CardTitle>
            <CardDescription>
              Select your preferred tier and duration
            </CardDescription>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Subscription Tier</h3>
                <PlanComparisonTable
                  selectedTier={subscriptionTier}
                  onSelectTier={(tier) =>
                    setSubscriptionTier(tier as SubscriptionTier)
                  }
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Subscription Duration</h3>
                <RadioGroup
                  value={subscriptionDuration}
                  onValueChange={(value) =>
                    setSubscriptionDuration(value as SubscriptionDuration)
                  }
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                    <RadioGroupItem value="1" id="one-year" />
                    <Label htmlFor="one-year" className="flex-1 cursor-pointer">
                      <div className="font-medium">1 Year</div>
                      <div className="text-sm text-muted-foreground">
                        {subscriptionTier === "bronze"
                          ? "₹500"
                          : subscriptionTier === "silver"
                            ? "₹1,000"
                            : "₹2,000"}{" "}
                        per year
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                    <RadioGroupItem value="3" id="three-year" />
                    <Label
                      htmlFor="three-year"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium">3 Years</div>
                      <div className="text-sm text-muted-foreground">
                        {subscriptionTier === "bronze"
                          ? "₹1,350"
                          : subscriptionTier === "silver"
                            ? "₹2,700"
                            : "₹5,400"}{" "}
                        for 3 years
                        <span className="ml-2 text-green-600">(10% off)</span>
                      </div>
                    </Label>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Best Value
                    </Badge>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 4: // Installation
        return (
          <div className="space-y-4">
            <CardTitle>Choose Installation Option</CardTitle>
            <CardDescription>
              Select how you'd like to install your Autobox
            </CardDescription>

            <RadioGroup
              value={installOption}
              onValueChange={(value) =>
                setInstallOption(value as InstallOption)
              }
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                <RadioGroupItem value="diy" id="diy" />
                <Label htmlFor="diy" className="flex-1 cursor-pointer">
                  <div className="font-medium">Self Install (DIY)</div>
                  <div className="text-sm text-muted-foreground">
                    Install the device yourself with our step-by-step guide
                  </div>
                </Label>
                <div className="text-sm font-medium">Free</div>
              </div>

              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                <RadioGroupItem value="technician" id="technician" />
                <Label htmlFor="technician" className="flex-1 cursor-pointer">
                  <div className="font-medium">Local Technician</div>
                  <div className="text-sm text-muted-foreground">
                    Get it installed by a certified technician near you
                  </div>
                </Label>
                <div className="text-sm font-medium">+₹500</div>
              </div>

              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                <RadioGroupItem value="merchant" id="merchant" />
                <Label htmlFor="merchant" className="flex-1 cursor-pointer">
                  <div className="font-medium">Local Merchant</div>
                  <div className="text-sm text-muted-foreground">
                    Buy and get it installed from an authorized merchant
                  </div>
                </Label>
                <div className="text-sm font-medium">+₹500</div>
              </div>
            </RadioGroup>

            {installOption === "technician" && (
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pincode">
                    Enter your pincode to find technicians near you
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="pincode"
                      placeholder="Enter pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full"
                    />
                    <Button variant="outline">Search</Button>
                  </div>
                </div>

                {pincode.length === 6 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Available Technicians</h4>
                    <div className="space-y-2">
                      {technicians.map((tech) => (
                        <div
                          key={tech.id}
                          className="flex items-center justify-between border rounded-lg p-3"
                        >
                          <div>
                            <div className="font-medium">{tech.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ⭐ {tech.rating} • {tech.distance}
                            </div>
                          </div>
                          <Button size="sm">Select</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 5: // Discounts
        return (
          <div className="space-y-4">
            <CardTitle>Check for Discounts</CardTitle>
            <CardDescription>
              Create an account to get ₹500 off your purchase
            </CardDescription>

            {!hasAccount ? (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      New User Offer
                    </Badge>
                  </div>
                  <p className="text-sm">
                    Create an account and get ₹500 off your purchase!
                  </p>
                </div>

                {!otpSent ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={userDetails.name}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="mobile"
                          placeholder="Enter mobile number"
                          value={userDetails.mobile}
                          onChange={(e) =>
                            setUserDetails({
                              ...userDetails,
                              mobile: e.target.value,
                            })
                          }
                        />
                        <Button onClick={handleSendOTP}>Send OTP</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP sent to WhatsApp</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="otp"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        <Button onClick={handleVerifyOTP}>Verify</Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        OTP sent to WhatsApp on {userDetails.mobile}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <p className="font-medium text-green-800">
                      Account created successfully!
                    </p>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    ₹500 discount has been applied to your purchase.
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 6: // Payment
        return (
          <div className="space-y-4">
            <CardTitle>Get Your Autobox!</CardTitle>
            <CardDescription>Choose your payment option</CardDescription>

            {installOption === "merchant" ? (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <p className="font-medium text-blue-800">
                    Thank you for your interest!
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Your request has been forwarded to a merchant who will
                    contact you shortly via WhatsApp.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">What happens next?</h4>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">
                        1
                      </span>
                      <span>
                        A local merchant will contact you within 24 hours
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">
                        2
                      </span>
                      <span>
                        They will discuss your requirements and schedule an
                        appointment
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">
                        3
                      </span>
                      <span>
                        Visit the merchant for installation and activation
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <RadioGroup
                  value={paymentOption}
                  onValueChange={(value) =>
                    setPaymentOption(value as PaymentOption)
                  }
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                    <RadioGroupItem value="full" id="full-payment" />
                    <Label
                      htmlFor="full-payment"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium">Pay Full Amount Now</div>
                      <div className="text-sm text-muted-foreground">
                        Complete your payment in one go
                      </div>
                    </Label>
                    <div className="text-sm font-medium">
                      ₹{totalCost.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                    <RadioGroupItem value="partial" id="partial-payment" />
                    <Label
                      htmlFor="partial-payment"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium">
                        Pay Security Deposit Now
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Pay ₹2,000 now and the balance on activation
                      </div>
                    </Label>
                    <div className="text-sm font-medium">
                      ₹2,000 + ₹{(totalCost - 2000).toLocaleString()} later
                    </div>
                  </div>
                </RadioGroup>

                <div className="p-4 border rounded-lg bg-muted/50 space-y-2">
                  <h4 className="font-medium">Order Summary</h4>
                  <div className="space-y-1 text-sm">
                    {purchaseOption === "one-time" ? (
                      <div className="flex justify-between">
                        <span>One-time purchase</span>
                        <span>₹10,000</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span>Device security deposit</span>
                          <span>₹2,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>
                            {subscriptionTier.charAt(0).toUpperCase() +
                              subscriptionTier.slice(1)}{" "}
                            tier ({subscriptionDuration} year
                            {subscriptionDuration === "3" ? "s" : ""})
                          </span>
                          <span>
                            {subscriptionDuration === "1"
                              ? subscriptionTier === "bronze"
                                ? "₹500"
                                : subscriptionTier === "silver"
                                  ? "₹1,000"
                                  : "₹2,000"
                              : subscriptionTier === "bronze"
                                ? "₹1,350"
                                : subscriptionTier === "silver"
                                  ? "₹2,700"
                                  : "₹5,400"}
                          </span>
                        </div>
                      </>
                    )}

                    {(installOption === "technician" ||
                      installOption === "merchant") && (
                      <div className="flex justify-between">
                        <span>Installation charges</span>
                        <span>₹500</span>
                      </div>
                    )}

                    {discountApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>New user discount</span>
                        <span>-₹500</span>
                      </div>
                    )}

                    <Separator className="my-2" />

                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{totalCost.toLocaleString()}</span>
                    </div>

                    {paymentOption === "partial" && (
                      <>
                        <div className="flex justify-between">
                          <span>Pay now</span>
                          <span>₹2,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pay on activation</span>
                          <span>₹{(totalCost - 2000).toLocaleString()}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full" size="lg">
                    {paymentOption === "full"
                      ? `Pay ₹${totalCost.toLocaleString()} Now`
                      : `Pay ₹2,000 Now`}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-xl max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Let's Upgrade Your Vehicle!</h2>
        <p className="text-muted-foreground">
          Follow the steps below to configure your Autobox
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">
            Step {currentStage} of {stages.length}
          </span>
        </div>
        <Progress
          value={(currentStage / stages.length) * 100}
          className="h-2"
        />

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {stages.map((stage) => {
            // Skip subscription stage in display if one-time purchase is selected
            if (purchaseOption === "one-time" && stage.id === 3) return null;

            return (
              <div
                key={stage.id}
                className={`flex flex-col items-center p-2 rounded-lg text-center cursor-pointer transition-colors ${currentStage === stage.id ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                onClick={() => {
                  // Allow navigation to previous stages or current stage
                  if (stage.id <= currentStage) {
                    setCurrentStage(stage.id);
                  }
                }}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStage === stage.id ? "bg-primary text-primary-foreground" : currentStage > stage.id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
                >
                  {currentStage > stage.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    stage.icon
                  )}
                </div>
                <span className="text-xs">{stage.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Running Sum Counter */}
      <div className="mb-6 flex justify-between items-center bg-muted/50 p-3 rounded-lg">
        <span className="text-sm font-medium">Current Total:</span>
        <span className="text-lg font-bold">₹{totalCost.toLocaleString()}</span>
      </div>

      {/* Main Content */}
      <Card>
        <CardContent className="pt-6">{renderStageContent()}</CardContent>
        <CardFooter className="flex justify-between border-t p-4 mt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStage === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {currentStage < stages.length ? (
            <Button onClick={handleNext}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            installOption !== "merchant" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    Complete Purchase <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Order Confirmation</DialogTitle>
                    <DialogDescription>
                      Thank you for your purchase! Your Autobox will be on its
                      way soon.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-center text-muted-foreground">
                      Order #AB
                      {Math.floor(Math.random() * 10000)
                        .toString()
                        .padStart(4, "0")}
                    </p>
                  </div>
                  <DialogFooter>
                    <Button className="w-full">View Order Details</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PurchaseFlow;
