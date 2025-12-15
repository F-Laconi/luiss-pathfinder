import { Link } from "react-router-dom";
import { Search, Briefcase, Users, Shield, Vote, Coins, Target, ArrowRight, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DAOPanel from "@/components/blockchain/DAOPanel";

const BusinessPartner = () => {
  return (
    <>
      <title>Business Partner Opportunities | UniCompass</title>
      <meta name="description" content="Connect exceptional talent with innovative companies. Discover career opportunities or post positions to find qualified professionals for your team." />
      <link rel="canonical" href="https://unicompass.lovable.app/business-partner" />
      
      <div className="min-h-screen bg-[#fafafa] text-foreground">
        <Navigation />
        
        {/* Hero Header */}
        <header className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-b from-white to-[#f5f5f7]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
                Professional Network
              </p>
              
              <h1 className="font-helvetica text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] uppercase tracking-tight text-[#1d1d1f]">
                Connect Talent with
                <span className="block text-[#1d1d1f]/60">
                  Opportunity
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-[#6e6e73] max-w-2xl mx-auto leading-relaxed mb-12">
                Where exceptional talent meets innovative companies. 
                Build meaningful connections that drive careers forward.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-12 md:gap-16">
                {[
                  { value: "500+", label: "Companies" },
                  { value: "2,500+", label: "Positions" },
                  { value: "95%", label: "Success Rate" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-1">{stat.value}</div>
                    <div className="text-sm text-[#6e6e73]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Action Cards */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="font-helvetica text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#1d1d1f] uppercase tracking-tight">
                How Can We Help?
              </h2>
              <p className="text-lg text-[#6e6e73] max-w-xl mx-auto">
                Choose your path to meaningful connections
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Looking for Opportunities Card */}
              <Link to="/student-board" className="group">
                <div className="h-full bg-[#f5f5f7] rounded-2xl p-8 md:p-10 transition-all duration-300 hover:bg-[#e8e8ed] hover:shadow-lg">
                  <div className="w-14 h-14 rounded-2xl bg-[#1d1d1f] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Search className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="font-helvetica text-2xl md:text-3xl font-bold mb-3 text-[#1d1d1f] uppercase tracking-tight">
                    Find Opportunities
                  </h3>
                  <p className="text-[#6e6e73] mb-6 leading-relaxed">
                    Discover career-defining positions tailored to your skills. Connect with top companies seeking exceptional talent.
                  </p>
                  
                  <div className="flex items-center text-[#1d1d1f] font-medium">
                    Explore positions
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Post Opportunities Card */}
              <Link to="/post-position" className="group">
                <div className="h-full bg-[#1d1d1f] rounded-2xl p-8 md:p-10 transition-all duration-300 hover:bg-[#2d2d2f] hover:shadow-lg">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Briefcase className="w-7 h-7 text-[#1d1d1f]" />
                  </div>
                  
                  <h3 className="font-helvetica text-2xl md:text-3xl font-bold mb-3 text-white uppercase tracking-tight">
                    Post Opportunities
                  </h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Connect with qualified professionals ready to drive your business forward. Find talent that aligns with your vision.
                  </p>
                  
                  <div className="flex items-center text-white font-medium">
                    Post a position
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* DAO Section */}
        <section className="py-20 md:py-28 bg-[#f5f5f7]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-violet-600 uppercase tracking-widest mb-4">
                Blockchain-Powered
              </p>
              <h2 className="font-helvetica text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#1d1d1f] uppercase tracking-tight">
                Project Team DAOs
              </h2>
              <p className="text-lg text-[#6e6e73] max-w-2xl mx-auto">
                Decentralized governance for student projects with transparent treasury and on-chain voting.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-1 shadow-sm">
                  <DAOPanel />
                </div>
                <Link to="/dao-management">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#1d1d1f]/20 text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300"
                  >
                    <Vote className="w-4 h-4 mr-2" />
                    Open DAO Dashboard
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="font-bold text-xl mb-6 text-[#1d1d1f]">
                  Why DAO Governance?
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Vote, title: "Democratic Decisions", description: "Votes recorded on immutable ledger" },
                    { icon: Coins, title: "Transparent Treasury", description: "Multi-sig wallets for milestone releases" },
                    { icon: Shield, title: "Full Accountability", description: "On-chain governance records" },
                    { icon: Target, title: "Attract Sponsors", description: "Verified track record for investors" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#f5f5f7]">
                      <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1d1d1f]">{item.title}</h4>
                        <p className="text-sm text-[#6e6e73]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
    </>
  );
};
export default BusinessPartner;