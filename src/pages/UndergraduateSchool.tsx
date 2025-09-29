import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Globe, BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

// Undergraduate programs data
const undergraduatePrograms = [
  {
    id: "economics",
    title: "Economics and Social Sciences",
    image: "/src/assets/economics-icon.jpg",
    languages: ["English", "Italian"],
    category: "Economics"
  },
  {
    id: "management",
    title: "Management",
    image: "/src/assets/management-course.png",
    languages: ["English", "Italian"],
    category: "Business"
  },
  {
    id: "law",
    title: "Law",
    image: "/src/assets/law-icon.jpg",
    languages: ["Italian"],
    category: "Law"
  },
  {
    id: "politics",
    title: "Political Science",
    image: "/src/assets/politics-icon.jpg",
    languages: ["English", "Italian"],
    category: "Politics"
  },
  {
    id: "marketing",
    title: "Marketing and Communication",
    image: "/src/assets/marketing-icon.jpg",
    languages: ["English", "Italian"],
    category: "Business"
  },
  {
    id: "finance",
    title: "Finance and Banking",
    image: "/src/assets/finance-course.png",
    languages: ["English"],
    category: "Finance"
  },
  {
    id: "international-relations",
    title: "International Relations",
    image: "/src/assets/international-relations.png",
    languages: ["English"],
    category: "Politics"
  },
  {
    id: "data-science",
    title: "Data Science and Analytics",
    image: "/src/assets/data-science-management.png",
    languages: ["English"],
    category: "Technology"
  }
];

const UndergraduateSchool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterLanguage, setFilterLanguage] = useState("all");

  // Filter programs based on search query and language filter
  const filteredPrograms = undergraduatePrograms.filter((program) => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.category.toLowerCase().includes(searchQuery.toLowerCase());
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
      <div className="flex gap-1">
        {languages.map((lang) => (
          <Badge key={lang} variant="secondary" className="text-xs">
            <Globe className="h-3 w-3 mr-1" />
            {lang === "English" ? "EN" : "IT"}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <Navigation />
      
      {/* Header Section */}
      <div className="pt-20 pb-12 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Undergraduate Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our comprehensive undergraduate programs designed to prepare you for success in your chosen field
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{undergraduatePrograms.length}</div>
                <div className="text-sm text-muted-foreground">Programs Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Study Areas</div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <Card className="mb-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search programs by title or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/80 dark:bg-gray-800/80"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48 bg-white/80 dark:bg-gray-800/80">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Order</SelectItem>
                    <SelectItem value="title">Program Title</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                  <SelectTrigger className="w-full md:w-48 bg-white/80 dark:bg-gray-800/80">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPrograms.map((program) => (
              <Card key={program.id} className="group hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      {renderLanguageFlags(program.languages)}
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="outline" className="bg-white/90 text-primary">
                        {program.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg mb-3 group-hover:text-primary transition-colors">
                    {program.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Undergraduate Program
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                    <Link to={`/course/${program.id}`}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Program Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {sortedPrograms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No programs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UndergraduateSchool;