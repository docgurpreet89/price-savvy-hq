import { Search, Scale, ShoppingCart, Shield, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Top Deals",
    description: "Explore curated Top 10 product lists",
  },
  {
    icon: Scale,
    title: "Compare Prices",
    description: "See Amazon vs Flipkart live prices",
  },
  {
    icon: ShoppingCart,
    title: "Choose Where to Buy",
    description: "Buy via secure affiliate links",
  },
  {
    icon: Shield,
    title: "Shop Safely",
    description: "Secure purchases on trusted sites",
  },
  {
    icon: TrendingUp,
    title: "Track & Repeat",
    description: "Use wishlist, alerts & price tracker",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          How to Get the Best Deals on ApniList
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="bg-card p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 h-full border border-border hover:border-primary/20">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="mb-4 text-primary mt-2">
                  <step.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                
                {/* Content */}
                <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
