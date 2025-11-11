import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Award, Globe, Users, Calendar, ChevronRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Post-Graduate PhD programs data based on official LUISS information
const postGraduateProgramsData: Record<string, any> = {
  "1": {
    title: "PhD in Economics",
    category: "Economics",
    languages: ["English"],
    duration: "4 years",
    credits: 240,
    intake: "October",
    description: "The LUISS PhD in Economics is designed to prepare independent researchers with strong publication and teaching experience. The program provides rigorous training in economic theory and empirical methods, with emphasis on research excellence and international collaboration.",
    researchAreas: [
      "Microeconomic Theory",
      "Macroeconomics and Monetary Economics",
      "Econometrics and Applied Economics",
      "Labor Economics",
      "Public Economics",
      "Development Economics",
      "Industrial Organization",
      "International Economics"
    ],
    structure: [
      {
        name: "First Year - Coursework",
        description: "Intensive training in core economic theory and quantitative methods",
        courses: [
          { name: "Advanced Microeconomic Theory I & II", credits: 12, description: "Consumer theory, production, general equilibrium, game theory" },
          { name: "Advanced Macroeconomic Theory I & II", credits: 12, description: "Dynamic optimization, growth theory, business cycles" },
          { name: "Advanced Econometrics I & II", credits: 12, description: "Statistical inference, time series, panel data methods" },
          { name: "Mathematics for Economists", credits: 6, description: "Optimization, dynamic programming, stochastic processes" },
          { name: "Research Methods Seminar", credits: 3, description: "Academic writing and presentation skills" },
        ]
      },
      {
        name: "Second Year - Specialization",
        description: "Advanced field courses and research preparation",
        courses: [
          { name: "Field Courses in Specialization Areas", credits: 18, description: "Advanced topics in chosen research fields" },
          { name: "Research Workshop", credits: 6, description: "Presenting and discussing research in progress" },
          { name: "Qualifying Exams Preparation", credits: 0, description: "Comprehensive examinations in micro, macro, and metrics" },
          { name: "Thesis Proposal Development", credits: 6, description: "Developing dissertation research proposal" },
        ]
      },
      {
        name: "Third Year - Research",
        description: "Independent research and dissertation writing",
        courses: [
          { name: "Dissertation Research", credits: 30, description: "Conducting original research for dissertation" },
          { name: "Advanced Research Seminar", credits: 6, description: "Presenting research to faculty and peers" },
          { name: "Teaching Assistantship", credits: 6, description: "Gaining teaching experience" },
          { name: "International Research Visit", credits: 6, description: "Visiting research institutions abroad" },
        ]
      },
      {
        name: "Fourth Year - Completion",
        description: "Finalizing dissertation and job market preparation",
        courses: [
          { name: "Dissertation Completion", credits: 36, description: "Writing and defending dissertation" },
          { name: "Job Market Preparation", credits: 6, description: "Preparing for academic or industry positions" },
          { name: "Conference Presentations", credits: 6, description: "Presenting research at international conferences" },
        ]
      }
    ],
    careerOutcomes: [
      "Academic positions at universities and research institutions",
      "Research roles at central banks and international organizations",
      "Economic consulting and policy analysis",
      "Positions at think tanks and research centers",
      "Quantitative roles in finance and industry"
    ],
    admissionRequirements: [
      "Master's degree in Economics or related field",
      "Strong academic record with excellent grades",
      "GRE or equivalent test scores",
      "Research statement and writing sample",
      "Letters of recommendation",
      "English language proficiency"
    ]
  },
  "2": {
    title: "PhD in Management",
    category: "Management",
    languages: ["English"],
    duration: "4 years",
    credits: 240,
    intake: "October",
    description: "The LUISS PhD in Management aims to train scholars capable of conducting high-quality research in business and management. The program emphasizes theoretical rigor, methodological sophistication, and practical relevance in management research.",
    researchAreas: [
      "Strategic Management",
      "Organizational Behavior and Theory",
      "Entrepreneurship and Innovation",
      "Marketing",
      "Operations and Supply Chain Management",
      "Finance and Accounting",
      "International Business",
      "Digital Transformation and Technology Management"
    ],
    structure: [
      {
        name: "First Year - Foundation",
        description: "Core training in management theories and research methods",
        courses: [
          { name: "Foundations of Strategic Management", credits: 9, description: "Core theories and concepts in strategy" },
          { name: "Organizational Theory and Behavior", credits: 9, description: "Organizations and human behavior" },
          { name: "Research Design and Methods", credits: 9, description: "Qualitative and quantitative methods" },
          { name: "Advanced Statistics and Econometrics", credits: 9, description: "Statistical analysis for management research" },
          { name: "Philosophy of Science", credits: 6, description: "Epistemology and research paradigms" },
          { name: "Academic Writing and Publishing", credits: 3, description: "Scholarly communication skills" },
        ]
      },
      {
        name: "Second Year - Specialization",
        description: "Advanced courses in chosen research areas",
        courses: [
          { name: "Field Seminars in Specialization", credits: 18, description: "Deep dive into specific research domains" },
          { name: "Advanced Quantitative Methods", credits: 9, description: "Structural equation modeling, experiments" },
          { name: "Theory Building Seminar", credits: 6, description: "Developing theoretical contributions" },
          { name: "Comprehensive Examination", credits: 0, description: "Qualifying exams in major and minor fields" },
          { name: "Research Proposal", credits: 9, description: "Dissertation proposal development" },
        ]
      },
      {
        name: "Third Year - Research Development",
        description: "Conducting research and building academic profile",
        courses: [
          { name: "Dissertation Research", credits: 30, description: "Empirical data collection and analysis" },
          { name: "Research Colloquium", credits: 6, description: "Regular presentations of work in progress" },
          { name: "Teaching Experience", credits: 6, description: "Teaching undergraduate or master courses" },
          { name: "Conference Participation", credits: 6, description: "Presenting at academic conferences" },
        ]
      },
      {
        name: "Fourth Year - Dissertation and Job Market",
        description: "Completing dissertation and preparing for career",
        courses: [
          { name: "Dissertation Writing and Defense", credits: 36, description: "Completing and defending dissertation" },
          { name: "Job Market Paper Development", credits: 6, description: "Preparing job market materials" },
          { name: "Academic Job Market Preparation", credits: 6, description: "Interview skills and campus visits" },
        ]
      }
    ],
    careerOutcomes: [
      "Faculty positions at business schools worldwide",
      "Research positions at think tanks and institutes",
      "Strategic consulting roles",
      "Corporate research and development positions",
      "Executive roles with research focus"
    ],
    admissionRequirements: [
      "Master's degree in Management, Business, or related field",
      "Excellent academic record",
      "GMAT or GRE scores",
      "Research proposal outlining interests",
      "Letters of recommendation from academic references",
      "Proof of English proficiency"
    ]
  },
  "3": {
    title: "PhD in Politics",
    category: "Politics",
    languages: ["English"],
    duration: "4 years",
    credits: 240,
    intake: "October",
    description: "The LUISS PhD in Politics trains future scholars and researchers in political science with strong emphasis on comparative politics, international relations, and political theory. The program combines theoretical depth with empirical rigor.",
    researchAreas: [
      "Comparative Politics and Institutions",
      "International Relations and Security Studies",
      "Political Theory and Philosophy",
      "European Union Politics",
      "Political Economy",
      "Public Policy and Governance",
      "Electoral Behavior and Political Communication",
      "Democratic Institutions and Processes"
    ],
    structure: [
      {
        name: "First Year - Core Training",
        description: "Foundational courses in political science and methods",
        courses: [
          { name: "Advanced Comparative Politics", credits: 9, description: "Institutions, behavior, and political systems" },
          { name: "Advanced International Relations", credits: 9, description: "Theories of international politics" },
          { name: "Political Theory and Philosophy", credits: 9, description: "Classic and contemporary political thought" },
          { name: "Quantitative Methods for Political Science", credits: 9, description: "Statistical analysis and causal inference" },
          { name: "Qualitative Research Methods", credits: 6, description: "Case studies, interviews, process tracing" },
          { name: "Research Design Seminar", credits: 3, description: "Designing political science research" },
        ]
      },
      {
        name: "Second Year - Field Specialization",
        description: "Advanced training in chosen subfields",
        courses: [
          { name: "Field Seminars", credits: 18, description: "Specialized topics in major and minor fields" },
          { name: "Advanced Methods Workshop", credits: 9, description: "Experimental design, text analysis, spatial methods" },
          { name: "Professional Development", credits: 6, description: "Publishing, reviewing, academic professionalism" },
          { name: "Comprehensive Examinations", credits: 0, description: "Written and oral exams in fields" },
          { name: "Dissertation Proposal", credits: 9, description: "Developing research questions and design" },
        ]
      },
      {
        name: "Third Year - Dissertation Research",
        description: "Fieldwork and empirical research",
        courses: [
          { name: "Dissertation Research", credits: 30, description: "Data collection and empirical analysis" },
          { name: "Research Workshop", credits: 6, description: "Presenting ongoing research" },
          { name: "Teaching Political Science", credits: 6, description: "Gaining teaching experience" },
          { name: "Research Abroad", credits: 6, description: "International fieldwork or visiting scholar" },
        ]
      },
      {
        name: "Fourth Year - Completion",
        description: "Writing, defending, and job market",
        courses: [
          { name: "Dissertation Completion", credits: 36, description: "Writing and defending dissertation" },
          { name: "Job Market Preparation", credits: 6, description: "Application materials and interviews" },
          { name: "Publication Development", credits: 6, description: "Converting chapters to articles" },
        ]
      }
    ],
    careerOutcomes: [
      "Academic positions in political science departments",
      "Research roles at international organizations (UN, EU, NATO)",
      "Policy analysis at think tanks and research institutes",
      "Government advisory and diplomatic positions",
      "Political consulting and strategic advisory"
    ],
    admissionRequirements: [
      "Master's degree in Political Science or related field",
      "Strong academic background in social sciences",
      "GRE scores (recommended)",
      "Writing sample demonstrating research ability",
      "Research statement outlining interests and fit",
      "Academic letters of recommendation",
      "English language proficiency certification"
    ]
  },
  "4": {
    title: "PhD in Law and Business",
    category: "Law & Business",
    languages: ["English"],
    duration: "4 years",
    credits: 240,
    intake: "October",
    description: "The LUISS PhD in Law and Business is an interdisciplinary program combining legal scholarship with business and economic analysis. It prepares researchers capable of addressing complex legal-economic issues in corporate governance, regulation, and commercial law.",
    researchAreas: [
      "Corporate Law and Governance",
      "Financial Regulation and Securities Law",
      "Competition Law and Antitrust",
      "Contract Law and Commercial Transactions",
      "Law and Economics",
      "International Business Law",
      "Intellectual Property and Innovation Law",
      "Regulatory Policy and Administrative Law"
    ],
    structure: [
      {
        name: "First Year - Foundations",
        description: "Core legal theory and empirical methods",
        courses: [
          { name: "Advanced Corporate Law", credits: 9, description: "Corporate governance and agency theory" },
          { name: "Economic Analysis of Law", credits: 9, description: "Law and economics foundations" },
          { name: "Financial Markets and Regulation", credits: 9, description: "Securities law and market regulation" },
          { name: "Empirical Legal Studies", credits: 9, description: "Quantitative and qualitative methods for legal research" },
          { name: "Comparative Legal Systems", credits: 6, description: "Common law and civil law traditions" },
          { name: "Legal Research and Writing", credits: 3, description: "Academic legal writing" },
        ]
      },
      {
        name: "Second Year - Specialization",
        description: "Advanced seminars in chosen fields",
        courses: [
          { name: "Specialized Field Courses", credits: 18, description: "Deep study in major research areas" },
          { name: "Advanced Empirical Methods", credits: 9, description: "Econometrics and causal inference for legal studies" },
          { name: "Business Strategy and Law", credits: 6, description: "Intersection of business and legal strategy" },
          { name: "Qualifying Papers", credits: 0, description: "Research papers in major fields" },
          { name: "Dissertation Proposal", credits: 9, description: "Developing dissertation research" },
        ]
      },
      {
        name: "Third Year - Research",
        description: "Empirical research and dissertation development",
        courses: [
          { name: "Dissertation Research", credits: 30, description: "Data collection and analysis" },
          { name: "Law and Business Colloquium", credits: 6, description: "Presenting work to interdisciplinary audience" },
          { name: "Teaching Legal Studies", credits: 6, description: "Teaching law or business law courses" },
          { name: "Visiting Scholar Program", credits: 6, description: "Research visit to law school or business school" },
        ]
      },
      {
        name: "Fourth Year - Dissertation",
        description: "Completing dissertation and career preparation",
        courses: [
          { name: "Dissertation Writing and Defense", credits: 36, description: "Finalizing and defending dissertation" },
          { name: "Academic Job Market", credits: 6, description: "Preparing for faculty positions" },
          { name: "Publication Strategy", credits: 6, description: "Converting research to publications" },
        ]
      }
    ],
    careerOutcomes: [
      "Law school faculty positions",
      "Business school positions in business law",
      "Research positions at legal and economic think tanks",
      "Corporate legal strategy and compliance roles",
      "Regulatory agencies and policy institutions",
      "International organizations (World Bank, IMF, WTO)"
    ],
    admissionRequirements: [
      "Law degree (JD, LLM, or equivalent) or Master's in Economics/Business",
      "Excellent academic record",
      "LSAT, GRE, or GMAT scores (depending on background)",
      "Research proposal demonstrating interdisciplinary approach",
      "Academic writing sample",
      "Letters of recommendation from law or business faculty",
      "English proficiency (TOEFL/IELTS for non-native speakers)"
    ]
  }
};

