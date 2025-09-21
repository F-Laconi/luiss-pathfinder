import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Pin, Send, Users, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import corkBackground from "@/assets/cork-board-background.jpg";

const PostPosition = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm({
    defaultValues: {
      projectName: "",
      description: "",
      skillsNeeded: "",
      contactInfo: "",
      projectStage: "",
      goals: ""
    }
  });

  const onSubmit = (data: any) => {
    console.log("Project posted:", data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${corkBackground})` }}
      >
        <div className="absolute inset-0 bg-amber-50/80"></div>
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="bg-green-200 p-8 rounded-lg shadow-lg transform rotate-1 max-w-md text-center">
            <div className="absolute -top-2 left-4">
              <Pin className="w-6 h-6 text-red-600 transform rotate-45" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Project Posted!</h2>
            <p className="text-green-700 mb-6">Your project is now live on our board. Students will reach out to you soon!</p>
            <Link to="/business-partner">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Back to Business Partner
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${corkBackground})` }}
    >
      <div className="absolute inset-0 bg-amber-50/80"></div>
      
      <div className="relative z-10 min-h-screen p-6">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/business-partner" 
            className="inline-flex items-center text-amber-800 hover:text-amber-900 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Business Partner
          </Link>
          
          <div className="bg-blue-200 p-6 rounded-lg shadow-lg transform -rotate-1 max-w-2xl">
            <div className="absolute -top-2 right-4">
              <Pin className="w-6 h-6 text-red-600 transform rotate-45" />
            </div>
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Post Your Project</h1>
            <p className="text-blue-700">
              Have a project that needs talented students to help it grow? Post it here!
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Name */}
                <div className="bg-yellow-200 p-6 rounded-lg shadow-lg transform rotate-1">
                  <div className="absolute -top-2 left-4">
                    <Pin className="w-6 h-6 text-red-600 transform rotate-45" />
                  </div>
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-yellow-800 font-bold flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Project Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="My Amazing Startup" 
                            className="bg-white/80 border-yellow-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Project Stage */}
                <div className="bg-pink-200 p-6 rounded-lg shadow-lg transform -rotate-1">
                  <div className="absolute -top-2 right-4">
                    <Pin className="w-6 h-6 text-red-600 transform rotate-45" />
                  </div>
                  <FormField
                    control={form.control}
                    name="projectStage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-pink-800 font-bold flex items-center">
                          <Target className="w-4 h-4 mr-2" />
                          Project Stage
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Prototype, MVP, Growing, etc." 
                            className="bg-white/80 border-pink-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="bg-green-200 p-6 rounded-lg shadow-lg transform rotate-0.5">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Pin className="w-6 h-6 text-red-600 transform rotate-45" />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-800 font-bold">
                        Project Description
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project, what it does, and your vision..."
                          className="bg-white/80 border-green-300 min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skills Needed */}
                <div className="bg-purple-200 p-6 rounded-lg shadow-lg transform -rotate-1">
                  <div className="absolute -top-2 left-4">
                    <Pin className="w-6 h-6 text-red-600 transform rotate-45" />
                  </div>
                  <FormField
                    control={form.control}
                    name="skillsNeeded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-800 font-bold flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Skills Needed
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Marketing, Development, Design, Business Strategy..."
                            className="bg-white/80 border-purple-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Goals */}
                <div className="bg-orange-200 p-6 rounded-lg shadow-lg transform rotate-1">
                  <div className="absolute -top-2 right-4">
                    <Pin className="w-6 h-6 text-red-600 transform rotate-45" />
                  </div>
                  <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-orange-800 font-bold">
                          Growth Goals
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What do you want to achieve? Scale to 1000 users, launch in new markets..."
                            className="bg-white/80 border-orange-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-cyan-200 p-6 rounded-lg shadow-lg transform -rotate-0.5">
                <div className="absolute -top-2 left-1/3">
                  <Pin className="w-6 h-6 text-red-600 transform rotate-45" />
                </div>
                <FormField
                  control={form.control}
                  name="contactInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyan-800 font-bold">
                        How can students reach you?
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="email@example.com, LinkedIn, Discord..."
                          className="bg-white/80 border-cyan-300"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <div className="bg-red-200 p-4 rounded-lg shadow-lg transform rotate-1">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Pin className="w-6 h-6 text-red-600 transform rotate-45" />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-red-600 hover:bg-red-700 text-white px-8"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Project
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

        {/* Help Text */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-amber-200 p-6 rounded-lg shadow-lg transform rotate-0.5">
            <div className="absolute -top-2 right-6">
              <Pin className="w-6 h-6 text-red-600 transform rotate-45" />
            </div>
            <h3 className="text-amber-800 font-bold mb-2">💡 Tips for a Great Post</h3>
            <ul className="text-amber-700 space-y-1 text-sm">
              <li>• Be specific about what help you need</li>
              <li>• Mention any compensation or equity opportunities</li>
              <li>• Include your project's current traction or achievements</li>
              <li>• Be clear about time commitment expectations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPosition;