import { useParams, Link } from "react-router-dom";
import professorImage from "@/assets/professor-maximo-ibarra.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, StarHalf } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Mock professor data - in a real app this would come from an API
const professorData = {
  name: "Prof. Maximo Ibarra",
  image: "/placeholder.svg",
  // Placeholder for professor image
  rating: 8.5,
  description: "Prof. Maximo Ibarra is a global tech and telecom leader with years of experience guiding major companies through digital transformation. Born in Colombia and educated in Italy and abroad, he has worked as CEO in top international firms and built a strong reputation in marketing, innovation, and business strategy. Here in LUISS he brings real-world insights straight into the classroom. If you want a teacher who combines industry expertise with a passion for the future of tech, he's exactly that.",
  levelOfEnglish: "Native",
  classPercentage: "85%",
  examType: "Written final exam 50%, Oral presentation 50%",
  attendanceMandatory: true
};

// Graduate programs data to extract courses from
const graduateCoursesData: Record<string, any> = {
  "1-0-0": {
    name: "European Integration and Institutions",
    credits: 9,
    description: "Comprehensive study of EU institutional framework, decision-making processes, and the evolution of European integration",
    programId: "1"
  },
  "1-0-1": {
    name: "Comparative Political Systems",
    credits: 9,
    description: "In-depth analysis of political systems across Europe, constitutional frameworks, and governance structures",
    programId: "1"
  },
  "1-0-2": {
    name: "Policy Analysis and Evaluation",
    credits: 6,
    description: "Advanced methods for policy assessment, impact evaluation, and evidence-based policymaking",
    programId: "1"
  },
  "1-0-3": {
    name: "Research Methods in Political Science",
    credits: 6,
    description: "Quantitative and qualitative research methodologies for political science research",
    programId: "1"
  },
  "1-0-4": {
    name: "European Law and Governance",
    credits: 9,
    description: "Legal frameworks governing the European Union, constitutional law, and regulatory systems",
    programId: "1"
  },
  "1-0-5": {
    name: "Public Administration",
    credits: 9,
    description: "Theory and practice of public sector management, administrative reforms, and bureaucracy",
    programId: "1"
  },
  "1-1-0": {
    name: "Digital Governance",
    credits: 9,
    description: "Technology's role in modern governance, e-government, digital transformation of public services",
    programId: "1"
  },
  "1-1-1": {
    name: "Environmental Policy",
    credits: 9,
    description: "EU environmental policies, climate change governance, and sustainability goals",
    programId: "1"
  },
  "1-1-2": {
    name: "Migration Policies",
    credits: 6,
    description: "European migration frameworks, asylum systems, and integration policies",
    programId: "1"
  },
  "2-0-0": {
    name: "Macroeconomics",
    credits: 9,
    description: "Advanced macroeconomic theory, economic growth, business cycles, and fiscal policy",
    programId: "2"
  },
  "2-0-1": {
    name: "Microeconomics",
    credits: 9,
    description: "Consumer theory, producer theory, market structures, and welfare economics",
    programId: "2"
  },
  "2-0-2": {
    name: "Mathematics for Economics",
    credits: 6,
    description: "Mathematical tools for economic analysis including calculus, optimization, and linear algebra",
    programId: "2"
  },
  "2-0-3": {
    name: "Financial Markets and Institutions",
    credits: 9,
    description: "Structure and functioning of financial systems, banking, and capital markets",
    programId: "2"
  },
  "2-0-4": {
    name: "Monetary Economics",
    credits: 9,
    description: "Central banking, monetary policy, inflation, and interest rates",
    programId: "2"
  },
  "2-1-0": {
    name: "Financial Regulation",
    credits: 9,
    description: "Regulatory frameworks for financial markets, Basel accords, and compliance",
    programId: "2"
  },
  "2-1-1": {
    name: "European Economic Policy",
    credits: 9,
    description: "EU economic governance, single market, and economic integration",
    programId: "2"
  },
  "2-1-2": {
    name: "Applied Economic Analysis",
    credits: 6,
    description: "Practical application of economic theory to real-world problems and policy challenges",
    programId: "2"
  },
  "3-0-0": {
    name: "Corporate Strategy",
    credits: 5,
    description: "Strategic planning, competitive analysis, and business strategy formulation for corporations",
    programId: "3"
  },
  "3-0-1": {
    name: "Compliance and Risk Management",
    credits: 5,
    description: "Regulatory compliance frameworks, enterprise risk management, and internal controls",
    programId: "3"
  },
  "3-0-2": {
    name: "Accounting",
    credits: 5,
    description: "Financial accounting principles, IFRS standards, and financial reporting",
    programId: "3"
  },
  "3-0-3": {
    name: "Financial Management",
    credits: 5,
    description: "Corporate financial decisions, capital budgeting, and working capital management",
    programId: "3"
  },
  "3-0-4": {
    name: "Quantitative Methods for Finance",
    credits: 5,
    description: "Mathematical and statistical tools for financial analysis and modeling",
    programId: "3"
  },
  "3-1-0": {
    name: "Corporate Finance",
    credits: 6,
    description: "Advanced corporate finance including M&A, capital structure, and valuation",
    programId: "3"
  },
  "3-1-1": {
    name: "Statistics",
    credits: 4,
    description: "Statistical analysis for finance, hypothesis testing, and regression analysis",
    programId: "3"
  },
  "3-1-2": {
    name: "Advanced Accounting for Finance",
    credits: 5,
    description: "Complex accounting topics including consolidation and financial instruments",
    programId: "3"
  },
  "3-1-3": {
    name: "Financial Ratio Analysis",
    credits: 4,
    description: "Analysis of financial statements using ratio analysis and profitability metrics",
    programId: "3"
  },
  "9-1-0": {
    name: "AI & Digital Marketing Course",
    credits: 6,
    description: "If you're curious about how artificial intelligence is transforming the way companies communicate, sell, and grow… then this course is definitely for you. You'll discover how smart tools like chatbots, predictive analytics, and AI-powered content generators can make marketing not only more effective, but also way more fun. You'll explore how brands use data to understand customers, how algorithms decide what you see online, and how you can use AI to design campaigns that actually work. This course is perfect if you love things like AI trends, digital strategy, social media, creativity, or just figuring out how tech shapes the world. And don't worry, you don't need to be a coding expert!",
    programId: "9"
  }
};

