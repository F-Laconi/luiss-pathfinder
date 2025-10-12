import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, User, Mail, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
    setProfiles([...profiles, data]);
    form.reset();
    setIsOpen(false);
  };

  const getRandomRotation = () => {
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
    return rotations[Math.floor(Math.random() * rotations.length)];
  };

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
          {profiles.map((profile, index) => {
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