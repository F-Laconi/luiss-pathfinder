import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import luissLogo from "@/assets/luiss-logo.png";
import bocconiLogo from "@/assets/bocconi-logo.png";
import cattolicaLogo from "@/assets/cattolica-logo.png";
import sapienzaLogo from "@/assets/sapienza-logo.png";
import polimiLogo from "@/assets/polimi-logo.png";
import uniboLogo from "@/assets/unibo-logo.png";

const universities = [
  {
    id: "luiss",
    name: "LUISS Guido Carli",
    description: "Business, Economics, Law, Political Science",
    logo: luissLogo,
    students: "8,000+",
    programs: "30+",
    color: "from-blue-600 to-blue-800"
  },
  {
    id: "bocconi",
    name: "Università Bocconi", 
    description: "Business, Economics, Finance, Management",
    logo: bocconiLogo,
    students: "14,000+",
    programs: "40+",
    color: "from-red-600 to-red-800"
  },
  {
    id: "cattolica",
    name: "Università Cattolica",
    description: "Humanities, Economics, Medicine, Psychology",
    logo: cattolicaLogo,
    students: "42,000+",
    programs: "100+",
    color: "from-red-700 to-red-900"
  },
  {
    id: "sapienza",
    name: "Sapienza Università di Roma",
    description: "Engineering, Medicine, Sciences, Humanities",
    logo: sapienzaLogo,
    students: "116,000+",
    programs: "300+",
    color: "from-blue-700 to-indigo-800"
  },
  {
    id: "polimi",
    name: "Politecnico di Milano",
    description: "Engineering, Architecture, Design",
    logo: polimiLogo,
    students: "47,000+",
    programs: "50+",
    color: "from-cyan-600 to-blue-700"
  },
  {
    id: "unibo",
    name: "Università di Bologna",
    description: "Humanities, Sciences, Medicine, Engineering",
    logo: uniboLogo,
    students: "87,000+",
    programs: "200+",
    color: "from-amber-600 to-orange-700"
  }
];

const UniversitySelection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
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
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <GraduationCap className="w-16 h-16 text-primary mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Choose Your University
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Discover the perfect academic institution for your future. Explore top universities 
              and find programs that match your ambitions.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-16">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search universities or programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-border/50 focus:border-primary/50 bg-card/50 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUniversities.map((university) => (
              <Card key={university.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className={`w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br ${university.color} rounded-3xl flex items-center justify-center group-hover:animate-float shadow-2xl mx-auto p-4`}>
                        <img 
                          src={university.logo} 
                          alt={`${university.name} logo`}
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <div className={`absolute -inset-2 bg-gradient-to-r ${university.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {university.name}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      {university.description}
                    </p>
                    
                    <div className="flex justify-between text-xs text-muted-foreground mb-6 bg-muted/30 rounded-lg p-3">
                      <div>
                        <span className="font-medium">{university.students}</span>
                        <br />
                        <span>Students</span>
                      </div>
                      <div>
                        <span className="font-medium">{university.programs}</span>
                        <br />
                        <span>Programs</span>
                      </div>
                    </div>

                    <Link to="/course-explorer">
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Explore Programs
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No universities found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Not sure which university to choose?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse all available courses and programs to find the perfect match for your interests and career goals.
          </p>
          <Link to="/course-explorer">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              Browse All Courses
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default UniversitySelection;