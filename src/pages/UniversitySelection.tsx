import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, ChevronRight, ChevronDown } from "lucide-react";
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
import universityBackground from "@/assets/university-background.png";
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
}, {
  id: "polito",
  name: "Politecnico di Torino",
  description: "Engineering, Architecture, Industrial Design",
  logo: luissLogo,
  students: "35,000+",
  programs: "45+",
  color: "from-blue-700 to-indigo-800"
}, {
  id: "genova",
  name: "Università di Genova",
  description: "Engineering, Medicine, Sciences, Economics",
  logo: luissLogo,
  students: "32,000+",
  programs: "100+",
  color: "from-red-600 to-orange-700"
}, {
  id: "ca-foscari",
  name: "Ca' Foscari Venezia",
  description: "Economics, Languages, Humanities, Sciences",
  logo: luissLogo,
  students: "23,000+",
  programs: "70+",
  color: "from-cyan-700 to-blue-800"
}, {
  id: "trento",
  name: "Università di Trento",
  description: "Engineering, Economics, Sciences, Law",
  logo: luissLogo,
  students: "17,000+",
  programs: "50+",
  color: "from-purple-600 to-indigo-700"
}, {
  id: "verona",
  name: "Università di Verona",
  description: "Economics, Medicine, Sciences, Humanities",
  logo: luissLogo,
  students: "25,000+",
  programs: "80+",
  color: "from-yellow-600 to-orange-700"
}, {
  id: "palermo",
  name: "Università di Palermo",
  description: "Medicine, Engineering, Law, Architecture",
  logo: luissLogo,
  students: "40,000+",
  programs: "120+",
  color: "from-amber-600 to-red-700"
}, {
  id: "bari",
  name: "Università di Bari",
  description: "Law, Medicine, Economics, Sciences",
  logo: luissLogo,
  students: "45,000+",
  programs: "110+",
  color: "from-teal-600 to-blue-700"
}, {
  id: "perugia",
  name: "Università di Perugia",
  description: "Medicine, Law, Economics, Sciences",
  logo: luissLogo,
  students: "28,000+",
  programs: "85+",
  color: "from-green-600 to-teal-700"
}, {
  id: "siena",
  name: "Università di Siena",
  description: "Economics, Law, Medicine, Humanities",
  logo: luissLogo,
  students: "17,000+",
  programs: "55+",
  color: "from-orange-600 to-amber-700"
}, {
  id: "parma",
  name: "Università di Parma",
  description: "Medicine, Engineering, Food Science, Economics",
  logo: luissLogo,
  students: "30,000+",
  programs: "90+",
  color: "from-yellow-700 to-orange-800"
}, {
  id: "salerno",
  name: "Università di Salerno",
  description: "Engineering, Medicine, Economics, Law",
  logo: luissLogo,
  students: "34,000+",
  programs: "95+",
  color: "from-blue-600 to-cyan-700"
}, {
  id: "catania",
  name: "Università di Catania",
  description: "Medicine, Engineering, Law, Sciences",
  logo: luissLogo,
  students: "43,000+",
  programs: "105+",
  color: "from-red-700 to-rose-800"
}, {
  id: "normale-pisa",
  name: "Scuola Normale Superiore",
  description: "Sciences, Humanities, Elite Research",
  logo: luissLogo,
  students: "600+",
  programs: "10+",
  color: "from-indigo-700 to-purple-800"
}, {
  id: "santanna",
  name: "Scuola Superiore Sant'Anna",
  description: "Social Sciences, Engineering, Elite Programs",
  logo: luissLogo,
  students: "800+",
  programs: "12+",
  color: "from-purple-700 to-pink-800"
}, {
  id: "brescia",
  name: "Università di Brescia",
  description: "Engineering, Medicine, Economics, Law",
  logo: luissLogo,
  students: "16,000+",
  programs: "60+",
  color: "from-blue-600 to-indigo-700"
}, {
  id: "modena",
  name: "Università di Modena e Reggio Emilia",
  description: "Engineering, Medicine, Economics, Law",
  logo: luissLogo,
  students: "24,000+",
  programs: "75+",
  color: "from-yellow-600 to-red-700"
}, {
  id: "urbino",
  name: "Università di Urbino",
  description: "Humanities, Law, Sciences, Economics",
  logo: luissLogo,
  students: "15,000+",
  programs: "50+",
  color: "from-purple-600 to-pink-700"
}, {
  id: "laquila",
  name: "Università dell'Aquila",
  description: "Engineering, Sciences, Medicine, Economics",
  logo: luissLogo,
  students: "20,000+",
  programs: "65+",
  color: "from-cyan-600 to-blue-700"
}, {
  id: "messina",
  name: "Università di Messina",
  description: "Medicine, Law, Economics, Engineering",
  logo: luissLogo,
  students: "38,000+",
  programs: "100+",
  color: "from-orange-600 to-red-700"
}, {
  id: "salento",
  name: "Università del Salento",
  description: "Economics, Engineering, Sciences, Humanities",
  logo: luissLogo,
  students: "22,000+",
  programs: "70+",
  color: "from-teal-600 to-green-700"
}, {
  id: "calabria",
  name: "Università della Calabria",
  description: "Engineering, Economics, Sciences, Humanities",
  logo: luissLogo,
  students: "30,000+",
  programs: "80+",
  color: "from-red-600 to-orange-700"
}, {
  id: "cagliari",
  name: "Università di Cagliari",
  description: "Medicine, Law, Engineering, Sciences",
  logo: luissLogo,
  students: "27,000+",
  programs: "85+",
  color: "from-blue-700 to-cyan-800"
}, {
  id: "sassari",
  name: "Università di Sassari",
  description: "Medicine, Law, Agriculture, Economics",
  logo: luissLogo,
  students: "18,000+",
  programs: "60+",
  color: "from-green-600 to-emerald-700"
}, {
  id: "trieste",
  name: "Università di Trieste",
  description: "Sciences, Medicine, Engineering, Economics",
  logo: luissLogo,
  students: "16,000+",
  programs: "55+",
  color: "from-indigo-600 to-purple-700"
}, {
  id: "udine",
  name: "Università di Udine",
  description: "Agriculture, Engineering, Medicine, Sciences",
  logo: luissLogo,
  students: "15,000+",
  programs: "50+",
  color: "from-amber-600 to-yellow-700"
}, {
  id: "insubria",
  name: "Università dell'Insubria",
  description: "Sciences, Medicine, Economics, Law",
  logo: luissLogo,
  students: "10,000+",
  programs: "40+",
  color: "from-cyan-600 to-teal-700"
}, {
  id: "bergamo",
  name: "Università di Bergamo",
  description: "Economics, Engineering, Languages, Law",
  logo: luissLogo,
  students: "17,000+",
  programs: "45+",
  color: "from-blue-600 to-sky-700"
}, {
  id: "parthenope",
  name: "Università Parthenope",
  description: "Economics, Engineering, Sciences, Maritime",
  logo: luissLogo,
  students: "12,000+",
  programs: "35+",
  color: "from-blue-700 to-indigo-800"
}, {
  id: "tuscia",
  name: "Università della Tuscia",
  description: "Agriculture, Economics, Sciences, Humanities",
  logo: luissLogo,
  students: "10,000+",
  programs: "30+",
  color: "from-green-700 to-teal-800"
}, {
  id: "molise",
  name: "Università del Molise",
  description: "Agriculture, Economics, Medicine, Sciences",
  logo: luissLogo,
  students: "8,000+",
  programs: "25+",
  color: "from-orange-600 to-amber-700"
}, {
  id: "basilicata",
  name: "Università della Basilicata",
  description: "Engineering, Agriculture, Sciences, Humanities",
  logo: luissLogo,
  students: "7,000+",
  programs: "22+",
  color: "from-red-600 to-rose-700"
}, {
  id: "foggia",
  name: "Università di Foggia",
  description: "Agriculture, Medicine, Economics, Humanities",
  logo: luissLogo,
  students: "12,000+",
  programs: "35+",
  color: "from-yellow-600 to-orange-700"
}, {
  id: "chieti",
  name: "Università di Chieti-Pescara",
  description: "Medicine, Economics, Architecture, Sciences",
  logo: luissLogo,
  students: "32,000+",
  programs: "70+",
  color: "from-purple-600 to-violet-700"
}, {
  id: "camerino",
  name: "Università di Camerino",
  description: "Sciences, Pharmacy, Law, Architecture",
  logo: luissLogo,
  students: "9,000+",
  programs: "30+",
  color: "from-teal-600 to-cyan-700"
}, {
  id: "macerata",
  name: "Università di Macerata",
  description: "Humanities, Economics, Law, Cultural Heritage",
  logo: luissLogo,
  students: "10,000+",
  programs: "28+",
  color: "from-indigo-600 to-blue-700"
}, {
  id: "iuav",
  name: "IUAV Venezia",
  description: "Architecture, Design, Urban Planning",
  logo: luissLogo,
  students: "4,500+",
  programs: "15+",
  color: "from-cyan-700 to-blue-800"
}];
const UniversitySelection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [displayCount, setDisplayCount] = useState(6);
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
  return <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section - Modern Gamified Design */}
      <header className="pt-24 pb-12 relative min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={universityBackground} alt="University Background" className="w-full h-full object-cover" />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        </div>
        
        {/* Animated Mesh Gradient Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-600/40 via-transparent to-cyan-500/40 animate-[scale-in_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-500/40 via-transparent to-violet-600/40 animate-[scale-in_10s_ease-in-out_infinite]" style={{
          animationDelay: '2s'
        }}></div>
        </div>


        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Icon with Enhanced Effects */}
            <div className="flex items-center justify-center mb-10 animate-fade-in">
              <div className="relative group">
                <div className="absolute -inset-8 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 rounded-full opacity-50 blur-3xl group-hover:opacity-75 transition-opacity duration-700"></div>
                
                
              </div>
            </div>

            {/* Title with Dynamic Gradient */}
            <h1 className="font-nunito text-6xl md:text-8xl lg:text-9xl font-bold uppercase mb-6 animate-fade-in relative">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl [text-shadow:0_0_30px_rgba(255,255,255,0.5)]">
                Find Your Dream
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-2xl [text-shadow:0_0_30px_rgba(255,255,255,0.5)]">
                University
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-14 max-w-3xl mx-auto leading-relaxed animate-fade-in font-medium drop-shadow-lg" style={{
            animationDelay: '0.1s'
          }}>
              Discover Italy's most prestigious universities and unlock your academic potential ✨
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8 animate-scale-in z-[99999]" style={{
            animationDelay: '0.2s'
          }} ref={dropdownRef}>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl overflow-hidden group hover:bg-white/15 transition-all duration-300">
                <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-white/90 w-6 h-6 z-10 group-hover:scale-110 transition-transform duration-300" />
                <Input type="text" placeholder="Search your perfect university..." value={searchQuery} onChange={e => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }} onFocus={() => setShowDropdown(true)} className="pl-16 pr-6 py-8 text-lg rounded-[2rem] border-0 bg-transparent text-foreground placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-0 relative z-10 font-medium" />
              </div>
              
              {/* Dropdown Suggestions - Glassmorphism */}
              {showDropdown && <div className="absolute top-full left-0 right-0 mt-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden z-[100000] max-h-96 overflow-y-auto animate-fade-in">
                  {filteredUniversities.length > 0 ? filteredUniversities.map(university => {
                const UniversityItem = <div className={`flex items-center gap-4 p-5 transition-all duration-300 border-b border-white/10 last:border-b-0 ${university.id === 'luiss' ? 'hover:bg-gradient-to-r hover:from-violet-500/20 hover:to-blue-500/20 cursor-pointer' : 'hover:bg-white/10 cursor-pointer'}`}>
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${university.color} flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden`}>
                            {university.id === 'luiss' ? <img src={luissColumn} alt="LUISS Column" className="w-full h-full object-cover" /> : university.id === 'bocconi' ? <img src={bocconiBrand} alt="Bocconi Brand" className="w-full h-full object-cover" /> : university.id === 'cattolica' ? <img src={cattolicaEmblem} alt="Cattolica Emblem" className="w-full h-full object-cover" /> : university.id === 'sapienza' ? <img src={sapienzaEmblem} alt="Sapienza Emblem" className="w-full h-full object-cover" /> : university.id === 'polimi' ? <img src={polimiEmblem} alt="Polimi Emblem" className="w-full h-full object-cover" /> : university.id === 'unibo' ? <img src={uniboEmblem} alt="UniBo Emblem" className="w-full h-full object-cover" /> : <img src={university.logo} alt={`${university.name} logo`} className="w-full h-full object-cover filter brightness-0 invert" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              {university.name}
                              {university.id !== 'luiss' && <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-full">Coming Soon</span>}
                            </h4>
                            <p className="text-sm text-muted-foreground">{university.description}</p>
                          </div>
                          {university.id === 'luiss' && <ChevronRight className="w-5 h-5 text-primary" />}
                        </div>;
                return university.id === 'luiss' ? <Link key={university.id} to="/luiss-university" onClick={() => setShowDropdown(false)}>
                          {UniversityItem}
                        </Link> : <div key={university.id} onClick={() => handleUniversityClick(university.id)}>
                          {UniversityItem}
                        </div>;
              }) : <div className="p-8 text-center text-white/70">
                      <p className="text-lg mb-2 font-medium">🔍 No universities found</p>
                      <p className="text-sm text-white/50">Try a different search term</p>
                    </div>}
                </div>}
            </div>
          </div>
        </div>
      </header>

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
            {filteredUniversities.slice(0, displayCount).map((university, index) => {
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
            return university.id === 'luiss' ? <Link key={university.id} to="/luiss-university" className="group flex flex-col items-center text-center transition-all duration-500 hover:scale-110 animate-fade-in" style={{
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

          {/* Load More Button */}
          {filteredUniversities.length > displayCount && <div className="text-center mt-12 animate-fade-in">
              <Button onClick={() => setDisplayCount(prev => prev + 6)} size="lg" className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300">
                Load More Universities
                <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
            </div>}

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

      <script type="application/ld+json">
        {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Italian Universities",
        "description": "Comprehensive list of Italian universities",
        "numberOfItems": universities.length,
        "itemListElement": universities.slice(0, 10).map((uni, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "CollegeOrUniversity",
            "name": uni.name,
            "description": uni.description
          }
        }))
      })}
      </script>
    </main>;
};
export default UniversitySelection;