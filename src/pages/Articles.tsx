import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
};

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  categories: {
    name: string;
  } | null;
};

const Articles = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories")
          .select("id, name, slug, icon")
          .order("name");

        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);

        // Fetch latest articles
        const { data: articlesData, error: articlesError } = await supabase
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
          .eq("status", "published")
          .order("created_at", { ascending: false })
          .limit(6);

        if (articlesError) throw articlesError;
        setArticles(articlesData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, [toast]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim().length > 1) {
      const filtered = categories
        .filter((cat) => cat.name.toLowerCase().includes(value.toLowerCase()))
        .map((cat) => cat.name)
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleCategoryClick = (slug: string) => {
    navigate(`/search?category=${slug}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const category = categories.find((cat) => cat.name === suggestion);
    if (category) {
      navigate(`/search?category=${category.slug}`);
    }
    setShowSuggestions(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Search Section */}
        <section className="bg-muted/20 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Expert Product Reviews</h1>
            
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles or try 'chimney', 'tv', 'refrigerator'..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-10 pr-4 py-6 text-lg"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg z-10">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-muted transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  className="group hover:shadow-hover transition-all duration-300 cursor-pointer"
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon || "📦"}</div>
                    <h3 className="font-semibold text-base">{category.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Latest Reviews</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-hover transition-all duration-300 cursor-pointer" onClick={() => navigate(`/articles/${article.slug}`)}>
                  <img
                    src={article.featured_image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    {article.categories && (
                      <Badge variant="secondary" className="mb-2">
                        {article.categories.name}
                      </Badge>
                    )}
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
