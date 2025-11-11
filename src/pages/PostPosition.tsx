import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Pin, Plus, Users, Lightbulb, Target, Eye, Search, Filter, X, SlidersHorizontal, Bookmark, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import Navigation from "@/components/Navigation";
import cleanBackground from "@/assets/clean-background.png";
import pageFrame from "@/assets/page-frame.png";

// Mock data for existing projects
const mockProjects = [
  {
    id: 1,
    title: "Project 1",
    briefDescription: "Innovative project seeking talented collaborators",
    skillsNeeded: ["Skill 1", "Skill 2", "Skill 3"],
    author: "Student A.",
    fullDescription: "Detailed description of project 1. This project aims to solve real-world problems through innovative solutions.",
    stage: "Concept",
    goals: "Define specific goals and milestones"
  },
  {
    id: 2,
    title: "Project 2",
    briefDescription: "Exciting initiative looking for team members",
    skillsNeeded: ["Skill A", "Skill B", "Skill C"],
    author: "Student B.",
    fullDescription: "Detailed description of project 2. We're building something amazing and need your expertise.",
    stage: "MVP Ready",
    goals: "Launch and gather user feedback"
  },
  {
    id: 3,
    title: "Project 3",
    briefDescription: "Revolutionary idea ready to be developed",
    skillsNeeded: ["Development", "Design", "Marketing"],
    author: "Student C.",
    fullDescription: "Detailed description of project 3. Join us in creating the next big thing.",
    stage: "Beta Testing",
    goals: "Scale and optimize for growth"
  },
  {
    id: 4,
    title: "Project 4",
    briefDescription: "Innovative solution for modern challenges",
    skillsNeeded: ["Frontend", "Backend", "UI/UX"],
    author: "Student D.",
    fullDescription: "Detailed description of project 4. We're addressing important market needs.",
    stage: "Concept",
    goals: "Validate market fit and expand"
  },
  {
    id: 5,
    title: "Project 5",
    briefDescription: "Creative project with high impact potential",
    skillsNeeded: ["Data Science", "Analytics", "Strategy"],
    author: "Student E.",
    fullDescription: "Detailed description of project 5. Help us make a difference through data-driven solutions.",
    stage: "MVP Ready",
    goals: "Achieve product-market fit"
  },
  {
    id: 6,
    title: "Project 6",
    briefDescription: "Groundbreaking platform for future growth",
    skillsNeeded: ["Product Management", "Engineering", "Growth"],
    author: "Student F.",
    fullDescription: "Detailed description of project 6. Building the future, one feature at a time.",
    stage: "Beta Testing",
    goals: "User acquisition and retention"
  },
  {
    id: 7,
    title: "Project 7",
    briefDescription: "Transformative project seeking passionate collaborators",
    skillsNeeded: ["Business Development", "Sales", "Operations"],
    author: "Student G.",
    fullDescription: "Detailed description of project 7. Join our mission to transform the industry.",
    stage: "Concept",
    goals: "Build team and secure funding"
  }
];

