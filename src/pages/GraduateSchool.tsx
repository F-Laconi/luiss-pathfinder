import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Globe, GraduationCap, TrendingUp, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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

// Graduate programs data
const graduatePrograms = [
  {
    id: 1,
    title: "Policies and Governance in Europe",
    image: policiesGovernanceImage,
    languages: ["English"],
    category: "Politics & Governance"
  },
  {
    id: 2,
    title: "Economia, Istituzioni e Mercati Finanziari",
    image: economiaIstituzioniImage,
    languages: ["English", "Italian"],
    category: "Economics & Finance"
  },
  {
    id: 3,
    title: "Finance",
    image: financeImage,
    languages: ["English"],
    category: "Finance"
  },
  {
    id: 4,
    title: "Global Management and Politics",
    image: globalManagementImage,
    languages: ["English"],
    category: "Management & Politics"
  },
  {
    id: 5,
    title: "Government and Public Affairs",
    image: governmentAffairsImage,
    languages: ["English", "Italian"],
    category: "Government & Public Affairs"
  },
  {
    id: 6,
    title: "International Relations",
    image: internationalRelationsImage,
    languages: ["English"],
    category: "International Relations"
  },
  {
    id: 7,
    title: "Management",
    image: managementImage,
    languages: ["English"],
    category: "Management"
  },
  {
    id: 8,
    title: "Marketing",
    image: marketingImage,
    languages: ["English", "Italian"],
    category: "Marketing"
  },
  {
    id: 9,
    title: "Strategic Management",
    image: strategicManagementImage,
    languages: ["English", "Italian"],
    category: "Strategic Management"
  },
  {
    id: 10,
    title: "Amministrazione, Finanza e Controllo",
    image: amministrazioneFinanzaImage,
    languages: ["English", "Italian"],
    category: "Administration & Finance"
  },
  {
    id: 11,
    title: "Data Science and Management",
    image: dataScienceImage,
    languages: ["English"],
    category: "Data Science"
  }
];

const GraduateSchool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("all");

  const filteredPrograms = graduatePrograms.filter(program => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterBy === "all") return matchesSearch;
    if (filterBy === "english") return matchesSearch && program.languages.includes("English");
    if (filterBy === "italian") return matchesSearch && program.languages.includes("Italian");
    return matchesSearch;
  });

  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    if (sortBy === "default") return a.id - b.id;
    return 0;
  });

  const renderLanguageFlags = (languages: string[]) => {
    return (
      <div className="flex gap-2">
        {languages.map(lang => (
          <Badge key={lang} className="bg-secondary/10 text-secondary border-secondary/20 font-medium px-3 py-1">
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
      
      {/* SEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "LUISS Graduate Programs",
          "description": "Master's degree programs at LUISS University",
          "numberOfItems": graduatePrograms.length,
          "itemListElement": graduatePrograms.map((prog, idx) => ({
            "@type": "Course",
            "position": idx + 1,
            "name": prog.title,
            "description": `${prog.category} graduate program at LUISS`,
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
          <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass shadow-[var(--shadow-md)] text-secondary text-sm font-semibold mb-6">
              <Award className="h-5 w-5" />
              <span>Graduate Programs</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="text-gradient-primary">Master's Programs</span>
              <br />
              <span className="text-foreground">for Future Leaders</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Elevate your expertise with advanced education. Choose from{" "}
              <span className="text-foreground font-semibold">{graduatePrograms.length} master's programs</span>{" "}
              crafted for ambitious professionals.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-6">
              <div className="glass rounded-2xl p-6 shadow-[var(--shadow-md)]">
                <div className="text-3xl font-bold text-gradient-primary mb-2">{graduatePrograms.length}</div>
                <div className="text-sm text-muted-foreground">Master's</div>
              </div>
              <div className="glass rounded-2xl p-6 shadow-[var(--shadow-md)]">
                <div className="text-3xl font-bold text-gradient-accent mb-2">4.8</div>
                <div className="text-sm text-muted-foreground">Avg. Rating</div>
              </div>
              <div className="glass rounded-2xl p-6 shadow-[var(--shadow-md)]">
                <div className="text-3xl font-bold text-gradient-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary/60" />
                <Input
                  type="text"
                  placeholder="Search master's programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 h-14 glass text-base rounded-2xl border-border/50 focus:border-secondary/50 transition-all duration-300 shadow-[var(--shadow-md)]"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4 flex-wrap lg:flex-nowrap">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="min-w-[180px] h-14 rounded-2xl glass border-border/50 hover:border-secondary/50 transition-all duration-300 shadow-[var(--shadow-md)]">
                    <TrendingUp className="h-5 w-5 mr-2 text-secondary" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl glass">
                    <SelectItem value="default">Default Order</SelectItem>
                    <SelectItem value="title">Program Name</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="min-w-[180px] h-14 rounded-2xl glass border-border/50 hover:border-secondary/50 transition-all duration-300 shadow-[var(--shadow-md)]">
                    <Globe className="h-5 w-5 mr-2 text-secondary" />
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl glass">
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                  to={`/graduate/program/${program.id}`}
                  className="group animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-full card-glass overflow-hidden group-hover:shadow-[var(--shadow-glow)]">
                    {/* Program Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={program.image}
                        alt={`${program.title} graduate program at LUISS University`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors duration-500"></div>

                      {/* Language flags */}
                      <div className="absolute top-6 right-6 z-20">
                        {renderLanguageFlags(program.languages)}
                      </div>
                    </div>

                    {/* Program Content */}
                    <div className="p-7 space-y-5">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-gradient-primary transition-all duration-300 line-clamp-2 leading-tight">
                        {program.title}
                      </h3>

                      {/* Action Button */}
                      <Button className="w-full group/btn bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300">
                        <span>View Program Details</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
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
                    setFilterBy("all");
                  }}
                  className="bg-secondary text-white hover:bg-secondary/90 px-8 py-6 rounded-xl text-base font-semibold shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300"
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

export default GraduateSchool;
