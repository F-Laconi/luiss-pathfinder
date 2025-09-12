import { Star, Clock, Users, BookOpen } from "lucide-react";
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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Featured Courses
          </h2>
          <p className="text-subtitle">
            Discover the most popular and highly-rated courses chosen by students. 
            These courses offer exceptional learning experiences with top-rated professors.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <div
              key={course.id}
              className="card-course animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Course Image */}
              <div className="relative mb-4">
                <img
                  src={course.image}
                  alt={course.professor}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  {course.category}
                </Badge>
                <Badge 
                  className="absolute top-3 right-3"
                  variant={course.difficulty === "Advanced" ? "destructive" : course.difficulty === "Intermediate" ? "secondary" : "default"}
                >
                  {course.difficulty}
                </Badge>
              </div>

              {/* Course Content */}
              <div className="space-y-4">
                {/* Title and Professor */}
                <div>
                  <h3 className="text-card-title text-lg mb-2">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {course.professor}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.floor(course.rating)
                            ? "text-accent fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({course.reviewCount} reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button className="w-full group">
                  View Course Details
                  <BookOpen className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;