// Mock student notes data
const studentNotes = [{
  id: 1,
  studentName: "Francesco L.",
  year: "2024",
  grade: "28/30",
  price: "€15",
  rating: 4.5,
  description: "Complete notes covering all lectures with detailed case studies and frameworks. Includes my personal insights and exam preparation tips that helped me get an A.",
  pageCount: 45
}, {
  id: 2,
  studentName: "Alice L.",
  year: "2023",
  grade: "30/30",
  price: "€12",
  rating: 4.8,
  description: "Well-organized summary notes with mind maps and visual frameworks. Perfect for quick revision before exams. Covers Porter's Five Forces in detail.",
  pageCount: 32
}, {
  id: 3,
  studentName: "Martina D.",
  year: "2024",
  grade: "26/30",
  price: "€18",
  rating: 4.3,
  description: "Comprehensive notes including all guest lecture content and real company examples discussed in class. Great for understanding practical applications.",
  pageCount: 58
}];
const StarRating = ({
  rating
}: {
  rating: number;
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 10 - fullStars - (hasHalfStar ? 1 : 0);
  return <div className="flex items-center gap-1">
      {Array.from({
      length: fullStars
    }, (_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {Array.from({
      length: emptyStars
    }, (_, i) => <Star key={i + fullStars} className="w-5 h-5 text-gray-300" />)}
      <span className="ml-2 text-sm font-medium">{rating}/10</span>
    </div>;
};
const CourseDetail = () => {
  const {
    courseId
  } = useParams();
  const course = graduateCoursesData[courseId || ""] || {
    name: "Course Not Found",
    credits: 0,
    description: "This course could not be found.",
    programId: "1"
  };
  return <div className="min-h-screen bg-background">
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
            <h1 className="font-nunito text-4xl font-bold text-foreground">{course.name}</h1>
            <Badge variant="secondary">LUISS Graduate</Badge>
          </div>
          <div className="flex items-center gap-6 text-muted-foreground">
            <span>12 weeks</span>
            <span>{course.credits} ECTS</span>
            <span>English</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Professor card */}
            <Card>
              <CardHeader>
                <CardTitle>Prof. Maximo Ibarra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Professor image */}
                <img 
                  src={professorImage} 
                  alt="Professor Maximo Ibarra" 
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
                
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

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course description */}
            <Card>
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{course.description}</p>
                
                <h4 className="font-semibold mb-3">Learning Objectives</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-muted-foreground">Master theoretical frameworks and concepts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-muted-foreground">Apply knowledge to real-world scenarios and case studies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-muted-foreground">Develop critical thinking and analytical skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-muted-foreground">Prepare for professional practice in the field</span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-2">Prerequisites</h4>
                  <p className="text-muted-foreground">Bachelor's degree or equivalent qualification. Basic knowledge of the subject area recommended.</p>
                </div>
              </CardContent>
            </Card>

            {/* Student Notes Section */}
            <Card>
              <CardHeader>
                <CardTitle>Student Notes Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentNotes.map(note => <div key={note.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{note.studentName} - {note.year} (Grade: {note.grade})</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              {Array.from({
                            length: Math.floor(note.rating)
                          }, (_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                              {note.rating % 1 >= 0.5 && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                              <span className="ml-1 text-sm text-muted-foreground">({note.rating})</span>
                            </div>
                            <span className="text-sm text-muted-foreground">• {note.pageCount} pages</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-primary">{note.price}</div>
                          <Button size="sm" className="mt-1">
                            Buy Notes
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.description}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default CourseDetail;