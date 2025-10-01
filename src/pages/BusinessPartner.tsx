import { Link } from "react-router-dom";
import { Search, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
const BusinessPartner = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Header with Gradient */}
      <header className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        
        <div className="relative container mx-auto px-6 py-16 md:py-24">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-foreground/90 hover:text-primary-foreground font-medium mb-8 transition-colors group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            <span className="ml-2">Back to Home</span>
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary-foreground leading-tight animate-fade-up">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
                Business Partner
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Connect with the perfect business opportunities. Whether you're seeking a position or looking to hire, 
              we help bridge the gap between talent and opportunity in the business world.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </header>

      {/* Mission Section */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent"></div>
        <div className="container mx-auto px-6 text-center relative">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Mission</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Building Professional Connections
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our platform facilitates meaningful business partnerships by connecting ambitious professionals 
              with innovative companies. We understand that the right partnership can transform careers and businesses alike.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From entry-level positions to executive roles, from startups to established corporations, 
              we create opportunities for mutually beneficial professional relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Main Action Cards */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              How Can We Help You?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your path and start building meaningful connections today
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Looking for a Position Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-hover rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-card border-2 border-border rounded-3xl p-10 hover:border-primary transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(var(--primary),0.3)] transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Search className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-foreground">Looking for a Position</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                    Discover exciting career opportunities that match your skills and aspirations. 
                    Connect with companies seeking talented individuals like you.
                  </p>
                  
                  <Link to="/student-board">
                    <Button 
                      size="lg" 
                      className="w-full text-lg py-6 rounded-xl group-hover:shadow-lg transition-all hover:scale-[1.02]"
                    >
                      Find Opportunities
                      <Search className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Post a Position Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-card border-2 border-border rounded-3xl p-10 hover:border-secondary transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(var(--secondary),0.3)] transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Briefcase className="w-12 h-12 text-secondary group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-foreground">Post a Position</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                    Find the perfect candidate for your team. Post job openings and connect with 
                    qualified professionals ready to contribute to your success.
                  </p>
                  
                  <Link to="/post-position">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="w-full text-lg py-6 rounded-xl group-hover:shadow-lg transition-all hover:scale-[1.02]"
                    >
                      Post a Project
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