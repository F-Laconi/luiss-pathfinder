import { useState } from "react";
import { Search, Filter, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import graduateImage2 from "@/assets/graduate-programs-2.png";
import graduateImage3 from "@/assets/graduate-programs-3.png";
import policiesGovernanceImage from "@/assets/policies-governance-europe.png";
import economiaIstituzioniImage from "@/assets/economia-istituzioni.png";
import financeImage from "@/assets/finance-course.png";
import globalManagementImage from "@/assets/global-management-politics.png";
import governmentAffairsImage from "@/assets/government-public-affairs.png";
import internationalRelationsImage from "@/assets/international-relations.png";
import managementImage from "@/assets/management-course.png";
import marketingImage from "@/assets/marketing-course.png";

// Graduate programs data based on the images
const graduatePrograms = [
  {
    id: 1,
    title: "Policies and Governance in Europe",
    image: policiesGovernanceImage,
    languages: ["en"],
    category: "Politics & Governance"
  },
  {
    id: 2,
    title: "Economia, Istituzioni e Mercati Finanziari",
    image: economiaIstituzioniImage,
    languages: ["it", "en"],
    category: "Economics & Finance"
  },
  {
    id: 3,
    title: "Finance",
    image: financeImage,
    languages: ["en"],
    category: "Finance"
  },
  {
    id: 4,
    title: "Global Management and Politics",
    image: globalManagementImage,
    languages: ["en"],
    category: "Management & Politics"
  },
  {
    id: 5,
    title: "Government and Public Affairs",
    image: governmentAffairsImage,
    languages: ["it", "en"],
    category: "Government & Public Affairs"
  },
  {
    id: 6,
    title: "International Relations",
    image: internationalRelationsImage,
    languages: ["en"],
    category: "International Relations"
  },
  {
    id: 7,
    title: "Management",
    image: managementImage,
    languages: ["en"],
    category: "Management"
  },
  {
    id: 8,
    title: "Marketing",
    image: marketingImage,
    languages: ["it", "en"],
    category: "Marketing"
  },
  {
    id: 9,
    title: "Strategic Management",
    image: graduateImage3,
    languages: ["it", "en"],
    category: "Strategic Management"
  },
  {
    id: 10,
    title: "Amministrazione, Finanza e Controllo",
    image: graduateImage2,
    languages: ["it", "en"],
    category: "Administration & Finance"
  },
  {
    id: 11,
    title: "Data Science and Management",
    image: graduateImage2,
    languages: ["en"],
    category: "Data Science"
  }
];

const GraduateSchool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
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
    if (sortBy === "default") return a.id - b.id;
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
                <div className="relative h-48 overflow-hidden">
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