import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  categories: {
    name: string;
  } | null;
};

const priceFilters = [
  { label: "All Prices", value: null },
  { label: "Under ₹10K", value: 10000 },
  { label: "Under ₹20K", value: 20000 },
  { label: "Under ₹30K", value: 30000 },
  { label: "Cost No Bar", value: null },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categorySlug = searchParams.get("category");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        let queryBuilder = supabase
          .from("articles")
          .select(`
            id,
            title,
            slug,
            excerpt,
            featured_image,
            categories (
              name
            )
          `)
          .eq("status", "published");

        if (query) {
          queryBuilder = queryBuilder.or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`);
        }

        if (categorySlug) {
          const { data: categoryData } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", categorySlug)
            .single();
          
          if (categoryData) {
            queryBuilder = queryBuilder.eq("category_id", categoryData.id);
          }
        }

        const { data, error } = await queryBuilder.order("created_at", { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        toast({
          title: "Error",
          description: "Failed to load search results",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query, categorySlug, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {query ? `Search Results for "${query}"` : categorySlug ? `Category: ${categorySlug.replace(/-/g, " ")}` : "All Articles"}
            </h1>
            <p className="text-muted-foreground">
              {loading ? "Searching..." : `${articles.length} articles found`}
            </p>
          </div>

          {/* Price Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {priceFilters.map((filter) => (
              <Button
                key={filter.label}
                variant={selectedPriceFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPriceFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-hover transition-all duration-300">
                  <Link to={`/articles/${article.slug}`}>
                    <img
                      src={article.featured_image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <CardContent className="p-6">
                    {article.categories && (
                      <Badge variant="secondary" className="mb-2">
                        {article.categories.name}
                      </Badge>
                    )}
                    <Link to={`/articles/${article.slug}`}>
                      <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/articles/${article.slug}`}>Read More</Link>
                    </Button>
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

export default SearchResults;
