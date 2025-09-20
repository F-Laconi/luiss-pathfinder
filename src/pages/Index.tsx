import { Link } from "react-router-dom";
import { Compass, UserCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container max-w-4xl mx-auto px-6 text-center">
        {/* Brand Title */}
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-16 animate-fade-up">
          UniCompass
        </h1>

        {/* Icon Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Make the Right Choice */}
          <Link 
            to="/course-explorer"
            className="group card-modern p-8 md:p-12 hover:scale-105 transition-all duration-300 hover:shadow-[var(--shadow-hero)]"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center group-hover:animate-float">
                <Compass className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Make the Right Choice
              </h2>
            </div>
          </Link>

          {/* Find Who Needs You */}
          <div className="group card-modern p-8 md:p-12 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-[var(--shadow-hero)]">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center group-hover:animate-float">
                <UserCheck className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                Find Who Needs You
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
