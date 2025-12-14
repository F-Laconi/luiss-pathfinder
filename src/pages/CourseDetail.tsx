import { useParams, Link, useNavigate } from "react-router-dom";
import professorImage from "@/assets/professor-maximo-ibarra.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, StarHalf, Shield, ShieldCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OracleVerificationPanel from "@/components/blockchain/OracleVerificationPanel";
import ReviewVerificationBadge from "@/components/blockchain/ReviewVerificationBadge";

// Professor pool - different professors for different courses
const professorPool = [
  {
    name: "Prof. Maximo Ibarra",
    rating: 8.5,
    description: "Prof. Maximo Ibarra is a global tech and telecom leader with years of experience guiding major companies through digital transformation. Born in Colombia and educated in Italy and abroad, he has worked as CEO in top international firms and built a strong reputation in marketing, innovation, and business strategy. Here in LUISS he brings real-world insights straight into the classroom.",
    levelOfEnglish: "Native",
    classPercentage: "85%",
    examType: "Written final exam 50%, Oral presentation 50%",
    attendanceMandatory: true,
    useImage: true
  },
  {
    name: "Prof. Elena Ferrante",
    rating: 9.2,
    description: "Prof. Ferrante is an expert in European governance with over 15 years of experience in policy analysis. She previously worked at the European Commission and brings deep institutional knowledge to her teaching. Known for her engaging lectures and real-world case studies.",
    levelOfEnglish: "Fluent",
    classPercentage: "90%",
    examType: "Written exam 60%, Group project 40%",
    attendanceMandatory: true,
    useImage: false
  },
  {
    name: "Prof. Alessandro Moretti",
    rating: 7.8,
    description: "Prof. Moretti specializes in quantitative economics and financial modeling. With a PhD from MIT and experience at major investment banks, he bridges academic theory with practical financial applications. His courses are rigorous but highly rewarding.",
    levelOfEnglish: "Fluent",
    classPercentage: "75%",
    examType: "Written final exam 70%, Problem sets 30%",
    attendanceMandatory: false,
    useImage: false
  },
  {
    name: "Prof. Chiara Romano",
    rating: 8.9,
    description: "Prof. Romano is a renowned expert in corporate strategy and organizational behavior. She has consulted for Fortune 500 companies and authored several influential papers on strategic management. Her interactive teaching style makes complex concepts accessible.",
    levelOfEnglish: "Native",
    classPercentage: "80%",
    examType: "Case study analysis 50%, Final presentation 50%",
    attendanceMandatory: true,
    useImage: false
  },
  {
    name: "Prof. Marco Bellini",
    rating: 8.1,
    description: "Prof. Bellini brings two decades of experience in public administration and regulatory affairs. He has served as an advisor to multiple Italian ministries and is passionate about preparing students for careers in public service and governance.",
    levelOfEnglish: "Fluent",
    classPercentage: "70%",
    examType: "Written exam 40%, Policy brief 30%, Oral 30%",
    attendanceMandatory: false,
    useImage: false
  },
  {
    name: "Prof. Giulia Santini",
    rating: 9.0,
    description: "Prof. Santini is a leading researcher in environmental policy and sustainable development. Her work on EU climate regulations has been cited by policymakers across Europe. She combines academic excellence with a commitment to real-world impact.",
    levelOfEnglish: "Fluent",
    classPercentage: "85%",
    examType: "Research paper 60%, Presentation 40%",
    attendanceMandatory: true,
    useImage: false
  },
  {
    name: "Prof. Roberto Conti",
    rating: 7.5,
    description: "Prof. Conti is a veteran economist with extensive experience in monetary policy and central banking. Previously with the Bank of Italy, he offers unique insights into the workings of financial institutions and macroeconomic policy.",
    levelOfEnglish: "Good",
    classPercentage: "65%",
    examType: "Written final exam 100%",
    attendanceMandatory: false,
    useImage: false
  },
  {
    name: "Prof. Valentina De Luca",
    rating: 8.7,
    description: "Prof. De Luca is an expert in international law and human rights. She has worked with the United Nations and various NGOs, bringing a global perspective to her teaching. Her courses are known for stimulating debates and critical thinking.",
    levelOfEnglish: "Native",
    classPercentage: "95%",
    examType: "Essay 40%, Oral exam 40%, Participation 20%",
    attendanceMandatory: true,
    useImage: false
  }
];

// Function to get professor based on course ID (deterministic but varied)
const getProfessorForCourse = (courseId: string) => {
  // AI & Digital Marketing course gets Maximo Ibarra
  if (courseId === "9-1-0") {
    return professorPool[0];
  }
  // Use course ID to deterministically select a professor (not random each render)
  const hash = courseId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = (hash % (professorPool.length - 1)) + 1; // Skip index 0 (Maximo Ibarra)
  return professorPool[index];
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

// Mock student notes data with verification status
const studentNotes = [{
  id: 1,
  studentName: "Francesco L.",
  year: "2024",
  grade: "28/30",
  price: "€15",
  rating: 4.5,
  description: "Complete notes covering all lectures with detailed case studies and frameworks. Includes my personal insights and exam preparation tips that helped me get a grade between 28 and 30.",
  pageCount: 45,
  isVerified: true,
  txHash: "0x7a3f8e2b1c9d4a5e6f8b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
  verifiedAt: new Date("2024-11-15")
}, {
  id: 2,
  studentName: "Alice L.",
  year: "2023",
  grade: "30/30",
  price: "€12",
  rating: 4.8,
  description: "Well-organized summary notes with mind maps and visual frameworks. Perfect for quick revision before exams. Covers Porter's Five Forces in detail.",
  pageCount: 32,
  isVerified: true,
  txHash: "0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
  verifiedAt: new Date("2023-12-01")
}, {
  id: 3,
  studentName: "Martina D.",
  year: "2024",
  grade: "26/30",
  price: "€18",
  rating: 4.3,
  description: "Comprehensive notes including all guest lecture content and real company examples discussed in class. Great for understanding practical applications.",
  pageCount: 58,
  isVerified: false
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
  const navigate = useNavigate();
  const course = graduateCoursesData[courseId || ""] || {
    name: "Course Not Found",
    credits: 0,
    description: "This course could not be found.",
    programId: "1"
  };
  
  const professorData = getProfessorForCourse(courseId || "");
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
                <CardTitle>{professorData.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Professor image */}
                {professorData.useImage ? (
                  <img 
                    src={professorImage} 
                    alt={professorData.name} 
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">
                      {professorData.name.split(' ').slice(1).map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                
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

            {/* Oracle Verification Panel */}
            <OracleVerificationPanel 
              courseId={courseId || ""} 
              courseName={course.name} 
            />

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
                
                <h4 className="font-semibold mb-4 text-lg">What You'll Actually Learn</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <span className="font-medium text-foreground">Build an AI-powered marketing plan</span>
                      <p className="text-sm text-muted-foreground mt-1">Learn how to design killer digital strategies using today's most important AI tools.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary">
                    <span className="text-2xl">📈</span>
                    <div>
                      <span className="font-medium text-foreground">Understand tech's impact on marketing</span>
                      <p className="text-sm text-muted-foreground mt-1">Discover how AI is shaping the evolution of marketing — from current practices to future trends.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary">
                    <span className="text-2xl">👥</span>
                    <div>
                      <span className="font-medium text-foreground">Work on real cases as a team</span>
                      <p className="text-sm text-muted-foreground mt-1">Strengthen teamwork and problem-solving skills by applying AI tools to real-world marketing challenges.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-2">Prerequisites</h4>
                  <p className="text-muted-foreground">Bachelor's degree or equivalent qualification. Basic knowledge of the subject area recommended.</p>
                </div>
              </CardContent>
            </Card>

            {/* Student Notes Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle>Student Notes Available</CardTitle>
                    <p className="text-sm text-muted-foreground italic">made by students, for students</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-600">
                      {studentNotes.filter(n => n.isVerified).length}/{studentNotes.length} Blockchain Verified
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentNotes.map(note => (
                    <div 
                      key={note.id} 
                      className={`border rounded-lg p-4 transition-all ${
                        note.isVerified 
                          ? 'hover:bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold">{note.studentName} - {note.year}</h4>
                            <ReviewVerificationBadge 
                              isVerified={note.isVerified} 
                              grade={note.isVerified ? note.grade : undefined}
                              txHash={note.txHash}
                              verifiedAt={note.verifiedAt}
                            />
                          </div>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <div className="flex items-center">
                              {Array.from({ length: Math.floor(note.rating) }, (_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                              {note.rating % 1 >= 0.5 && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                              <span className="ml-1 text-sm text-muted-foreground">({note.rating})</span>
                            </div>
                            <span className="text-sm text-muted-foreground">• {note.pageCount} pages</span>
                            <span className="text-sm text-muted-foreground">• Grade: {note.grade}</span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-bold text-lg text-primary">{note.price}</div>
                          <Button 
                            size="sm" 
                            className="mt-1"
                            onClick={() => navigate('/checkout', { state: { note } })}
                          >
                            Buy Notes Now!
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.description}</p>
                      
                      {note.isVerified && (
                        <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-600">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Oracle verified attendance & grade on {note.verifiedAt?.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  ))}
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