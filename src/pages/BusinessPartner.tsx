import { Link } from "react-router-dom";
import { Search, Briefcase, Users, TrendingUp, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
const BusinessPartner = () => {
  return (
    <>
      <title>Business Partner Opportunities | UniCompass</title>
      <meta name="description" content="Connect exceptional talent with innovative companies. Discover career opportunities or post positions to find qualified professionals for your team." />
      <link rel="canonical" href="https://unicompass.lovable.app/business-partner" />
      
      <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Header with Gradient */}
      <header className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="max-w-5xl">
            <div className="inline-block mb-6">
              <span className="text-sm font-semibold text-primary-foreground uppercase tracking-wider px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                Professional Network
              </span>
            </div>
            
            <h1 className="font-nunito text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-primary-foreground leading-[1.1]">
              Connect Talent with
              <span className="block mt-2 text-accent">
                Outstanding Opportunities
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 max-w-3xl leading-relaxed mb-12 sm:mb-16">
              Join a thriving ecosystem where exceptional talent meets innovative companies. 
              Build meaningful connections that drive careers forward.
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all hover:shadow-xl">
                <div className="text-4xl font-bold text-primary-foreground mb-2">500+</div>
                <div className="text-sm font-medium text-primary-foreground/80">Active Companies</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all hover:shadow-xl">
                <div className="text-4xl font-bold text-primary-foreground mb-2">2,500+</div>
                <div className="text-sm font-medium text-primary-foreground/80">Open Positions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all hover:shadow-xl">
                <div className="text-4xl font-bold text-accent mb-2">95%</div>
                <div className="text-sm font-medium text-primary-foreground/80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Action Cards */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-b from-background via-background to-muted/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.03),transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-12">
            <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground">
              How Can We Help You?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Choose your path and start building meaningful connections today
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {/* Looking for a Position Card */}
            <Link to="/student-board" className="group relative animate-fade-in cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary via-secondary to-primary rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 border-border rounded-3xl p-8 sm:p-10 md:p-12 hover:border-primary transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-3">
                <div className="text-center">
                  <div className="relative w-28 h-28 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-lg">
                      <Search className="w-14 h-14 text-primary-foreground group-hover:scale-125 transition-transform duration-500" />
                    </div>
                  </div>
                  
                  <h3 className="font-nunito text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 text-foreground">Looking for Opportunities</h3>
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
                  
                  <Button 
                    size="lg" 
                    className="w-full text-lg py-7 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    Explore Opportunities
                    <Search className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </Link>

            {/* Post a Position Card */}
            <Link to="/post-position" className="group relative animate-fade-in cursor-pointer" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -inset-1 bg-gradient-to-br from-secondary via-accent to-secondary rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 border-border rounded-3xl p-8 sm:p-10 md:p-12 hover:border-secondary transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-3">
                <div className="text-center">
                  <div className="relative w-28 h-28 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/80 to-accent rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent rounded-3xl flex items-center justify-center shadow-lg">
                      <Briefcase className="w-14 h-14 text-secondary-foreground group-hover:scale-125 transition-transform duration-500" />
                    </div>
                  </div>
                  
                  <h3 className="font-nunito text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 text-foreground">Post Opportunities</h3>
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
                  
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full text-lg py-7 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    Post a Position
                    <Briefcase className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Business Partner Opportunities",
          "description": "Connect talent with outstanding opportunities",
          "url": "https://unicompass.lovable.app/business-partner",
          "about": {
            "@type": "Service",
            "name": "Professional Networking",
            "provider": {
              "@type": "Organization",
              "name": "UniCompass"
            }
          }
        })}
      </script>
    </div>
    </>
  );
};
export default BusinessPartner;