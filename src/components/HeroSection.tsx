import { useState, useRef, useEffect } from "react";
import { Search, ArrowRight, GraduationCap, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/luiss-campus-background.png";

// Import program images
import lawIcon from "@/assets/law-icon.jpg";
import economicsIcon from "@/assets/economics-icon.jpg";
import politicsIcon from "@/assets/politics-icon.jpg";
import managementImage from "@/assets/management-course.png";
import dataScienceImage from "@/assets/data-science-management.png";
import policiesGovernanceImage from "@/assets/policies-governance-europe.png";
import economiaIstituzioniImage from "@/assets/economia-istituzioni.png";
import financeImage from "@/assets/finance-course.png";
import globalManagementImage from "@/assets/global-management-politics.png";
import governmentAffairsImage from "@/assets/government-public-affairs.png";
import internationalRelationsImage from "@/assets/international-relations.png";
import marketingImage from "@/assets/marketing-course.png";
import strategicManagementImage from "@/assets/strategic-management.png";
import amministrazioneFinanzaImage from "@/assets/amministrazione-finanza.png";
import postgraduate1 from "@/assets/postgraduate-1.png";
import postgraduate2 from "@/assets/postgraduate-2.png";
import postgraduate3 from "@/assets/postgraduate-3.png";
import postgraduate4 from "@/assets/postgraduate-4.png";
import undergraduate1 from "@/assets/undergraduate-1.png";
import undergraduate2 from "@/assets/undergraduate-2.png";
import undergraduate3 from "@/assets/undergraduate-3.png";
import undergraduate4 from "@/assets/undergraduate-4.png";
import undergraduate5 from "@/assets/undergraduate-5.png";
import undergraduate6 from "@/assets/undergraduate-6.png";
import undergraduate7 from "@/assets/undergraduate-7.png";
import undergraduate8 from "@/assets/undergraduate-8.png";

// All searchable programs
const searchablePrograms = [{
  id: "undergrad-1",
  title: "Global Law",
  type: "Undergraduate",
  category: "Law",
  link: "/undergraduate/program/1",
  image: undergraduate1
}, {
  id: "undergrad-2",
  title: "Business Administration",
  type: "Undergraduate",
  category: "Business",
  link: "/undergraduate/program/2",
  image: undergraduate2
}, {
  id: "undergrad-3",
  title: "Management and Artificial Intelligence",
  type: "Undergraduate",
  category: "Technology",
  link: "/undergraduate/program/3",
  image: undergraduate3
}, {
  id: "undergrad-4",
  title: "Economics and Business",
  type: "Undergraduate",
  category: "Economics",
  link: "/undergraduate/program/4",
  image: undergraduate4
}, {
  id: "undergrad-5",
  title: "Politics: Philosophy and Economics",
  type: "Undergraduate",
  category: "Politics",
  link: "/undergraduate/program/5",
  image: undergraduate5
}, {
  id: "undergrad-6",
  title: "Giurisprudenza",
  type: "Undergraduate",
  category: "Law",
  link: "/undergraduate/program/6",
  image: undergraduate6
}, {
  id: "undergrad-7",
  title: "Economics and Management",
  type: "Undergraduate",
  category: "Economics",
  link: "/undergraduate/program/7",
  image: undergraduate7
}, {
  id: "undergrad-8",
  title: "Political Science",
  type: "Undergraduate",
  category: "Politics",
  link: "/undergraduate/program/8",
  image: undergraduate8
}, {
  id: "grad-1",
  title: "Policies and Governance in Europe",
  type: "Graduate",
  category: "Politics & Governance",
  link: "/graduate/program/1",
  image: policiesGovernanceImage
}, {
  id: "grad-2",
  title: "Economia, Istituzioni e Mercati Finanziari",
  type: "Graduate",
  category: "Economics & Finance",
  link: "/graduate/program/2",
  image: economiaIstituzioniImage
}, {
  id: "grad-3",
  title: "Finance",
  type: "Graduate",
  category: "Finance",
  link: "/graduate/program/3",
  image: financeImage
}, {
  id: "grad-4",
  title: "Global Management and Politics",
  type: "Graduate",
  category: "Management & Politics",
  link: "/graduate/program/4",
  image: globalManagementImage
}, {
  id: "grad-5",
  title: "Government and Public Affairs",
  type: "Graduate",
  category: "Government & Public Affairs",
  link: "/graduate/program/5",
  image: governmentAffairsImage
}, {
  id: "grad-6",
  title: "International Relations",
  type: "Graduate",
  category: "International Relations",
  link: "/graduate/program/6",
  image: internationalRelationsImage
}, {
  id: "grad-7",
  title: "Management",
  type: "Graduate",
  category: "Management",
  link: "/graduate/program/7",
  image: managementImage
}, {
  id: "grad-8",
  title: "Marketing",
  type: "Graduate",
  category: "Marketing",
  link: "/graduate/program/8",
  image: marketingImage
}, {
  id: "grad-9",
  title: "Strategic Management",
  type: "Graduate",
  category: "Strategic Management",
  link: "/graduate/program/9",
  image: strategicManagementImage
}, {
  id: "grad-10",
  title: "Amministrazione, Finanza e Controllo",
  type: "Graduate",
  category: "Administration & Finance",
  link: "/graduate/program/10",
  image: amministrazioneFinanzaImage
}, {
  id: "grad-11",
  title: "Data Science and Management",
  type: "Graduate",
  category: "Data Science",
  link: "/graduate/program/11",
  image: dataScienceImage
}, {
  id: "postgrad-1",
  title: "PhD in Economics",
  type: "Post-Graduate",
  category: "Economics",
  link: "/course/1",
  image: postgraduate1
}, {
  id: "postgrad-2",
  title: "PhD in Management",
  type: "Post-Graduate",
  category: "Management",
  link: "/course/2",
  image: postgraduate2
}, {
  id: "postgrad-3",
  title: "PhD in Politics",
  type: "Post-Graduate",
  category: "Politics",
  link: "/course/3",
  image: postgraduate3
}, {
  id: "postgrad-4",
  title: "PhD in Law and Business",
  type: "Post-Graduate",
  category: "Law & Business",
  link: "/course/4",
  image: postgraduate4
}];
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(searchablePrograms);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchablePrograms.filter(program => program.title.toLowerCase().includes(searchQuery.toLowerCase()) || program.category.toLowerCase().includes(searchQuery.toLowerCase()) || program.type.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  const handleSuggestionClick = (link: string) => {
    setShowSuggestions(false);
    setSearchQuery("");
    navigate(link);
  };
  const scrollToPrograms = () => {
    const element = document.getElementById("program-choices");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-visible">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Students studying together" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Headline */}
          <div className="space-y-4 animate-fade-up">
            <h1 className="font-nunito hero-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Find the right LUISS
              <br />
              <span className="text-accent">master and course</span>
              <br />
              for you
            </h1>
            <p className="hero-subtitle max-w-2xl mx-auto text-base sm:text-lg md:text-xl px-4">Explore Luiss programs, discover courses and read student reviews. Make informed decisions about your academic future.</p>
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="max-w-2xl mx-auto animate-fade-up relative" style={{
          animationDelay: "0.2s"
        }}>
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="text" placeholder="Search masters, courses, or professors..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={e => e.key === "Enter" && handleSearch()} onFocus={() => searchQuery.trim() && setShowSuggestions(true)} className="search-input pl-12 border-0" />
              </div>
              <Button onClick={handleSearch} className="btn-search">
                Search
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && <div className="absolute top-full mt-2 w-full bg-card rounded-2xl shadow-[var(--shadow-xl)] border border-border z-[100] overflow-hidden max-h-96 overflow-y-auto">
                {filteredSuggestions.map(suggestion => <button key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.link)} className="w-full px-5 py-4 text-left hover:bg-primary/10 transition-colors border-b border-border/50 last:border-b-0 flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={suggestion.image} alt={suggestion.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {suggestion.title}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {suggestion.category}
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 font-medium text-xs flex-shrink-0">
                      {suggestion.type}
                    </Badge>
                  </button>)}
              </div>}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto pt-8 animate-fade-up px-4" style={{
          animationDelay: "0.4s"
        }}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">25+</div>
              <div className="text-white/80 text-xs sm:text-sm">Master Programs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">200+</div>
              <div className="text-white/80 text-xs sm:text-sm">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">150+</div>
              <div className="text-white/80 text-xs sm:text-sm">Professors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">1.2k+</div>
              <div className="text-white/80 text-xs sm:text-sm">Student Reviews</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-up" style={{
          animationDelay: "0.6s"
        }}>
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
      <section id="program-choices" className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Undergraduate */}
            

            {/* Graduate */}
            

            {/* Post-Graduate */}
            
          </div>
        </div>
      </section>
    </section>;
};
export default HeroSection;