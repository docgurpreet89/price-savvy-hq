import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Heart, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type WishlistItem = {
  id: string;
  product_id: string;
  products: {
    id: string;
    title: string;
    image_url: string | null;
    price: number;
    affiliate_url: string;
  };
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const { data, error } = await supabase
          .from("wishlist")
          .select(`
            id,
            product_id,
            products (
              id,
              title,
              image_url,
              price,
              affiliate_url
            )
          `)
          .eq("user_id", user.id);

        if (error) throw error;
        setWishlistItems(data || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast({
          title: "Error",
          description: "Failed to load wishlist",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user, navigate, toast]);

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", wishlistId);

      if (error) throw error;

      setWishlistItems((prev) => prev.filter((item) => item.id !== wishlistId));
      toast({
        title: "Success",
        description: "Removed from wishlist",
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to remove from wishlist",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">❤️ My Wishlist</h1>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading wishlist...</p>
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Your wishlist is empty</p>
              <Button 
                className="mt-4"
                onClick={() => navigate("/deals")}
              >
                Browse Deals
              </Button>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="hover:shadow-hover transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={item.products.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"}
                        alt={item.products.title}
                        className="w-full md:w-48 h-48 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.products.title}</h3>
                          
                          <div className="mb-4">
                            <div className="text-xs text-muted-foreground mb-1">Current Price</div>
                            <div className="text-2xl font-bold">₹{item.products.price.toLocaleString()}</div>
                          </div>
                          
                          <Badge variant="secondary">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            Price tracking active
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            onClick={() => window.open(item.products.affiliate_url, "_blank")}
                          >
                            Buy Now
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <Heart className="h-5 w-5 fill-current" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
