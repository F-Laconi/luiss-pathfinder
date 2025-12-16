import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import professorImage from "@/assets/professor-maximo-ibarra.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, StarHalf, Shield, ShieldCheck, Brain, Sparkles, Database, Lock, Zap, Crown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OracleVerificationPanel from "@/components/blockchain/OracleVerificationPanel";
import ReviewVerificationBadge from "@/components/blockchain/ReviewVerificationBadge";
import { AIExamSimulator } from "@/components/AIExamSimulator";
// Professor pool - different professors for different courses
const professorPool = [{
  name: "Prof. Maximo Ibarra",
  rating: 8.5,
  description: "Prof. Maximo Ibarra is a global tech and telecom leader with years of experience guiding major companies through digital transformation. Born in Colombia and educated in Italy and abroad, he has worked as CEO in top international firms and built a strong reputation in marketing, innovation, and business strategy. Here in LUISS he brings real-world insights straight into the classroom.",
  levelOfEnglish: "Native",
  classPercentage: "85%",
  examType: "Written final exam 50%, Oral presentation 50%",
  attendanceMandatory: true,
  useImage: true
}, {
  name: "Prof. Elena Ferrante",
  rating: 9.2,
  description: "Prof. Ferrante is an expert in European governance with over 15 years of experience in policy analysis. She previously worked at the European Commission and brings deep institutional knowledge to her teaching. Known for her engaging lectures and real-world case studies.",
  levelOfEnglish: "Fluent",
  classPercentage: "90%",
  examType: "Written exam 60%, Group project 40%",
  attendanceMandatory: true,
  useImage: false
}, {
  name: "Prof. Alessandro Moretti",
  rating: 7.8,
  description: "Prof. Moretti specializes in quantitative economics and financial modeling. With a PhD from MIT and experience at major investment banks, he bridges academic theory with practical financial applications. His courses are rigorous but highly rewarding.",
  levelOfEnglish: "Fluent",
  classPercentage: "75%",
  examType: "Written final exam 70%, Problem sets 30%",
  attendanceMandatory: false,
  useImage: false
}, {
  name: "Prof. Chiara Romano",
  rating: 8.9,
  description: "Prof. Romano is a renowned expert in corporate strategy and organizational behavior. She has consulted for Fortune 500 companies and authored several influential papers on strategic management. Her interactive teaching style makes complex concepts accessible.",
  levelOfEnglish: "Native",
  classPercentage: "80%",
  examType: "Case study analysis 50%, Final presentation 50%",
  attendanceMandatory: true,
  useImage: false
}, {
  name: "Prof. Marco Bellini",
  rating: 8.1,
  description: "Prof. Bellini brings two decades of experience in public administration and regulatory affairs. He has served as an advisor to multiple Italian ministries and is passionate about preparing students for careers in public service and governance.",
  levelOfEnglish: "Fluent",
  classPercentage: "70%",
  examType: "Written exam 40%, Policy brief 30%, Oral 30%",
  attendanceMandatory: false,
  useImage: false
}, {
  name: "Prof. Giulia Santini",
  rating: 9.0,
  description: "Prof. Santini is a leading researcher in environmental policy and sustainable development. Her work on EU climate regulations has been cited by policymakers across Europe. She combines academic excellence with a commitment to real-world impact.",
  levelOfEnglish: "Fluent",
  classPercentage: "85%",
  examType: "Research paper 60%, Presentation 40%",
  attendanceMandatory: true,
  useImage: false
}, {
  name: "Prof. Roberto Conti",
  rating: 7.5,
  description: "Prof. Conti is a veteran economist with extensive experience in monetary policy and central banking. Previously with the Bank of Italy, he offers unique insights into the workings of financial institutions and macroeconomic policy.",
  levelOfEnglish: "Good",
  classPercentage: "65%",
  examType: "Written final exam 100%",
  attendanceMandatory: false,
  useImage: false
}, {
  name: "Prof. Valentina De Luca",
  rating: 8.7,
  description: "Prof. De Luca is an expert in international law and human rights. She has worked with the United Nations and various NGOs, bringing a global perspective to her teaching. Her courses are known for stimulating debates and critical thinking.",
  levelOfEnglish: "Native",
  classPercentage: "95%",
  examType: "Essay 40%, Oral exam 40%, Participation 20%",
  attendanceMandatory: true,
  useImage: false
}];

