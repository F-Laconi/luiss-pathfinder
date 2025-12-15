import { Link } from "react-router-dom";
import { Compass, UserCheck, Pin } from "lucide-react";
import Navigation from "@/components/Navigation";
import homeWallpaper from "@/assets/home-wallpaper.png";
const Index = () => {
  return <main>
      <Navigation />
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{
      backgroundImage: `url(${homeWallpaper})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }} aria-label="UniCompass homepage hero section">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-violet-200/60 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-200/50 rounded-full blur-3xl animate-float" style={{
          animationDelay: '1s'
        }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-cyan-200/60 rounded-full blur-2xl animate-float" style={{
          animationDelay: '2s'
        }}></div>
      </div>

      <article className="container max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-40">
        {/* Brand Title with Enhanced Styling */}
        <header className="mb-12 sm:mb-20 animate-fade-up">
          <div className="relative inline-block">
            <h1 className="font-nunito text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 relative mt-20 sm:mt-24 px-2">
              <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] [text-shadow:_0_4px_20px_rgb(0_0_0_/_80%),_0_2px_4px_rgb(0_0_0_/_90%)]">
                UniCompass
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-semibold px-4 [text-shadow:_0_4px_20px_rgb(0_0_0_/_90%),_0_2px_4px_rgb(0_0_0_/_80%)]">
              Navigate Your Academic Journey
            </p>
          </div>
        </header>

        {/* Enhanced Icon Options */}
        <nav className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-32 max-w-4xl mx-auto px-4 animate-fade-up" style={{
          animationDelay: '0.3s'
        }} aria-label="Main navigation options">
          {/* Make the Right Choice */}
          <Link to="/universities" className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-sm p-8 sm:p-10 md:p-14 transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:shadow-[0_15px_40px_rgba(59,130,246,0.3)] hover:border-white/40 shadow-xl" aria-label="Explore Italian universities and programs">
            {/* Pushpin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-primary via-primary-hover to-secondary rounded-3xl flex items-center justify-center group-hover:animate-float shadow-2xl shadow-primary/20">
                  <Compass className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              </div>
              <div className="space-y-2">
                <h2 className="font-nunito text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors duration-300">
                  Make the Right Choice
                </h2>
                
              </div>
            </div>
          </Link>

          {/* Find Your Business Partner */}
          <Link to="/business-partner" className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-sm p-8 sm:p-10 md:p-14 transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:shadow-[0_15px_40px_rgba(251,146,60,0.3)] hover:border-white/40 shadow-xl" aria-label="Connect with business partners and opportunities">
            {/* Pushpin */}
            
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-accent via-orange-400 to-secondary rounded-3xl flex items-center justify-center group-hover:animate-float shadow-2xl shadow-accent/20">
                  <UserCheck className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-accent to-secondary rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              </div>
              <div className="space-y-2">
                <h2 className="font-nunito text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors duration-300">
                  Find Your Future Project Partner
                </h2>
                
              </div>
            </div>
          </Link>
        </nav>

        {/* Subtle Call to Action */}
        <footer className="mt-8 animate-fade-up" style={{
          animationDelay: '0.6s'
        }}>
          <p className="text-lg md:text-xl text-white font-semibold [text-shadow:_0_4px_20px_rgb(0_0_0_/_90%),_0_2px_4px_rgb(0_0_0_/_80%)]">
            Choose Your Journey and Unlock Your Potential
          </p>
        </footer>
      </article>
      </section>

      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "UniCompass",
        "description": "Navigate your academic journey through Italy's top universities. Compare programs, connect with students, and find business partners.",
        "url": "https://unicompass.lovable.app",
        "applicationCategory": "EducationalApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR"
        },
        "featureList": ["University comparison", "Program explorer", "Student networking", "Business partner matching"]
      })}
      </script>
    </main>;
};
export default Index;