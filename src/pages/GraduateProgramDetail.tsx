import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Award, Globe, Users, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Program data with detailed curriculum
const programsData: Record<string, any> = {
  "1": {
    title: "Policies and Governance in Europe",
    category: "Politics & Governance",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "This program provides comprehensive knowledge of European policies, governance structures, and institutional frameworks based on official LUISS curriculum.",
    semesters: [{
      name: "First Year",
      courses: [{
        name: "European Integration and Institutions",
        credits: 6,
        description: "Study of EU institutional framework"
      }, {
        name: "Comparative Political Systems",
        credits: 6,
        description: "Analysis of political systems across Europe"
      }, {
        name: "Policy Analysis and Evaluation",
        credits: 6,
        description: "Methods for policy assessment"
      }, {
        name: "Research Methods in Political Science",
        credits: 6,
        description: "Research methodologies"
      }, {
        name: "European Law and Governance",
        credits: 6,
        description: "Legal frameworks governing EU"
      }, {
        name: "Public Administration",
        credits: 6,
        description: "Public sector management"
      }]
    }, {
      name: "Second Year",
      courses: [{
        name: "Digital Governance",
        credits: 6,
        description: "Technology in modern governance"
      }, {
        name: "Environmental Policy",
        credits: 6,
        description: "EU sustainability goals"
      }, {
        name: "Migration Policies",
        credits: 6,
        description: "Migration frameworks"
      }, {
        name: "Master's Thesis",
        credits: 24,
        description: "Independent research project"
      }, {
        name: "Internship",
        credits: 6,
        description: "Practical experience"
      }]
    }]
  },
  "2": {
    title: "Economia, Istituzioni e Mercati Finanziari",
    category: "Economics & Finance",
    languages: ["Italian", "English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Deep understanding of economic theory, financial markets, and institutional frameworks based on LUISS curriculum.",
    semesters: [{
      name: "First Year",
      courses: [{
        name: "Macroeconomics",
        credits: 6,
        description: "Advanced macroeconomic theory"
      }, {
        name: "Microeconomics",
        credits: 6,
        description: "Consumer and producer theory"
      }, {
        name: "Mathematics for Economics",
        credits: 6,
        description: "Mathematical tools for analysis"
      }, {
        name: "Financial Markets and Institutions",
        credits: 6,
        description: "Financial systems structure"
      }, {
        name: "Monetary Economics",
        credits: 6,
        description: "Central banking and policy"
      }]
    }, {
      name: "Second Year",
      courses: [{
        name: "Financial Regulation",
        credits: 6,
        description: "Regulatory frameworks"
      }, {
        name: "European Economic Policy",
        credits: 6,
        description: "EU economic governance"
      }, {
        name: "Applied Economic Analysis",
        credits: 6,
        description: "Problem solving"
      }, {
        name: "Master's Thesis",
        credits: 24,
        description: "Research in economics"
      }]
    }]
  },
  "3": {
    title: "Finance (Corporate Finance)",
    category: "Finance",
    languages: ["English"],
    duration: "1 year",
    credits: 65,
    intake: "September",
    description: "Official LUISS Business School Master in Financial Management – Major in Corporate Finance. Prepares students for corporate finance divisions, investment banking, and financial consulting.",
    semesters: [{
      name: "Term 1 - General Management",
      courses: [{
        name: "Corporate Strategy",
        credits: 5,
        description: "Strategic planning and business strategy"
      }, {
        name: "Compliance and Risk Management",
        credits: 5,
        description: "Regulatory compliance"
      }, {
        name: "Accounting",
        credits: 5,
        description: "Financial accounting principles"
      }, {
        name: "Financial Management",
        credits: 5,
        description: "Corporate financial decisions"
      }, {
        name: "Quantitative Methods for Finance",
        credits: 5,
        description: "Mathematical tools"
      }]
    }, {
      name: "Term 2 - Core Courses",
      courses: [{
        name: "Corporate Finance",
        credits: 6,
        description: "Advanced financial management"
      }, {
        name: "Statistics",
        credits: 4,
        description: "Statistical analysis for finance"
      }, {
        name: "Advanced Accounting for Finance",
        credits: 5,
        description: "Complex accounting"
      }, {
        name: "Financial Ratio Analysis",
        credits: 4,
        description: "Statement analysis"
      }, {
        name: "Planning and Control",
        credits: 4,
        description: "Financial planning systems"
      }, {
        name: "Capital Markets",
        credits: 5,
        description: "Market operations"
      }, {
        name: "Trade Finance",
        credits: 4,
        description: "International trade financing"
      }]
    }, {
      name: "Term 3 - Advanced Courses",
      courses: [{
        name: "Derivatives",
        credits: 4,
        description: "Options and futures"
      }, {
        name: "Business Valuation Methods",
        credits: 5,
        description: "Valuation techniques"
      }, {
        name: "Mergers and Acquisitions",
        credits: 5,
        description: "M&A execution"
      }, {
        name: "Corporate Banking",
        credits: 4,
        description: "Banking operations"
      }, {
        name: "Private Equity and Venture Capital",
        credits: 5,
        description: "PE/VC strategies"
      }, {
        name: "Business Restructuring",
        credits: 4,
        description: "Corporate turnaround"
      }, {
        name: "Financial Risk Management",
        credits: 4,
        description: "Risk mitigation"
      }, {
        name: "Bloomberg Financial Lab",
        credits: 2,
        description: "Terminal training"
      }]
    }, {
      name: "Term 4 - Internship",
      courses: [{
        name: "Curricular Internship",
        credits: 12,
        description: "Professional experience in corporate finance or investment banking"
      }]
    }]
  },
  "4": {
    title: "Global Management and Politics",
    category: "Management & Politics",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Official LUISS program combining managerial and political science skills for management and advisory roles in a globalised world. Interdisciplinary approach combining economics, management, political science, law and history.",
    semesters: [{
      name: "First Year",
      courses: [{
        name: "Global Business Strategy",
        credits: 6,
        description: "Strategic management in international contexts"
      }, {
        name: "International Political Economy",
        credits: 6,
        description: "Politics and economics in global markets"
      }, {
        name: "Comparative Politics",
        credits: 6,
        description: "Political systems analysis"
      }, {
        name: "Global Governance and Institutions",
        credits: 6,
        description: "International organizations"
      }, {
        name: "Corporate Diplomacy",
        credits: 6,
        description: "Business-government relations"
      }]
    }, {
      name: "Second Year",
      courses: [{
        name: "Sustainability and Global Challenges",
        credits: 6,
        description: "Environmental governance"
      }, {
        name: "Emerging Markets Management",
        credits: 6,
        description: "Business in developing economies"
      }, {
        name: "Master's Thesis",
        credits: 24,
        description: "Research on global management or politics"
      }, {
        name: "Global Leadership Workshop",
        credits: 6,
        description: "Leadership skills"
      }]
    }]
  },
  "5": {
    title: "Government and Public Affairs",
    category: "Government & Public Affairs",
    languages: ["Italian", "English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Official LUISS program offering solid education in politics, administration, public policy and governance. Combines theoretical foundations with practical approach to public-private sector relations.",
    semesters: [{
      name: "First Year - Core Courses",
      courses: [{
        name: "History of Institutions and Administration",
        credits: 6,
        description: "Evolution of institutional systems"
      }, {
        name: "Social Research Methods",
        credits: 6,
        description: "Research design methodology"
      }, {
        name: "Italian Political System",
        credits: 6,
        description: "Political changes and prospects"
      }, {
        name: "Law of Elective Assemblies",
        credits: 6,
        description: "Parliamentary procedures"
      }, {
        name: "Public Economics",
        credits: 6,
        description: "Economic analysis of public intervention"
      }, {
        name: "Demography and Italian Society",
        credits: 6,
        description: "Demographic trends"
      }, {
        name: "Public Ethics",
        credits: 6,
        description: "Applied public ethics"
      }, {
        name: "Administrative Law",
        credits: 2,
        description: "Public administration law"
      }, {
        name: "Public Policy Analysis",
        credits: 6,
        description: "Policy evaluation"
      }, {
        name: "Institutions, Media and Technologies",
        credits: 6,
        description: "Digital governance"
      }]
    }, {
      name: "Second Year - Specialization",
      courses: [{
        name: "Organisation and Public Management",
        credits: 6,
        description: "Public sector management"
      }, {
        name: "Elective Courses",
        credits: 18,
        description: "Specialized topics"
      }, {
        name: "Writing a Master's Thesis",
        credits: 18,
        description: "Thesis preparation"
      }, {
        name: "Internship",
        credits: 6,
        description: "Public sector experience"
      }, {
        name: "Final Thesis",
        credits: 16,
        description: "Research project"
      }, {
        name: "Other Activities",
        credits: 12,
        description: "Practical certificates"
      }]
    }]
  },
  "6": {
    title: "International Relations",
    category: "International Relations",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Program focusing on international affairs, diplomacy, and global governance based on LUISS curriculum.",
    semesters: [{
      name: "First Year",
      courses: [{
        name: "International Relations Theory",
        credits: 6,
        description: "Theoretical frameworks"
      }, {
        name: "Global Governance",
        credits: 6,
        description: "International organizations"
      }, {
        name: "Foreign Policy Analysis",
        credits: 6,
        description: "Policy-making processes"
      }, {
        name: "International Law",
        credits: 6,
        description: "Legal frameworks"
      }, {
        name: "Security Studies",
        credits: 6,
        description: "Global security issues"
      }]
    }, {
      name: "Second Year",
      courses: [{
        name: "Regional Studies",
        credits: 6,
        description: "Area-specific analysis"
      }, {
        name: "International Political Economy",
        credits: 6,
        description: "Global economic relations"
      }, {
        name: "Master's Thesis",
        credits: 24,
        description: "Research project"
      }, {
        name: "Internship",
        credits: 6,
        description: "International organization experience"
      }]
    }]
  },
  "7": {
    title: "Management",
    category: "Management",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "General management program developing strategic thinking and managerial competencies based on LUISS curriculum.",
    semesters: [{
      name: "First Year",
      courses: [{
        name: "Strategic Management",
        credits: 6,
        description: "Strategy formulation"
      }, {
        name: "Organizational Behavior",
        credits: 6,
        description: "Leadership and team dynamics"
      }, {
        name: "Managerial Economics",
        credits: 6,
        description: "Economic principles"
      }, {
        name: "Marketing Management",
        credits: 6,
        description: "Marketing strategy"
      }, {
        name: "Operations Management",
        credits: 6,
        description: "Process optimization"
      }]
    }, {
      name: "Second Year",
      courses: [{
        name: "Innovation and Entrepreneurship",
        credits: 6,
        description: "New ventures"
      }, {
        name: "International Business",
        credits: 6,
        description: "Global strategy"
      }, {
        name: "Master's Thesis",
        credits: 24,
        description: "Research project"
      }, {
        name: "Business Project",
        credits: 6,
        description: "Consulting experience"
      }]
    }]
  },
  "8": {
    title: "Marketing",
    category: "Marketing",
    languages: ["Italian", "English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Official LUISS program combining marketing fundamentals with latest trends. Focus on brand management, consumer behaviour, marketing analytics, and digital marketing in dynamic markets.",
    semesters: [{
      name: "First Year - Core Marketing",
      courses: [{
        name: "Key Topics in Marketing",
        credits: 6,
        description: "Markstrat simulation"
      }, {
        name: "Qualitative & Quantitative Research Methods",
        credits: 8,
        description: "Research methodologies"
      }, {
        name: "Consumer Behaviour Analysis",
        credits: 6,
        description: "Behavioural economics foundations"
      }, {
        name: "Marketing and Law",
        credits: 6,
        description: "Legal issues in marketing"
      }, {
        name: "Consumer Behaviour",
        credits: 6,
        description: "Marketing contexts"
      }, {
        name: "Behavioural Economics Applications",
        credits: 6,
        description: "Practical insights"
      }, {
        name: "Marketing Data Analysis",
        credits: 6,
        description: "Statistical techniques"
      }, {
        name: "Communication Languages",
        credits: 6,
        description: "Semiotics and narrative"
      }, {
        name: "Digital, Social Media and Performance Marketing",
        credits: 6,
        description: "Digital optimization"
      }, {
        name: "Product & Brand Management",
        credits: 6,
        description: "Brand management"
      }]
    }, {
      name: "Second Year - Advanced Marketing",
      courses: [{
        name: "Integrated Marketing Communication",
        credits: 6,
        description: "Holistic campaigns"
      }, {
        name: "Brand Content and Storytelling",
        credits: 6,
        description: "Content marketing"
      }, {
        name: "Cross Elective Courses",
        credits: 12,
        description: "Specialized topics"
      }, {
        name: "Internship",
        credits: 6,
        description: "Professional experience"
      }, {
        name: "Final Thesis",
        credits: 16,
        description: "Marketing research"
      }, {
        name: "Other Activities",
        credits: 12,
        description: "Practical skills"
      }]
    }]
  },
  "9": {
    title: "Strategic Management",
    category: "Strategic Management",
    languages: ["Italian", "English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Program focusing on strategic thinking and decision-making for senior management roles based on LUISS curriculum.",
    semesters: [{
      name: "First Year",
      courses: [{
        name: "Corporate Strategy",
        credits: 6,
        description: "Strategic analysis and planning"
      }, {
        name: "Competitive Strategy",
        credits: 6,
        description: "Competitive advantage"
      }, {
        name: "Business Model Innovation",
        credits: 6,
        description: "Business model transformation"
      }, {
        name: "Strategic Leadership",
        credits: 6,
        description: "Leading change"
      }]
    }, {
      name: "Second Year",
      courses: [{
        name: "AI & Digital Marketing",
        credits: 6,
        description: "AI-driven marketing strategies and digital transformation"
      }, {
        name: "Digital Transformation Strategy",
        credits: 6,
        description: "Technology-driven change"
      }, {
        name: "Master's Thesis",
        credits: 21,
        description: "Strategic research"
      }, {
        name: "Strategy Project",
        credits: 6,
        description: "Consulting engagement"
      }]
    }]
  },
  "10": {
    title: "Amministrazione, Finanza e Controllo",
    category: "Administration & Finance",
    languages: ["Italian", "English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Program for financial management, administration, and control based on LUISS Business School curriculum.",
    semesters: [{
      name: "First Year",
      courses: [{
        name: "Advanced Financial Accounting",
        credits: 6,
        description: "Complex accounting transactions"
      }, {
        name: "Management Accounting",
        credits: 6,
        description: "Cost accounting"
      }, {
        name: "Internal Auditing",
        credits: 6,
        description: "Audit procedures"
      }, {
        name: "Management Control Systems",
        credits: 6,
        description: "Performance measurement"
      }]
    }, {
      name: "Second Year",
      courses: [{
        name: "Risk Management",
        credits: 6,
        description: "Enterprise risk frameworks"
      }, {
        name: "Treasury Management",
        credits: 6,
        description: "Liquidity operations"
      }, {
        name: "Master's Thesis",
        credits: 21,
        description: "Research in accounting"
      }, {
        name: "Professional Practicum",
        credits: 6,
        description: "Hands-on experience"
      }]
    }]
  },
  "11": {
    title: "Data Science and Management",
    category: "Data Science",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Official LUISS program designed to develop future leaders with skills in artificial intelligence, data science and management through a practical and applied approach.",
    semesters: [{
      name: "First Year",
      courses: [{
        name: "Foundations of Data Science",
        credits: 6,
        description: "Data science concepts"
      }, {
        name: "Programming for Data Analysis",
        credits: 6,
        description: "Python and R programming"
      }, {
        name: "Statistics and Probability",
        credits: 6,
        description: "Statistical foundations"
      }, {
        name: "Machine Learning",
        credits: 6,
        description: "ML algorithms"
      }, {
        name: "Business Intelligence",
        credits: 6,
        description: "Data visualization"
      }]
    }, {
      name: "Second Year",
      courses: [{
        name: "Deep Learning and AI",
        credits: 6,
        description: "Advanced AI techniques"
      }, {
        name: "Data Strategy and Management",
        credits: 6,
        description: "Data-driven transformation"
      }, {
        name: "Master's Thesis",
        credits: 21,
        description: "Data science research"
      }, {
        name: "Capstone Project",
        credits: 6,
        description: "Industry project"
      }]
    }]
  }
};
const GraduateProgramDetail = () => {
  const {
    id
  } = useParams();
  const program = programsData[id || "1"];
  if (!program) {
    return <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-nunito text-3xl font-bold mb-4">Program Not Found</h1>
          <Link to="/graduate">
            <Button>Back to Graduate Programs</Button>
          </Link>
        </div>
        <Footer />
      </div>;
  }
  const totalCourses = program.semesters.reduce((acc: number, sem: any) => acc + sem.courses.length, 0);
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <Link to="/school/graduate" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-all duration-300 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Graduate Programs</span>
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6 animate-fade-up">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <Globe className="h-3.5 w-3.5 mr-2" />
                {program.languages.join(" • ")}
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-border/50 backdrop-blur-sm">
                {program.category}
              </Badge>
            </div>
            
            <h1 className="font-helvetica text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up uppercase tracking-tight">
              {program.title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-up leading-relaxed max-w-3xl" style={{
            animationDelay: "0.1s"
          }}>
              {program.description}
            </p>

            {/* Key Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up" style={{
            animationDelay: "0.2s"
          }}>
              <Card className="group glass hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-[var(--shadow-glow)]">
                <CardContent className="p-5 text-center">
                  <div className="h-12 w-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{program.duration}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Duration</div>
                </CardContent>
              </Card>
              
              <Card className="group glass hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-[var(--shadow-glow)]">
                <CardContent className="p-5 text-center">
                  <div className="h-12 w-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{program.credits}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">CFU Credits</div>
                </CardContent>
              </Card>
              
              <Card className="group glass hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-[var(--shadow-glow)]">
                <CardContent className="p-5 text-center">
                  <div className="h-12 w-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{totalCourses}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Courses</div>
                </CardContent>
              </Card>
              
              <Card className="group glass hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-[var(--shadow-glow)]">
                <CardContent className="p-5 text-center">
                  <div className="h-12 w-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{program.intake}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Intake</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 mb-12 p-1.5 bg-muted/50 backdrop-blur-sm rounded-2xl h-14">
              <TabsTrigger value="curriculum" className="rounded-xl text-sm font-semibold data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-300">
                Curriculum
              </TabsTrigger>
              <TabsTrigger value="structure" className="rounded-xl text-sm font-semibold data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-300">
                Program Structure
              </TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="space-y-8 animate-fade-in">
              <div className="text-center mb-10">
                <h2 className="font-helvetica text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Complete Curriculum</h2>
                <p className="text-muted-foreground text-lg">Explore all courses across {program.semesters.length} terms</p>
              </div>

              <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-4">
                {program.semesters.map((semester: any, semIndex: number) => <AccordionItem key={semIndex} value={`semester-${semIndex}`} className="border border-border/50 rounded-2xl px-6 glass overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex items-center gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                          <span className="text-xl font-bold text-white">{semIndex + 1}</span>
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-foreground">{semester.name}</h3>
                          <p className="text-sm text-muted-foreground">{semester.courses.length} courses</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6">
                      <div className="space-y-3">
                        {semester.courses.map((course: any, courseIndex: number) => {
                      const courseId = `${id}-${semIndex}-${courseIndex}`;
                      return <Link key={courseIndex} to={`/course/${courseId}`} className="block">
                              <Card className="group hover:shadow-lg transition-all duration-300 border-border/30 cursor-pointer hover:border-primary/40 bg-background/50 hover:bg-background/80">
                                <CardHeader className="p-4">
                                  <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                      <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                                        <span className="truncate">{course.name}</span>
                                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                                      </CardTitle>
                                      <CardDescription className="mt-1.5 line-clamp-1">
                                        {course.description}
                                      </CardDescription>
                                    </div>
                                    <Badge className="shrink-0 bg-primary/10 text-primary border-0 font-semibold px-3 py-1">
                                      {course.credits} CFU
                                    </Badge>
                                  </div>
                                </CardHeader>
                              </Card>
                            </Link>;
                    })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>)}
              </Accordion>

              <div className="text-center mt-12">
                
              </div>
            </TabsContent>

            <TabsContent value="structure" className="space-y-8 animate-fade-in">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-helvetica text-3xl md:text-4xl font-bold mb-10 text-center uppercase tracking-tight">Program Structure</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  <Card className="glass border-border/30 hover:shadow-lg transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        Learning Approach
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <ChevronRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Interactive lectures and seminars</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <ChevronRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Hands-on projects and case studies</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <ChevronRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Group work and presentations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <ChevronRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Research and independent study</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="glass border-border/30 hover:shadow-lg transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Award className="h-5 w-5 text-secondary" />
                        </div>
                        Assessment Methods
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <ChevronRight className="h-3 w-3 text-secondary" />
                          </div>
                          <span>Written and oral examinations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <ChevronRight className="h-3 w-3 text-secondary" />
                          </div>
                          <span>Individual and group projects</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <ChevronRight className="h-3 w-3 text-secondary" />
                          </div>
                          <span>Presentations and reports</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <ChevronRight className="h-3 w-3 text-secondary" />
                          </div>
                          <span>Master's thesis defense</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="glass border-primary/20 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                  <CardHeader className="relative">
                    <CardTitle className="font-helvetica text-xl uppercase tracking-tight">Career Opportunities</CardTitle>
                    <CardDescription className="text-base">
                      Graduates are well-prepared for various career paths
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="grid md:grid-cols-2 gap-4">
                      {getCareerPaths(id || "1").map((career, index) => <div key={index} className="flex items-center gap-3 text-sm group/career">
                          <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-primary to-secondary group-hover/career:scale-125 transition-transform" />
                          <span className="group-hover/career:text-primary transition-colors">{career}</span>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>;
};
function getCareerPaths(id: string): string[] {
  const careers: Record<string, string[]> = {
    "1": ["EU Policy Advisor", "Political Analyst", "Diplomat", "Government Relations Manager", "Public Affairs Consultant", "NGO Program Director"],
    "2": ["Economic Analyst", "Financial Economist", "Policy Advisor", "Central Bank Economist", "Financial Regulator", "Economic Consultant"],
    "3": ["Investment Banker", "Portfolio Manager", "Financial Analyst", "Risk Manager", "Corporate Finance Manager", "Financial Consultant"],
    "4": ["Global Strategy Consultant", "International Business Manager", "Corporate Affairs Director", "International Relations Manager", "Political Risk Analyst", "Global Operations Manager"],
    "5": ["Public Affairs Manager", "Government Relations Director", "Policy Advisor", "Lobbyist", "Public Administration Manager", "NGO Director"],
    "6": ["Diplomat", "International Affairs Analyst", "Foreign Policy Advisor", "International Development Officer", "UN/International Organization Officer", "Security Analyst"],
    "7": ["Management Consultant", "Business Development Manager", "Strategy Manager", "Operations Manager", "Entrepreneur", "General Manager"],
    "8": ["Marketing Manager", "Brand Manager", "Digital Marketing Specialist", "Market Research Analyst", "Product Manager", "Marketing Consultant"],
    "9": ["Strategy Consultant", "Chief Strategy Officer", "Business Unit Manager", "Corporate Development Director", "Strategic Planner", "Management Consultant"],
    "10": ["Chief Financial Officer", "Controller", "Internal Auditor", "Financial Manager", "Accounting Manager", "Risk Manager"],
    "11": ["Data Scientist", "Business Intelligence Manager", "AI/ML Engineer", "Chief Data Officer", "Analytics Consultant", "Data Strategy Manager"]
  };
  return careers[id] || careers["3"];
}
export default GraduateProgramDetail;