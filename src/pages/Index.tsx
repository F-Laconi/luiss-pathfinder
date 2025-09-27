import { Link } from "react-router-dom";
import { Compass, UserCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import compassWallpaper from "@/assets/compass-wallpaper.jpg";

const Index = () => {
  return (
    <div>
      <Navigation />
      <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${compassWallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-violet-200/60 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-200/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-cyan-200/60 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-5xl mx-auto px-6 text-center relative z-40">
        {/* Brand Title with Enhanced Styling */}
        <div className="mb-20 animate-fade-up">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent mb-6 relative mt-8">
              UniCompass
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium opacity-80">
              Navigate Your Academic Journey
            </p>
          </div>
        </div>

        {/* Enhanced Icon Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
          {/* Make the Right Choice */}
          <Link 
            to="/universities"
            className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-10 md:p-14 hover:scale-105 transition-all duration-500 hover:shadow-[0_20px_70px_rgba(59,130,246,0.15)] hover:border-primary/30"
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-primary via-primary-hover to-secondary rounded-3xl flex items-center justify-center group-hover:animate-float shadow-2xl shadow-primary/20">
                  <Compass className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  Make the Right Choice
                </h2>
                <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  Explore courses and find your path
                </p>
              </div>
            </div>
          </Link>

          {/* Find Your Business Partner */}
          <Link 
            to="/business-partner"
            className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-10 md:p-14 hover:scale-105 transition-all duration-500 hover:shadow-[0_20px_70px_rgba(251,146,60,0.15)] hover:border-accent/30"
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-accent via-orange-400 to-secondary rounded-3xl flex items-center justify-center group-hover:animate-float shadow-2xl shadow-accent/20">
                  <UserCheck className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-accent to-secondary rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  Find Your Business Partner
                </h2>
                <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  Connect with opportunities
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Subtle Call to Action */}
        <div className="mt-16 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-muted-foreground/60 font-medium">
            Choose your journey and unlock your potential
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Index;
