import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface PlanFeature {
  name: string;
  bronze: boolean | string;
  silver: boolean | string;
  gold: boolean | string;
  legacy: boolean | string;
  tooltip?: string;
}

interface PlanComparisonTableProps {
  onSelectPlan?: (plan: string, duration: string) => void;
  selectedPlan?: string;
  selectedDuration?: string;
}

const PlanComparisonTable: React.FC<PlanComparisonTableProps> = ({
  onSelectPlan = () => {},
  selectedPlan = "",
  selectedDuration = "1year",
}) => {
  const [duration, setDuration] = useState<string>(selectedDuration);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handlePlanSelect = (plan: string) => {
    onSelectPlan(plan, duration);
  };

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    if (selectedPlan) {
      onSelectPlan(selectedPlan, newDuration);
    }
  };

  const features: PlanFeature[] = [
    {
      name: "Speed Governor",
      bronze: true,
      silver: true,
      gold: true,
      legacy: true,
      tooltip: "Limit your vehicle speed for safety and fuel efficiency",
    },
    {
      name: "Eco Mode",
      bronze: true,
      silver: true,
      gold: true,
      legacy: true,
      tooltip: "Optimize fuel consumption with intelligent throttle control",
    },
    {
      name: "Sports Mode",
      bronze: false,
      silver: true,
      gold: true,
      legacy: "Limited",
      tooltip: "Enhanced performance and responsiveness",
    },
    {
      name: "Hill-Hold Control",
      bronze: false,
      silver: true,
      gold: true,
      legacy: false,
      tooltip: "Prevents vehicle rollback when starting on inclines",
    },
    {
      name: "Lane Keep Assist",
      bronze: false,
      silver: false,
      gold: true,
      legacy: false,
      tooltip: "Helps maintain lane position while driving",
    },
    {
      name: "Feature Customization",
      bronze: "Basic",
      silver: "Advanced",
      gold: "Full",
      legacy: false,
      tooltip: "Ability to personalize feature settings to your preferences",
    },
    {
      name: "Software Updates",
      bronze: true,
      silver: true,
      gold: true,
      legacy: false,
      tooltip: "Regular updates with improvements and new features",
    },
    {
      name: "Warranty",
      bronze: "1-3 Years",
      silver: "1-3 Years",
      gold: "1-3 Years",
      legacy: "Separate Purchase",
      tooltip: "Device warranty coverage",
    },
  ];

  const planPricing = {
    bronze: { "1year": 500, "3year": 1350 },
    silver: { "1year": 1000, "3year": 2700 },
    gold: { "1year": 2000, "3year": 5400 },
    legacy: { oneTime: 10000 },
  };

  const securityDeposit = 2000;

  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-red-500 mx-auto" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-background">
      <h2 className="text-2xl font-bold text-center mb-6">Choose Your Plan</h2>

      {/* Duration selector for subscription plans */}
      <div className="flex justify-center mb-8">
        <Tabs
          defaultValue={duration}
          value={duration}
          onValueChange={handleDurationChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="1year">1 Year</TabsTrigger>
            <TabsTrigger value="3year">
              3 Years
              <Badge
                variant="secondary"
                className="ml-2 bg-green-100 text-green-800"
              >
                10% Off
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Plan Cards */}
        {["bronze", "silver", "gold", "legacy"].map((plan) => {
          const isSelected = selectedPlan === plan;
          const planTitle = plan.charAt(0).toUpperCase() + plan.slice(1);
          const isLegacy = plan === "legacy";
          const price = isLegacy
            ? planPricing.legacy.oneTime
            : planPricing[plan as keyof typeof planPricing][
                duration as keyof typeof planPricing.bronze
              ];

          return (
            <motion.div
              key={plan}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setHoveredPlan(plan)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <Card
                className={`h-full border-2 ${isSelected ? "border-primary" : hoveredPlan === plan ? "border-gray-300" : "border-transparent"}`}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold">{planTitle}</h3>
                    {isLegacy ? (
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-gray-100">
                          One-time Purchase
                        </Badge>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <Badge
                          variant="outline"
                          className={`${plan === "bronze" ? "bg-amber-100" : plan === "silver" ? "bg-gray-100" : "bg-yellow-100"}`}
                        >
                          Subscription
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold">
                      ₹{price.toLocaleString()}
                    </div>
                    {!isLegacy && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {duration === "1year" ? "per year" : "for 3 years"}
                      </div>
                    )}
                    {!isLegacy && (
                      <div className="text-xs text-muted-foreground mt-2">
                        + ₹{securityDeposit.toLocaleString()} refundable deposit
                      </div>
                    )}
                  </div>

                  <Button
                    variant={isSelected ? "default" : "outline"}
                    className="w-full mb-6"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {isSelected ? "Selected" : "Select Plan"}
                  </Button>

                  <div className="space-y-3">
                    {features.slice(0, 3).map((feature, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <span className="text-sm">{feature.name}</span>
                                {feature.tooltip && (
                                  <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                                )}
                              </div>
                            </TooltipTrigger>
                            {feature.tooltip && (
                              <TooltipContent>
                                <p>{feature.tooltip}</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                        <div>
                          {renderValue(
                            feature[plan as keyof typeof feature] as
                              | boolean
                              | string,
                          )}
                        </div>
                      </div>
                    ))}
                    {features.length > 3 && (
                      <div className="text-center text-sm text-primary cursor-pointer hover:underline">
                        See all features
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Feature Comparison */}
      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-medium">Features</th>
                <th className="text-center p-4 font-medium">Bronze</th>
                <th className="text-center p-4 font-medium">Silver</th>
                <th className="text-center p-4 font-medium">Gold</th>
                <th className="text-center p-4 font-medium">Legacy</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                >
                  <td className="p-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center">
                            <span>{feature.name}</span>
                            {feature.tooltip && (
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            )}
                          </div>
                        </TooltipTrigger>
                        {feature.tooltip && (
                          <TooltipContent>
                            <p>{feature.tooltip}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="text-center p-4">
                    {renderValue(feature.bronze)}
                  </td>
                  <td className="text-center p-4">
                    {renderValue(feature.silver)}
                  </td>
                  <td className="text-center p-4">
                    {renderValue(feature.gold)}
                  </td>
                  <td className="text-center p-4">
                    {renderValue(feature.legacy)}
                  </td>
                </tr>
              ))}
              <tr className="bg-muted/10">
                <td className="p-4 font-medium">Price</td>
                <td className="text-center p-4">
                  ₹{planPricing.bronze["1year"]} / year
                  <br />
                  <span className="text-sm text-muted-foreground">
                    + ₹{securityDeposit} deposit
                  </span>
                </td>
                <td className="text-center p-4">
                  ₹{planPricing.silver["1year"]} / year
                  <br />
                  <span className="text-sm text-muted-foreground">
                    + ₹{securityDeposit} deposit
                  </span>
                </td>
                <td className="text-center p-4">
                  ₹{planPricing.gold["1year"]} / year
                  <br />
                  <span className="text-sm text-muted-foreground">
                    + ₹{securityDeposit} deposit
                  </span>
                </td>
                <td className="text-center p-4">
                  ₹{planPricing.legacy.oneTime}
                  <br />
                  <span className="text-sm text-muted-foreground">
                    one-time
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          All plans include the Autobox device. Subscription plans require a
          refundable security deposit of ₹{securityDeposit}.
        </p>
        <p className="mt-2">
          3-year subscriptions include a 10% discount on the total subscription
          cost.
        </p>
      </div>
    </div>
  );
};

export default PlanComparisonTable;
