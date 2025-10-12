import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, GraduationCap, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import luissLogo from "@/assets/luiss-logo.png";
import luissColumn from "@/assets/luiss-column.png";
import bocconiLogo from "@/assets/bocconi-logo.png";
import bocconiBrand from "@/assets/bocconi-brand.png";
import cattolicaLogo from "@/assets/cattolica-logo.png";
import cattolicaEmblem from "@/assets/cattolica-emblem.png";
import sapienzaLogo from "@/assets/sapienza-logo.png";
import sapienzaEmblem from "@/assets/sapienza-emblem.png";
import polimiLogo from "@/assets/polimi-logo.png";
import polimiEmblem from "@/assets/polimi-emblem.png";
import uniboLogo from "@/assets/unibo-logo.png";
import uniboEmblem from "@/assets/unibo-emblem-new.png";
// Comprehensive list of Italian universities for autocomplete
const allItalianUniversities = [
  "LUISS Guido Carli",
  "Università Bocconi",
  "Università Cattolica del Sacro Cuore",
  "Sapienza Università di Roma",
  "Politecnico di Milano",
  "Università di Bologna",
  "Università degli Studi di Padova",
  "Università degli Studi di Firenze",
  "Università degli Studi di Torino",
  "Università degli Studi di Pisa",
  "Università degli Studi di Milano",
  "Università Ca' Foscari Venezia",
  "Università degli Studi di Napoli Federico II",
  "Università degli Studi di Genova",
  "Università degli Studi di Palermo",
  "Università degli Studi di Bari Aldo Moro",
  "Università degli Studi di Catania",
  "Università degli Studi di Perugia",
  "Università degli Studi di Siena",
  "Politecnico di Torino",
  "Università degli Studi di Trento",
  "Università degli Studi di Trieste",
  "Università degli Studi di Verona",
  "Università degli Studi di Parma",
  "Università degli Studi di Modena e Reggio Emilia",
  "Università degli Studi di Ferrara",
  "Università degli Studi di Pavia",
  "Università degli Studi di Brescia",
  "Università degli Studi dell'Aquila",
  "Università degli Studi di Salerno",
  "Università degli Studi di Udine",
  "Università degli Studi della Calabria",
  "Università degli Studi di Cagliari",
  "Università degli Studi di Sassari",
  "Università degli Studi della Basilicata",
  "Università degli Studi del Molise",
  "Università degli Studi di Foggia",
  "Università degli Studi di Messina",
  "Università degli Studi di Roma Tor Vergata",
  "Università degli Studi Roma Tre",
  "Libera Università Internazionale degli Studi Sociali Guido Carli (LUISS)",
  "Università Commerciale Luigi Bocconi",
  "Scuola Normale Superiore di Pisa",
  "Scuola Superiore Sant'Anna",
  "IMT School for Advanced Studies Lucca",
  "Università Vita-Salute San Raffaele",
  "Humanitas University",
  "Università Campus Bio-Medico di Roma",
  "Libera Università di Bolzano",
  "Università degli Studi di Bergamo",
  "Università degli Studi di Milano-Bicocca",
  "Università degli Studi dell'Insubria",
  "Università degli Studi del Piemonte Orientale",
  "Università degli Studi della Tuscia",
  "Università degli Studi di Cassino e del Lazio Meridionale",
  "Università degli Studi del Sannio",
  "Università degli Studi Magna Græcia di Catanzaro",
  "Università degli Studi Mediterranea di Reggio Calabria",
  "Università degli Studi di Enna Kore"
];

