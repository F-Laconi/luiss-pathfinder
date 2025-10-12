import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Search, Globe, ArrowRight, GraduationCap, Award, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Import images
import policiesGovernanceImage from "@/assets/policies-governance-europe.png";
import economiaIstituzioniImage from "@/assets/economia-istituzioni.png";
import financeImage from "@/assets/finance-course.png";
import globalManagementImage from "@/assets/global-management-politics.png";
import governmentAffairsImage from "@/assets/government-public-affairs.png";
import internationalRelationsImage from "@/assets/international-relations.png";
import managementImage from "@/assets/management-course.png";
import marketingImage from "@/assets/marketing-course.png";
import strategicManagementImage from "@/assets/strategic-management.png";
import amministrazioneFinanzaImage from "@/assets/amministrazione-finanza.png";
import dataScienceImage from "@/assets/data-science-management.png";
import lawIcon from "@/assets/law-icon.jpg";
import economicsIcon from "@/assets/economics-icon.jpg";
import politicsIcon from "@/assets/politics-icon.jpg";

// All programs data consolidated
const allPrograms = [
  // Undergraduate Programs
  {
    id: "undergrad-1",
    title: "Global Law",
    image: lawIcon,
    languages: ["English"],
    category: "Law",
    type: "Undergraduate",
    link: "/undergraduate/program/1"
  },
  {
    id: "undergrad-2",
    title: "Business Administration",
    image: managementImage,
    languages: ["English"],
    category: "Business",
    type: "Undergraduate",
    link: "/undergraduate/program/2"
  },
  {
    id: "undergrad-3",
    title: "Management and Artificial Intelligence",
    image: dataScienceImage,
    languages: ["English"],
    category: "Technology",
    type: "Undergraduate",
    link: "/undergraduate/program/3"
  },
  {
    id: "undergrad-4",
    title: "Economics and Business",
    image: economicsIcon,
    languages: ["English"],
    category: "Economics",
    type: "Undergraduate",
    link: "/undergraduate/program/4"
  },
  {
    id: "undergrad-5",
    title: "Politics: Philosophy and Economics",
    image: politicsIcon,
    languages: ["English"],
    category: "Politics",
    type: "Undergraduate",
    link: "/undergraduate/program/5"
  },
  {
    id: "undergrad-6",
    title: "Giurisprudenza",
    image: lawIcon,
    languages: ["Italian"],
    category: "Law",
    type: "Undergraduate",
    link: "/undergraduate/program/6"
  },
  {
    id: "undergrad-7",
    title: "Economics and Management",
    image: economicsIcon,
    languages: ["Italian"],
    category: "Economics",
    type: "Undergraduate",
    link: "/undergraduate/program/7"
  },
  {
    id: "undergrad-8",
    title: "Political Science",
    image: politicsIcon,
    languages: ["Italian"],
    category: "Politics",
    type: "Undergraduate",
    link: "/undergraduate/program/8"
  },
  // Graduate Programs
  {
    id: "grad-1",
    title: "Policies and Governance in Europe",
    image: policiesGovernanceImage,
    languages: ["English"],
    category: "Politics & Governance",
    type: "Graduate",
    link: "/graduate/program/1"
  },
  {
    id: "grad-2",
    title: "Economia, Istituzioni e Mercati Finanziari",
    image: economiaIstituzioniImage,
    languages: ["English", "Italian"],
    category: "Economics & Finance",
    type: "Graduate",
    link: "/graduate/program/2"
  },
  {
    id: "grad-3",
    title: "Finance",
    image: financeImage,
    languages: ["English"],
    category: "Finance",
    type: "Graduate",
    link: "/graduate/program/3"
  },
  {
    id: "grad-4",
    title: "Global Management and Politics",
    image: globalManagementImage,
    languages: ["English"],
    category: "Management & Politics",
    type: "Graduate",
    link: "/graduate/program/4"
  },
  {
    id: "grad-5",
    title: "Government and Public Affairs",
    image: governmentAffairsImage,
    languages: ["English", "Italian"],
    category: "Government & Public Affairs",
    type: "Graduate",
    link: "/graduate/program/5"
  },
  {
    id: "grad-6",
    title: "International Relations",
    image: internationalRelationsImage,
    languages: ["English"],
    category: "International Relations",
    type: "Graduate",
    link: "/graduate/program/6"
  },
  {
    id: "grad-7",
    title: "Management",
    image: managementImage,
    languages: ["English"],
    category: "Management",
    type: "Graduate",
    link: "/graduate/program/7"
  },
  {
    id: "grad-8",
    title: "Marketing",
    image: marketingImage,
    languages: ["English", "Italian"],
    category: "Marketing",
    type: "Graduate",
    link: "/graduate/program/8"
  },
  {
    id: "grad-9",
    title: "Strategic Management",
    image: strategicManagementImage,
    languages: ["English", "Italian"],
    category: "Strategic Management",
    type: "Graduate",
    link: "/graduate/program/9"
  },
  {
    id: "grad-10",
    title: "Amministrazione, Finanza e Controllo",
    image: amministrazioneFinanzaImage,
    languages: ["English", "Italian"],
    category: "Administration & Finance",
    type: "Graduate",
    link: "/graduate/program/10"
  },
  {
    id: "grad-11",
    title: "Data Science and Management",
    image: dataScienceImage,
    languages: ["English"],
    category: "Data Science",
    type: "Graduate",
    link: "/graduate/program/11"
  },
  // Post-Graduate Programs
  {
    id: "postgrad-1",
    title: "PhD in Economics",
    image: economiaIstituzioniImage,
    languages: ["English"],
    category: "Economics",
    type: "Post-Graduate",
    link: "/course/1"
  },
  {
    id: "postgrad-2",
    title: "PhD in Management",
    image: globalManagementImage,
    languages: ["English"],
    category: "Management",
    type: "Post-Graduate",
    link: "/course/2"
  },
  {
    id: "postgrad-3",
    title: "PhD in Politics",
    image: policiesGovernanceImage,
    languages: ["English"],
    category: "Politics",
    type: "Post-Graduate",
    link: "/course/3"
  },
  {
    id: "postgrad-4",
    title: "PhD in Law and Business",
    image: financeImage,
    languages: ["English"],
    category: "Law & Business",
    type: "Post-Graduate",
    link: "/course/4"
  }
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("default");
  const [filterType, setFilterType] = useState("all");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionResults, setSuggestionResults] = useState(allPrograms);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allPrograms.filter(program => 
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestionResults(filtered);
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
    setShowSuggestions(false);
    setSearchParams({ q: searchQuery });
  };

  const handleSuggestionClick = (link: string) => {
    setShowSuggestions(false);
    setSearchQuery("");
    navigate(link);
  };

  // Filter programs
  const filteredPrograms = allPrograms.filter(program => {
    const matchesSearch = 
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "all" || program.type === filterType;
    const matchesLanguage = filterLanguage === "all" || program.languages.includes(filterLanguage);
    
    return matchesSearch && matchesType && matchesLanguage;
  });

  // Sort programs
  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "type":
        return a.type.localeCompare(b.type);
      case "category":
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const renderLanguageFlags = (languages: string[]) => {
    return (
      <div className="flex gap-2">
        {languages.map(lang => (
          <Badge key={lang} className="bg-primary/10 text-primary border-primary/20 font-medium px-3 py-1">
            <Globe className="h-3 w-3 mr-1.5" />
            {lang === "English" ? "EN" : "IT"}
          </Badge>
        ))}
      </div>
    );
  };

  const getProgramTypeIcon = (type: string) => {
    switch (type) {
      case "Undergraduate":
        return <GraduationCap className="h-4 w-4" />;
      case "Graduate":
        return <Award className="h-4 w-4" />;
      case "Post-Graduate":
        return <BookOpen className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-background mesh-gradient">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[140px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass shadow-[var(--shadow-md)] text-primary text-sm font-semibold mb-6">
              <Search className="h-5 w-5" />
              <span>Search Results</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="text-gradient-primary">Find Your Program</span>
              <br />
              <span className="text-foreground">at LUISS</span>
            </h1>
            {searchQuery && (
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Showing results for <span className="text-foreground font-semibold">"{searchQuery}"</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="py-12 relative overflow-visible">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div ref={searchRef} className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/60" />
                <Input
                  placeholder="Search programs by name, category, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                  className="pl-14 h-14 glass text-base rounded-2xl border-border/50 focus:border-primary/50 transition-all duration-300 shadow-[var(--shadow-md)]"
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestionResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-[var(--shadow-xl)] border border-border z-50 overflow-hidden max-h-96 overflow-y-auto">
                    {suggestionResults.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion.link)}
                        className="w-full px-6 py-4 text-left hover:bg-primary/10 transition-colors border-b border-border/50 last:border-b-0 flex items-center justify-between group"
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {suggestion.title}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {suggestion.category}
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
                          {suggestion.type}
                        </Badge>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Filters */}
              <div className="flex gap-4 flex-wrap">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="min-w-[200px] h-14 rounded-2xl glass border-border/50 hover:border-primary/50 transition-all duration-300 shadow-[var(--shadow-md)]">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    <SelectValue placeholder="Program Type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl glass">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="Graduate">Graduate</SelectItem>
                    <SelectItem value="Post-Graduate">Post-Graduate</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                  <SelectTrigger className="min-w-[200px] h-14 rounded-2xl glass border-border/50 hover:border-primary/50 transition-all duration-300 shadow-[var(--shadow-md)]">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl glass">
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="min-w-[200px] h-14 rounded-2xl glass border-border/50 hover:border-primary/50 transition-all duration-300 shadow-[var(--shadow-md)]">
                    <TrendingUp className="h-5 w-5 mr-2 text-secondary" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl glass">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="title">Program Name</SelectItem>
                    <SelectItem value="type">Program Type</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Results Count */}
              <div className="flex items-center gap-3 px-6 py-3 glass rounded-2xl w-fit shadow-[var(--shadow-sm)]">
                <Search className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {sortedPrograms.length} program{sortedPrograms.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {sortedPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedPrograms.map((program, index) => (
                  <Link
                    key={program.id}
                    to={program.link}
                    className="group animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="h-full card-glass overflow-hidden group-hover:shadow-[var(--shadow-glow)]">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={program.image}
                          alt={`${program.title} program at LUISS`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500"></div>
                        <Badge className="absolute top-6 left-6 bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-xl font-semibold px-4 py-1.5 text-xs flex items-center gap-1.5">
                          {getProgramTypeIcon(program.type)}
                          {program.type}
                        </Badge>
                        <Badge className="absolute top-6 right-6 bg-white/90 text-primary border-0 shadow-xl font-semibold px-4 py-1.5 text-xs">
                          {program.category}
                        </Badge>
                      </div>
                      <div className="p-7 space-y-5">
                        <h3 className="text-2xl font-bold leading-tight group-hover:text-gradient-primary transition-all duration-300 line-clamp-2">
                          {program.title}
                        </h3>
                      </div>
                      <div className="p-7 pt-0 flex items-center justify-between">
                        {renderLanguageFlags(program.languages)}
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                          <span>View</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 glass rounded-3xl">
                <div className="inline-block p-6 rounded-full bg-muted/50 mb-6">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-xl font-semibold text-foreground mb-2">No programs found</p>
                <p className="text-base text-muted-foreground mb-6">Try adjusting your search or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterType("all");
                    setFilterLanguage("all");
                    setSearchParams({});
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary-hover px-8 py-6 rounded-xl text-base font-semibold shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SearchResults;
