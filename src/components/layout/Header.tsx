import { Link } from "react-router-dom";
import { Bell, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">ApniList</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/articles" className="text-sm font-medium hover:text-primary transition-colors">
              Articles
            </Link>
            <Link to="/price-tracker" className="text-sm font-medium hover:text-primary transition-colors">
              Price Tracker
            </Link>
            <Link to="/deals" className="text-sm font-medium hover:text-primary transition-colors">
              Daily Deals
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild className="hidden md:flex">
              <Link to="/alerts">
                <Bell className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hidden md:flex">
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hidden md:flex">
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              to="/"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/articles"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              to="/price-tracker"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Price Tracker
            </Link>
            <Link
              to="/deals"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Daily Deals
            </Link>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/alerts">
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/wishlist">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
