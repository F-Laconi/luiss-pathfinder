import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import economicsIcon from "@/assets/economics-icon.jpg";
import lawIcon from "@/assets/law-icon.jpg";
import marketingIcon from "@/assets/marketing-icon.jpg";
import politicsIcon from "@/assets/politics-icon.jpg";
const schools = [{
  id: "undergraduate",
  title: "Undergraduate School",
  description: "Bachelor's degree programs across various disciplines",
  icon: economicsIcon,
  courseCount: 8,
  color: "from-blue-500 to-blue-600"
}, {
  id: "graduate",
  title: "Graduate School",
  description: "Master's degree programs for advanced studies",
  icon: lawIcon,
  courseCount: 11,
  color: "from-purple-500 to-purple-600"
}, {
  id: "postgraduate",
  title: "Postgraduate School",
  description: "Specialized courses and professional development programs",
  icon: marketingIcon,
  courseCount: 95,
  color: "from-orange-500 to-orange-600"
}];
const MasterCategories = () => {
  return <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden z-0">
      {/* Decorative blur elements */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          
          <h2 className="font-nunito text-3xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-6">
            LUISS Academic Schools
          </h2>
          <p className="text-subtitle text-lg">
            Choose your path at LUISS University. Explore our three academic schools 
            offering comprehensive programs from undergraduate to postgraduate level.
          </p>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {schools.map((school, index) => <Link key={school.id} to={`/school/${school.id}`} className="relative bg-card rounded-3xl border border-border/50 p-8 cursor-pointer overflow-hidden group animate-fade-up hover:border-primary/50 transition-all duration-500" style={{
          animationDelay: `${index * 0.15}s`
        }}>
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${school.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon with animated border */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${school.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                <div className="relative w-20 h-20 mx-auto rounded-2xl overflow-hidden ring-2 ring-border/50 group-hover:ring-primary/50 group-hover:scale-110 transition-all duration-500">
                  <img src={school.icon} alt={school.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>

              {/* Content */}
              <div className="relative text-center space-y-4">
                <h3 className="font-nunito text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {school.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed min-h-[48px]">
                  {school.description}
                </p>
                
                {/* Course count badge */}
                <div className="inline-flex items-center justify-center space-x-2 bg-muted/50 group-hover:bg-primary/10 px-4 py-2 rounded-full transition-colors duration-300">
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {school.courseCount} {school.id === 'postgraduate' ? 'courses' : 'programs'}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>)}
        </div>

        {/* Additional Info */}
        
      </div>
    </section>;
};
export default MasterCategories;