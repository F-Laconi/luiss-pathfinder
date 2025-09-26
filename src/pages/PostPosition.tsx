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
    title: "EcoTrack App",
    briefDescription: "Mobile app to track personal carbon footprint",
    skillsNeeded: ["React Native", "Backend Development", "UI/UX Design"],
    author: "Marco R.",
    fullDescription: "A comprehensive mobile application that helps users track their daily carbon footprint through various activities. We're looking to add more features and improve the user experience.",
    stage: "MVP Ready",
    goals: "Scale to 10k users and add social features"
  },
  {
    id: 2,
    title: "StudyBuddy Platform",
    briefDescription: "Peer-to-peer study matching platform for university students",
    skillsNeeded: ["Frontend Development", "Marketing", "Data Analysis"],
    author: "Sofia M.",
    fullDescription: "A platform that connects university students based on their study subjects and schedules. We've validated the concept and need help scaling.",
    stage: "Beta Testing",
    goals: "Launch in 5 universities across Italy"
  },
  {
    id: 3,
    title: "LocalArt Marketplace",
    briefDescription: "Digital marketplace for local artists to sell their work",
    skillsNeeded: ["E-commerce Development", "Digital Marketing", "Photography"],
    author: "Luca T.",
    fullDescription: "An online marketplace specifically designed for local artists to showcase and sell their artwork. We need help with the technical implementation and marketing strategy.",
    stage: "Concept",
    goals: "Onboard 100 artists in first 6 months"
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
        
        <div className="relative z-10 min-h-screen px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/business-partner" 
              className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Business Partner
            </Link>
            
            <div className="flex justify-between items-start">
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 max-w-2xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Student Project Board</h1>
                <p className="text-gray-600 text-lg">
                  Discover innovative student projects seeking talented collaborators
                </p>
              </div>
              
              <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogTrigger asChild>
                  <div className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl shadow-lg">
                    <Button className="bg-transparent hover:bg-transparent text-white text-lg px-8 py-6 h-auto">
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
  );
};

export default PostPosition;