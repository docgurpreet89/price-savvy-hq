import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Home, Tv, Wind, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Home Appliances", icon: Home, count: 24, color: "bg-primary/10 text-primary" },
  { name: "Electronics", icon: Tv, count: 18, color: "bg-secondary/10 text-secondary" },
  { name: "Kitchen", icon: Wind, count: 15, color: "bg-accent/10 text-accent" },
  { name: "Smart Devices", icon: Zap, count: 12, color: "bg-primary/10 text-primary" },
];

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Search Section */}
        <section className="bg-muted/20 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Expert Product Reviews</h1>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for products, brands, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-6 text-lg"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <Button variant="outline" size="sm">Under ₹10K</Button>
                <Button variant="outline" size="sm">Under ₹20K</Button>
                <Button variant="outline" size="sm">Under ₹30K</Button>
                <Button variant="outline" size="sm">Cost No Bar</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Card key={category.name} className="group hover:shadow-hover transition-all duration-300 cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex p-4 rounded-full ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} articles</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Articles */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Latest Reviews</h2>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              <Card className="hover:shadow-hover transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <img
                      src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300&h=200&fit=crop"
                      alt="Article"
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-primary mb-2">Home Appliances</div>
                      <h3 className="text-xl font-bold mb-2">Top 10 Kitchen Chimneys in 2025</h3>
                      <p className="text-muted-foreground mb-4">
                        Discover the best kitchen chimneys with powerful suction, auto-clean features, and modern designs that suit every budget.
                      </p>
                      <Button variant="outline" asChild>
                        <Link to="/articles/1">Read Full Review</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