const PostGraduateProgramDetail = () => {
  const { id } = useParams();
  const program = id ? postGraduateProgramsData[id] : null;

  if (!program) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-bebas text-4xl font-bold mb-4">Program Not Found</h1>
          <p className="text-muted-foreground mb-8">The PhD program you're looking for doesn't exist.</p>
          <Link to="/school/postgraduate">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Post-Graduate Programs
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background mesh-gradient">
      <Navigation />
      
      {/* SEO Meta */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": program.title,
          "description": program.description,
          "provider": {
            "@type": "EducationalOrganization",
            "name": "LUISS Guido Carli University"
          },
          "educationalLevel": "Doctoral",
          "timeRequired": program.duration,
          "inLanguage": program.languages,
          "courseCode": id
        })}
      </script>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[140px] animate-pulse-slow"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link to="/school/postgraduate">
            <Button variant="ghost" className="mb-8 hover:bg-primary/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to PhD Programs
            </Button>
          </Link>

          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 px-4 py-2 text-sm font-semibold">
                <GraduationCap className="mr-2 h-4 w-4" />
                PhD Program
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-semibold">
                {program.category}
              </Badge>
            </div>

            <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-primary leading-tight">
              {program.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {program.description}
            </p>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="glass rounded-xl p-4 shadow-[var(--shadow-md)]">
                <Clock className="h-5 w-5 text-primary mb-2" />
                <div className="text-sm text-muted-foreground">Duration</div>
                <div className="font-semibold text-foreground">{program.duration}</div>
              </div>
              <div className="glass rounded-xl p-4 shadow-[var(--shadow-md)]">
                <Award className="h-5 w-5 text-secondary mb-2" />
                <div className="text-sm text-muted-foreground">Credits</div>
                <div className="font-semibold text-foreground">{program.credits} ECTS</div>
              </div>
              <div className="glass rounded-xl p-4 shadow-[var(--shadow-md)]">
                <Globe className="h-5 w-5 text-primary mb-2" />
                <div className="text-sm text-muted-foreground">Language</div>
                <div className="font-semibold text-foreground">{program.languages.join(", ")}</div>
              </div>
              <div className="glass rounded-xl p-4 shadow-[var(--shadow-md)]">
                <Calendar className="h-5 w-5 text-secondary mb-2" />
                <div className="text-sm text-muted-foreground">Intake</div>
                <div className="font-semibold text-foreground">{program.intake}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="structure" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 glass">
                <TabsTrigger value="structure">Program Structure</TabsTrigger>
                <TabsTrigger value="research">Research Areas</TabsTrigger>
                <TabsTrigger value="careers">Career Outcomes</TabsTrigger>
                <TabsTrigger value="admission">Admission</TabsTrigger>
              </TabsList>

              <TabsContent value="structure" className="space-y-6">
                <Card className="card-glass">
                  <CardHeader>
                    <CardTitle className="text-2xl">Program Structure</CardTitle>
                    <CardDescription>
                      The {program.duration} doctoral program is structured to provide comprehensive training and research experience.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {program.structure.map((year: any, index: number) => (
                        <AccordionItem key={index} value={`year-${index}`}>
                          <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {index + 1}
                              </div>
                              <span>{year.name}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground mb-4 italic">{year.description}</p>
                            <div className="space-y-3">
                              {year.courses.map((course: any, courseIndex: number) => (
                                <div key={courseIndex} className="border-l-2 border-primary/30 pl-4 py-2 hover:border-primary transition-colors">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-foreground mb-1">{course.name}</h4>
                                      <p className="text-sm text-muted-foreground">{course.description}</p>
                                    </div>
                                    {course.credits > 0 && (
                                      <Badge variant="outline" className="shrink-0">
                                        {course.credits} ECTS
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="research" className="space-y-6">
                <Card className="card-glass">
                  <CardHeader>
                    <CardTitle className="text-2xl">Research Areas</CardTitle>
                    <CardDescription>
                      PhD candidates can specialize in various research areas within {program.category}.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {program.researchAreas.map((area: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                            <ChevronRight className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{area}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="careers" className="space-y-6">
                <Card className="card-glass">
                  <CardHeader>
                    <CardTitle className="text-2xl">Career Outcomes</CardTitle>
                    <CardDescription>
                      Our PhD graduates pursue diverse and impactful careers in academia and beyond.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {program.careerOutcomes.map((outcome: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-5 rounded-xl bg-secondary/5 border border-secondary/10 hover:bg-secondary/10 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/30 transition-colors">
                            <Users className="h-5 w-5 text-secondary" />
                          </div>
                          <span className="font-medium text-foreground pt-2">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="admission" className="space-y-6">
                <Card className="card-glass">
                  <CardHeader>
                    <CardTitle className="text-2xl">Admission Requirements</CardTitle>
                    <CardDescription>
                      Candidates must meet the following requirements to be considered for admission.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {program.admissionRequirements.map((requirement: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <span className="text-foreground">{requirement}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                      <h4 className="font-semibold text-lg mb-3 text-foreground">Application Process</h4>
                      <p className="text-muted-foreground mb-4">
                        Applications are reviewed on a rolling basis. We recommend applying early to ensure full consideration.
                      </p>
                      <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PostGraduateProgramDetail;
