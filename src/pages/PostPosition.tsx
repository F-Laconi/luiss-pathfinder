import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Pin, Plus, Users, Lightbulb, Target, Eye, Search, Filter, X, SlidersHorizontal, Bookmark, ExternalLink, Sparkles, Rocket, Code, Palette, TrendingUp } from "lucide-react";
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
import postPositionBackground from "@/assets/post-position-background.png";
// Mock data for existing projects
const mockProjects = [
  {
    id: 1,
    title: "EduBlockChain",
    briefDescription: "A blockchain-based platform designed to help students with verified credentials, course reviews, and collaborative projects",
    skillsNeeded: ["Blockchain Developer", "Marketer"],
    author: "Francesco L., Mattia M. M., Kristoffer L. H.",
    fullDescription: "EduBlockChain is revolutionizing the student experience through blockchain technology. Our platform enables verified student credentials, anonymous but trusted course reviews, and transparent project collaboration through DAOs. Join us to build the future of education.",
    stage: "MVP Ready",
    goals: "Launch beta and onboard first 1000 students"
  },
  {
    id: 2,
    title: "3Better",
    briefDescription: "A sustainable startup focused on biomethane production and renewable energy solutions",
    skillsNeeded: ["Financial Advisor", "Chemist"],
    author: "Filippo A., Katharina H.",
    fullDescription: "3Better is pioneering sustainable biomethane production from organic waste. We're building scalable solutions to transform agricultural and food waste into clean energy, contributing to a circular economy and carbon neutrality goals.",
    stage: "Concept",
    goals: "Secure seed funding and validate production process"
  },
  {
    id: 3,
    title: "UrbanCommon",
    briefDescription: "A platform that aims to enhance and optimize green areas in urban cities through data-driven insights",
    skillsNeeded: ["Data Analyst"],
    author: "Andrea B.",
    fullDescription: "UrbanCommon connects citizens, municipalities, and urban planners to maximize the potential of city green spaces. Using data analytics and community feedback, we identify underutilized areas and propose sustainable improvements for healthier, greener cities.",
    stage: "Beta Testing",
    goals: "Partner with 3 municipalities for pilot program"
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
      <div className="relative min-h-screen">
        {/* Hero Background */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${postPositionBackground})` }}
        />
        <div className="fixed inset-0 bg-black/60" />
        
        {/* Floating gradient orbs */}
        <div className="fixed top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px]" />
        
        <div className="relative z-10 min-h-screen px-4 sm:px-6 py-8 pt-24">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <Link 
              to="/business-partner" 
              className="inline-flex items-center text-white/70 hover:text-white font-medium mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Business Partner
            </Link>
            
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="bg-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-2xl border border-white/20 max-w-2xl w-full lg:w-auto shadow-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-semibold mb-4 animate-scale-in border border-primary/30">
                  <Rocket className="h-4 w-4" />
                  <span>Project Board</span>
                </div>
                <h1 className="font-helvetica text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight uppercase tracking-tight">
                  Student Project Board
                </h1>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  Discover innovative student projects seeking talented collaborators
                </p>
                
                {/* Quick Stats */}
                <div className="flex gap-6 mt-6 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{projects.length}</div>
                    <div className="text-xs text-white/60 uppercase tracking-wide">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">24</div>
                    <div className="text-xs text-white/60 uppercase tracking-wide">Active Teams</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">89%</div>
                    <div className="text-xs text-white/60 uppercase tracking-wide">Match Rate</div>
                  </div>
                </div>
              </div>
              
              <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground text-base sm:text-lg px-8 py-6 h-auto rounded-xl shadow-lg hover:shadow-primary/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Post My Project
                  </Button>
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
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20 shadow-xl">
              {/* Search Bar */}
              <div className="relative mb-4 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search projects by title, description, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-12 text-base bg-white/10 border-white/20 focus:border-primary/50 text-white placeholder:text-white/40 transition-colors"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Filters Row */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2 text-sm font-medium text-white/60">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filter by:</span>
                </div>
                
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="w-[160px] h-9 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="All Stages" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all">All Stages</SelectItem>
                    {allStages.map(stage => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger className="w-[180px] h-9 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="All Skills" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all">All Skills</SelectItem>
                    {allSkills.map(skill => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 text-sm font-medium text-white/60 ml-auto">
                  <span>Sort by:</span>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] h-9 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
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
                    className="h-9 text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''}
                  </Button>
                )}
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-white/60">
                  Showing <span className="font-semibold text-white">{filteredAndSortedProjects.length}</span> of <span className="font-semibold text-white">{projects.length}</span> projects
                </p>
              </div>
            </div>
          </div>

          {/* Projects Grid or Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <Skeleton className="h-6 w-24 bg-white/10" />
                    <Skeleton className="h-5 w-5 rounded-full bg-white/10" />
                  </div>
                  <Skeleton className="h-7 w-3/4 mb-3 bg-white/10" />
                  <Skeleton className="h-4 w-full mb-2 bg-white/10" />
                  <Skeleton className="h-4 w-5/6 mb-4 bg-white/10" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-7 w-20 rounded-full bg-white/10" />
                    <Skeleton className="h-7 w-24 rounded-full bg-white/10" />
                    <Skeleton className="h-7 w-16 rounded-full bg-white/10" />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
                      <Skeleton className="h-4 w-24 bg-white/10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredAndSortedProjects.map((project, index) => {
                const isBookmarked = bookmarkedProjects.includes(project.id);
                const stageConfig = {
                  "Concept": { bg: "from-blue-500/20 to-blue-600/10", badge: "bg-blue-500/20 text-blue-300 border-blue-400/30", icon: Lightbulb },
                  "MVP Ready": { bg: "from-purple-500/20 to-purple-600/10", badge: "bg-purple-500/20 text-purple-300 border-purple-400/30", icon: Code },
                  "Beta Testing": { bg: "from-green-500/20 to-green-600/10", badge: "bg-green-500/20 text-green-300 border-green-400/30", icon: TrendingUp }
                };
                const config = stageConfig[project.stage as keyof typeof stageConfig] || { bg: "from-orange-500/20 to-orange-600/10", badge: "bg-orange-500/20 text-orange-300 border-orange-400/30", icon: Sparkles };
                const StageIcon = config.icon;
                
                return (
                  <Dialog key={project.id}>
                    <DialogTrigger asChild>
                      <div 
                        className={`group relative bg-gradient-to-br ${config.bg} backdrop-blur-xl p-6 rounded-2xl border border-white/10 cursor-pointer hover:border-white/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in overflow-hidden`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <Badge className={`text-xs font-medium border ${config.badge}`}>
                              <StageIcon className="w-3 h-3 mr-1" />
                              {project.stage}
                            </Badge>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white/10 transition-colors"
                                onClick={(e) => toggleBookmark(project.id, e)}
                              >
                                <Bookmark 
                                  className={`h-4 w-4 transition-all ${
                                    isBookmarked ? 'fill-primary text-primary scale-110' : 'text-white/50 hover:text-white'
                                  }`}
                                />
                              </Button>
                              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Eye className="w-4 h-4 text-white/70" />
                              </div>
                            </div>
                          </div>
                          <h3 className="font-bold text-xl mb-3 text-white group-hover:text-primary transition-colors">{project.title}</h3>
                          <p className="text-white/60 mb-4 text-sm leading-relaxed line-clamp-2">{project.briefDescription}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.skillsNeeded.slice(0, 3).map((skill, skillIndex) => (
                              <Badge 
                                key={skillIndex}
                                variant="outline"
                                className="px-3 py-1 bg-white/5 text-white/80 text-xs font-medium border-white/20 hover:bg-white/10 hover:scale-105 transition-all"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {project.skillsNeeded.length > 3 && (
                              <Badge className="px-3 py-1 text-xs font-medium bg-white/10 text-white/60 border-white/10">
                                +{project.skillsNeeded.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center ring-2 ring-white/20">
                                <span className="text-xs font-bold text-white">{project.author[0]}</span>
                              </div>
                              <span className="text-sm font-medium text-white/80">{project.author}</span>
                            </div>
                            <Users className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
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
              <div className="bg-white/10 backdrop-blur-xl p-12 rounded-2xl border border-white/20 text-center shadow-2xl">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                  <Search className="h-10 w-10 text-primary/60" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">No projects found</h3>
                <p className="text-white/60 mb-6 max-w-md mx-auto">
                  {searchQuery || selectedStage !== "all" || selectedSkill !== "all"
                    ? "Try adjusting your filters or search query to find more projects."
                    : "Be the first to post a project and start building something amazing!"}
                </p>
                {activeFiltersCount > 0 && (
                  <Button onClick={clearFilters} variant="outline" className="group border-white/20 text-white hover:bg-white/10">
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
  );
};

export default PostPosition;