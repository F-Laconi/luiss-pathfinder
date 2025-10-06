import { Star, Clock, Users, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
const featuredCourses = [{
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
}, {
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
}, {
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
}];
const FeaturedCourses = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-purple-500/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Featured Courses
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular courses taught by distinguished professors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <div
              key={course.id}
              className="group bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur">
                  {course.category}
                </Badge>
              </div>

              {/* Course Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{course.rating}</span>
                    <span>({course.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {course.difficulty}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full group/btn">
                  View Course
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;