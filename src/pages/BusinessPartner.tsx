import { Link } from "react-router-dom";
import { Search, Briefcase, Users, Shield, Vote, Coins, Target, ArrowLeft, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DAOPanel from "@/components/blockchain/DAOPanel";
import businessPartnerWallpaper from "@/assets/business-partner-wallpaper.png";
import findOpportunityIcon from "@/assets/find-opportunity-icon.png";
import postOpportunityIcon from "@/assets/post-opportunity-icon.png";
const BusinessPartner = () => {
  return <>
      <title>Business Partner Opportunities | UniCompass</title>
      <meta name="description" content="Connect exceptional talent with innovative companies. Discover career opportunities or post positions to find qualified professionals for your team." />
      <link rel="canonical" href="https://unicompass.lovable.app/business-partner" />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section with Background */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16" style={{
        backgroundImage: `url(${businessPartnerWallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Back Link */}
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors drop-shadow-lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            {/* Header */}
            <header className="text-center mb-12 animate-fade-up">
              <h1 className="font-nunito text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
                <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                  FIND YOUR PARTNER
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-white font-semibold drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] max-w-2xl mx-auto">
                Connect talent with outstanding opportunities
              </p>
            </header>

            {/* Stats Row */}
            

            {/* Action Cards - Post-it Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto animate-fade-up" style={{
            animationDelay: '0.3s'
          }}>
              {/* Looking for Opportunities Card */}
              <Link to="/student-board" className="group relative p-8 sm:p-10 transition-all duration-500 hover:scale-105">
                {/* Pushpin */}
                
                <div className="flex flex-col items-center space-y-8">
                  <div className="relative border-4 rounded-2xl">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl flex items-center justify-center group-hover:animate-float shadow-2xl overflow-hidden">
                      <img src={findOpportunityIcon} alt="Find Opportunities" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  </div>
                  <div className="space-y-3 text-center">
                    <h2 className="font-nunito text-2xl md:text-3xl font-bold text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] group-hover:text-white transition-colors duration-300">
                      Find Opportunities
                    </h2>
                    <p className="text-white/80 text-base drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      Browse curated positions from top employers
                    </p>
                  </div>
                </div>
              </Link>

              {/* Post Opportunities Card */}
              <Link to="/post-position" className="group relative p-8 sm:p-10 transition-all duration-500 hover:scale-105">
                {/* Pushpin */}
                
                <div className="flex flex-col items-center space-y-8">
                  <div className="relative border-4 rounded-2xl">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl flex items-center justify-center group-hover:animate-float shadow-2xl overflow-hidden">
                      <img src={postOpportunityIcon} alt="Post Opportunities" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-accent to-secondary rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  </div>
                  <div className="space-y-3 text-center">
                    <h2 className="font-nunito text-2xl md:text-3xl font-bold text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] group-hover:text-white transition-colors duration-300">
                      Post Opportunities
                    </h2>
                    <p className="text-white/80 text-base drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      Connect with qualified professionals
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* DAO Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/30 to-background relative">
          {/* Mesh gradient background */}
          <div className="absolute inset-0 mesh-gradient opacity-50"></div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                <Vote className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold text-secondary">Blockchain-Powered</span>
              </div>
              <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Project Team DAOs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Decentralized governance for student projects with transparent treasury and on-chain voting.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="space-y-4">
                <div className="card-glass p-1">
                  <DAOPanel />
                </div>
                <Link to="/dao-management">
                  <Button variant="outline" className="w-full border-secondary/30 text-secondary hover:bg-secondary/10 hover:border-secondary/50">
                    <Vote className="w-4 h-4 mr-2" />
                    Open Full DAO Dashboard
                  </Button>
                </Link>
              </div>
              
              <Card className="card-glass border-secondary/20">
                <CardContent className="p-8">
                  <h3 className="font-bold text-2xl mb-6 text-foreground">Why DAO Governance?</h3>
                  <div className="space-y-4">
                    {[{
                    icon: Vote,
                    title: "Democratic Decisions",
                    description: "Votes recorded on immutable ledger",
                    color: "from-primary to-secondary"
                  }, {
                    icon: Coins,
                    title: "Transparent Treasury",
                    description: "Multi-sig wallets for milestone releases",
                    color: "from-secondary to-accent"
                  }, {
                    icon: Shield,
                    title: "Full Accountability",
                    description: "On-chain governance records",
                    color: "from-accent to-orange-500"
                  }, {
                    icon: Target,
                    title: "Attract Sponsors",
                    description: "Verified track record for investors",
                    color: "from-primary to-primary-hover"
                  }].map((item, idx) => <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
        
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
    </>;
};
export default BusinessPartner;