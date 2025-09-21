import { Link } from "react-router-dom";
import { Search, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
const BusinessPartner = () => {
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-8">
          <Link to="/" className="inline-flex items-center text-primary-foreground hover:opacity-80 transition-opacity mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Business Partner</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            Connect with the perfect business opportunities. Whether you're seeking a position or looking to hire, 
            we help bridge the gap between talent and opportunity in the business world.
          </p>
        </div>
      </header>

      {/* What it's about section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Building Professional Connections
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Our platform facilitates meaningful business partnerships by connecting ambitious professionals 
              with innovative companies. We understand that the right partnership can transform careers and businesses alike.
            </p>
            <p className="text-lg text-muted-foreground">
              From entry-level positions to executive roles, from startups to established corporations, 
              we create opportunities for mutually beneficial professional relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Action Options */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Looking for a Position */}
            <div className="group bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Search className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Looking for a Position</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Discover exciting career opportunities that match your skills and aspirations. 
                  Connect with companies seeking talented individuals like you.
                </p>
                <Link to="/student-board">
                  <Button size="lg" className="w-full group-hover:shadow-md transition-shadow">
                    Find Opportunities
                    <Search className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Looking to Hire */}
            <div className="group bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Briefcase className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Post a Position</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Find the perfect candidate for your team. Post job openings and connect with 
                  qualified professionals ready to contribute to your success.
                </p>
                <Button variant="secondary" size="lg" className="w-full group-hover:shadow-md transition-shadow" onClick={() => alert('Job posting functionality coming soon!')}>
                  Post a Job
                  <Briefcase className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      
    </div>;
};
export default BusinessPartner;