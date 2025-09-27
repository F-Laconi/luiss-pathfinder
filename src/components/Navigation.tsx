import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, BookOpen, Heart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-md border-b border-border/20 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link to="/" className="flex items-center space-x-2 font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:from-primary/90 hover:to-primary/70 transition-all duration-300 cursor-pointer group">
                <BookOpen className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                <span>UniCompass</span>
                <ChevronDown className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors duration-300" />
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-background/95 backdrop-blur-sm border border-border/20 shadow-lg">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/course-explorer" className="w-full">
                  Make the right choice
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/business-partner" className="w-full">
                  Find your business partner
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="pl-6">
                <Link to="/student-board" className="w-full">
                  Looking for a position
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="pl-6">
                <Link to="/post-position" className="w-full">
                  Post a position
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="default" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-12 left-0 right-0 bg-white border-b border-border shadow-lg">
            <div className="p-4 space-y-4">
              <Link
                to="/masters"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Masters Programs
              </Link>
              <Link
                to="/courses"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Courses
              </Link>
              <Link
                to="/professors"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Professors
              </Link>
              <div className="pt-4 border-t border-border">
                <Button variant="default" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;