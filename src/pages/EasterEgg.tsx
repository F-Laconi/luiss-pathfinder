import { Link } from "react-router-dom";
import { Sparkles, Zap, Target, TrendingUp, Users, Rocket, Brain, Heart, Award, Globe } from "lucide-react";

const EasterEgg = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg animate-scale-in">
            <Sparkles className="h-4 w-4 animate-pulse" />
            You found us! 🎉
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          
          <h1 className="font-nunito text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-fade-in">
            The Real Deal
          </h1>
          
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in">
            What we're <span className="font-bold text-foreground">really</span> building behind the scenes
          </p>
        </div>

        {/* Value Propositions Grid */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="group relative bg-card/80 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 hover:border-primary/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">Data-Driven Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're building an intelligent matching algorithm that analyzes thousands of student profiles and success patterns to recommend the perfect academic path.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-card/80 backdrop-blur-sm border border-accent/20 rounded-3xl p-8 hover:border-accent/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/60 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">Community First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Creating a vibrant network where students share experiences, connect with mentors, and find study buddies who match their ambitions and values.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="group relative bg-card/80 backdrop-blur-sm border border-accent/20 rounded-3xl p-8 hover:border-accent/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/60 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">Global Perspective</h3>
              <p className="text-muted-foreground leading-relaxed">
                Starting in Italy, expanding globally. We're building bridges between universities worldwide, giving students access to international opportunities.
              </p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="group relative bg-card/80 backdrop-blur-sm border border-secondary/20 rounded-3xl p-8 hover:border-secondary/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/60 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">Launch Pad</h3>
              <p className="text-muted-foreground leading-relaxed">
                Beyond just finding programs—we're building a platform that helps you network, fundraise for your education, and launch your startup ideas.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-3xl p-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-3xl"></div>
            <div className="relative text-center mb-8">
              <div className="inline-flex items-center gap-2 text-primary font-medium mb-4">
                <Heart className="h-5 w-5" />
                Our Promise
              </div>
              <h2 className="font-nunito text-4xl md:text-5xl font-bold text-foreground mb-6">
                Built by students,
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> for students</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We're not just another EdTech company. We're students who understand the struggle, the confusion, and the excitement of choosing your path. Every feature we build comes from real experiences and real conversations with peers like you.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center p-6 bg-card/50 rounded-2xl backdrop-blur-sm border border-border/20">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Student-Focused</div>
              </div>
              <div className="text-center p-6 bg-card/50 rounded-2xl backdrop-blur-sm border border-border/20">
                <div className="text-4xl mb-2">🚀</div>
                <div className="text-2xl font-bold text-accent mb-1">∞</div>
                <div className="text-sm text-muted-foreground">Possibilities</div>
              </div>
              <div className="text-center p-6 bg-card/50 rounded-2xl backdrop-blur-sm border border-border/20">
                <div className="text-4xl mb-2">💡</div>
                <div className="text-2xl font-bold text-secondary mb-1">7</div>
                <div className="text-sm text-muted-foreground">Passionate Founders</div>
              </div>
              <div className="text-center p-6 bg-card/50 rounded-2xl backdrop-blur-sm border border-border/20">
                <div className="text-4xl mb-2">❤️</div>
                <div className="text-2xl font-bold text-primary mb-1">1</div>
                <div className="text-sm text-muted-foreground">Shared Mission</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="mb-8">
            <Award className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-muted-foreground mb-6">
              Thanks for being curious enough to click! 🎊
            </p>
          </div>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-accent to-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-primary/50"
          >
            <Zap className="h-5 w-5" />
            Back to Home
            <Sparkles className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EasterEgg;
