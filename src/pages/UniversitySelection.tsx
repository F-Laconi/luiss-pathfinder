import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
}, {
  id: "statale",
  name: "Università Statale di Milano",
  description: "Sciences, Medicine, Law, Humanities",
  logo: luissLogo,
  students: "60,000+",
  programs: "140+",
  color: "from-green-600 to-emerald-700"
}, {
  id: "padova",
  name: "Università di Padova",
  description: "Engineering, Medicine, Sciences, Law",
  logo: luissLogo,
  students: "65,000+",
  programs: "180+",
  color: "from-red-600 to-rose-700"
}, {
  id: "torino",
  name: "Università di Torino",
  description: "Law, Economics, Sciences, Humanities",
  logo: luissLogo,
  students: "70,000+",
  programs: "160+",
  color: "from-blue-600 to-sky-700"
}, {
  id: "federico-ii",
  name: "Università Federico II",
  description: "Engineering, Medicine, Agriculture, Architecture",
  logo: luissLogo,
  students: "80,000+",
  programs: "150+",
  color: "from-yellow-600 to-amber-700"
}, {
  id: "firenze",
  name: "Università di Firenze",
  description: "Architecture, Engineering, Sciences, Arts",
  logo: luissLogo,
  students: "50,000+",
  programs: "120+",
  color: "from-purple-600 to-violet-700"
}, {
  id: "pisa",
  name: "Università di Pisa",
  description: "Engineering, Medicine, Sciences, Law",
  logo: luissLogo,
  students: "50,000+",
  programs: "100+",
  color: "from-indigo-600 to-blue-700"
}, {
  id: "roma-tre",
  name: "Università Roma Tre",
  description: "Engineering, Economics, Law, Education",
  logo: luissLogo,
  students: "35,000+",
  programs: "90+",
  color: "from-orange-600 to-red-700"
}, {
  id: "bicocca",
  name: "Università Milano-Bicocca",
  description: "Sciences, Medicine, Economics, Sociology",
  logo: luissLogo,
  students: "33,000+",
  programs: "80+",
  color: "from-teal-600 to-cyan-700"
}, {
  id: "tor-vergata",
  name: "Università Tor Vergata",
  description: "Engineering, Medicine, Economics, Law",
  logo: luissLogo,
  students: "40,000+",
  programs: "110+",
  color: "from-red-700 to-pink-800"
}];
const UniversitySelection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUniversityClick = (universityId: string) => {
    if (universityId !== 'luiss') {
      alert('🎓 Coming Soon! This university will be available shortly.');
      return;
    }
  };

  const filteredUniversities = universities.filter(uni => uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || uni.description.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header - simplified to avoid duplication */}
      <div className="pt-16"></div>

      {/* Hero Section */}
      <section className="py-6 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent animate-pulse"></div>
        <div className="container mx-auto px-6 text-center relative z-10 overflow-visible">
          <div className="max-w-4xl mx-auto overflow-visible">
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

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-16 animate-scale-in overflow-visible" ref={dropdownRef}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl animate-pulse"></div>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-primary w-6 h-6 z-10" />
                <Input 
                  type="text" 
                  placeholder="🔍 Search your perfect university..." 
                  value={searchQuery} 
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="pl-16 pr-6 py-8 text-lg rounded-3xl border-2 border-primary/20 focus:border-primary bg-card/80 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:shadow-primary/10" 
                />
              </div>
              
              {/* Dropdown Suggestions */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden z-[9999] max-h-96 overflow-y-auto animate-fade-in">
                  {filteredUniversities.length > 0 ? (
                    filteredUniversities.map((university) => {
                      const UniversityItem = (
                        <div
                          className={`flex items-center gap-4 p-4 transition-all duration-300 border-b border-border last:border-b-0 ${
                            university.id === 'luiss' 
                              ? 'hover:bg-primary/10 cursor-pointer' 
                              : 'hover:bg-muted/50 cursor-pointer'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${university.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <img src={university.logo} alt={university.name} className="w-8 h-8 object-contain filter brightness-0 invert" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              {university.name}
                              {university.id !== 'luiss' && (
                                <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-full">Coming Soon</span>
                              )}
                            </h4>
                            <p className="text-sm text-muted-foreground">{university.description}</p>
                          </div>
                          {university.id === 'luiss' && (
                            <ChevronRight className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      );

                      return university.id === 'luiss' ? (
                        <Link
                          key={university.id}
                          to="/course-explorer"
                          onClick={() => setShowDropdown(false)}
                        >
                          {UniversityItem}
                        </Link>
                      ) : (
                        <div
                          key={university.id}
                          onClick={() => handleUniversityClick(university.id)}
                        >
                          {UniversityItem}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      <p className="text-lg mb-2">🔍 No universities found</p>
                      <p className="text-sm">Try a different search term</p>
                    </div>
                  )}
                </div>
              )}
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
            const content = <>
                  <div className="relative mb-6">
                    <div className={`w-40 h-40 bg-gradient-to-br ${university.color} rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2 group-hover:rotate-3 overflow-hidden`}>
                      {university.id === 'luiss' ? <div className="relative w-full h-full">
                          <img src={luissColumn} alt="LUISS Column" className="w-full h-full object-cover" />
                        </div> : university.id === 'bocconi' ? <div className="relative w-full h-full">
                          <img src={bocconiBrand} alt="Bocconi Brand" className="w-full h-full object-cover" />
                        </div> : university.id === 'cattolica' ? <div className="relative w-full h-full">
                          <img src={cattolicaEmblem} alt="Cattolica Emblem" className="w-full h-full object-cover" />
                        </div> : university.id === 'sapienza' ? <div className="relative w-full h-full">
                          <img src={sapienzaEmblem} alt="Sapienza Emblem" className="w-full h-full object-cover" />
                        </div> : university.id === 'polimi' ? <div className="relative w-full h-full">
                          <img src={polimiEmblem} alt="Polimi Emblem" className="w-full h-full object-cover" />
                        </div> : university.id === 'unibo' ? <div className="relative w-full h-full">
                          <img src={uniboEmblem} alt="UniBo Emblem" className="w-full h-full object-cover" />
                        </div> : <img src={university.logo} alt={`${university.name} logo`} className="w-full h-full object-cover filter brightness-0 invert group-hover:scale-110 transition-transform duration-300" />}
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
                  
                  {university.id === 'luiss' && <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        Explore Programs 
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>}
                </>;
            return university.id === 'luiss' ? <Link key={university.id} to="/course-explorer" className="group flex flex-col items-center text-center transition-all duration-500 hover:scale-110 animate-fade-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  {content}
                </Link> : <div key={university.id} className="flex flex-col items-center text-center animate-fade-in opacity-50" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  {content}
                </div>;
          })}
          </div>

          {filteredUniversities.length === 0 && <div className="text-center py-20 animate-fade-in">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-muted-foreground mb-2">
                No universities found matching your search
              </p>
              <p className="text-sm text-muted-foreground">
                Try searching for a different term or browse all universities
              </p>
            </div>}
        </div>
      </section>

      {/* Call to Action */}
      
    </div>;
};
export default UniversitySelection;