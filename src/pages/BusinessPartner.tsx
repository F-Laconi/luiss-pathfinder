import { Link } from "react-router-dom";
import { Search, Briefcase, Users, TrendingUp, Award, Shield, Vote, Coins, Cpu, Network, Hexagon, CircuitBoard, Zap, Rocket, Target, Sparkles, ArrowRight, Building2 } from "lucide-react";
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
      
      <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>
          
          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/15 to-blue-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating tech icons */}
          <div className="absolute top-20 left-[10%] animate-float opacity-20">
            <Cpu className="w-8 h-8 text-violet-400" />
          </div>
          <div className="absolute top-40 right-[15%] animate-float opacity-20" style={{ animationDelay: '0.5s' }}>
            <Network className="w-10 h-10 text-cyan-400" />
          </div>
          <div className="absolute bottom-40 left-[20%] animate-float opacity-20" style={{ animationDelay: '1s' }}>
            <Hexagon className="w-12 h-12 text-indigo-400" />
          </div>
          <div className="absolute top-1/3 right-[8%] animate-float opacity-20" style={{ animationDelay: '1.5s' }}>
            <CircuitBoard className="w-9 h-9 text-purple-400" />
          </div>
          <div className="absolute bottom-1/3 right-[25%] animate-float opacity-20" style={{ animationDelay: '2s' }}>
            <Zap className="w-7 h-7 text-yellow-400" />
          </div>
          <div className="absolute top-2/3 left-[8%] animate-float opacity-20" style={{ animationDelay: '2.5s' }}>
            <Rocket className="w-8 h-8 text-pink-400" />
          </div>
        </div>

        <Navigation />
        
        {/* Hero Header */}
        <header className="relative pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Floating badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 backdrop-blur-xl mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Professional Network Hub
                </span>
              </div>
              
              <h1 className="font-helvetica text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-[1.1] uppercase tracking-tight animate-fade-in">
                <span className="text-white">Connect Talent with</span>
                <span className="block mt-2 bg-gradient-to-r from-violet-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                  Outstanding Opportunities
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Join a thriving ecosystem where exceptional talent meets innovative companies. 
                Build meaningful connections that drive careers forward.
              </p>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {[
                  { value: "500+", label: "Active Companies", icon: Building2, color: "from-violet-500 to-indigo-500" },
                  { value: "2,500+", label: "Open Positions", icon: Briefcase, color: "from-cyan-500 to-blue-500" },
                  { value: "95%", label: "Success Rate", icon: TrendingUp, color: "from-emerald-500 to-teal-500" }
                ].map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]"
                  >
                    <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>{stat.value}</div>
                    <div className="text-sm font-medium text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Action Cards */}
        <section className="py-16 sm:py-20 md:py-28 relative">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-helvetica text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white uppercase tracking-tight">
                How Can We Help You?
              </h2>
              <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
                Choose your path and start building meaningful connections today
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {/* Looking for Opportunities Card */}
              <Link to="/student-board" className="group relative animate-fade-in cursor-pointer">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-violet-500/50 transition-all duration-500 hover:shadow-[0_0_60px_rgba(139,92,246,0.3)] overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(139,92,246,0.05)_25%,transparent_25%,transparent_75%,rgba(139,92,246,0.05)_75%)] bg-[size:60px_60px] opacity-50"></div>
                  
                  <div className="relative text-center">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-violet-500/20 animate-ping"></div>
                      <div className="absolute inset-2 rounded-full border border-violet-500/30 animate-pulse"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.5)]">
                        <Search className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <h3 className="font-helvetica text-2xl sm:text-3xl font-bold mb-4 text-white uppercase tracking-tight">Looking for Opportunities</h3>
                    <p className="text-white/60 mb-8 leading-relaxed">
                      Discover career-defining opportunities tailored to your unique skills and aspirations. 
                      Join a network of top companies actively seeking exceptional talent.
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {["Browse curated positions", "Match with top employers", "Get hired faster"].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-3 text-sm text-white/70">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-500/30 border border-violet-500/30 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      size="lg" 
                      className="w-full text-lg py-6 rounded-2xl font-semibold bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white border-0 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] transition-all duration-300 group-hover:scale-[1.02]"
                    >
                      Explore Opportunities
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Link>

              {/* Post Opportunities Card */}
              <Link to="/post-position" className="group relative animate-fade-in cursor-pointer" style={{ animationDelay: '0.1s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_60px_rgba(6,182,212,0.3)] overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(-45deg,rgba(6,182,212,0.05)_25%,transparent_25%,transparent_75%,rgba(6,182,212,0.05)_75%)] bg-[size:60px_60px] opacity-50"></div>
                  
                  <div className="relative text-center">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping"></div>
                      <div className="absolute inset-2 rounded-full border border-cyan-500/30 animate-pulse"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.5)]">
                        <Briefcase className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <h3 className="font-helvetica text-2xl sm:text-3xl font-bold mb-4 text-white uppercase tracking-tight">Post Opportunities</h3>
                    <p className="text-white/60 mb-8 leading-relaxed">
                      Connect with exceptional talent ready to drive your business forward. 
                      Post positions and find qualified professionals who align with your vision.
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {["Reach qualified candidates", "Streamlined hiring process", "Build your dream team"].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-3 text-sm text-white/70">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/30 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      size="lg" 
                      className="w-full text-lg py-6 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all duration-300 group-hover:scale-[1.02]"
                    >
                      Post a Position
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* DAO Section for Project Teams */}
        <section className="py-16 sm:py-20 relative">
          {/* Section background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent"></div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 backdrop-blur-xl mb-6">
                <Vote className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Blockchain-Powered Governance</span>
              </div>
              <h2 className="font-helvetica text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white uppercase tracking-tight">
                Project Team DAOs
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Create decentralized autonomous organizations for your student projects. 
                Transparent governance, multi-sig treasury, and on-chain voting.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1">
                  <DAOPanel />
                </div>
                <Link to="/dao-management">
                  <Button 
                    variant="outline" 
                    className="w-full border-violet-500/30 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 hover:border-violet-500/50 backdrop-blur-xl"
                  >
                    <Vote className="w-4 h-4 mr-2" />
                    Open Full DAO Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-violet-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5"></div>
                <CardContent className="p-8 relative">
                  <h3 className="font-bold text-2xl mb-6 text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <Hexagon className="w-5 h-5 text-white" />
                    </div>
                    Why Use DAO Governance?
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Vote,
                        title: "Democratic Decision Making",
                        description: "Key decisions are voted on and recorded on an immutable ledger, preventing disputes.",
                        color: "from-violet-500 to-indigo-500"
                      },
                      {
                        icon: Coins,
                        title: "Transparent Treasury",
                        description: "Multi-signature wallets ensure funds are only released when milestones are approved.",
                        color: "from-cyan-500 to-blue-500"
                      },
                      {
                        icon: Shield,
                        title: "Accountability",
                        description: "All governance actions are recorded on-chain, creating a verified track record.",
                        color: "from-emerald-500 to-teal-500"
                      },
                      {
                        icon: Target,
                        title: "Attract Sponsors",
                        description: "Structural transparency makes your project attractive to institutional investors.",
                        color: "from-orange-500 to-amber-500"
                      }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{item.title}</h4>
                          <p className="text-sm text-white/60">{item.description}</p>
                        </div>
                      </div>
                    ))}
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
    </>
  );
};
export default BusinessPartner;