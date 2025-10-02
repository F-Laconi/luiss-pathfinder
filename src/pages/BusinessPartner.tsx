import { Link } from "react-router-dom";
import { Search, Briefcase, Users, TrendingUp, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
const BusinessPartner = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Header with Gradient */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground font-medium mb-12 transition-colors"
          >
            <span>←</span>
            <span className="ml-2">Back to Home</span>
          </Link>
          
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
              Connect Talent with Opportunity
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed mb-12">
              A professional platform bridging exceptional talent with outstanding career opportunities. 
              Join thousands of professionals building their future.
            </p>
            
            {/* Stats */}
            <div className="flex gap-12 pt-8 border-t">
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Active Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">2,500+</div>
                <div className="text-sm text-muted-foreground">Open Positions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Match Success</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Action Cards */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background via-background to-muted/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.03),transparent_70%)]"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              How Can We Help You?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your path and start building meaningful connections today
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {/* Looking for a Position Card */}
            <div className="group relative animate-fade-in">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary via-secondary to-primary rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 border-border rounded-3xl p-12 hover:border-primary transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-3">
                <div className="text-center">
                  <div className="relative w-28 h-28 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-lg">
                      <Search className="w-14 h-14 text-primary-foreground group-hover:scale-125 transition-transform duration-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-5 text-foreground">Looking for Opportunities</h3>
                  <p className="text-muted-foreground mb-10 leading-relaxed text-lg">
                    Discover career-defining opportunities tailored to your unique skills and aspirations. 
                    Join a network of top companies actively seeking exceptional talent.
                  </p>
                  
                  <div className="space-y-3 mb-10">
                    {["Browse curated positions", "Match with top employers", "Get hired faster"].map((item, idx) => (
                      <div key={idx} className="flex items-center text-left text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/student-board">
                    <Button 
                      size="lg" 
                      className="w-full text-lg py-7 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      Explore Opportunities
                      <Search className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Post a Position Card */}
            <div className="group relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -inset-1 bg-gradient-to-br from-secondary via-accent to-secondary rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 border-border rounded-3xl p-12 hover:border-secondary transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-3">
                <div className="text-center">
                  <div className="relative w-28 h-28 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/80 to-accent rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent rounded-3xl flex items-center justify-center shadow-lg">
                      <Briefcase className="w-14 h-14 text-secondary-foreground group-hover:scale-125 transition-transform duration-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-5 text-foreground">Post Opportunities</h3>
                  <p className="text-muted-foreground mb-10 leading-relaxed text-lg">
                    Connect with exceptional talent ready to drive your business forward. 
                    Post positions and find qualified professionals who align with your vision.
                  </p>
                  
                  <div className="space-y-3 mb-10">
                    {["Reach qualified candidates", "Streamlined hiring process", "Build your dream team"].map((item, idx) => (
                      <div key={idx} className="flex items-center text-left text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/post-position">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="w-full text-lg py-7 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      Post a Position
                      <Briefcase className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default BusinessPartner;