import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Sparkles, Target, Users, Rocket, Heart, BookOpen, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
          <div className="container mx-auto px-4 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <Link 
                to="/easter-egg" 
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in hover:bg-primary/20 hover:scale-105 transition-all duration-300 cursor-pointer relative z-10"
              >
                <Sparkles className="h-4 w-4" />
                Made with passion by LUISS students
              </Link>
              
              <h1 className="font-nunito text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in">
                About
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> EduBlockChain</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in">
                Empowering students to navigate their academic journey with confidence and clarity
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-primary font-medium">
                  <Heart className="h-5 w-5" />
                  Our Story
                </div>
                
                <h2 className="font-nunito text-4xl font-bold text-foreground leading-tight">
                  Seven dreamers,
                  <span className="text-primary"> one vision</span>
                </h2>
                
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We are seven passionate students from <span className="font-semibold text-foreground">LUISS University</span> who 
                    believe that navigating higher education shouldn't feel like solving a puzzle in the dark.
                  </p>
                  
                  <p>
                    Born from late-night conversations and shared frustrations, EduBlockChain emerged as our answer 
                    to the overwhelming complexity of choosing the right master's program and university path.
                  </p>
                  
                  <p>
                    As part of our <span className="font-semibold text-primary">Digital Marketing course</span>, we're building 
                    more than just a startup—we're creating a movement to make education accessible and clear for everyone.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-card border border-border/20 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">7</div>
                      <div className="text-sm text-muted-foreground">Team Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">1</div>
                      <div className="text-sm text-muted-foreground">Shared Vision</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">∞</div>
                      <div className="text-sm text-muted-foreground">Possibilities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">❤️</div>
                      <div className="text-sm text-muted-foreground">For Students</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-3xl"></div>
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/20 rounded-3xl p-12">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 text-primary font-medium mb-4">
                    <Target className="h-5 w-5" />
                    Our Mission
                  </div>
                  
                  <h2 className="font-nunito text-4xl font-bold text-foreground mb-6">
                    Simplifying the path to
                    <span className="text-primary"> academic success</span>
                  </h2>
                  
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    EduBlockChain exists to transform the overwhelming maze of higher education into
                    a clear, navigable journey filled with opportunities and connections.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Lightbulb className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-nunito text-xl font-semibold text-foreground mb-3">Clear Guidance</h3>
                    <p className="text-muted-foreground">Navigate university choices with confidence through comprehensive insights and expert recommendations</p>
                  </div>
                  
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-nunito text-xl font-semibold text-foreground mb-3">Connect & Collaborate</h3>
                    <p className="text-muted-foreground">Find your ideal study partners and future business collaborators in our vibrant community</p>
                  </div>
                  
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Rocket className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-nunito text-xl font-semibold text-foreground mb-3">Launch Your Future</h3>
                    <p className="text-muted-foreground">Build a strong foundation for your academic and professional journey with our comprehensive platform</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-20">
              <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg">
                <BookOpen className="h-5 w-5" />
                Start Your Journey
                <Sparkles className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;