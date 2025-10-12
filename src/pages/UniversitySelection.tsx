import { useState } from "react";
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
}];
const UniversitySelection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUniversities = universities.filter(uni => uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || uni.description.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      
      <Navigation />
      
      {/* Header - simplified to avoid duplication */}
      <div className="pt-16"></div>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent animate-pulse"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 gap-4 animate-fade-in">
              <div className="relative group">
                <GraduationCap className="w-16 h-16 sm:w-20 sm:h-20 text-primary animate-float" />
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse group-hover:bg-primary/30 transition-colors"></div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Find Your Dream University
              </h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in px-4">
              🎓 Discover Italy's most prestigious universities and unlock your academic potential. 
              Your future starts with the right choice! ✨
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-12 sm:mb-16 animate-scale-in px-4">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl blur-xl animate-pulse"></div>
              <div className="relative group">
                <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                <Input 
                  type="text" 
                  placeholder="🔍 Search your perfect university..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  className="pl-12 sm:pl-16 pr-4 sm:pr-6 py-6 sm:py-8 text-base sm:text-lg rounded-3xl border-2 border-primary/30 focus:border-primary bg-card/90 backdrop-blur-md shadow-2xl transition-all duration-300 hover:shadow-primary/20 focus:shadow-primary/30" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted/20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              ✨ Top Italian Universities
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4">Click on any university to explore their amazing programs! 🎯</p>
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