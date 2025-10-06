import { Star, Clock, Users, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredCourses = [
  {
    id: 1,
    title: "International Business Strategy",
    professor: "Prof. Marco Rossi",
    rating: 4.8,
    reviewCount: 42,
    students: 85,
    duration: "12 weeks",
    difficulty: "Advanced",
    category: "Economics",
    description: "Learn strategic decision-making in global markets and understand the complexities of international business operations.",
    tags: ["Strategy", "Global Markets", "Leadership"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=face"
  },
  {
    id: 2,
    title: "European Union Law",
    professor: "Prof. Anna Bianchi",
    rating: 4.9,
    reviewCount: 38,
    students: 67,
    duration: "16 weeks",
    difficulty: "Intermediate",
    category: "Law",
    description: "Comprehensive study of EU legal framework, institutions, and their impact on member states' legislation.",
    tags: ["EU Law", "Legislation", "Policy"],
    image: "https://images.unsplash.com/photo-1494790108755-2616c96c8b9e?w=400&h=250&fit=crop&crop=face"
  },
  {
    id: 3,
    title: "Digital Marketing Analytics",
    professor: "Prof. Luca Verdi",
    rating: 4.7,
    reviewCount: 55,
    students: 92,
    duration: "10 weeks",
    difficulty: "Beginner",
    category: "Marketing",
    description: "Master data-driven marketing strategies and learn to interpret analytics for better campaign performance.",
    tags: ["Analytics", "Digital", "Data Science"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=250&fit=crop&crop=face"
  }
];

const FeaturedCourses = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-40 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full">
            <span className="text-accent font-semibold text-sm">Top Rated</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent mb-6">
            Featured Courses
          </h2>
          <p className="text-subtitle text-lg">
            Discover the most popular and highly-rated courses chosen by students. 
            These courses offer exceptional learning experiences with top-rated professors.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredCourses.map((course, index) => (
            <div
              key={course.id}
              className="relative bg-card rounded-2xl border border-border/50 p-6 cursor-pointer overflow-hidden group animate-fade-up hover:border-primary/30 hover:shadow-2xl transition-all duration-500"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Course Image */}
              <div className="relative mb-5 overflow-hidden rounded-xl">
                <img
                  src={course.image}
                  alt={course.professor}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 shadow-lg">
                  {course.category}
                </Badge>
                <Badge 
                  className="absolute top-3 right-3 backdrop-blur-sm border-0 shadow-lg"
                  variant={course.difficulty === "Advanced" ? "destructive" : course.difficulty === "Intermediate" ? "secondary" : "default"}
                >
                  {course.difficulty}
                </Badge>
              </div>

              {/* Course Content */}
              <div className="relative space-y-4">
                {/* Title and Professor */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium">
                    {course.professor}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 bg-muted/30 group-hover:bg-accent/10 px-3 py-2 rounded-lg transition-colors duration-300">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 transition-all duration-300 ${
                          star <= Math.floor(course.rating)
                            ? "text-accent fill-current drop-shadow-sm"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-foreground">{course.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({course.reviewCount})
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between bg-muted/30 group-hover:bg-primary/5 p-3 rounded-lg transition-colors duration-300">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{course.students}</span>
                  </div>
                  <div className="h-4 w-px bg-border"></div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{course.duration}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-background/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button className="w-full bg-primary hover:bg-primary/90 group-hover:shadow-lg transition-all duration-300">
                  View Course Details
                  <BookOpen className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-6 text-base font-semibold group"
          >
            View All Courses
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;