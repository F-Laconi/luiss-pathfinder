import { Link } from "react-router-dom";
import { Heart, BookOpen, Mail, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-card via-card/95 to-primary/5 border-t border-border/50 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center space-x-2 group">
              <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                UniCompass
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Empowering students to navigate their academic journey with confidence and clarity. 🎓
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-125">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-all duration-300 hover:scale-125">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-semibold text-foreground text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/course-explorer" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link to="/business-partner" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Business Partners
                </Link>
              </li>
              <li>
                <Link to="/suggestions" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Schools */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-semibold text-foreground text-lg">Academic Schools</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/school/undergraduate" className="text-sm text-muted-foreground hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block">
                  Undergraduate
                </Link>
              </li>
              <li>
                <Link to="/school/graduate" className="text-sm text-muted-foreground hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block">
                  Graduate
                </Link>
              </li>
              <li>
                <Link to="/school/postgraduate" className="text-sm text-muted-foreground hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block">
                  Post-Graduate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-semibold text-foreground text-lg">Get in Touch</h3>
            <div className="space-y-3">
              <a href="mailto:info@unicompass.app" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group">
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>info@unicompass.app</span>
              </a>
              <p className="text-sm text-muted-foreground">
                LUISS Guido Carli<br />
                Rome, Italy 🇮🇹
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            <span>© 2024 UniCompass. Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse inline-block" />
            <span>by LUISS students</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;