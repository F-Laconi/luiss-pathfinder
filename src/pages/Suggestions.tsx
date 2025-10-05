import { useState } from "react";
import { Lightbulb, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Suggestions = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this to a backend
    toast({
      title: "Thank you for your suggestion!",
      description: "We appreciate your feedback and will review it shortly.",
    });
    
    // Clear form
    setName("");
    setEmail("");
    setSuggestion("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Share Your Suggestions</h1>
            <p className="text-lg text-muted-foreground">
              We value your feedback! Help us improve UniCompass by sharing your ideas and suggestions.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Submit a Suggestion</CardTitle>
              <CardDescription>
                Tell us how we can make your experience better
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name (Optional)
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email (Optional)
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="suggestion" className="text-sm font-medium">
                    Your Suggestion <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="suggestion"
                    placeholder="Tell us your ideas, feedback, or suggestions for improvement..."
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    required
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!suggestion.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Suggestion
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <Lightbulb className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Feature Ideas</h3>
                <p className="text-sm text-muted-foreground">
                  Suggest new features you'd like to see
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <Lightbulb className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Improvements</h3>
                <p className="text-sm text-muted-foreground">
                  Help us enhance existing features
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <Lightbulb className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">General Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Share your overall experience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Suggestions;
