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
    title: "Master in Policies and Governance in Europe",
    category: "Politics & Governance",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "This program provides comprehensive knowledge of European policies, governance structures, and institutional frameworks. Students develop expertise in policy analysis, European law, and comparative politics.",
    semesters: [
      {
        name: "First Semester",
        courses: [
          { name: "European Integration and Institutions", credits: 9, description: "Study of EU institutional framework and decision-making processes" },
          { name: "Comparative Political Systems", credits: 9, description: "Analysis of different political systems across Europe" },
          { name: "Policy Analysis and Evaluation", credits: 6, description: "Methods and tools for policy assessment" },
          { name: "Research Methods in Political Science", credits: 6, description: "Quantitative and qualitative research methodologies" },
        ]
      },
      {
        name: "Second Semester",
        courses: [
          { name: "European Law and Governance", credits: 9, description: "Legal frameworks governing EU operations" },
          { name: "Public Administration and Management", credits: 9, description: "Management principles in public sector" },
          { name: "EU Foreign Policy", credits: 6, description: "External relations and diplomatic strategies" },
          { name: "Elective Course I", credits: 6, description: "Choose from specialized topics" },
        ]
      },
      {
        name: "Third Semester",
        courses: [
          { name: "Digital Governance and E-Democracy", credits: 9, description: "Technology's role in modern governance" },
          { name: "Environmental and Climate Policy", credits: 9, description: "EU's green policies and sustainability goals" },
          { name: "Migration and Border Policies", credits: 6, description: "Analysis of migration frameworks" },
          { name: "Elective Course II", credits: 6, description: "Advanced specialized topics" },
        ]
      },
      {
        name: "Fourth Semester",
        courses: [
          { name: "Master's Thesis", credits: 24, description: "Independent research project on European governance" },
          { name: "Internship/Practicum", credits: 6, description: "Practical experience in EU institutions or related organizations" },
        ]
      }
    ]
  },
  "3": {
    title: "Master in Finance",
    category: "Finance",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "A comprehensive program designed to prepare students for careers in investment banking, asset management, corporate finance, and financial consulting. Combines theoretical foundations with practical applications.",
    semesters: [
      {
        name: "First Semester",
        courses: [
          { name: "Corporate Finance", credits: 9, description: "Advanced corporate financial decision-making and valuation" },
          { name: "Financial Markets and Institutions", credits: 9, description: "Structure and functioning of global financial markets" },
          { name: "Quantitative Methods for Finance", credits: 6, description: "Statistical and mathematical tools for financial analysis" },
          { name: "Financial Accounting", credits: 6, description: "Accounting principles and financial statement analysis" },
        ]
      },
      {
        name: "Second Semester",
        courses: [
          { name: "Investment Analysis and Portfolio Management", credits: 9, description: "Portfolio theory and investment strategies" },
          { name: "Derivatives and Risk Management", credits: 9, description: "Options, futures, and hedging strategies" },
          { name: "Fixed Income Securities", credits: 6, description: "Bond markets and interest rate analysis" },
          { name: "Financial Econometrics", credits: 6, description: "Econometric methods in finance" },
        ]
      },
      {
        name: "Third Semester",
        courses: [
          { name: "Mergers and Acquisitions", credits: 9, description: "Corporate restructuring and M&A strategies" },
          { name: "International Finance", credits: 9, description: "Global financial management and exchange rates" },
          { name: "Behavioral Finance", credits: 6, description: "Psychology and decision-making in finance" },
          { name: "FinTech and Digital Finance", credits: 6, description: "Innovation in financial technology" },
        ]
      },
      {
        name: "Fourth Semester",
        courses: [
          { name: "Master's Thesis", credits: 21, description: "Research project in finance" },
          { name: "Applied Finance Workshop", credits: 6, description: "Real-world case studies and simulations" },
          { name: "Professional Development Seminar", credits: 3, description: "Career preparation and industry insights" },
        ]
      }
    ]
  },
  "7": {
    title: "Master in Management",
    category: "Management",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "This program prepares students for leadership roles across various industries by developing strategic thinking, analytical skills, and managerial competencies. Focus on innovation, sustainability, and global business challenges.",
    semesters: [
      {
        name: "First Semester",
        courses: [
          { name: "Strategic Management", credits: 9, description: "Corporate strategy formulation and implementation" },
          { name: "Organizational Behavior", credits: 9, description: "Leadership, motivation, and team dynamics" },
          { name: "Managerial Economics", credits: 6, description: "Economic principles for business decisions" },
          { name: "Financial Management", credits: 6, description: "Financial analysis and decision-making" },
        ]
      },
      {
        name: "Second Semester",
        courses: [
          { name: "Marketing Management", credits: 9, description: "Marketing strategy and customer insights" },
          { name: "Operations and Supply Chain Management", credits: 9, description: "Process optimization and logistics" },
          { name: "Data Analytics for Business", credits: 6, description: "Data-driven decision making" },
          { name: "Business Ethics and Corporate Governance", credits: 6, description: "Ethical frameworks and governance" },
        ]
      },
      {
        name: "Third Semester",
        courses: [
          { name: "Innovation and Entrepreneurship", credits: 9, description: "Creating and scaling new ventures" },
          { name: "International Business Management", credits: 9, description: "Global strategy and cross-cultural management" },
          { name: "Digital Transformation", credits: 6, description: "Technology-driven business change" },
          { name: "Elective Course", credits: 6, description: "Specialized management topics" },
        ]
      },
      {
        name: "Fourth Semester",
        courses: [
          { name: "Master's Thesis", credits: 24, description: "Independent research in management" },
          { name: "Business Consulting Project", credits: 6, description: "Real-world consulting experience" },
        ]
      }
    ]
  },
  "8": {
    title: "Master in Marketing",
    category: "Marketing",
    languages: ["English", "Italian"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "A cutting-edge program focusing on digital marketing, brand management, consumer behavior, and marketing analytics. Prepares students for leadership roles in marketing and commercial functions.",
    semesters: [
      {
        name: "First Semester",
        courses: [
          { name: "Marketing Strategy", credits: 9, description: "Strategic marketing planning and execution" },
          { name: "Consumer Behavior and Market Research", credits: 9, description: "Understanding customer psychology and research methods" },
          { name: "Brand Management", credits: 6, description: "Building and managing strong brands" },
          { name: "Marketing Analytics", credits: 6, description: "Data analysis for marketing decisions" },
        ]
      },
      {
        name: "Second Semester",
        courses: [
          { name: "Digital Marketing and Social Media", credits: 9, description: "Online marketing strategies and platforms" },
          { name: "Marketing Communications", credits: 9, description: "Integrated communication strategies" },
          { name: "Product and Service Innovation", credits: 6, description: "Developing new market offerings" },
          { name: "Pricing Strategy", credits: 6, description: "Pricing models and revenue optimization" },
        ]
      },
      {
        name: "Third Semester",
        courses: [
          { name: "AI in Marketing", credits: 9, description: "Artificial intelligence applications in marketing" },
          { name: "Customer Experience Management", credits: 9, description: "Creating exceptional customer journeys" },
          { name: "International Marketing", credits: 6, description: "Global marketing strategies" },
          { name: "Elective Course", credits: 6, description: "Specialized marketing topics" },
        ]
      },
      {
        name: "Fourth Semester",
        courses: [
          { name: "Master's Thesis", credits: 21, description: "Research project in marketing" },
          { name: "Marketing Campaign Project", credits: 6, description: "Hands-on campaign development" },
          { name: "Professional Workshop", credits: 3, description: "Industry skills and networking" },
        ]
      }
    ]
  },
  "11": {
    title: "Master in Data Science and Management",
    category: "Data Science",
    languages: ["English"],
    duration: "2 years",
    credits: 120,
    intake: "September",
    description: "An interdisciplinary program combining data science, machine learning, and business management. Prepares students to lead data-driven transformation in organizations.",
    semesters: [
      {
        name: "First Semester",
        courses: [
          { name: "Foundations of Data Science", credits: 9, description: "Introduction to data science concepts and tools" },
          { name: "Programming for Data Analysis", credits: 9, description: "Python and R programming for data science" },
          { name: "Statistics and Probability", credits: 6, description: "Statistical foundations for data analysis" },
          { name: "Database Management Systems", credits: 6, description: "SQL and NoSQL databases" },
        ]
      },
      {
        name: "Second Semester",
        courses: [
          { name: "Machine Learning", credits: 9, description: "Supervised and unsupervised learning algorithms" },
          { name: "Business Intelligence and Visualization", credits: 9, description: "Data visualization and BI tools" },
          { name: "Big Data Technologies", credits: 6, description: "Hadoop, Spark, and distributed computing" },
          { name: "Managerial Economics", credits: 6, description: "Economic principles for business" },
        ]
      },
      {
        name: "Third Semester",
        courses: [
          { name: "Deep Learning and Neural Networks", credits: 9, description: "Advanced AI and deep learning" },
          { name: "Strategic Management", credits: 9, description: "Business strategy and leadership" },
          { name: "Data Ethics and Privacy", credits: 6, description: "Ethical implications of data use" },
          { name: "Natural Language Processing", credits: 6, description: "Text analysis and NLP applications" },
        ]
      },
      {
        name: "Fourth Semester",
        courses: [
          { name: "Master's Thesis", credits: 21, description: "Data science research project" },
          { name: "Capstone Project", credits: 6, description: "Industry collaboration project" },
          { name: "Data Science Leadership Seminar", credits: 3, description: "Leading data teams and projects" },
        ]
      }
    ]
  },
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
          <Link to="/graduate" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
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
    "1": [
      "EU Policy Advisor",
      "Political Analyst",
      "Diplomat",
      "Government Relations Manager",
      "Public Affairs Consultant",
      "NGO Program Director"
    ],
    "3": [
      "Investment Banker",
      "Portfolio Manager",
      "Financial Analyst",
      "Risk Manager",
      "Corporate Finance Manager",
      "Financial Consultant"
    ],
    "7": [
      "Management Consultant",
      "Business Development Manager",
      "Strategy Manager",
      "Operations Manager",
      "Entrepreneur",
      "General Manager"
    ],
    "8": [
      "Marketing Manager",
      "Brand Manager",
      "Digital Marketing Specialist",
      "Market Research Analyst",
      "Product Manager",
      "Marketing Consultant"
    ],
    "11": [
      "Data Scientist",
      "Business Intelligence Manager",
      "AI/ML Engineer",
      "Chief Data Officer",
      "Analytics Consultant",
      "Data Strategy Manager"
    ]
  };
  return careers[id] || careers["3"];
}

export default GraduateProgramDetail;
