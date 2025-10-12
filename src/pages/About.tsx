import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Sparkles, Target, Users, Rocket, Heart, BookOpen, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
      
      <Navigation />
      
      <main className="pt-16 relative z-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <Link 
                to="/easter-egg" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8 animate-fade-in hover:from-primary/30 hover:to-accent/30 hover:scale-105 transition-all duration-300 cursor-pointer relative z-10 shadow-lg"
              >
                <Sparkles className="h-5 w-5 animate-pulse" />
                Made with passion by LUISS students
                <Sparkles className="h-5 w-5 animate-pulse" />
              </Link>
              
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in leading-tight">
                About
                <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]"> UniCompass</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in px-4">
                Empowering students to navigate their academic journey with confidence and clarity 🎓
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-2 text-primary font-semibold bg-primary/10 px-4 py-2 rounded-full">
                  <Heart className="h-5 w-5" />
                  Our Story
                </div>
                
                <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                  Seven dreamers,
                  <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> one vision</span>
                </h2>
                
                <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  <p className="group hover:text-foreground transition-colors">
                    We are seven passionate students from <span className="font-bold text-primary group-hover:scale-105 inline-block transition-transform">LUISS University</span> who 
                    believe that navigating higher education shouldn't feel like solving a puzzle in the dark. 🧩
                  </p>
                  
                  <p className="group hover:text-foreground transition-colors">
                    Born from late-night conversations ☕ and shared frustrations, <span className="font-semibold text-foreground">UniCompass</span> emerged as our answer 
                    to the overwhelming complexity of choosing the right master's program and university path.
                  </p>
                  
                  <p className="group hover:text-foreground transition-colors">
                    As part of our <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Digital Marketing course</span>, we're building 
                    more than just a startup—we're creating a movement to make education accessible and clear for everyone. 🚀
                  </p>
                </div>
              </div>
              
              <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl transform rotate-3 animate-pulse"></div>
                <div className="relative bg-card/80 backdrop-blur-sm border-2 border-border/50 rounded-3xl p-8 sm:p-10 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                  <div className="grid grid-cols-2 gap-6 sm:gap-8">
                    <div className="text-center group hover:scale-110 transition-transform duration-300">
                      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2 animate-pulse">7</div>
                      <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Team Members</div>
                    </div>
                    <div className="text-center group hover:scale-110 transition-transform duration-300">
                      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-2 animate-pulse" style={{ animationDelay: '0.5s' }}>1</div>
                      <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Shared Vision</div>
                    </div>
                    <div className="text-center group hover:scale-110 transition-transform duration-300">
                      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">∞</div>
                      <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Possibilities</div>
                    </div>
                    <div className="text-center group hover:scale-110 transition-transform duration-300">
                      <div className="text-4xl sm:text-5xl mb-2 animate-float">❤️</div>
                      <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">For Students</div>
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
                  
                  <h2 className="font-playfair text-4xl font-bold text-foreground mb-6">
                    Simplifying the path to
                    <span className="text-primary"> academic success</span>
                  </h2>
                  
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    UniCompass exists to transform the overwhelming maze of higher education into 
                    a clear, navigable journey filled with opportunities and connections.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                  <div className="group text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-primary/70 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                      <Lightbulb className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">Clear Guidance 🎯</h3>
                    <p className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors">Navigate university choices with confidence through comprehensive insights and expert recommendations</p>
                  </div>
                  
                  <div className="group text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent to-accent/70 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                      <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">Connect & Collaborate 🤝</h3>
                    <p className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors">Find your ideal study partners and future business collaborators in our vibrant community</p>
                  </div>
                  
                  <div className="group text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-secondary to-secondary/70 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                      <Rocket className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors">Launch Your Future 🚀</h3>
                    <p className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors">Build a strong foundation for your academic and professional journey with our comprehensive platform</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16 sm:mt-20 animate-fade-in">
              <div className="inline-block relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <Link to="/" className="relative inline-flex items-center gap-3 bg-gradient-to-r from-primary via-accent to-secondary text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:scale-110 transition-all duration-300 cursor-pointer shadow-2xl">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                  Start Your Journey
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;