import { useState } from "react";
import { Lightbulb, Send, Sparkles, MessageSquare, Star } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Enhanced Decorative elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl mb-6 sm:mb-8 shadow-2xl shadow-primary/30 animate-scale-in hover:scale-110 transition-transform duration-300">
              <Lightbulb className="h-10 w-10 sm:h-12 sm:w-12 text-primary-foreground animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%] px-4">
              Share Your Ideas 💡
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
              Your feedback shapes the future of UniCompass. Every suggestion matters! 🌟
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-primary/10 backdrop-blur-sm bg-background/95 mb-8 animate-fade-in hover-scale">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-2xl flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                Submit a Suggestion
              </CardTitle>
              <CardDescription className="text-base">
                Help us create the best educational platform together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 text-primary" />
                      Name (Optional)
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 text-primary" />
                      Email (Optional)
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="suggestion" className="text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Your Suggestion <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="suggestion"
                    placeholder="Share your brilliant ideas, feedback, or suggestions for improvement... We're all ears! 👂"
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    required
                    rows={8}
                    className="resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  disabled={!suggestion.trim()}
                >
                  <Send className="h-5 w-5 mr-2" />
                  Submit Suggestion
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
            <Card className="group bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover-scale cursor-pointer">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Feature Ideas</h3>
                <p className="text-sm text-muted-foreground">
                  Suggest innovative features you'd love to see
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-gradient-to-br from-accent/10 via-accent/5 to-background border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover-scale cursor-pointer">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Improvements</h3>
                <p className="text-sm text-muted-foreground">
                  Help us enhance existing features
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-gradient-to-br from-primary/10 via-accent/5 to-background border-2 border-primary/20 hover:border-accent/40 transition-all duration-300 hover-scale cursor-pointer">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">General Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Share your overall experience with us
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
