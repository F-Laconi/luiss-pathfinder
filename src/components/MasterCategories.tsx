import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import economicsIcon from "@/assets/economics-icon.jpg";
import lawIcon from "@/assets/law-icon.jpg";
import marketingIcon from "@/assets/marketing-icon.jpg";
import politicsIcon from "@/assets/politics-icon.jpg";

const schools = [
  {
    id: "undergraduate",
    title: "Undergraduate School",
    description: "Bachelor's degree programs across various disciplines",
    icon: economicsIcon,
    courseCount: 8,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "graduate",
    title: "Graduate School",
    description: "Master's degree programs for advanced studies",
    icon: lawIcon,
    courseCount: 11,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "postgraduate",
    title: "Postgraduate School",
    description: "Specialized courses and professional development programs",
    icon: marketingIcon,
    courseCount: 95,
    color: "from-orange-500 to-orange-600"
  }
];

const MasterCategories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            LUISS Academic Schools
          </h2>
          <p className="text-subtitle">
            Choose your path at LUISS University. Explore our three academic schools 
            offering comprehensive programs from undergraduate to postgraduate level.
          </p>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {schools.map((school, index) => (
            <Link
              key={school.id}
              to={`/school/${school.id}`}
              className="card-category animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={school.icon}
                    alt={school.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute inset-0 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${school.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              </div>

              {/* Content */}
              <div className="text-center space-y-3">
                <h3 className="text-card-title text-lg group-hover:text-primary">
                  {school.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {school.description}
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-primary font-medium pt-2">
                  <span>{school.courseCount} {school.id === 'postgraduate' ? 'courses' : 'programs'}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasterCategories;