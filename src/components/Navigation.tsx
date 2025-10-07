import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, BookOpen, Heart, User, ChevronDown, Lightbulb } from "lucide-react";
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
    location.pathname === '/school/postgraduate' ||
    location.pathname.startsWith('/graduate/program/') ||
    location.pathname.startsWith('/course/');
  
  const isHomeActive = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/suggestions';
  
  const isUndergraduateActive = location.pathname === '/school/undergraduate';
  const isGraduateActive = location.pathname === '/school/graduate' || location.pathname.startsWith('/graduate/program/');
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
              className="w-80 max-h-[80vh] overflow-y-auto bg-background/95 dark:bg-gray-900/95 border border-border shadow-2xl backdrop-blur-md rounded-xl p-3 z-[100]"
            >
              <DropdownMenuItem asChild className={`rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer ${location.pathname === '/' ? 'bg-primary/20 text-primary font-semibold border-l-2 border-primary' : ''}`}>
                <Link to="/" className="w-full flex items-center space-x-2 p-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4 ${location.pathname === '/about' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
                <Link to="/about" className="w-full flex items-center space-x-2 p-2">
                  <User className="h-4 w-4" />
                  <span>About</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4 ${location.pathname === '/suggestions' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
                <Link to="/suggestions" className="w-full flex items-center space-x-2 p-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Suggestions</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/30 my-2" />
              <DropdownMenuItem asChild className={`rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer ${location.pathname === '/universities' ? 'bg-primary/20 text-primary font-semibold border-l-2 border-primary' : ''}`}>
                <Link to="/universities" className="w-full flex items-center space-x-2 p-2">
                  <Search className="h-4 w-4" />
                  <span>Make the right choice</span>
                </Link>
              </DropdownMenuItem>
              {isCourseExplorerActive && (
                <>
                  <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4 ${location.pathname === '/course-explorer' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
                    <Link to="/course-explorer" className="w-full flex items-center space-x-2 p-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Course Explorer</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-8 ${location.pathname === '/school/undergraduate' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
                    <Link to="/school/undergraduate" className="w-full flex items-center space-x-2 p-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Undergraduate</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-8 ${location.pathname === '/school/graduate' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
                    <Link to="/school/graduate" className="w-full flex items-center space-x-2 p-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Graduate</span>
                    </Link>
                  </DropdownMenuItem>
                  {isGraduateActive && (
                    <>
                      <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/1' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                        <Link to="/graduate/program/1" className="w-full flex items-center p-1.5">
                          <span className="break-words">Policies and Governance in Europe</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/2' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                        <Link to="/graduate/program/2" className="w-full flex items-center p-1.5">
                          <span className="break-words">Economia, Istituzioni e Mercati Finanziari</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/3' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                        <Link to="/graduate/program/3" className="w-full flex items-center p-1.5">
                          <span className="break-words">Finance (Corporate Finance)</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/4' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                        <Link to="/graduate/program/4" className="w-full flex items-center p-1.5">
                          <span className="break-words">Global Management and Politics</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/5' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                        <Link to="/graduate/program/5" className="w-full flex items-center p-1.5">
                          <span className="break-words">Government and Public Affairs</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/6' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                        <Link to="/graduate/program/6" className="w-full flex items-center p-1.5">
                          <span className="break-words">International Relations</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/7' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                        <Link to="/graduate/program/7" className="w-full flex items-center p-1.5">
                          <span className="break-words">Management</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/8' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                        <Link to="/graduate/program/8" className="w-full flex items-center p-1.5">
                          <span className="break-words">Marketing</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/9' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                        <Link to="/graduate/program/9" className="w-full flex items-center p-1.5">
                          <span className="break-words">Strategic Management</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/10' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                        <Link to="/graduate/program/10" className="w-full flex items-center p-1.5">
                          <span className="break-words">Amministrazione, Finanza e Controllo</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/11' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                        <Link to="/graduate/program/11" className="w-full flex items-center p-1.5">
                          <span className="break-words">Data Science and Management</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-8 ${location.pathname === '/school/postgraduate' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
                    <Link to="/school/postgraduate" className="w-full flex items-center space-x-2 p-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Post Graduate</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator className="bg-border/30 my-2" />
              <DropdownMenuItem asChild className={`rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer ${location.pathname === '/business-partner' ? 'bg-primary/20 text-primary font-semibold border-l-2 border-primary' : ''}`}>
                <Link to="/business-partner" className="w-full flex items-center space-x-2 p-2">
                  <Heart className="h-4 w-4" />
                  <span>Find your business partner</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4 ${location.pathname === '/student-board' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
                <Link to="/student-board" className="w-full flex items-center space-x-2 p-2">
                  <User className="h-4 w-4" />
                  <span>Looking for a position</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4 ${location.pathname === '/post-position' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
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