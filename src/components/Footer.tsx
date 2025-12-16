import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              <span className="font-bold text-lg sm:text-xl">EduBlockChain</span>
            </div>
            <p className="text-background/80 text-xs sm:text-sm leading-relaxed">
              Empowering students to make informed decisions about their academic journey. 
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-nunito font-semibold text-sm sm:text-lg">Quick Links</h3>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <Link to="/masters" className="block text-background/80 hover:text-accent transition-colors">
                Master's Programs
              </Link>
              <Link to="/courses" className="block text-background/80 hover:text-accent transition-colors">
                All Courses
              </Link>
              <Link to="/professors" className="block text-background/80 hover:text-accent transition-colors">
                Professors
              </Link>
              <Link to="/reviews" className="block text-background/80 hover:text-accent transition-colors">
                Student Reviews
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-nunito font-semibold text-sm sm:text-lg">Support</h3>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <Link to="/help" className="block text-background/80 hover:text-accent transition-colors">
                Help Center
              </Link>
              <Link to="/contact" className="block text-background/80 hover:text-accent transition-colors">
                Contact Us
              </Link>
              <Link to="/guidelines" className="block text-background/80 hover:text-accent transition-colors">
                Community Guidelines
              </Link>
              <Link to="/privacy" className="block text-background/80 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-nunito font-semibold text-sm sm:text-lg">Contact</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-start space-x-2 sm:space-x-3 text-background/80">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Viale Romania 32, Rome, Italy</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-background/80">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                <span className="truncate">hello@edublockchain.com</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-background/80">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                <span>+39 06 8522 5111</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-background/60 text-xs sm:text-sm">
              © 2024 EduBlockChain. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link to="/terms" className="text-background/60 hover:text-accent transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-background/60 hover:text-accent transition-colors">
                Privacy
              </Link>
              <Link to="/cookies" className="text-background/60 hover:text-accent transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;