import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-6">About UniCompass</h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We are a group of 7 passionate students from LUISS University who believe that 
                navigating higher education shouldn't be a struggle. Born from our own experiences 
                and challenges, UniCompass was created to make the life of students easier by 
                providing clear guidance through the complex world of university programs and career paths.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                As part of our Digital Marketing course, we're building this startup to bridge 
                the gap between ambitious students and their academic goals. We understand the 
                overwhelming feeling of choosing the right master's program, finding the perfect 
                university, and connecting with like-minded peers.
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                UniCompass exists to simplify the journey of higher education. We provide students 
                with comprehensive information about master's programs, facilitate connections 
                between future business partners, and create opportunities for academic and 
                professional growth.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Clear Guidance</h3>
                  <p className="text-sm text-muted-foreground">Navigate university choices with confidence</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Connect</h3>
                  <p className="text-sm text-muted-foreground">Find your ideal study and business partners</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Grow</h3>
                  <p className="text-sm text-muted-foreground">Build your academic and professional future</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;