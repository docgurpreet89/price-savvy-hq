// src/pages/Articles.tsx
"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import { useArticles } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ArticlesPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { categories, articles: initialArticles, loading } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [displayArticles, setDisplayArticles] = useState(initialArticles);

  useEffect(() => setDisplayArticles(initialArticles), [initialArticles]);

  useEffect(() => {
    // load wishlist from localStorage (or you may load from DB per user)
    const saved = typeof window !== "undefined" ? localStorage.getItem("apni_wishlist") : null;
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch {
        setWishlist([]);
      }
    }
  }, []);

  const persistWishlist = (items: string[]) => {
    setWishlist(items);
    localStorage.setItem("apni_wishlist", JSON.stringify(items));
  };

  const handleWishlistToggle = (id: string) => {
    const exists = wishlist.includes(id);
    const updated = exists ? wishlist.filter((x) => x !== id) : [id, ...wishlist];
    persistWishlist(updated);
    toast({ title: exists ? "Removed" : "Added", description: exists ? "Removed from wishlist" : "Added to wishlist" });
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val.trim().length > 1) {
      const filtered = categories
        .filter((c) => c.name.toLowerCase().includes(val.toLowerCase()))
        .map((c) => c.name)
        .slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (s: string) => {
    const cat = categories.find((c) => c.name === s);
    if (cat) navigate(`/search?category=${cat.slug}`);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const openCategory = (slug: string) => navigate(`/search?category=${slug}`);

  const openArticle = (slug: string) => navigate(`/articles/${slug}`);

  // wishlist articles (4 columns x 5 rows = 20 items per page)
  const wishlistItems = (initialArticles || []).filter((a: any) => wishlist.includes(a.id));
  const wishlistPaged = wishlistItems.slice(0, 20);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-3">Expert Product Reviews</h1>
            <p className="text-muted-foreground mb-8">In-depth reviews, price tracking & best deals curated for you.</p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setShowSuggestions(searchQuery.length > 1)}
                placeholder="Search articles or categories (try 'chimney', 'tv')..."
                className="pl-10 pr-4 py-4 rounded-xl"
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-card border rounded-lg shadow z-20">
                  {suggestions.map((s, i) => (
                    <button key={i} onClick={() => handleSuggestionClick(s)} className="w-full text-left px-4 py-3 hover:bg-muted transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-10 container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((c) => (
              <Card key={c.id} className="cursor-pointer hover:shadow-md" onClick={() => openCategory(c.slug)}>
                <CardContent className="text-center p-4">
                  <div className="text-3xl mb-2">{c.icon || "📦"}</div>
                  <div className="font-medium">{c.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Latest / Featured */}
        <section className="py-12 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Reviewed Products</h2>
              <div className="text-sm text-muted-foreground">Showing top picks</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-64 bg-muted/30 animate-pulse rounded-lg" />
                ))
              ) : (initialArticles || []).length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">No articles yet — admin can create new articles from /admin/articles/new</div>
              ) : (
                (initialArticles || []).slice(0, 8).map((a: any) => (
                  <ArticleCard
                    key={a.id}
                    id={a.id}
                    title={a.title}
                    slug={a.slug}
                    excerpt={a.excerpt}
                    featured_image={a.featured_image}
                    price={a.price}
                    discount_percent={a.discount_percent}
                    categoryName={a.category?.name}
                    amazon_link={a.amazon_link}
                    flipkart_link={a.flipkart_link}
                    onWishlistToggle={handleWishlistToggle}
                    isWishlisted={wishlist.includes(a.id)}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Wishlist grid 4x5 (20 items) */}
        <section className="py-12 container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Wishlist</h2>
            <div className="text-sm text-muted-foreground">4 cards per row · max 20 items shown</div>
          </div>

          {wishlistPaged.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">Your wishlist is empty. Click ♥ on a product to add it to your wishlist.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistPaged.map((a: any) => (
                <ArticleCard
                  key={a.id}
                  id={a.id}
                  title={a.title}
                  slug={a.slug}
                  excerpt={a.excerpt}
                  featured_image={a.featured_image}
                  price={a.price}
                  discount_percent={a.discount_percent}
                  categoryName={a.category?.name}
                  amazon_link={a.amazon_link}
                  flipkart_link={a.flipkart_link}
                  onWishlistToggle={handleWishlistToggle}
                  isWishlisted={wishlist.includes(a.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlesPage;
