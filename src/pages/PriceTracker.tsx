import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown } from "lucide-react";

const PriceTracker = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">📊 Price Tracker</h1>
            <p className="text-muted-foreground mb-8">
              Track your products like stock charts – never miss a price drop!
            </p>
            
            {/* Gamified Badges */}
            <div className="flex gap-3 mb-8">
              <Badge variant="secondary" className="text-sm py-2 px-4">
                🏆 Smart Saver
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                🎯 Deal Hunter
              </Badge>
            </div>
            
            {/* Sample Product Tracking Card */}
            <Card className="hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <img
                    src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop"
                    alt="Product"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Elica 60cm Auto Clean Kitchen Chimney</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Current Amazon Price</div>
                        <div className="text-xl font-bold">₹8,999</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Current Flipkart Price</div>
                        <div className="text-xl font-bold">₹9,499</div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded-lg mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Lowest Price Ever</div>
                          <div className="text-lg font-bold text-primary">₹7,999</div>
                          <div className="text-xs text-muted-foreground">15 Dec 2024</div>
                        </div>
                        <Badge variant="secondary">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          Tracking Daily
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Price History Chart Placeholder */}
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-4 h-48 flex items-center justify-center border border-border">
                      <div className="text-center text-muted-foreground">
                        <TrendingDown className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Price history chart coming soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PriceTracker;
