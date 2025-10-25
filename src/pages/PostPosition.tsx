import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Pin, Plus, Users, Lightbulb, Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
    setProjects([...projects, newProject]);
    setShowForm(false);
    form.reset();
  };

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
        <div className="absolute inset-0 bg-white/90"></div>
        
        <div className="relative z-10 min-h-screen px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/business-partner" 
              className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Business Partner
            </Link>
            
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="glass p-8 sm:p-10 rounded-2xl shadow-[var(--shadow-glow)] border border-primary/20 max-w-2xl w-full lg:w-auto bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass shadow-[var(--shadow-sm)] text-primary text-sm font-semibold mb-4">
                  <Pin className="h-4 w-4" />
                  <span>Project Board</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gradient-primary mb-4 leading-tight">Student Project Board</h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  Discover innovative student projects seeking talented collaborators
                </p>
              </div>
              
              <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogTrigger asChild>
                  <div className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl shadow-lg w-full lg:w-auto">
                    <Button className="bg-transparent hover:bg-transparent text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto w-full">
                      <Plus className="w-5 h-5 mr-2" />
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => {
              const gradients = [
                "from-blue-50 to-blue-100 border-blue-200",
                "from-purple-50 to-purple-100 border-purple-200", 
                "from-green-50 to-green-100 border-green-200",
                "from-orange-50 to-orange-100 border-orange-200",
                "from-pink-50 to-pink-100 border-pink-200",
                "from-indigo-50 to-indigo-100 border-indigo-200"
              ];
              
              return (
                <Dialog key={project.id}>
                  <DialogTrigger asChild>
                    <div 
                      className={`bg-gradient-to-br ${gradients[index % gradients.length]} p-6 rounded-xl shadow-lg border-2 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/80 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                          {project.stage}
                        </div>
                        <Eye className="w-5 h-5 text-gray-400" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-gray-900">{project.title}</h3>
                      <p className="text-gray-700 mb-4 text-sm leading-relaxed">{project.briefDescription}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.skillsNeeded.slice(0, 3).map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-700 border"
                          >
                            {skill}
                          </span>
                        ))}
                        {project.skillsNeeded.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                            +{project.skillsNeeded.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/50">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">{project.author[0]}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-800">{project.author}</span>
                        </div>
                        <Users className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Project Stage</h4>
                        <p className="text-sm text-gray-600">{project.stage}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-sm text-gray-600">{project.fullDescription}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Skills Needed</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.skillsNeeded.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Goals</h4>
                        <p className="text-sm text-gray-600">{project.goals}</p>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-500 mb-3">Interested in collaborating?</p>
                        <Button className="w-full">
                          <Users className="w-4 h-4 mr-2" />
                          Contact {project.author}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default PostPosition;