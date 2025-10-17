import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Flag, Globe, GraduationCap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import graduateImage1 from "@/assets/graduate-programs-1.png";
import graduateImage2 from "@/assets/graduate-programs-2.png";
import graduateImage3 from "@/assets/graduate-programs-3.png";
import policiesGovernanceImage from "@/assets/policies-governance-europe.png";
import economiaIstituzioniImage from "@/assets/economia-istituzioni.png";
import financeImage from "@/assets/finance-course.png";
import globalManagementImage from "@/assets/global-management-politics.png";
import governmentAffairsImage from "@/assets/government-public-affairs.png";
import internationalRelationsImage from "@/assets/international-relations.png";

// LUISS Post-graduate PhD programs data
const postGraduatePrograms = [
  {
    id: 1,
    title: "PhD in Economics",
    image: economiaIstituzioniImage,
    languages: ["English"],
    category: "Economics"
  },
  {
    id: 2,
    title: "PhD in Management",
    image: globalManagementImage,
    languages: ["English"],
    category: "Management"
  },
  {
    id: 3,
    title: "PhD in Politics",
    image: policiesGovernanceImage,
    languages: ["English"],
    category: "Politics"
  },
  {
    id: 4,
    title: "PhD in Law and Business",
    image: financeImage,
    languages: ["English"],
    category: "Law & Business"
  }
];

const PostGraduateSchool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("all");

  const filteredPrograms = postGraduatePrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
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
      <div className="flex gap-1">
        {languages.map(lang => (
          <Badge key={lang} variant="secondary" className="text-xs">
            <Globe className="h-3 w-3 mr-1" />
            {lang === "English" ? "EN" : "IT"}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-500/10 to-purple-600/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Post Graduate School
            </h1>
            <p className="text-subtitle mb-8">
              LUISS Guido Carli offers four doctoral programs designed to prepare independent researchers 
              with strong publication and teaching experience opportunities.
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-muted-foreground">PhD Programs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9</div>
                <div className="text-muted-foreground">Research Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-muted-foreground">PhD Candidates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b border-border overflow-visible">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Order</SelectItem>
                  <SelectItem value="title">Program Name</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPrograms.map((program, index) => (
              <div
                key={program.id}
                className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300 group animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Program Image */}
                <Link to={`/postgraduate/program/${program.id}`} className="block relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                  
                  {/* Language flags */}
                  <div className="absolute top-4 right-4 z-20">
                    {renderLanguageFlags(program.languages)}
                  </div>
                </Link>

                {/* Program Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {program.category}
                    </Badge>
                  </div>

                  {/* Action Button */}
                  <Link to={`/postgraduate/program/${program.id}`}>
                    <Button className="w-full group">
                      View Program Details
                      <Flag className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PostGraduateSchool;