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
import AuthDialog from "@/pages/Auth";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Check if current route is luiss-university or related pages
  const isLuissUniversityActive = location.pathname === '/luiss-university' || 
    location.pathname === '/school/undergraduate' || 
    location.pathname === '/school/graduate' || 
    location.pathname === '/school/postgraduate' ||
    location.pathname.startsWith('/graduate/program/') ||
    location.pathname.startsWith('/course/');
  
  const isHomeActive = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/suggestions';
  
  const isUndergraduateActive = location.pathname === '/school/undergraduate' || location.pathname.startsWith('/undergraduate/program/');
  const isGraduateActive = location.pathname === '/school/graduate' || location.pathname.startsWith('/graduate/program/');
  const isPostGraduateActive = location.pathname === '/school/postgraduate';
  
  // Check which specific course/program is active
  const currentCourseId = location.pathname.startsWith('/course/') ? location.pathname.split('/course/')[1] : null;
  const currentProgramFromCourse = currentCourseId ? currentCourseId.split('-')[0] : null;
  const currentProgramFromPath = location.pathname.match(/\/(graduate|undergraduate)\/program\/(\d+)/)?.[2];
  
  const activeProgram = currentProgramFromCourse || currentProgramFromPath;
  
  // Get active course ID for subject filtering
  const activeCourseId = currentCourseId;

  useEffect(() => {
    const handleScroll = () => {
      // Keep navigation visible on /universities page
      if (location.pathname === '/universities') {
        setIsVisible(true);
        return;
      }

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
  }, [lastScrollY, location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-lg transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-primary z-50 relative cursor-pointer p-1 hover:bg-primary/10 rounded">
                  <Menu className="h-6 w-6" />
                </button>
              </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-96 max-h-[80vh] overflow-y-auto bg-card border-2 border-border shadow-2xl rounded-xl p-3"
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
              {isLuissUniversityActive && (
                <>
                  <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-4 ${location.pathname === '/luiss-university' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
                    <Link to="/luiss-university" className="w-full flex items-center space-x-2 p-2">
                      <BookOpen className="h-4 w-4" />
                      <span>LUISS University</span>
                    </Link>
                  </DropdownMenuItem>
                  {!isGraduateActive && !isPostGraduateActive && (
                    <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-8 ${location.pathname === '/school/undergraduate' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
                      <Link to="/school/undergraduate" className="w-full flex items-center space-x-2 p-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Undergraduate</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {isUndergraduateActive && (
                    <>
                      {(!activeProgram || activeProgram === '1') && (
                        <>
                          <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/undergraduate/program/1' || (activeProgram === '1' && activeCourseId) ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                            <Link to="/undergraduate/program/1" className="w-full flex items-center p-1.5">
                              <span className="break-words">Global Law</span>
                            </Link>
                          </DropdownMenuItem>
                      {(!activeCourseId || activeCourseId === 'ug-1-0') && location.pathname !== '/school/undergraduate' && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/ug-1-0' ? 'bg-muted/30 font-medium' : ''}`}>
                          <Link to="/course/ug-1-0" className="w-full flex items-center p-1">
                            <span className="break-words">International Law</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {(!activeCourseId || activeCourseId === 'ug-1-1') && location.pathname !== '/school/undergraduate' && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/ug-1-1' ? 'bg-muted/30 font-medium' : ''}`}>
                          <Link to="/course/ug-1-1" className="w-full flex items-center p-1">
                            <span className="break-words">Comparative Law</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                        </>
                      )}
                      {(!activeProgram || activeProgram === '2') && (
                        <>
                          <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/undergraduate/program/2' || (activeProgram === '2' && activeCourseId) ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                            <Link to="/undergraduate/program/2" className="w-full flex items-center p-1.5">
                              <span className="break-words">Business Administration</span>
                            </Link>
                          </DropdownMenuItem>
                      {(!activeCourseId || activeCourseId === 'ug-2-0') && location.pathname !== '/school/undergraduate' && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/ug-2-0' ? 'bg-muted/30 font-medium' : ''}`}>
                          <Link to="/course/ug-2-0" className="w-full flex items-center p-1">
                            <span className="break-words">Business Strategy</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                        </>
                      )}
                      {(!activeProgram || activeProgram === '3') && (
                        <>
                          <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/undergraduate/program/3' || (activeProgram === '3' && activeCourseId) ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                            <Link to="/undergraduate/program/3" className="w-full flex items-center p-1.5">
                              <span className="break-words">Management and Artificial Intelligence</span>
                            </Link>
                          </DropdownMenuItem>
                      {(!activeCourseId || activeCourseId === 'ug-3-0') && location.pathname !== '/school/undergraduate' && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/ug-3-0' ? 'bg-muted/30 font-medium' : ''}`}>
                          <Link to="/course/ug-3-0" className="w-full flex items-center p-1">
                            <span className="break-words">AI Foundations</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                        </>
                      )}
                      {(!activeProgram || activeProgram === '4') && (
                        <>
                          <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/undergraduate/program/4' || (activeProgram === '4' && activeCourseId) ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                            <Link to="/undergraduate/program/4" className="w-full flex items-center p-1.5">
                              <span className="break-words">Economics and Business</span>
                            </Link>
                          </DropdownMenuItem>
                      {(!activeCourseId || activeCourseId === 'ug-4-0') && location.pathname !== '/school/undergraduate' && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/ug-4-0' ? 'bg-muted/30 font-medium' : ''}`}>
                          <Link to="/course/ug-4-0" className="w-full flex items-center p-1">
                            <span className="break-words">Microeconomics</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                        </>
                      )}
                      {(!activeProgram || activeProgram === '5') && (
                        <>
                          <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/undergraduate/program/5' || (activeProgram === '5' && activeCourseId) ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                            <Link to="/undergraduate/program/5" className="w-full flex items-center p-1.5">
                              <span className="break-words">Politics: Philosophy and Economics</span>
                            </Link>
                          </DropdownMenuItem>
                      {(!activeCourseId || activeCourseId === 'ug-5-0') && location.pathname !== '/school/undergraduate' && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/ug-5-0' ? 'bg-muted/30 font-medium' : ''}`}>
                          <Link to="/course/ug-5-0" className="w-full flex items-center p-1">
                            <span className="break-words">Political Philosophy</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                        </>
                      )}
                      {(!activeProgram || activeProgram === '6') && (
                        <>
                          <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/undergraduate/program/6' || (activeProgram === '6' && activeCourseId) ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                            <Link to="/undergraduate/program/6" className="w-full flex items-center p-1.5">
                              <span className="break-words">Giurisprudenza</span>
                            </Link>
                          </DropdownMenuItem>
                      {(!activeCourseId || activeCourseId === 'ug-6-0') && location.pathname !== '/school/undergraduate' && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/ug-6-0' ? 'bg-muted/30 font-medium' : ''}`}>
                          <Link to="/course/ug-6-0" className="w-full flex items-center p-1">
                            <span className="break-words">Diritto Civile</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                        </>
                      )}
                      {(!activeProgram || activeProgram === '7') && (
                        <>
                          <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/undergraduate/program/7' || (activeProgram === '7' && activeCourseId) ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                            <Link to="/undergraduate/program/7" className="w-full flex items-center p-1.5">
                              <span className="break-words">Economics and Management</span>
                            </Link>
                          </DropdownMenuItem>
                      {(!activeCourseId || activeCourseId === 'ug-7-0') && location.pathname !== '/school/undergraduate' && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/ug-7-0' ? 'bg-muted/30 font-medium' : ''}`}>
                          <Link to="/course/ug-7-0" className="w-full flex items-center p-1">
                            <span className="break-words">Management Principles</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                        </>
                      )}
                      {(!activeProgram || activeProgram === '8') && (
                        <>
                          <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/undergraduate/program/8' || (activeProgram === '8' && activeCourseId) ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                            <Link to="/undergraduate/program/8" className="w-full flex items-center p-1.5">
                              <span className="break-words">Political Science</span>
                            </Link>
                          </DropdownMenuItem>
                      {(!activeCourseId || activeCourseId === 'ug-8-0') && location.pathname !== '/school/undergraduate' && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/ug-8-0' ? 'bg-muted/30 font-medium' : ''}`}>
                          <Link to="/course/ug-8-0" className="w-full flex items-center p-1">
                            <span className="break-words">Political Theory</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                        </>
                      )}
                    </>
                  )}
                  {!isUndergraduateActive && !isPostGraduateActive && (
                    <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-8 ${location.pathname === '/school/graduate' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
                      <Link to="/school/graduate" className="w-full flex items-center space-x-2 p-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Graduate</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {isGraduateActive && (
                    <>
                      {(!activeProgram || activeProgram === '1') && (
                        <>
                          <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/1' || (activeProgram === '1' && activeCourseId) ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                            <Link to="/graduate/program/1" className="w-full flex items-center p-1.5">
                              <span className="break-words">Policies and Governance in Europe</span>
                            </Link>
                          </DropdownMenuItem>
                          {activeProgram === '1' && activeCourseId && (
                            <>
                              {(!activeCourseId || activeCourseId === '1-0-0') && (
                                <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/1-0-0' ? 'bg-muted/30 font-medium' : ''}`}>
                                  <Link to="/course/1-0-0" className="w-full flex items-center p-1">
                                    <span className="break-words">European Integration and Institutions</span>
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              {(!activeCourseId || activeCourseId === '1-0-1') && (
                                <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/1-0-1' ? 'bg-muted/30 font-medium' : ''}`}>
                                  <Link to="/course/1-0-1" className="w-full flex items-center p-1">
                                    <span className="break-words">Comparative Political Systems</span>
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              {(!activeCourseId || activeCourseId === '1-0-2') && (
                                <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/1-0-2' ? 'bg-muted/30 font-medium' : ''}`}>
                                  <Link to="/course/1-0-2" className="w-full flex items-center p-1">
                                    <span className="break-words">Policy Analysis and Evaluation</span>
                                  </Link>
                                </DropdownMenuItem>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {(!activeProgram || activeProgram === '2') && (
                        <>
                          <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/2' || (activeProgram === '2' && activeCourseId) ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                            <Link to="/graduate/program/2" className="w-full flex items-center p-1.5">
                              <span className="break-words">Economia, Istituzioni e Mercati Finanziari</span>
                            </Link>
                          </DropdownMenuItem>
                          {activeProgram === '2' && activeCourseId && (
                            <>
                              {(!activeCourseId || activeCourseId === '2-0-0') && (
                                <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/2-0-0' ? 'bg-muted/30 font-medium' : ''}`}>
                                  <Link to="/course/2-0-0" className="w-full flex items-center p-1">
                                    <span className="break-words">Macroeconomics</span>
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              {(!activeCourseId || activeCourseId === '2-0-1') && (
                                <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/2-0-1' ? 'bg-muted/30 font-medium' : ''}`}>
                                  <Link to="/course/2-0-1" className="w-full flex items-center p-1">
                                    <span className="break-words">Microeconomics</span>
                                  </Link>
                                </DropdownMenuItem>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {(!activeProgram || activeProgram === '3') && (
                        <>
                          <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/3' || (activeProgram === '3' && activeCourseId) ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                            <Link to="/graduate/program/3" className="w-full flex items-center p-1.5">
                              <span className="break-words">Finance (Corporate Finance)</span>
                            </Link>
                          </DropdownMenuItem>
                          {activeProgram === '3' && activeCourseId && (
                            <>
                              {(!activeCourseId || activeCourseId === '3-0-0') && (
                                <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/3-0-0' ? 'bg-muted/30 font-medium' : ''}`}>
                                  <Link to="/course/3-0-0" className="w-full flex items-center p-1">
                                    <span className="break-words">Corporate Strategy</span>
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              {(!activeCourseId || activeCourseId === '3-0-1') && (
                                <DropdownMenuItem asChild className={`rounded-lg hover:bg-muted/10 transition-all duration-200 cursor-pointer ml-16 text-xs ${location.pathname === '/course/3-0-1' ? 'bg-muted/30 font-medium' : ''}`}>
                                  <Link to="/course/3-0-1" className="w-full flex items-center p-1">
                                    <span className="break-words">Compliance and Risk Management</span>
                                  </Link>
                                </DropdownMenuItem>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {(!activeProgram || activeProgram === '4') && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/4' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                          <Link to="/graduate/program/4" className="w-full flex items-center p-1.5">
                            <span className="break-words">Global Management and Politics</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {(!activeProgram || activeProgram === '5') && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/5' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                          <Link to="/graduate/program/5" className="w-full flex items-center p-1.5">
                            <span className="break-words">Government and Public Affairs</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {(!activeProgram || activeProgram === '6') && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/6' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                          <Link to="/graduate/program/6" className="w-full flex items-center p-1.5">
                            <span className="break-words">International Relations</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {(!activeProgram || activeProgram === '7') && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/7' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                          <Link to="/graduate/program/7" className="w-full flex items-center p-1.5">
                            <span className="break-words">Management</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {(!activeProgram || activeProgram === '8') && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/8' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                          <Link to="/graduate/program/8" className="w-full flex items-center p-1.5">
                            <span className="break-words">Marketing</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {(!activeProgram || activeProgram === '9') && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/9' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                          <Link to="/graduate/program/9" className="w-full flex items-center p-1.5">
                            <span className="break-words">Strategic Management</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {(!activeProgram || activeProgram === '10') && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/10' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                          <Link to="/graduate/program/10" className="w-full flex items-center p-1.5">
                            <span className="break-words">Amministrazione, Finanza e Controllo</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {(!activeProgram || activeProgram === '11') && (
                        <DropdownMenuItem asChild className={`rounded-lg hover:bg-secondary/10 hover:text-secondary-foreground transition-all duration-200 cursor-pointer ml-12 text-sm whitespace-normal ${location.pathname === '/graduate/program/11' ? 'bg-secondary/20 text-secondary-foreground font-medium' : ''}`}>
                          <Link to="/graduate/program/11" className="w-full flex items-center p-1.5">
                            <span className="break-words">Data Science and Management</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                  {!isUndergraduateActive && !isGraduateActive && (
                    <DropdownMenuItem asChild className={`rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition-all duration-200 cursor-pointer ml-8 ${location.pathname === '/school/postgraduate' ? 'bg-accent/20 text-accent-foreground font-semibold border-l-2 border-accent' : ''}`}>
                      <Link to="/school/postgraduate" className="w-full flex items-center space-x-2 p-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Post Graduate</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
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
          <Link to="/" className="font-bold text-xl text-primary hover:text-primary/80 transition-colors">
            UniCompass
          </Link>
        </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="default" size="sm" onClick={() => setIsAuthOpen(true)}>
              Sign Up
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="default" size="sm" onClick={() => setIsAuthOpen(true)}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      
      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </nav>
  );
};

export default Navigation;