const PostPosition = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<number[]>([]);
  
  // Simulate loading
  useState(() => {
    setTimeout(() => setIsLoading(false), 800);
  });
  
  const form = useForm({
    defaultValues: {
      title: "",
      briefDescription: "",
      skillsNeeded: "",
      fullDescription: "",
      stage: "",
      goals: ""
    }
  });

  // Get unique stages and skills for filters
  const allStages = useMemo(() => {
    return Array.from(new Set(projects.map(p => p.stage)));
  }, [projects]);

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    projects.forEach(p => p.skillsNeeded.forEach(skill => skills.add(skill)));
    return Array.from(skills);
  }, [projects]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.briefDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.skillsNeeded.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStage = selectedStage === "all" || project.stage === selectedStage;
      const matchesSkill = selectedSkill === "all" || project.skillsNeeded.includes(selectedSkill);
      
      return matchesSearch && matchesStage && matchesSkill;
    });

    // Sort projects
    switch (sortBy) {
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "stage":
        filtered.sort((a, b) => a.stage.localeCompare(b.stage));
        break;
      case "recent":
      default:
        // Keep original order (most recent first)
        break;
    }

    return filtered;
  }, [projects, searchQuery, selectedStage, selectedSkill, sortBy]);

  const onSubmit = (data: any) => {
    const newProject = {
      id: projects.length + 1,
      title: data.title,
      briefDescription: data.briefDescription,
      skillsNeeded: data.skillsNeeded.split(',').map((skill: string) => skill.trim()),
      author: "You",
      fullDescription: data.fullDescription,
      stage: data.stage,
      goals: data.goals
    };
    setProjects([newProject, ...projects]); // Add to beginning for "recent" sort
    setShowForm(false);
    form.reset();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedStage("all");
    setSelectedSkill("all");
    setSortBy("recent");
  };

  const activeFiltersCount = 
    (searchQuery ? 1 : 0) + 
    (selectedStage !== "all" ? 1 : 0) + 
    (selectedSkill !== "all" ? 1 : 0);

  const toggleBookmark = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  // Initialize loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Navigation />
      <div className="relative min-h-screen pt-16">
      {/* Page Border Frame */}
      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          border: '20px solid',
          borderImage: `url(${pageFrame}) 20 stretch`,
          borderImageSlice: '20'
        }}
      />
      
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${cleanBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/5"></div>
        
        <div className="relative z-10 min-h-screen px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <Link 
              to="/business-partner" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground font-medium mb-4 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Business Partner
            </Link>
            
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="glass p-8 sm:p-10 rounded-2xl shadow-[var(--shadow-glow)] border border-primary/20 max-w-2xl w-full lg:w-auto bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-[var(--shadow-elegant)] transition-shadow duration-300">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass shadow-[var(--shadow-sm)] text-primary text-sm font-semibold mb-4 animate-scale-in">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span>Project Board</span>
                </div>
                <h1 className="font-bebas text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent mb-4 leading-tight">Student Project Board</h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  Discover innovative student projects seeking talented collaborators
                </p>
              </div>
              
              <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogTrigger asChild>
                  <div className="group relative overflow-hidden rounded-xl shadow-lg w-full lg:w-auto hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 group-hover:from-primary/90 group-hover:to-primary transition-all duration-300"></div>
                    <Button className="relative bg-transparent hover:bg-transparent text-primary-foreground text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto w-full">
                      <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                      Post My Project
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Post Your Project</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                              <Input placeholder="My Amazing Project" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="briefDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brief Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="A short description of your project..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="skillsNeeded"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skills Needed (comma separated)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="React, Design, Marketing, etc."
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="stage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Stage</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Concept, MVP, Beta, etc."
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="fullDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Detailed description of your project, goals, and what kind of help you need..."
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="goals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Goals</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="What do you want to achieve?"
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        Post Project
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search and Filters Section */}
          <div className="max-w-7xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="glass p-6 rounded-xl border border-primary/10 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-elegant)] transition-shadow duration-300">
              {/* Search Bar */}
              <div className="relative mb-4 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search projects by title, description, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-12 text-base border-primary/20 focus:border-primary/40 transition-colors"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Filters Row */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filter by:</span>
                </div>
                
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="w-[160px] h-9">
                    <SelectValue placeholder="All Stages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    {allStages.map(stage => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="All Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    {allSkills.map(skill => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground ml-auto">
                  <span>Sort by:</span>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                    <SelectItem value="stage">Stage</SelectItem>
                  </SelectContent>
                </Select>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-9"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''}
                  </Button>
                )}
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-primary/10">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredAndSortedProjects.length}</span> of <span className="font-semibold text-foreground">{projects.length}</span> projects
                </p>
              </div>
            </div>
          </div>

          {/* Projects Grid or Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass p-6 rounded-xl border border-primary/10 animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>
                  <Skeleton className="h-7 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-24 rounded-full" />
                    <Skeleton className="h-7 w-16 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredAndSortedProjects.map((project, index) => {
                const isBookmarked = bookmarkedProjects.includes(project.id);
                const stageColors = {
                  "Concept": "from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300",
                  "MVP Ready": "from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300", 
                  "Beta Testing": "from-green-50 to-green-100 border-green-200 hover:border-green-300"
                };
                const gradientClass = stageColors[project.stage as keyof typeof stageColors] || "from-orange-50 to-orange-100 border-orange-200 hover:border-orange-300";
                
                return (
                  <Dialog key={project.id}>
                    <DialogTrigger asChild>
                      <div 
                        className={`group relative bg-gradient-to-br ${gradientClass} p-6 rounded-xl shadow-md border-2 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in overflow-hidden`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {/* Hover gradient effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <Badge variant="secondary" className="text-xs font-medium shadow-sm">
                              {project.stage}
                            </Badge>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white/80 transition-colors"
                                onClick={(e) => toggleBookmark(project.id, e)}
                              >
                                <Bookmark 
                                  className={`h-4 w-4 transition-all ${
                                    isBookmarked ? 'fill-primary text-primary scale-110' : 'text-muted-foreground hover:text-primary'
                                  }`}
                                />
                              </Button>
                              <div className="h-8 w-8 rounded-full bg-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                          <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                          <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">{project.briefDescription}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.skillsNeeded.slice(0, 3).map((skill, skillIndex) => (
                              <Badge 
                                key={skillIndex}
                                variant="outline"
                                className="px-3 py-1 bg-background/90 text-xs font-medium border shadow-sm hover:shadow-md hover:scale-105 transition-all"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {project.skillsNeeded.length > 3 && (
                              <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
                                +{project.skillsNeeded.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-foreground/10">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center ring-2 ring-background shadow-sm">
                                <span className="text-xs font-bold text-primary">{project.author[0]}</span>
                              </div>
                              <span className="text-sm font-medium text-foreground">{project.author}</span>
                            </div>
                            <Users className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                          {project.title}
                          <Badge variant="secondary" className="ml-2">{project.stage}</Badge>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="glass p-4 rounded-lg border border-primary/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="h-4 w-4 text-primary" />
                            <h4 className="font-semibold">Description</h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{project.fullDescription}</p>
                        </div>
                        
                        <div className="glass p-4 rounded-lg border border-primary/10">
                          <div className="flex items-center gap-2 mb-3">
                            <Users className="h-4 w-4 text-primary" />
                            <h4 className="font-semibold">Skills Needed</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.skillsNeeded.map((skill, skillIndex) => (
                              <Badge 
                                key={skillIndex}
                                className="px-3 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="glass p-4 rounded-lg border border-primary/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-primary" />
                            <h4 className="font-semibold">Goals</h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{project.goals}</p>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            Interested in collaborating?
                          </p>
                          <Button className="w-full group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Users className="w-4 h-4 mr-2 relative z-10" />
                            <span className="relative z-10">Contact {project.author}</span>
                            <ExternalLink className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                </Dialog>
              );
            })}
          </div>
          ) : (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div className="glass p-12 rounded-2xl border border-primary/10 text-center shadow-[var(--shadow-elegant)]">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Search className="h-10 w-10 text-primary/40" />
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">No projects found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {searchQuery || selectedStage !== "all" || selectedSkill !== "all"
                    ? "Try adjusting your filters or search query to find more projects."
                    : "Be the first to post a project and start building something amazing!"}
                </p>
                {activeFiltersCount > 0 && (
                  <Button onClick={clearFilters} variant="outline" className="group">
                    <X className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
     </div>
    </div>
  );
};

export default PostPosition;