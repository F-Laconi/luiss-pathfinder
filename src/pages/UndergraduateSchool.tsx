import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Globe, BookOpen, GraduationCap, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import undergraduate1 from "@/assets/undergraduate-1.png";
import undergraduate2 from "@/assets/undergraduate-2.png";
import undergraduate3 from "@/assets/undergraduate-3.png";
import undergraduate4 from "@/assets/undergraduate-4.png";
import undergraduate5 from "@/assets/undergraduate-5.png";
import undergraduate6 from "@/assets/undergraduate-6.png";
import undergraduate7 from "@/assets/undergraduate-7.png";
import undergraduate8 from "@/assets/undergraduate-8.png";

// Undergraduate programs data matching the detail page
const undergraduatePrograms = [
  {
    id: "1",
    title: "Global Law",
    image: undergraduate1,
    languages: ["English"],
    category: "Law"
  },
  {
    id: "2",
    title: "Business Administration",
    image: undergraduate2,
    languages: ["English"],
    category: "Business"
  },
  {
    id: "3",
    title: "Management and Artificial Intelligence",
    image: undergraduate3,
    languages: ["English"],
    category: "Technology"
  },
  {
    id: "4",
    title: "Economics and Business",
    image: undergraduate4,
    languages: ["English"],
    category: "Economics"
  },
  {
    id: "5",
    title: "Politics: Philosophy and Economics",
    image: undergraduate5,
    languages: ["English"],
    category: "Politics"
  },
  {
    id: "6",
    title: "Giurisprudenza",
    image: undergraduate6,
    languages: ["Italian"],
    category: "Law"
  },
  {
    id: "7",
    title: "Economics and Management",
    image: undergraduate7,
    languages: ["Italian"],
    category: "Economics"
  },
  {
    id: "8",
    title: "Political Science",
    image: undergraduate8,
    languages: ["Italian"],
    category: "Politics"
  }
];

const UndergraduateSchool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get suggestions based on search query
  const suggestions = searchQuery.length > 0
    ? undergraduatePrograms.filter(program => 
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        program.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Filter programs based on search query and language filter
  const filteredPrograms = undergraduatePrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) || program.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = filterLanguage === "all" || program.languages.includes(filterLanguage);
    return matchesSearch && matchesLanguage;
  });

  // Sort programs
  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
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

  return (
    <main className="min-h-screen bg-background mesh-gradient">
      <Navigation />
      
      {/* SEO Meta */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "LUISS Undergraduate Programs",
          "description": "Bachelor's degree programs at LUISS University",
          "numberOfItems": undergraduatePrograms.length,
          "itemListElement": undergraduatePrograms.map((prog, idx) => ({
            "@type": "Course",
            "position": idx + 1,
            "name": prog.title,
            "description": `${prog.category} undergraduate program at LUISS`,
            "provider": {
              "@type": "EducationalOrganization",
              "name": "LUISS University"
            }
          }))
        })}
      </script>
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[140px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass shadow-[var(--shadow-md)] text-primary text-sm font-semibold mb-6">
              <GraduationCap className="h-5 w-5" />
              <span>Undergraduate Programs</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="text-gradient-primary">Bachelor's Degrees</span>
              <br />
              <span className="text-foreground">at LUISS</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Launch your career with world-class education. Choose from{" "}
              <span className="text-foreground font-semibold">{undergraduatePrograms.length} programs</span>{" "}
              designed for tomorrow's leaders.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-6">
              <div className="glass rounded-2xl p-6 shadow-[var(--shadow-md)]">
                <div className="text-3xl font-bold text-gradient-primary mb-2">{undergraduatePrograms.length}</div>
                <div className="text-sm text-muted-foreground">Programs</div>
              </div>
              <div className="glass rounded-2xl p-6 shadow-[var(--shadow-md)]">
                <div className="text-3xl font-bold text-gradient-accent mb-2">2</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="glass rounded-2xl p-6 shadow-[var(--shadow-md)]">
                <div className="text-3xl font-bold text-gradient-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Study Areas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="py-12 relative overflow-visible">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/60 z-10" />
                <Input
                  placeholder="Search programs by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-14 h-14 glass text-base rounded-2xl border-border/50 focus:border-primary/50 transition-all duration-300 shadow-[var(--shadow-md)]"
                />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full mt-2 left-0 right-0 glass rounded-2xl border border-border/50 shadow-[var(--shadow-lg)] overflow-hidden z-50 animate-fade-in">
                    {suggestions.map((program) => (
                      <Link
                        key={program.id}
                        to={`/undergraduate/program/${program.id}`}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-primary/5 transition-colors duration-200 border-b border-border/30 last:border-b-0"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={program.image} 
                            alt={program.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground text-sm truncate">
                            {program.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {program.category}
                          </p>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          {program.languages[0] === "English" ? "EN" : "IT"}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Filters */}
              <div className="flex gap-4 flex-wrap lg:flex-nowrap">
                <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                  <SelectTrigger className="min-w-[180px] h-14 rounded-2xl glass border-border/50 hover:border-primary/50 transition-all duration-300 shadow-[var(--shadow-md)]">
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
                  <SelectTrigger className="min-w-[180px] h-14 rounded-2xl glass border-border/50 hover:border-primary/50 transition-all duration-300 shadow-[var(--shadow-md)]">
                    <TrendingUp className="h-5 w-5 mr-2 text-secondary" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl glass">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-8 flex items-center gap-3 px-6 py-3 glass rounded-2xl w-fit shadow-[var(--shadow-sm)]">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">{sortedPrograms.length} programs available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPrograms.map((program, index) => (
                <Link
                  key={program.id}
                  to={`/undergraduate/program/${program.id}`}
                  className="group animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="h-full card-glass overflow-hidden group-hover:shadow-[var(--shadow-glow)]">
                    <CardHeader className="p-0">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={program.image}
                          alt={`${program.title} program at LUISS`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500"></div>
                        <Badge className="absolute top-6 right-6 bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-xl font-semibold px-4 py-1.5 text-xs">
                          {program.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-7 space-y-5">
                      <CardTitle className="text-2xl font-bold leading-tight group-hover:text-gradient-primary transition-all duration-300 line-clamp-2">
                        {program.title}
                      </CardTitle>
                    </CardContent>
                    <CardFooter className="p-7 pt-0 flex items-center justify-between">
                      {renderLanguageFlags(program.languages)}
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            
            {sortedPrograms.length === 0 && (
              <div className="text-center py-24 glass rounded-3xl">
                <div className="inline-block p-6 rounded-full bg-muted/50 mb-6">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-xl font-semibold text-foreground mb-2">No programs found</p>
                <p className="text-base text-muted-foreground mb-6">Try adjusting your search or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterLanguage("all");
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
    </main>
  );
};

export default UndergraduateSchool;
