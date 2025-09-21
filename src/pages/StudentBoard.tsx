import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, User, Mail, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  university: z.string().min(2, "University is required"),
  skills: z.string().min(5, "Please describe your skills"),
  bio: z.string().min(10, "Please provide a brief bio"),
});

type Profile = z.infer<typeof profileSchema>;

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-6">
          <Link to="/business-partner" className="inline-flex items-center text-primary-foreground hover:opacity-80 transition-opacity mb-4">
            ← Back to Business Partner
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Student Project Board</h1>
          <p className="text-lg opacity-90 max-w-3xl">
            Connect with fellow students and join exciting projects. Share your profile and discover collaboration opportunities.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Add Profile Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Available Students</h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Your Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Your Profile</DialogTitle>
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
                      Add Profile
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{profile.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <GraduationCap className="w-3 h-3" />
                        {profile.university}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{profile.skills}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
                  
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${profile.email}`} className="text-sm text-primary hover:underline">
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {profiles.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No profiles yet</h3>
            <p className="text-muted-foreground">Be the first to add your profile to the board!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentBoard;