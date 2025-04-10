import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import PurchaseFlow from "./PurchaseFlow";
import UserEngagementSection from "./UserEngagementSection";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with metrics and testimonials */}
      <HeroSection />

      {/* Main Purchase Flow Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-slate-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Upgrade Your Vehicle!
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your driving experience with our cutting-edge Autobox
              device and subscription plans.
            </p>
          </motion.div>

          <PurchaseFlow />
        </div>
      </section>

      {/* User Engagement Sections */}
      <UserEngagementSection />

      {/* What is Autobox Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What is Autobox?
              </h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Autobox is a revolutionary hardware device that upgrades your
                automobile with advanced features like speed governor, eco and
                sports modes, hill-hold control, and lane keep assist.
              </p>
              <p className="text-lg mb-6 text-muted-foreground">
                Our subscription-based model ensures you always have access to
                the latest features and updates, with tiered plans to suit your
                needs and budget.
              </p>
              <ul className="space-y-3">
                {[
                  "Easy installation in most vehicle models",
                  "Customizable features based on your subscription tier",
                  "Real-time performance monitoring",
                  "Fuel efficiency improvements",
                  "Enhanced safety features",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1 text-primary">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80"
                  alt="Autobox device"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <p className="text-white font-medium">
                    The Autobox device - compact, powerful, transformative
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Autobox</h3>
              <p className="text-slate-300">
                Transforming vehicles with next-generation features and
                technology.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Products</h4>
              <ul className="space-y-2 text-slate-300">
                <li>Bronze Plan</li>
                <li>Silver Plan</li>
                <li>Gold Plan</li>
                <li>One-time Purchase</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li>FAQs</li>
                <li>Installation Guide</li>
                <li>Contact Support</li>
                <li>Find a Technician</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-slate-300">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-slate-700" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2023 Autobox. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-slate-400 text-sm">Terms of Service</span>
              <span className="text-slate-400 text-sm">Privacy Policy</span>
              <span className="text-slate-400 text-sm">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
