import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, StarHalf } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Mock professor data - in a real app this would come from an API
const professorData = {
  name: "Prof. Alessandro Rossi",
  image: "/placeholder.svg", // Placeholder for professor image
  rating: 8.5,
  description: "Professor Rossi is a distinguished expert in strategic management with over 15 years of experience in both academia and consulting. He holds a PhD from Bocconi University and has published extensively in top-tier journals.",
  levelOfEnglish: "Native",
  classPercentage: "85%",
  examType: "Written exam + Case study presentation",
  attendanceMandatory: true
};

// Mock course data - in a real app this would be fetched based on courseId
const courseData = {
  title: "Strategic Management",
  category: "Management",
  duration: "12 weeks",
  credits: "6 ECTS",
  language: "English",
  description: "This course provides a comprehensive understanding of strategic management principles and their application in modern business environments. Students will learn to analyze competitive landscapes, develop strategic plans, and implement organizational changes.",
  learningObjectives: [
    "Understand the fundamentals of strategic planning",
    "Analyze competitive environments and market dynamics",
    "Develop strategic recommendations for real business cases",
    "Master frameworks for strategic decision-making"
  ],
  prerequisites: "Basic knowledge of business administration and economics"
};

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 10 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star key={i + fullStars} className="w-5 h-5 text-gray-300" />
      ))}
      <span className="ml-2 text-sm font-medium">{rating}/10</span>
    </div>
  );
};

const CourseDetail = () => {
  const { courseId } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        {/* Back button */}
        <Link to="/school/graduate" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Graduate Programs
        </Link>

        {/* Course header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-foreground">{courseData.title}</h1>
            <Badge variant="secondary">{courseData.category}</Badge>
          </div>
          <div className="flex items-center gap-6 text-muted-foreground">
            <span>{courseData.duration}</span>
            <span>{courseData.credits}</span>
            <span>{courseData.language}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course description */}
            <Card>
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{courseData.description}</p>
                
                <h4 className="font-semibold mb-3">Learning Objectives</h4>
                <ul className="space-y-2">
                  {courseData.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-2">Prerequisites</h4>
                  <p className="text-muted-foreground">{courseData.prerequisites}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Professor card */}
            <Card>
              <CardHeader>
                <CardTitle>Professor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Professor image placeholder */}
                <div className="w-24 h-24 bg-muted rounded-full mx-auto flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Photo</span>
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{professorData.name}</h3>
                  <StarRating rating={professorData.rating} />
                </div>

                <p className="text-sm text-muted-foreground">{professorData.description}</p>
              </CardContent>
            </Card>

            {/* Key aspects */}
            <Card>
              <CardHeader>
                <CardTitle>Key Course Aspects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Level of English</span>
                  <span className="text-muted-foreground">{professorData.levelOfEnglish}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Class taught by professor</span>
                  <span className="text-muted-foreground">{professorData.classPercentage}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Type of exam</span>
                  <span className="text-muted-foreground text-sm">{professorData.examType}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Attendance mandatory</span>
                  <Badge variant={professorData.attendanceMandatory ? "destructive" : "secondary"}>
                    {professorData.attendanceMandatory ? "Yes" : "No"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                Enroll in Course
              </Button>
              <Button variant="outline" className="w-full">
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;