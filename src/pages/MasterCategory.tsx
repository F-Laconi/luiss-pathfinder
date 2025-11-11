import { useParams } from "react-router-dom";
import { useState } from "react";
import { Filter, Search, Star, Clock, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Mock data for courses
const coursesByCategory = {
  economics: [
    {
      id: 1,
      title: "International Business Strategy",
      professor: "Prof. Marco Rossi",
      rating: 4.8,
      reviewCount: 42,
      students: 85,
      duration: "12 weeks",
      difficulty: "Advanced",
      description: "Learn strategic decision-making in global markets and understand the complexities of international business operations.",
      tags: ["Strategy", "Global Markets", "Leadership"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=face"
    },
    {
      id: 2,
      title: "Financial Markets Analysis",
      professor: "Prof. Elena Conti",
      rating: 4.6,
      reviewCount: 38,
      students: 72,
      duration: "14 weeks",
      difficulty: "Intermediate",
      description: "Deep dive into financial markets, investment strategies, and risk management techniques.",
      tags: ["Finance", "Investment", "Risk Management"],
      image: "https://images.unsplash.com/photo-1494790108755-2616c96c8b9e?w=400&h=250&fit=crop&crop=face"
    },
    {
      id: 3,
      title: "Corporate Finance",
      professor: "Prof. Andrea Lombardi",
      rating: 4.7,
      reviewCount: 31,
      students: 68,
      duration: "10 weeks",
      difficulty: "Advanced",
      description: "Master corporate financial decision-making, capital structure, and valuation methodologies.",
      tags: ["Corporate Finance", "Valuation", "Capital Structure"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=250&fit=crop&crop=face"
    }
  ]
};

const categoryInfo = {
  economics: {
    title: "Economics & Finance",
    description: "Explore cutting-edge economics and finance programs designed to prepare you for leadership roles in the global economy. Our courses combine theoretical foundations with practical applications.",
    totalCourses: 45,
    averageRating: 4.7
  }
};

const MasterCategory = () => {
  const { categoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filterBy, setFilterBy] = useState("all");

  const category = categoryInfo[categoryId as keyof typeof categoryInfo];
  const courses = coursesByCategory[categoryId as keyof typeof coursesByCategory] || [];

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground">The requested category does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-nunito uppercase text-4xl md:text-5xl font-bold text-foreground mb-6">
              {category.title}
            </h1>
            <p className="text-subtitle mb-8">
              {category.description}
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{category.totalCourses}</div>
                <div className="text-muted-foreground">Total Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{category.averageRating}</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">150+</div>
                <div className="text-muted-foreground">Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b border-border overflow-visible">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="students">Most Popular</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
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
                    <h3 className="text-card-title text-lg mb-2 group-hover:text-primary">
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MasterCategory;