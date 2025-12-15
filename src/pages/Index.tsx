import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import homeWallpaper from "@/assets/home-wallpaper.png";
import compassIcon from "@/assets/compass-icon.png";
import partnerIcon from "@/assets/partner-icon.png";
const Index = () => {
  return <main>
      <Navigation />
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{
      backgroundImage: `url(${homeWallpaper})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }} aria-label="UniCompass homepage hero section">
      {/* Dark overlay to fade background */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>

      <article className="container max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-40">
        {/* Brand Title with Enhanced Styling */}
        <header className="mb-12 sm:mb-20 animate-fade-up">
          <div className="relative inline-block">
            <h1 className="font-nunito text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 relative mt-8 sm:mt-12 px-2">
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
          <Link to="/universities" className="group flex flex-col items-center space-y-6 transition-all duration-500 hover:scale-105" aria-label="Explore Italian universities and programs">
            <div className="relative border-4 rounded-2xl overflow-hidden">
              <img src={compassIcon} alt="Compass on book" className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-2xl group-hover:animate-float drop-shadow-2xl" />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
            </div>
            <h2 className="font-nunito text-xl md:text-2xl font-bold text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_90%),_0_2px_4px_rgb(0_0_0_/_80%)] group-hover:scale-105 transition-transform duration-300">
              Make the Right Choice
            </h2>
          </Link>

          <Link to="/business-partner" className="group flex flex-col items-center space-y-6 transition-all duration-500 hover:scale-105" aria-label="Connect with business partners and opportunities">
            <div className="relative border-4 rounded-2xl overflow-hidden">
              <img src={partnerIcon} alt="Handshake partnership" className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-2xl group-hover:animate-float drop-shadow-2xl" />
              <div className="absolute -inset-2 bg-gradient-to-r from-accent to-secondary rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
            </div>
            <h2 className="font-nunito text-xl md:text-2xl font-bold text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_90%),_0_2px_4px_rgb(0_0_0_/_80%)] group-hover:scale-105 transition-transform duration-300">
              Find Your Future Project Partner
            </h2>
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