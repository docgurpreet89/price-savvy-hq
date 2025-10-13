import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, ExternalLink } from "lucide-react";

const sampleDeals = [
  {
    id: 1,
    name: "Elica 60cm Auto Clean Kitchen Chimney",
    category: "Home Appliances",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
    amazonPrice: 7999,
    originalPrice: 12999,
    discountPercent: 38,
  },
  {
    id: 2,
    name: "Samsung 55-inch Crystal 4K Smart TV",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
    amazonPrice: 39990,
    originalPrice: 54990,
    discountPercent: 27,
  },
  {
    id: 3,
    name: "Dyson Pure Cool Air Purifier",
    category: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop",
    amazonPrice: 32900,
    originalPrice: 45900,
    discountPercent: 28,
  },
];

const Deals = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Flame className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Today's Best Deals</h1>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button variant="outline" size="sm">All Categories</Button>
            <Button variant="outline" size="sm">Under ₹10K</Button>
            <Button variant="outline" size="sm">Under ₹20K</Button>
            <Button variant="outline" size="sm">Under ₹30K</Button>
            <Button variant="outline" size="sm">Top Brands</Button>
            <Button variant="outline" size="sm">30%+ Off</Button>
          </div>
          
          {/* Deals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDeals.map((deal) => (
              <Card key={deal.id} className="group hover:shadow-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                      {deal.discountPercent}% OFF
                    </Badge>
                  </div>
                  
                  <div className="text-xs font-medium text-primary mb-2">{deal.category}</div>
                  <h3 className="font-semibold text-lg mb-3">{deal.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">₹{deal.amazonPrice.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{deal.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Buy Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Deals;
