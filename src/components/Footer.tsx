import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-accent" />
              <span className="font-bold text-xl">LUISS Explorer</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Empowering LUISS students to make informed decisions about their academic journey. 
              Discover, compare, and choose the perfect master's program for your future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bebas font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
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
          <div className="space-y-4">
            <h3 className="font-bebas font-semibold text-lg">Support</h3>
            <div className="space-y-2">
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
          <div className="space-y-4">
            <h3 className="font-bebas font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-background/80">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm">Viale Romania 32, Rome, Italy</span>
              </div>
              <div className="flex items-center space-x-3 text-background/80">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm">hello@luissexplorer.com</span>
              </div>
              <div className="flex items-center space-x-3 text-background/80">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm">+39 06 8522 5111</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm">
              © 2024 LUISS University. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/terms" className="text-background/60 hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-background/60 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-background/60 hover:text-accent transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;