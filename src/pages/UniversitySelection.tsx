import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import luissLogo from "@/assets/luiss-logo.png";
import luissColumn from "@/assets/luiss-column.png";
import bocconiLogo from "@/assets/bocconi-logo.png";
import cattolicaLogo from "@/assets/cattolica-logo.png";
import sapienzaLogo from "@/assets/sapienza-logo.png";
import polimiLogo from "@/assets/polimi-logo.png";
import uniboLogo from "@/assets/unibo-logo.png";
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
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              UniCompass
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/course-explorer" className="text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </Link>
            </nav>
          </div>
        </div>
      </header>

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

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-16 animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl animate-pulse"></div>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-primary w-6 h-6" />
                <Input 
                  type="text" 
                  placeholder="🔍 Search your perfect university..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  className="pl-16 pr-6 py-8 text-lg rounded-3xl border-2 border-primary/20 focus:border-primary bg-card/80 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:shadow-primary/10" 
                />
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
            {filteredUniversities.map((university, index) => 
              <Link 
                key={university.id} 
                to="/course-explorer" 
                className="group flex flex-col items-center text-center transition-all duration-500 hover:scale-110 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className={`w-40 h-40 bg-gradient-to-br ${university.color} rounded-3xl flex items-center justify-center p-6 shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2 group-hover:rotate-3`}>
                    {university.id === 'luiss' ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={luissColumn} 
                          alt="LUISS Column" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <img 
                        src={university.logo} 
                        alt={`${university.name} logo`} 
                        className="w-full h-full object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300" 
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
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Explore Programs 
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            )}
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