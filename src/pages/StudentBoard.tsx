import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, User, Mail, Briefcase, GraduationCap, Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "@/components/Navigation";
import corkBoardBg from "@/assets/cork-board-background.jpg";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  university: z.string().min(2, "University is required"),
  skills: z.string().min(5, "Please describe your skills"),
  bio: z.string().min(10, "Please provide a brief bio"),
});

type Profile = z.infer<typeof profileSchema>;

const stickyColors = [
  'bg-yellow-300 border-yellow-400',
  'bg-pink-300 border-pink-400', 
  'bg-green-300 border-green-400',
  'bg-blue-300 border-blue-400',
  'bg-purple-300 border-purple-400',
  'bg-orange-300 border-orange-400',
  'bg-red-300 border-red-400',
  'bg-indigo-300 border-indigo-400'
];

const StudentBoard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      name: "Marco Rossi",
      email: "marco.rossi@example.com",
      university: "Bocconi University",
      skills: "React, TypeScript, UI/UX Design",
      bio: "Computer Science student passionate about web development and user experience. Looking for innovative startup projects."
    },
    {
      name: "Sofia Bianchi",
      email: "sofia.bianchi@example.com",
      university: "Politecnico di Milano", 
      skills: "Data Analysis, Python, Machine Learning",
      bio: "Engineering student specialized in data science. Interested in AI-driven projects and sustainable technology solutions."
    },
    {
      name: "Luca Verdi",
      email: "luca.verdi@example.com",
      university: "Università Cattolica",
      skills: "Marketing, Social Media, Content Creation",
      bio: "Business student with a passion for digital marketing and brand development."
    },
    {
      name: "Elena Neri",
      email: "elena.neri@example.com", 
      university: "LUISS University",
      skills: "Finance, Excel, Financial Modeling",
      bio: "Economics student interested in fintech and investment analysis projects."
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all");

  const form = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      university: "",
      skills: "",
      bio: "",
    },
  });

  const onSubmit = (data: Profile) => {
    setProfiles([data, ...profiles]);
    form.reset();
    setIsOpen(false);
  };

  const getRandomRotation = () => {
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
    return rotations[Math.floor(Math.random() * rotations.length)];
  };

  // Get unique universities for filter
  const allUniversities = useMemo(() => {
    const universities = new Set(profiles.map(p => p.university));
    return Array.from(universities).sort();
  }, [profiles]);

  // Filter and search profiles
  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      const matchesSearch = searchQuery === "" || 
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.university.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesUniversity = selectedUniversity === "all" || profile.university === selectedUniversity;
      
      return matchesSearch && matchesUniversity;
    });
  }, [profiles, searchQuery, selectedUniversity]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedUniversity("all");
  };

  const activeFiltersCount = (searchQuery ? 1 : 0) + (selectedUniversity !== "all" ? 1 : 0);

  return (
    <div>
      <Navigation />
      <div className="min-h-screen relative" style={{ backgroundImage: `url(${corkBoardBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Full background overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      {/* Header Overlay */}
      <div className="relative z-10 bg-black/30 backdrop-blur-sm">
        <header className="text-white">
          <div className="container mx-auto px-6 py-6">
            <Link to="/business-partner" className="inline-flex items-center text-white hover:opacity-80 transition-opacity mb-4">
              ← Back to Business Partner
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Student Project Board</h1>
            <p className="text-lg opacity-90 max-w-3xl">
              Connect with fellow students and join exciting projects. Pin your profile to the board!
            </p>
          </div>
        </header>
      </div>

      {/* Main Content - Cork Board */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Search and Filters Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
            {/* Search Bar */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skills, bio, or university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* University Filter */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="All Universities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Universities</SelectItem>
                  {allUniversities.map(uni => (
                    <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Clear {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''}
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between px-2">
            <p className="text-sm text-white font-medium">
              Showing {filteredProfiles.length} of {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Add Profile Button */}
        <div className="flex justify-center mb-8">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-lg">
                <Plus className="w-5 h-5" />
                Pin Your Profile to the Board
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle className="text-xl">Pin Your Profile to the Board</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@university.edu" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University</FormLabel>
                        <FormControl>
                          <Input placeholder="Your university name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills & Expertise</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., React, Python, Design, Marketing" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about yourself and what kind of projects you're interested in..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Pin Profile
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sticky Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {filteredProfiles.map((profile, index) => {
            const colorClass = stickyColors[index % stickyColors.length];
            const rotation = getRandomRotation();
            
            return (
              <div key={index} className={`relative ${rotation} hover:rotate-0 transition-transform duration-300 group cursor-pointer`}>
                {/* Pin */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-red-600 shadow-md z-10 group-hover:scale-110 transition-transform"></div>
                
                {/* Sticky Note */}
                <div className={`w-64 h-72 ${colorClass} border-2 rounded-sm shadow-lg p-4 relative overflow-hidden group-hover:shadow-xl transition-all duration-300`}>
                  {/* Slight fold effect */}
                  <div className="absolute top-0 right-0 w-6 h-6 bg-black/5 transform rotate-45 translate-x-3 -translate-y-3"></div>
                  
                  <div className="space-y-3 h-full flex flex-col">
                    <div className="text-center border-b border-black/20 pb-2">
                      <h3 className="font-bold text-lg text-gray-800 leading-tight">{profile.name}</h3>
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mt-1">
                        <GraduationCap className="w-3 h-3" />
                        <span className="font-medium">{profile.university}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Briefcase className="w-3 h-3 text-gray-600" />
                          <span className="text-xs font-semibold text-gray-700">Skills:</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed font-medium">{profile.skills}</p>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 leading-relaxed">{profile.bio}</p>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-2 border-t border-black/20">
                      <a 
                        href={`mailto:${profile.email}`} 
                        className="flex items-center justify-center gap-2 text-xs bg-black/10 hover:bg-black/20 rounded px-2 py-1.5 transition-colors font-medium text-gray-700"
                      >
                        <Mail className="w-3 h-3" />
                        Contact Me
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProfiles.length === 0 && profiles.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-yellow-200 border-2 border-yellow-300 rounded-sm p-8 mx-auto max-w-md shadow-lg relative rotate-2">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-red-600"></div>
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">No profiles found</h3>
              <p className="text-gray-600 text-sm mb-4">Try adjusting your search or filters</p>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {profiles.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-yellow-200 border-2 border-yellow-300 rounded-sm p-8 mx-auto max-w-md shadow-lg relative rotate-2">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-red-600"></div>
              <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">No profiles yet</h3>
              <p className="text-gray-600 text-sm">Be the first to pin your profile to the board!</p>
            </div>
          </div>
        )}
      </main>
      </div>
    </div>
  );
};

export default StudentBoard;