// Function to get professor based on course ID (deterministic but varied)
const getProfessorForCourse = (courseId: string) => {
  // AI & Digital Marketing course gets Maximo Ibarra
  if (courseId === "9-1-0") {
    return professorPool[0];
  }
  // Use course ID to deterministically select a professor (not random each render)
  const hash = courseId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % (professorPool.length - 1) + 1; // Skip index 0 (Maximo Ibarra)
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

// Student note authors pool
const studentAuthors = [{
  name: "Francesco L.",
  initial: "FL"
}, {
  name: "Alice M.",
  initial: "AM"
}, {
  name: "Marco R.",
  initial: "MR"
}, {
  name: "Sofia B.",
  initial: "SB"
}, {
  name: "Luca T.",
  initial: "LT"
}, {
  name: "Giulia P.",
  initial: "GP"
}, {
  name: "Andrea C.",
  initial: "AC"
}, {
  name: "Elena V.",
  initial: "EV"
}, {
  name: "Matteo S.",
  initial: "MS"
}, {
  name: "Chiara D.",
  initial: "CD"
}];

// Generate student notes based on course ID (deterministic)
const getStudentNotesForCourse = (courseId: string, courseName: string) => {
  const hash = courseId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const noteCount = 2 + hash % 3; // 2-4 notes per course

  const notes = [];
  for (let i = 0; i < noteCount; i++) {
    const authorIndex = (hash + i * 7) % studentAuthors.length;
    const year = 2023 + (hash + i) % 2;
    const grade = 24 + (hash + i * 3) % 7;
    const pages = 25 + (hash + i * 5) % 40;
    const price = 10 + (hash + i * 2) % 12;
    const rating = 4.0 + (hash + i) % 10 / 10;
    const isVerified = (hash + i) % 3 !== 0;
    notes.push({
      id: i + 1,
      studentName: studentAuthors[authorIndex].name,
      year: year.toString(),
      grade: `${grade}/30`,
      price: `€${price}`,
      rating: Math.round(rating * 10) / 10,
      description: getNoteDescription(courseName, i),
      pageCount: pages,
      isVerified,
      txHash: isVerified ? `0x${hash.toString(16)}${i}a3f8e2b1c9d4a5e6f8b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2` : undefined,
      verifiedAt: isVerified ? new Date(year, 10 + i % 2, 10 + hash % 20) : undefined
    });
  }
  return notes;
};
const getNoteDescription = (courseName: string, index: number) => {
  const descriptions = [`Complete lecture notes covering all ${courseName.toLowerCase()} topics with detailed explanations and practical examples. Includes exam preparation tips and key concepts highlighted.`, `Well-organized summary with visual diagrams and frameworks. Perfect for quick revision before the exam. All major theories and models explained clearly.`, `Comprehensive notes including guest lecture content and real-world case studies discussed in class. Great for understanding practical applications of ${courseName.toLowerCase()}.`, `Detailed notes with personal annotations and professor's key points highlighted. Includes practice questions and sample exam answers that helped me succeed.`];
  return descriptions[index % descriptions.length];
};

// Course-specific learning outcomes
const getLearningOutcomes = (courseId: string, courseName: string) => {
  const outcomes: Record<string, {
    emoji: string;
    title: string;
    description: string;
  }[]> = {
    "1-0-0": [{
      emoji: "🏛️",
      title: "Master EU institutional frameworks",
      description: "Understand how EU institutions work together in decision-making and policy implementation."
    }, {
      emoji: "📜",
      title: "Analyze integration processes",
      description: "Trace the historical evolution of European integration and its impact on member states."
    }, {
      emoji: "🌍",
      title: "Evaluate governance structures",
      description: "Compare different governance models across European institutions."
    }],
    "1-0-1": [{
      emoji: "⚖️",
      title: "Compare political systems",
      description: "Analyze different constitutional frameworks and governance structures across Europe."
    }, {
      emoji: "🗳️",
      title: "Understand electoral dynamics",
      description: "Study voting systems, party politics, and democratic representation."
    }, {
      emoji: "📊",
      title: "Apply comparative methods",
      description: "Use rigorous analytical tools to compare political institutions and outcomes."
    }],
    "2-0-0": [{
      emoji: "📈",
      title: "Master macroeconomic models",
      description: "Build and analyze models of economic growth, business cycles, and aggregate demand."
    }, {
      emoji: "💹",
      title: "Understand fiscal policy",
      description: "Evaluate government spending, taxation, and their effects on the economy."
    }, {
      emoji: "🌐",
      title: "Analyze global economics",
      description: "Study international trade, exchange rates, and cross-border economic flows."
    }],
    "2-0-1": [{
      emoji: "🎯",
      title: "Master consumer theory",
      description: "Analyze consumer behavior, preferences, and optimal decision-making."
    }, {
      emoji: "🏭",
      title: "Understand producer decisions",
      description: "Study firm behavior, production functions, and cost optimization."
    }, {
      emoji: "⚖️",
      title: "Evaluate market structures",
      description: "Compare perfect competition, monopoly, oligopoly, and monopolistic competition."
    }],
    "3-0-0": [{
      emoji: "🎯",
      title: "Develop strategic thinking",
      description: "Learn frameworks for competitive analysis and strategic positioning."
    }, {
      emoji: "📊",
      title: "Analyze market dynamics",
      description: "Understand industry forces and how to create sustainable competitive advantages."
    }, {
      emoji: "🚀",
      title: "Plan corporate growth",
      description: "Master techniques for organic growth, M&A, and strategic partnerships."
    }],
    "3-0-3": [{
      emoji: "💰",
      title: "Master capital budgeting",
      description: "Evaluate investment decisions using NPV, IRR, and payback analysis."
    }, {
      emoji: "📈",
      title: "Optimize capital structure",
      description: "Balance debt and equity to minimize cost of capital and maximize firm value."
    }, {
      emoji: "💵",
      title: "Manage working capital",
      description: "Optimize cash, inventory, and receivables for operational efficiency."
    }],
    "9-1-0": [{
      emoji: "🤖",
      title: "Build an AI-powered marketing plan",
      description: "Learn how to design killer digital strategies using today's most important AI tools."
    }, {
      emoji: "📈",
      title: "Understand tech's impact on marketing",
      description: "Discover how AI is shaping the evolution of marketing — from current practices to future trends."
    }, {
      emoji: "👥",
      title: "Work on real cases as a team",
      description: "Strengthen teamwork and problem-solving skills by applying AI tools to real-world marketing challenges."
    }]
  };

  // Default outcomes for courses not explicitly defined
  const defaultOutcomes = [{
    emoji: "📚",
    title: `Master core ${courseName} concepts`,
    description: `Build a solid foundation in the fundamental principles and theories of ${courseName.toLowerCase()}.`
  }, {
    emoji: "🔍",
    title: "Apply analytical frameworks",
    description: "Learn to use professional tools and methodologies used by practitioners in the field."
  }, {
    emoji: "💼",
    title: "Develop practical skills",
    description: "Work on real-world case studies and projects to prepare for your future career."
  }];
  return outcomes[courseId] || defaultOutcomes;
};
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
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const course = graduateCoursesData[courseId || ""] || {
    name: "Course Not Found",
    credits: 6,
    description: "This course could not be found.",
    programId: "1"
  };
  const professorData = getProfessorForCourse(courseId || "");
  const studentNotes = getStudentNotesForCourse(courseId || "", course.name);
  const learningOutcomes = getLearningOutcomes(courseId || "", course.name);
  return <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      
      <main className="container px-3 sm:px-6 py-8 max-w-7xl mx-auto lg:mx-0 lg:ml-4 xl:ml-8">
        {/* Back button */}
        <Link to="/school/graduate" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 mx-auto lg:mx-0 w-full justify-center lg:justify-start">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Graduate Programs
        </Link>

        {/* Course header */}
        <div className="mb-8 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-4 justify-center lg:justify-start">
            <h1 className="font-nunito text-3xl sm:text-4xl font-bold text-foreground">{course.name}</h1>
            <Badge variant="secondary">LUISS Graduate</Badge>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-muted-foreground flex-wrap">
            <span>12 weeks</span>
            <span>{course.credits} ECTS</span>
            <span>English</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Sidebar */}
          <div className="space-y-6 mx-auto lg:mx-0 w-full max-w-md lg:max-w-none">
            {/* Professor card */}
            <Card className="mx-auto lg:mx-0">
              <CardHeader>
                <CardTitle className="text-center lg:text-left">{professorData.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Professor image */}
                {professorData.useImage ? <img src={professorImage} alt={professorData.name} className="w-24 h-24 rounded-full mx-auto object-cover" /> : <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">
                      {professorData.name.split(' ').slice(1).map(n => n[0]).join('')}
                    </span>
                  </div>}
                
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{professorData.name}</h3>
                  <div className="flex justify-center">
                    <StarRating rating={professorData.rating} />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center lg:text-left">{professorData.description}</p>
              </CardContent>
            </Card>

            {/* Key aspects */}
            <Card className="mx-auto lg:mx-0">
              <CardHeader>
                <CardTitle className="text-center lg:text-left">Key Course Aspects</CardTitle>
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
            <div className="mx-auto lg:mx-0">
              <OracleVerificationPanel courseId={courseId || ""} courseName={course.name} />
            </div>

            {/* Action buttons */}
            
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8 mx-auto lg:mx-0 w-full max-w-2xl lg:max-w-none">
            {/* Course description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center sm:text-left">Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 text-center sm:text-left">{course.description}</p>
                
                <h4 className="font-semibold mb-4 text-lg text-center sm:text-left">What You'll Actually Learn</h4>
                <div className="space-y-4">
                  {learningOutcomes.map((outcome, index) => <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary text-center sm:text-left">
                      <span className="text-2xl">{outcome.emoji}</span>
                      <div>
                        <span className="font-medium text-foreground">{outcome.title}</span>
                        <p className="text-sm text-muted-foreground mt-1">{outcome.description}</p>
                      </div>
                    </div>)}
                </div>

                <div className="mt-6 pt-6 border-t text-center sm:text-left">
                  <h4 className="font-semibold mb-2">Prerequisites</h4>
                  <p className="text-muted-foreground">Bachelor's degree or equivalent qualification. Basic knowledge of the subject area recommended.</p>
                </div>
              </CardContent>
            </Card>

            {/* Student Notes Section */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
                  {studentNotes.map(note => <div key={note.id} className={`border rounded-lg p-4 transition-all ${note.isVerified ? 'hover:bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40' : 'hover:bg-muted/50'}`}>
                      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3 mb-3">
                        <div className="flex-1 text-center sm:text-left w-full">
                          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                            <h4 className="font-semibold">{note.studentName} - {note.year}</h4>
                            <ReviewVerificationBadge isVerified={note.isVerified} grade={note.isVerified ? note.grade : undefined} txHash={note.txHash} verifiedAt={note.verifiedAt} />
                          </div>
                          <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 flex-wrap">
                            <div className="flex items-center">
                              {Array.from({
                            length: Math.floor(note.rating)
                          }, (_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                              {note.rating % 1 >= 0.5 && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                              <span className="ml-1 text-sm text-muted-foreground">({note.rating})</span>
                            </div>
                            <span className="text-sm text-muted-foreground">• {note.pageCount} pages</span>
                            <span className="text-sm text-muted-foreground">• Grade: {note.grade}</span>
                          </div>
                        </div>
                        <div className="text-center sm:text-right">
                          <div className="font-bold text-lg text-primary">{note.price}</div>
                          <Button size="sm" className="mt-1" onClick={() => navigate('/checkout', {
                        state: {
                          note
                        }
                      })}>
                            Buy Notes Now!
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground text-center sm:text-left">{note.description}</p>
                      
                      {note.isVerified && <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-600">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Oracle verified attendance & grade on {note.verifiedAt?.toLocaleDateString()}</span>
                        </div>}
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* AI Exam Simulator Section */}
            <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-accent/5">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
              
              <CardHeader className="relative">
                <div className="flex flex-col md:flex-row items-start md:justify-between gap-4 text-left">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/30">
                      <Brain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center justify-start gap-2">
                        AI Exam Simulator
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">The Intelligence Layer: AI-Driven Exam Simulation</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium Feature
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-6 text-left">
                <p className="text-muted-foreground leading-relaxed">
                  Unlike generic Large Language Models (LLMs) that rely on broad, often irrelevant internet data, 
                  our AI agent utilizes a <span className="font-semibold text-foreground">Retrieval-Augmented Generation (RAG)</span> architecture 
                  trained exclusively on the platform's hyper-local dataset.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50 space-y-2 text-left">
                    <div className="flex items-center justify-start gap-2">
                      <Database className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Verified Data Sources</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      By ingesting specific, high-grade notes and historical exam formats validated by our Oracle system, 
                      the AI constructs precise, exam-like simulations.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50 space-y-2 text-left">
                    <div className="flex items-center justify-start gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold">Professor-Style Questions</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Mirrors the actual difficulty and structural nuances of each professor's testing style 
                      for authentic exam preparation.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50 space-y-2 text-left">
                    <div className="flex items-center justify-start gap-2">
                      <Lock className="w-5 h-5 text-emerald-500" />
                      <span className="font-semibold">Blockchain Guaranteed</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A high-quality, noise-free data environment that only our blockchain infrastructure can guarantee.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50 space-y-2 text-left">
                    <div className="flex items-center justify-start gap-2">
                      <Brain className="w-5 h-5 text-purple-500" />
                      <span className="font-semibold">Safe Sandbox</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Transform static "verified notes" into a dynamic preparation tool—test your readiness 
                      before the real exam.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10">
                    <div className="text-left">
                      <p className="font-semibold text-foreground">Ready to ace your exam?</p>
                      <p className="text-sm text-muted-foreground">Start practicing with AI-powered exam simulations</p>
                    </div>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30 gap-2"
                      onClick={() => setSimulatorOpen(true)}
                    >
                      <Sparkles className="w-4 h-4" />
                      Try AI Simulator
                      <Badge variant="outline" className="ml-1 text-[10px] border-primary-foreground/30 text-primary-foreground">
                        Premium
                      </Badge>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AIExamSimulator 
              open={simulatorOpen} 
              onOpenChange={setSimulatorOpen}
              courseName={course.name}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default CourseDetail;