import { useParams, Link } from "react-router-dom";
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
    semesters: [
      {
        name: "First Year",
        courses: [
          { name: "European Integration and Institutions", credits: 9, description: "Study of EU institutional framework" },
          { name: "Comparative Political Systems", credits: 9, description: "Analysis of political systems across Europe" },
          { name: "Policy Analysis and Evaluation", credits: 6, description: "Methods for policy assessment" },
          { name: "Research Methods in Political Science", credits: 6, description: "Research methodologies" },
          { name: "European Law and Governance", credits: 9, description: "Legal frameworks governing EU" },
          { name: "Public Administration", credits: 9, description: "Public sector management" },
        ]
      },
      {
        name: "Second Year",
        courses: [
          { name: "Digital Governance", credits: 9, description: "Technology in modern governance" },
          { name: "Environmental Policy", credits: 9, description: "EU sustainability goals" },
          { name: "Migration Policies", credits: 6, description: "Migration frameworks" },
          { name: "Master's Thesis", credits: 24, description: "Independent research project" },
          { name: "Internship", credits: 6, description: "Practical experience" },
        ]
      }
    ]
  },
  "2": {
    title: "Economia, Istituzioni e Mercati Finanziari",
    category: "Economics & Finance",
    languages: ["Italian", "English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Deep understanding of economic theory, financial markets, and institutional frameworks based on LUISS curriculum.",
    semesters: [
      {
        name: "First Year",
        courses: [
          { name: "Macroeconomics", credits: 9, description: "Advanced macroeconomic theory" },
          { name: "Microeconomics", credits: 9, description: "Consumer and producer theory" },
          { name: "Mathematics for Economics", credits: 6, description: "Mathematical tools for analysis" },
          { name: "Financial Markets and Institutions", credits: 9, description: "Financial systems structure" },
          { name: "Monetary Economics", credits: 9, description: "Central banking and policy" },
        ]
      },
      {
        name: "Second Year",
        courses: [
          { name: "Financial Regulation", credits: 9, description: "Regulatory frameworks" },
          { name: "European Economic Policy", credits: 9, description: "EU economic governance" },
          { name: "Applied Economic Analysis", credits: 6, description: "Problem solving" },
          { name: "Master's Thesis", credits: 24, description: "Research in economics" },
        ]
      }
    ]
  },
  "3": {
    title: "Finance (Corporate Finance)",
    category: "Finance",
    languages: ["English"],
    duration: "1 year",
    credits: 65,
    intake: "September",
    description: "Official LUISS Business School Master in Financial Management – Major in Corporate Finance. Prepares students for corporate finance divisions, investment banking, and financial consulting.",
    semesters: [
      {
        name: "Term 1 - General Management",
        courses: [
          { name: "Corporate Strategy", credits: 5, description: "Strategic planning and business strategy" },
          { name: "Compliance and Risk Management", credits: 5, description: "Regulatory compliance" },
          { name: "Accounting", credits: 5, description: "Financial accounting principles" },
          { name: "Financial Management", credits: 5, description: "Corporate financial decisions" },
          { name: "Quantitative Methods for Finance", credits: 5, description: "Mathematical tools" },
        ]
      },
      {
        name: "Term 2 - Core Courses",
        courses: [
          { name: "Corporate Finance", credits: 6, description: "Advanced financial management" },
          { name: "Statistics", credits: 4, description: "Statistical analysis for finance" },
          { name: "Advanced Accounting for Finance", credits: 5, description: "Complex accounting" },
          { name: "Financial Ratio Analysis", credits: 4, description: "Statement analysis" },
          { name: "Planning and Control", credits: 4, description: "Financial planning systems" },
          { name: "Capital Markets", credits: 5, description: "Market operations" },
          { name: "Trade Finance", credits: 4, description: "International trade financing" },
        ]
      },
      {
        name: "Term 3 - Advanced Courses",
        courses: [
          { name: "Derivatives", credits: 4, description: "Options and futures" },
          { name: "Business Valuation Methods", credits: 5, description: "Valuation techniques" },
          { name: "Mergers and Acquisitions", credits: 5, description: "M&A execution" },
          { name: "Corporate Banking", credits: 4, description: "Banking operations" },
          { name: "Private Equity and Venture Capital", credits: 5, description: "PE/VC strategies" },
          { name: "Business Restructuring", credits: 4, description: "Corporate turnaround" },
          { name: "Financial Risk Management", credits: 4, description: "Risk mitigation" },
          { name: "Bloomberg Financial Lab", credits: 2, description: "Terminal training" },
        ]
      },
      {
        name: "Term 4 - Internship",
        courses: [
          { name: "Curricular Internship", credits: 12, description: "Professional experience in corporate finance or investment banking" },
        ]
      }
    ]
  },
  "4": {
    title: "Global Management and Politics",
    category: "Management & Politics",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Official LUISS program combining managerial and political science skills for management and advisory roles in a globalised world. Interdisciplinary approach combining economics, management, political science, law and history.",
    semesters: [
      {
        name: "First Year",
        courses: [
          { name: "Global Business Strategy", credits: 9, description: "Strategic management in international contexts" },
          { name: "International Political Economy", credits: 9, description: "Politics and economics in global markets" },
          { name: "Comparative Politics", credits: 6, description: "Political systems analysis" },
          { name: "Global Governance and Institutions", credits: 9, description: "International organizations" },
          { name: "Corporate Diplomacy", credits: 9, description: "Business-government relations" },
        ]
      },
      {
        name: "Second Year",
        courses: [
          { name: "Sustainability and Global Challenges", credits: 9, description: "Environmental governance" },
          { name: "Emerging Markets Management", credits: 9, description: "Business in developing economies" },
          { name: "Master's Thesis", credits: 24, description: "Research on global management or politics" },
          { name: "Global Leadership Workshop", credits: 6, description: "Leadership skills" },
        ]
      }
    ]
  },
  "5": {
    title: "Government and Public Affairs",
    category: "Government & Public Affairs",
    languages: ["Italian", "English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Official LUISS program offering solid education in politics, administration, public policy and governance. Combines theoretical foundations with practical approach to public-private sector relations.",
    semesters: [
      {
        name: "First Year - Core Courses",
        courses: [
          { name: "History of Institutions and Administration", credits: 6, description: "Evolution of institutional systems" },
          { name: "Social Research Methods", credits: 6, description: "Research design methodology" },
          { name: "Italian Political System", credits: 6, description: "Political changes and prospects" },
          { name: "Law of Elective Assemblies", credits: 6, description: "Parliamentary procedures" },
          { name: "Public Economics", credits: 6, description: "Economic analysis of public intervention" },
          { name: "Demography and Italian Society", credits: 6, description: "Demographic trends" },
          { name: "Public Ethics", credits: 6, description: "Applied public ethics" },
          { name: "Administrative Law", credits: 2, description: "Public administration law" },
          { name: "Public Policy Analysis", credits: 6, description: "Policy evaluation" },
          { name: "Institutions, Media and Technologies", credits: 6, description: "Digital governance" },
        ]
      },
      {
        name: "Second Year - Specialization",
        courses: [
          { name: "Organisation and Public Management", credits: 6, description: "Public sector management" },
          { name: "Elective Courses", credits: 18, description: "Specialized topics" },
          { name: "Writing a Master's Thesis", credits: 18, description: "Thesis preparation" },
          { name: "Internship", credits: 6, description: "Public sector experience" },
          { name: "Final Thesis", credits: 16, description: "Research project" },
          { name: "Other Activities", credits: 12, description: "Practical certificates" },
        ]
      }
    ]
  },
  "6": {
    title: "International Relations",
    category: "International Relations",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Program focusing on international affairs, diplomacy, and global governance based on LUISS curriculum.",
    semesters: [
      {
        name: "First Year",
        courses: [
          { name: "International Relations Theory", credits: 9, description: "Theoretical frameworks" },
          { name: "Global Governance", credits: 9, description: "International organizations" },
          { name: "Foreign Policy Analysis", credits: 6, description: "Policy-making processes" },
          { name: "International Law", credits: 9, description: "Legal frameworks" },
          { name: "Security Studies", credits: 9, description: "Global security issues" },
        ]
      },
      {
        name: "Second Year",
        courses: [
          { name: "Regional Studies", credits: 9, description: "Area-specific analysis" },
          { name: "International Political Economy", credits: 9, description: "Global economic relations" },
          { name: "Master's Thesis", credits: 24, description: "Research project" },
          { name: "Internship", credits: 6, description: "International organization experience" },
        ]
      }
    ]
  },
  "7": {
    title: "Management",
    category: "Management",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "General management program developing strategic thinking and managerial competencies based on LUISS curriculum.",
    semesters: [
      {
        name: "First Year",
        courses: [
          { name: "Strategic Management", credits: 9, description: "Strategy formulation" },
          { name: "Organizational Behavior", credits: 9, description: "Leadership and team dynamics" },
          { name: "Managerial Economics", credits: 6, description: "Economic principles" },
          { name: "Marketing Management", credits: 9, description: "Marketing strategy" },
          { name: "Operations Management", credits: 9, description: "Process optimization" },
        ]
      },
      {
        name: "Second Year",
        courses: [
          { name: "Innovation and Entrepreneurship", credits: 9, description: "New ventures" },
          { name: "International Business", credits: 9, description: "Global strategy" },
          { name: "Master's Thesis", credits: 24, description: "Research project" },
          { name: "Business Project", credits: 6, description: "Consulting experience" },
        ]
      }
    ]
  },
  "8": {
    title: "Marketing",
    category: "Marketing",
    languages: ["Italian", "English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Official LUISS program combining marketing fundamentals with latest trends. Focus on brand management, consumer behaviour, marketing analytics, and digital marketing in dynamic markets.",
    semesters: [
      {
        name: "First Year - Core Marketing",
        courses: [
          { name: "Key Topics in Marketing", credits: 6, description: "Markstrat simulation" },
          { name: "Qualitative & Quantitative Research Methods", credits: 8, description: "Research methodologies" },
          { name: "Consumer Behaviour Analysis", credits: 6, description: "Behavioural economics foundations" },
          { name: "Marketing and Law", credits: 6, description: "Legal issues in marketing" },
          { name: "Consumer Behaviour", credits: 6, description: "Marketing contexts" },
          { name: "Behavioural Economics Applications", credits: 6, description: "Practical insights" },
          { name: "Marketing Data Analysis", credits: 6, description: "Statistical techniques" },
          { name: "Communication Languages", credits: 6, description: "Semiotics and narrative" },
          { name: "Digital, Social Media and Performance Marketing", credits: 6, description: "Digital optimization" },
          { name: "Product & Brand Management", credits: 6, description: "Brand management" },
        ]
      },
      {
        name: "Second Year - Advanced Marketing",
        courses: [
          { name: "Integrated Marketing Communication", credits: 6, description: "Holistic campaigns" },
          { name: "Brand Content and Storytelling", credits: 6, description: "Content marketing" },
          { name: "Cross Elective Courses", credits: 12, description: "Specialized topics" },
          { name: "Internship", credits: 6, description: "Professional experience" },
          { name: "Final Thesis", credits: 16, description: "Marketing research" },
          { name: "Other Activities", credits: 12, description: "Practical skills" },
        ]
      }
    ]
  },
  "9": {
    title: "Strategic Management",
    category: "Strategic Management",
    languages: ["Italian", "English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Program focusing on strategic thinking and decision-making for senior management roles based on LUISS curriculum.",
    semesters: [
      {
        name: "First Year",
        courses: [
          { name: "Corporate Strategy", credits: 9, description: "Strategic analysis and planning" },
          { name: "Competitive Strategy", credits: 9, description: "Competitive advantage" },
          { name: "Business Model Innovation", credits: 9, description: "Business model transformation" },
          { name: "Strategic Leadership", credits: 9, description: "Leading change" },
        ]
      },
      {
        name: "Second Year",
        courses: [
          { name: "Global Strategy", credits: 9, description: "International expansion" },
          { name: "Digital Transformation Strategy", credits: 9, description: "Technology-driven change" },
          { name: "Master's Thesis", credits: 21, description: "Strategic research" },
          { name: "Strategy Project", credits: 6, description: "Consulting engagement" },
        ]
      }
    ]
  },
  "10": {
    title: "Amministrazione, Finanza e Controllo",
    category: "Administration & Finance",
    languages: ["Italian", "English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Program for financial management, administration, and control based on LUISS Business School curriculum.",
    semesters: [
      {
        name: "First Year",
        courses: [
          { name: "Advanced Financial Accounting", credits: 9, description: "Complex accounting transactions" },
          { name: "Management Accounting", credits: 9, description: "Cost accounting" },
          { name: "Internal Auditing", credits: 9, description: "Audit procedures" },
          { name: "Management Control Systems", credits: 9, description: "Performance measurement" },
        ]
      },
      {
        name: "Second Year",
        courses: [
          { name: "Risk Management", credits: 9, description: "Enterprise risk frameworks" },
          { name: "Treasury Management", credits: 9, description: "Liquidity operations" },
          { name: "Master's Thesis", credits: 21, description: "Research in accounting" },
          { name: "Professional Practicum", credits: 6, description: "Hands-on experience" },
        ]
      }
    ]
  },
  "11": {
    title: "Data Science and Management",
    category: "Data Science",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "Official LUISS program designed to develop future leaders with skills in artificial intelligence, data science and management through a practical and applied approach.",
    semesters: [
      {
        name: "First Year",
        courses: [
          { name: "Foundations of Data Science", credits: 9, description: "Data science concepts" },
          { name: "Programming for Data Analysis", credits: 9, description: "Python and R programming" },
          { name: "Statistics and Probability", credits: 6, description: "Statistical foundations" },
          { name: "Machine Learning", credits: 9, description: "ML algorithms" },
          { name: "Business Intelligence", credits: 9, description: "Data visualization" },
        ]
      },
      {
        name: "Second Year",
        courses: [
          { name: "Deep Learning and AI", credits: 9, description: "Advanced AI techniques" },
          { name: "Data Strategy and Management", credits: 9, description: "Data-driven transformation" },
          { name: "Master's Thesis", credits: 21, description: "Data science research" },
          { name: "Capstone Project", credits: 6, description: "Industry project" },
        ]
      }
    ]
  }
};

const GraduateProgramDetail = () => {
  const { id } = useParams();
  const program = programsData[id || "1"];

  if (!program) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Program Not Found</h1>
          <Link to="/graduate">
            <Button>Back to Graduate Programs</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const totalCourses = program.semesters.reduce((acc: number, sem: any) => acc + sem.courses.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-purple-500/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <Link to="/school/graduate" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Graduate Programs
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-sm">
                <Globe className="h-3 w-3 mr-1" />
                {program.languages.join(", ")}
              </Badge>
              <Badge variant="outline" className="text-sm">{program.category}</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up">
              {program.title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              {program.description}
            </p>

            {/* Key Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{program.duration}</div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-4 text-center">
                  <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{program.credits}</div>
                  <div className="text-xs text-muted-foreground">ECTS Credits</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{totalCourses}</div>
                  <div className="text-xs text-muted-foreground">Courses</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{program.intake}</div>
                  <div className="text-xs text-muted-foreground">Intake</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="structure">Program Structure</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Complete Curriculum</h2>
                <p className="text-muted-foreground">Explore all courses across {program.semesters.length} semesters</p>
              </div>

              <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-4">
                {program.semesters.map((semester: any, semIndex: number) => (
                  <AccordionItem 
                    key={semIndex} 
                    value={`semester-${semIndex}`}
                    className="border rounded-lg px-6 bg-card/30 backdrop-blur"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">{semIndex + 1}</span>
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-semibold">{semester.name}</h3>
                          <p className="text-sm text-muted-foreground">{semester.courses.length} courses</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-3">
                        {semester.courses.map((course: any, courseIndex: number) => (
                          <Card key={courseIndex} className="group hover:shadow-md transition-all duration-300 border-border/50">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                                    {course.name}
                                  </CardTitle>
                                  <CardDescription className="mt-2">
                                    {course.description}
                                  </CardDescription>
                                </div>
                                <Badge variant="secondary" className="shrink-0">
                                  {course.credits} ECTS
                                </Badge>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="text-center mt-8">
                <Button size="lg" className="gap-2">
                  Apply Now
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="structure" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Program Structure</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Learning Approach
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                          <span>Interactive lectures and seminars</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                          <span>Hands-on projects and case studies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                          <span>Group work and presentations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                          <span>Research and independent study</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Assessment Methods
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                          <span>Written and oral examinations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                          <span>Individual and group projects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                          <span>Presentations and reports</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                          <span>Master's thesis defense</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
                  <CardHeader>
                    <CardTitle>Career Opportunities</CardTitle>
                    <CardDescription>
                      Graduates are well-prepared for various career paths
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {getCareerPaths(id || "1").map((career, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>{career}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
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
