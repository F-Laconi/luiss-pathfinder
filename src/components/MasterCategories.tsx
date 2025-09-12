import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import economicsIcon from "@/assets/economics-icon.jpg";
import lawIcon from "@/assets/law-icon.jpg";
import marketingIcon from "@/assets/marketing-icon.jpg";
import politicsIcon from "@/assets/politics-icon.jpg";

const categories = [
  {
    id: "economics",
    title: "Economics & Finance",
    description: "Master programs in economics, finance, and business administration",
    icon: economicsIcon,
    courseCount: 45,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "law",
    title: "Law & Legal Studies",
    description: "Legal studies, international law, and corporate law programs",
    icon: lawIcon,
    courseCount: 32,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "marketing",
    title: "Marketing & Communication",
    description: "Digital marketing, brand management, and communication strategies",
    icon: marketingIcon,
    courseCount: 28,
    color: "from-orange-500 to-orange-600"
  },
  {
    id: "politics",
    title: "Political Science",
    description: "International relations, public policy, and political analysis",
    icon: politicsIcon,
    courseCount: 24,
    color: "from-green-500 to-green-600"
  }
];

const MasterCategories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Explore Master's Programs
          </h2>
          <p className="text-subtitle">
            Discover our comprehensive range of master's programs designed to shape 
            your future career. Each program offers unique specializations and 
            world-class faculty.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/masters/${category.id}`}
              className="card-category animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={category.icon}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute inset-0 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              </div>

              {/* Content */}
              <div className="text-center space-y-3">
                <h3 className="text-card-title text-lg">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-primary font-medium pt-2">
                  <span>{category.courseCount} courses</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? 
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium group"
          >
            Browse all courses
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MasterCategories;