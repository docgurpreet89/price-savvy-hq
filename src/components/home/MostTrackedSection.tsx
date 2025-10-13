import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, Heart } from "lucide-react";

const sampleProducts = [
  {
    id: 1,
    name: "Elica 60cm Auto Clean Kitchen Chimney",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
    amazonPrice: 8999,
    flipkartPrice: 9499,
    lowestPrice: 7999,
    priceDropPercent: 11,
  },
  {
    id: 2,
    name: "Samsung 55-inch Crystal 4K Smart TV",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
    amazonPrice: 42990,
    flipkartPrice: 43999,
    lowestPrice: 39990,
    priceDropPercent: 7,
  },
  {
    id: 3,
    name: "Dyson Pure Cool Air Purifier",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop",
    amazonPrice: 34900,
    flipkartPrice: 35900,
    lowestPrice: 32900,
    priceDropPercent: 6,
  },
];

const MostTrackedSection = () => {
  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">🔥 Most Tracked Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      {product.priceDropPercent}% off
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amazon:</span>
                    <span className="font-semibold">₹{product.amazonPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Flipkart:</span>
                    <span className="font-semibold">₹{product.flipkartPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">Lowest Ever:</span>
                    <span className="font-bold text-primary">₹{product.lowestPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1" size="sm">
                    Buy Today
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostTrackedSection;
