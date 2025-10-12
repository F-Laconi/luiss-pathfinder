import { useState } from "react";
import { Search, ArrowRight, GraduationCap, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // This would trigger search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  const scrollToPrograms = () => {
    const element = document.getElementById("program-choices");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Students studying together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Headline */}
          <div className="space-y-4 animate-fade-up">
            <h1 className="hero-text">
              Find the right LUISS 
              <br />
              <span className="text-accent">master and course</span>
              <br />
              for you
            </h1>
            <p className="hero-subtitle max-w-2xl mx-auto">
              Explore master's programs, discover courses, read student reviews, 
              and connect with professors before you enroll. Make informed decisions 
              about your academic future.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search masters, courses, or professors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="search-input pl-12 border-0"
                />
              </div>
              <Button onClick={handleSearch} className="btn-search">
                Search
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">25+</div>
              <div className="text-white/80 text-sm">Master Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">200+</div>
              <div className="text-white/80 text-sm">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">150+</div>
              <div className="text-white/80 text-sm">Professors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1.2k+</div>
              <div className="text-white/80 text-sm">Student Reviews</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <Button onClick={scrollToPrograms} className="btn-hero">
              LUISS Programs
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Program Choices Section */}
      <section id="program-choices" className="absolute bottom-0 left-0 right-0 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Undergraduate */}
            <div 
              onClick={() => navigate("/undergraduate-school")}
              className="card-glass p-8 cursor-pointer hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white">Undergraduate</h3>
                <p className="text-white/70 text-sm">Bachelor's degree programs</p>
              </div>
            </div>

            {/* Graduate */}
            <div 
              onClick={() => navigate("/graduate-school")}
              className="card-glass p-8 cursor-pointer hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <GraduationCap className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white">Graduate</h3>
                <p className="text-white/70 text-sm">Master's degree programs</p>
              </div>
            </div>

            {/* Post-Graduate */}
            <div 
              onClick={() => navigate("/postgraduate-school")}
              className="card-glass p-8 cursor-pointer hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                  <Award className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-white">Post-Graduate</h3>
                <p className="text-white/70 text-sm">PhD & doctoral programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HeroSection;