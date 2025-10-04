import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Check if current route is course-explorer or related pages
  const isCourseExplorerActive = location.pathname === '/course-explorer' || 
    location.pathname === '/school/undergraduate' || 
    location.pathname === '/school/graduate' || 
    location.pathname === '/school/postgraduate';
  
  const isUndergraduateActive = location.pathname === '/school/undergraduate';
  const isGraduateActive = location.pathname === '/school/graduate';
  const isPostGraduateActive = location.pathname === '/school/postgraduate';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-sm border-b border-border/10 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-primary z-50 relative cursor-pointer">
                <BookOpen className="h-6 w-6" />
                <span>UniCompass</span>
                <ChevronDown className="h-4 w-4" />
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-64 bg-background/95 dark:bg-gray-900/95 border border-border shadow-2xl backdrop-blur-md rounded-xl p-3 z-[100]"
            >
              <DropdownMenuItem asChild className="rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer">
                <Link to="/" className="w-full flex items-center space-x-2 p-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/30 my-2" />
              <DropdownMenuItem asChild className="rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer">
                <Link to="/about" className="w-full flex items-center space-x-2 p-2">
                  <User className="h-4 w-4" />
                  <span>About</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/30 my-2" />
              <DropdownMenuItem asChild className="rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer">
                <Link to="/universities" className="w-full flex items-center space-x-2 p-2">
                  <Search className="h-4 w-4" />
                  <span>Make the right choice</span>
                </Link>
              </DropdownMenuItem>
              {isCourseExplorerActive && (
                <DropdownMenuItem asChild className="rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4">
                  <Link to="/course-explorer" className="w-full flex items-center space-x-2 p-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Course Explorer</span>
                  </Link>
                </DropdownMenuItem>
              )}
              {isUndergraduateActive && (
                <DropdownMenuItem asChild className="rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4">
                  <Link to="/school/undergraduate" className="w-full flex items-center space-x-2 p-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Undergraduate</span>
                  </Link>
                </DropdownMenuItem>
              )}
              {isGraduateActive && (
                <DropdownMenuItem asChild className="rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4">
                  <Link to="/school/graduate" className="w-full flex items-center space-x-2 p-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Graduate</span>
                  </Link>
                </DropdownMenuItem>
              )}
              {isPostGraduateActive && (
                <DropdownMenuItem asChild className="rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4">
                  <Link to="/school/postgraduate" className="w-full flex items-center space-x-2 p-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Post Graduate</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-border/30 my-2" />
              <DropdownMenuItem asChild className="rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer">
                <Link to="/business-partner" className="w-full flex items-center space-x-2 p-2">
                  <Heart className="h-4 w-4" />
                  <span>Find your business partner</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4">
                <Link to="/student-board" className="w-full flex items-center space-x-2 p-2">
                  <User className="h-4 w-4" />
                  <span>Looking for a position</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4">
                <Link to="/post-position" className="w-full flex items-center space-x-2 p-2">
                  <Menu className="h-4 w-4" />
                  <span>Post a position</span>
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