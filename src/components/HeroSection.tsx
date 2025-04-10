import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Car, Fuel, MapPin, Shield } from "lucide-react";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color?: string;
}

const MetricCard = ({
  icon,
  value,
  label,
  color = "bg-primary/10",
}: MetricCardProps) => (
  <Card className="border-none shadow-sm">
    <CardContent className="p-6 flex flex-col items-center text-center">
      <div className={`${color} p-3 rounded-full mb-3`}>{icon}</div>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      <p className="text-muted-foreground text-sm">{label}</p>
    </CardContent>
  </Card>
);

interface TestimonialProps {
  quote: string;
  author: string;
  company: string;
  avatar: string;
}

const Testimonial = ({ quote, author, company, avatar }: TestimonialProps) => (
  <Card className="h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="flex-grow">
        <p className="italic text-muted-foreground mb-4">"{quote}"</p>
      </div>
      <div className="flex items-center mt-4">
        <img
          src={avatar}
          alt={author}
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const HeroSection = () => {
  // Mock data for metrics
  const metrics = [
    {
      icon: <Car className="h-6 w-6 text-primary" />,
      value: "12,458",
      label: "Active Devices",
      color: "bg-primary/10",
    },
    {
      icon: <MapPin className="h-6 w-6 text-orange-500" />,
      value: "8.2M",
      label: "Kilometers Tracked",
      color: "bg-orange-500/10",
    },
    {
      icon: <Fuel className="h-6 w-6 text-green-500" />,
      value: "342,120L",
      label: "Fuel Saved",
      color: "bg-green-500/10",
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      value: "3.5M",
      label: "Lane Assist Hours",
      color: "bg-blue-500/10",
    },
  ];

  // Mock data for testimonials
  const testimonials = [
    {
      quote:
        "The Autobox transformed my driving experience. The lane assist feature alone has made highway driving so much less stressful.",
      author: "Sarah Johnson",
      company: "Toyota Camry Owner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      quote:
        "I've saved nearly 15% on fuel since installing the Autobox. The eco mode is incredibly efficient for city driving.",
      author: "Michael Chen",
      company: "Honda Civic Owner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      quote:
        "The speed governor feature has helped our company fleet maintain safety standards. Worth every penny of the subscription.",
      author: "David Rodriguez",
      company: "Fleet Manager, Express Logistics",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-full bg-background py-12 md:py-24 lg:py-32 border-b">
      <div className="container px-4 md:px-6">
        {/* Hero Content */}
        <motion.div
          className="flex flex-col items-center text-center space-y-4 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Upgrade Your Drive with{" "}
              <span className="text-primary">Autobox</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Transform your vehicle with advanced features like speed
              governors, eco mode, and lane assist through our innovative
              subscription plans.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button size="lg" className="mt-6 h-12 px-8">
              Upgrade Your Vehicle <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-center text-lg font-medium mb-6">
            Trusted by leading automobile brands
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <img
              src="https://images.unsplash.com/photo-1612810806695-30f7a8258391?w=200&q=60"
              alt="Toyota"
              className="h-8 w-auto grayscale"
            />
            <img
              src="https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=200&q=60"
              alt="Honda"
              className="h-8 w-auto grayscale"
            />
            <img
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&q=60"
              alt="Ford"
              className="h-8 w-auto grayscale"
            />
            <img
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=200&q=60"
              alt="BMW"
              className="h-8 w-auto grayscale"
            />
            <img
              src="https://images.unsplash.com/photo-1626455613744-b0ffe4f2f0e5?w=200&q=60"
              alt="Audi"
              className="h-8 w-auto grayscale"
            />
          </div>
        </motion.div>

        {/* Real-time Metrics */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h2 className="text-center text-2xl font-bold mb-8">
            Real-time Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
                <MetricCard
                  icon={metric.icon}
                  value={metric.value}
                  label={metric.label}
                  color={metric.color}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <h2 className="text-center text-2xl font-bold mb-8">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
              >
                <Testimonial
                  quote={testimonial.quote}
                  author={testimonial.author}
                  company={testimonial.company}
                  avatar={testimonial.avatar}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to transform your driving experience?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied drivers who have upgraded their vehicles
            with Autobox's innovative features.
          </p>
          <Button size="lg" className="h-12 px-8">
            Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