const universities = [{
  id: "luiss",
  name: "LUISS Guido Carli",
  description: "Business, Economics, Law, Political Science",
  logo: luissLogo,
  students: "8,000+",
  programs: "30+",
  color: "from-blue-600 to-blue-800"
}, {
  id: "bocconi",
  name: "Università Bocconi",
  description: "Business, Economics, Finance, Management",
  logo: bocconiLogo,
  students: "14,000+",
  programs: "40+",
  color: "from-red-600 to-red-800"
}, {
  id: "cattolica",
  name: "Università Cattolica",
  description: "Humanities, Economics, Medicine, Psychology",
  logo: cattolicaLogo,
  students: "42,000+",
  programs: "100+",
  color: "from-red-700 to-red-900"
}, {
  id: "sapienza",
  name: "Sapienza Università di Roma",
  description: "Engineering, Medicine, Sciences, Humanities",
  logo: sapienzaLogo,
  students: "116,000+",
  programs: "300+",
  color: "from-blue-700 to-indigo-800"
}, {
  id: "polimi",
  name: "Politecnico di Milano",
  description: "Engineering, Architecture, Design",
  logo: polimiLogo,
  students: "47,000+",
  programs: "50+",
  color: "from-cyan-600 to-blue-700"
}, {
  id: "unibo",
  name: "Università di Bologna",
  description: "Humanities, Sciences, Medicine, Engineering",
  logo: uniboLogo,
  students: "87,000+",
  programs: "200+",
  color: "from-amber-600 to-orange-700"
}];
const UniversitySelection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const filteredUniversities = universities.filter(uni => uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || uni.description.toLowerCase().includes(searchQuery.toLowerCase()));
  
  // Filter Italian universities for autocomplete
  const suggestions = searchQuery.trim() 
    ? allItalianUniversities.filter(uni => 
        uni.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8) // Show max 8 suggestions
    : [];

  const handleSuggestionClick = (suggestion: string) => {
    // Check if it's LUISS
    if (suggestion.toLowerCase().includes("luiss")) {
      navigate("/course-explorer");
    } else {
      toast.info(`${suggestion} - Coming soon! 🚀`, {
        description: "We're working on adding more universities to our platform."
      });
    }
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[focusedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setFocusedIndex(-1);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setFocusedIndex(-1);
    }
  }, [searchQuery, suggestions.length]);
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header - simplified to avoid duplication */}
      <div className="pt-16"></div>

      {/* Hero Section */}
      <section className="py-6 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent animate-pulse"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8 animate-fade-in">
              <div className="relative">
                <GraduationCap className="w-20 h-20 text-primary mr-4 animate-pulse" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Find Your Dream University
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              🎓 Discover Italy's most prestigious universities and unlock your academic potential. 
              Your future starts with the right choice!
            </p>

            {/* Search Bar with Autocomplete */}
            <div className="relative max-w-2xl mx-auto mb-16 animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl animate-pulse"></div>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-primary w-6 h-6 z-10" />
                <Input 
                  ref={inputRef}
                  type="text" 
                  placeholder="🔍 Search your perfect university..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() && suggestions.length > 0 && setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  className="pl-16 pr-6 py-8 text-lg rounded-3xl border-2 border-primary/20 focus:border-primary bg-card/80 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:shadow-primary/10" 
                />
                
                {/* Autocomplete Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-background border-2 border-primary/20 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        onMouseEnter={() => setFocusedIndex(index)}
                        className={`w-full text-left px-6 py-4 hover:bg-primary/10 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl ${
                          index === focusedIndex ? 'bg-primary/10' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-foreground">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ✨ Top Italian Universities
            </h2>
            <p className="text-lg text-muted-foreground">Click on any university to explore their amazing programs!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {filteredUniversities.map((university, index) => {
              const content = (
                <>
                  <div className="relative mb-6">
                    <div className={`w-40 h-40 bg-gradient-to-br ${university.color} rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2 group-hover:rotate-3 overflow-hidden`}>
                      {university.id === 'luiss' ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={luissColumn} 
                            alt="LUISS Column" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : university.id === 'bocconi' ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={bocconiBrand} 
                            alt="Bocconi Brand" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : university.id === 'cattolica' ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={cattolicaEmblem} 
                            alt="Cattolica Emblem" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : university.id === 'sapienza' ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={sapienzaEmblem} 
                            alt="Sapienza Emblem" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : university.id === 'polimi' ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={polimiEmblem} 
                            alt="Polimi Emblem" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : university.id === 'unibo' ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={uniboEmblem} 
                            alt="UniBo Emblem" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : (
                        <img 
                          src={university.logo} 
                          alt={`${university.name} logo`} 
                          className="w-full h-full object-cover filter brightness-0 invert group-hover:scale-110 transition-transform duration-300" 
                        />
                      )}
                    </div>
                    <div className={`absolute -inset-4 bg-gradient-to-r ${university.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce">
                      <span className="text-xs font-bold text-white">🎯</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 max-w-48 leading-tight">
                    {university.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-4">
                    <span className="bg-primary/10 px-3 py-1 rounded-full">👥 {university.students}</span>
                    <span className="bg-accent/10 px-3 py-1 rounded-full">📚 {university.programs}</span>
                  </div>
                  
                  {university.id === 'luiss' && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        Explore Programs 
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  )}
                </>
              );

              return university.id === 'luiss' ? (
                <Link 
                  key={university.id} 
                  to="/course-explorer" 
                  className="group flex flex-col items-center text-center transition-all duration-500 hover:scale-110 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {content}
                </Link>
              ) : (
                <div 
                  key={university.id} 
                  className="flex flex-col items-center text-center animate-fade-in opacity-50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {content}
                </div>
              );
            })}
          </div>

          {filteredUniversities.length === 0 && 
            <div className="text-center py-20 animate-fade-in">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-muted-foreground mb-2">
                No universities found matching your search
              </p>
              <p className="text-sm text-muted-foreground">
                Try searching for a different term or browse all universities
              </p>
            </div>
          }
        </div>
      </section>

      {/* Call to Action */}
      
    </div>;
};
export default UniversitySelection;