import { useState } from "react";
import { Search, Filter, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Graduate programs data based on the images
const graduatePrograms = [
  {
    id: 1,
    title: "Policies and Governance in Europe",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
    languages: ["en"],
    category: "Politics & Governance"
  },
  {
    id: 2,
    title: "Economia, Istituzioni e Mercati Finanziari",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
    languages: ["it", "en"],
    category: "Economics & Finance"
  },
  {
    id: 3,
    title: "Finance",
    image: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=600&h=400&fit=crop",
    languages: ["en"],
    category: "Finance"
  },
  {
    id: 4,
    title: "Global Management and Politics",
    image: "https://images.unsplash.com/photo-1573496774426-fe5c29db2082?w=600&h=400&fit=crop",
    languages: ["en"],
    category: "Management & Politics"
  },
  {
    id: 5,
    title: "Government and Public Affairs",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
    languages: ["it", "en"],
    category: "Government & Public Affairs"
  },
  {
    id: 6,
    title: "International Relations",
    image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=600&h=400&fit=crop",
    languages: ["en"],
    category: "International Relations"
  },
  {
    id: 7,
    title: "Management",
    image: "https://images.unsplash.com/photo-1573497161197-8d417bcb4c7b?w=600&h=400&fit=crop",
    languages: ["en"],
    category: "Management"
  },
  {
    id: 8,
    title: "Marketing",
    image: "https://images.unsplash.com/photo-1573496774380-f73b1e3bbc89?w=600&h=400&fit=crop",
    languages: ["it", "en"],
    category: "Marketing"
  },
  {
    id: 9,
    title: "Strategic Management",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
    languages: ["it", "en"],
    category: "Strategic Management"
  },
  {
    id: 10,
    title: "Amministrazione, Finanza e Controllo",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
    languages: ["it", "en"],
    category: "Administration & Finance"
  },
  {
    id: 11,
    title: "Data Science and Management",
    image: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=600&h=400&fit=crop",
    languages: ["en"],
    category: "Data Science"
  }
];

const GraduateSchool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [filterBy, setFilterBy] = useState("all");

  const filteredPrograms = graduatePrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === "all") return matchesSearch;
    if (filterBy === "english") return matchesSearch && program.languages.includes("en");
    if (filterBy === "italian") return matchesSearch && program.languages.includes("it");
    
    return matchesSearch;
  });

  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  const renderLanguageFlags = (languages: string[]) => {
    return (
      <div className="flex space-x-1">
        {languages.includes("it") && (
          <div className="w-6 h-4 rounded-sm overflow-hidden border border-gray-200">
            <div className="w-full h-full bg-gradient-to-r from-green-500 via-white to-red-500"></div>
          </div>
        )}
        {languages.includes("en") && (
          <div className="w-6 h-4 rounded-sm overflow-hidden border border-gray-200">
            <div className="w-full h-full bg-gradient-to-b from-blue-800 via-white to-red-600 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-red-600"></div>
            </div>
          </div>
        )}
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
              Graduate School
            </h1>
            <p className="text-subtitle mb-8">
              Master's degree programs for advanced studies. Explore our comprehensive graduate programs 
              designed to develop your expertise and leadership skills in various fields.
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">11</div>
                <div className="text-muted-foreground">Master Programs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-muted-foreground">Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b border-border">
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
                {/* Program Image with overlay */}
                <div className="relative h-48 overflow-hidden">
                  {/* Pink curved header like in the images */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-b-3xl z-10"></div>
                  
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Language flags */}
                  <div className="absolute top-4 right-4 z-20">
                    {renderLanguageFlags(program.languages)}
                  </div>
                </div>

                {/* Program Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {program.category}
                    </p>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full group">
                    View Program Details
                    <Flag className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </Button>
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

export default GraduateSchool;