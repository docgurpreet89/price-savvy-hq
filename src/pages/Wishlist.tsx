import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Heart, ExternalLink } from "lucide-react";

const sampleWishlist = [
  {
    id: 1,
    name: "Elica 60cm Auto Clean Kitchen Chimney",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
    amazonPrice: 8999,
    flipkartPrice: 9499,
    lowestPrice: 7999,
    lowestPriceDate: "15 Dec 2024",
    percentFromLowest: 12,
  },
  {
    id: 2,
    name: "Samsung 55-inch Crystal 4K Smart TV",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
    amazonPrice: 42990,
    flipkartPrice: 43999,
    lowestPrice: 39990,
    lowestPriceDate: "20 Nov 2024",
    percentFromLowest: 7,
  },
];

const Wishlist = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">❤️ My Wishlist</h1>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {sampleWishlist.map((item) => {
              const isBuyToday = item.percentFromLowest <= 5;
              
              return (
                <Card key={item.id} className="hover:shadow-hover transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full md:w-48 h-48 object-cover rounded-lg"
                      />
                      
                      {/* Product Details */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                          
                          {/* Price Comparison */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground">Amazon</div>
                              <div className="text-xl font-bold">₹{item.amazonPrice.toLocaleString()}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground">Flipkart</div>
                              <div className="text-xl font-bold">₹{item.flipkartPrice.toLocaleString()}</div>
                            </div>
                          </div>
                          
                          {/* Lowest Price Ever */}
                          <div className="bg-muted/30 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Lowest Price Ever</div>
                                <div className="text-lg font-bold text-primary">₹{item.lowestPrice.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">{item.lowestPriceDate}</div>
                              </div>
                              <Badge variant={isBuyToday ? "default" : "secondary"} className="ml-4">
                                {isBuyToday ? (
                                  <>
                                    <TrendingDown className="w-3 h-3 mr-1" />
                                    Best Price!
                                  </>
                                ) : (
                                  <>
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    {item.percentFromLowest}% higher
                                  </>
                                )}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            variant={isBuyToday ? "default" : "outline"}
                          >
                            {isBuyToday ? "Buy Today" : "Don't Buy Today"}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Heart className="h-5 w-5 fill-current" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
