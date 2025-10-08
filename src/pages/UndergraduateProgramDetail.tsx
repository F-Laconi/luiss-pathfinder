import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Award, Globe, Users, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Undergraduate programs data with detailed curriculum from official LUISS sources
const undergraduateProgramsData: Record<string, any> = {
  "1": {
    title: "Global Law",
    category: "Law",
    languages: ["English"],
    duration: "3 years",
    credits: 180,
    intake: "September",
    description: "The Bachelor's Degree Programme in Global Law is dedicated to the development of legal experts capable of standing out in global and cross-border contexts, working in multinational companies, NGOs, European institutions and international organisations.",
    semesters: [
      {
        name: "First Year - Foundation",
        courses: [
          { name: "Foundations of Private Law", credits: 12, description: "Introduction to private law fundamentals" },
          { name: "Foundations of Public Law", credits: 12, description: "Public law and constitutional principles" },
          { name: "Economics", credits: 9, description: "Economic theory and analysis" },
          { name: "Philosophy of Law", credits: 9, description: "Legal philosophy and theory" },
          { name: "Roman Law", credits: 9, description: "Historical foundations of law" },
          { name: "History of Law", credits: 9, description: "Legal system evolution" },
        ]
      },
      {
        name: "Second Year - Core Studies",
        courses: [
          { name: "European Union Law", credits: 9, description: "EU legal framework" },
          { name: "Commercial Law", credits: 9, description: "Business and commercial regulations" },
          { name: "Criminal Law", credits: 9, description: "Criminal justice system" },
          { name: "International Law", credits: 9, description: "Global legal frameworks" },
          { name: "Administrative Law", credits: 9, description: "Public administration law" },
          { name: "Comparative Legal Systems", credits: 9, description: "Legal systems comparison" },
        ]
      },
      {
        name: "Third Year - Specialization",
        courses: [
          { name: "Global Governance and Institutions", credits: 9, description: "International organizations" },
          { name: "International Economic Law", credits: 9, description: "Trade and economic regulations" },
          { name: "Human Rights Law", credits: 9, description: "International human rights" },
          { name: "Legal Clinics", credits: 6, description: "Practical legal experience" },
          { name: "Electives", credits: 12, description: "Specialized topics" },
          { name: "Final Thesis", credits: 9, description: "Research project" },
        ]
      }
    ]
  },
  "2": {
    title: "Business Administration",
    category: "Business & Management",
    languages: ["English"],
    duration: "3 years",
    credits: 180,
    intake: "September",
    description: "The Bachelor's Degree Programme in Business Administration provides students with a solid theoretical and applied grounding in the methods and content of business administration, combining theoretical knowledge with practical skills through the analysis of challenging real-world situations.",
    semesters: [
      {
        name: "First Year - Fundamentals",
        courses: [
          { name: "Business Administration", credits: 12, description: "Core business principles" },
          { name: "Accounting", credits: 12, description: "Financial and managerial accounting" },
          { name: "Mathematics", credits: 9, description: "Mathematical methods for business" },
          { name: "Economics", credits: 9, description: "Micro and macroeconomic theory" },
          { name: "Statistics", credits: 9, description: "Statistical analysis for business" },
          { name: "Business Law", credits: 9, description: "Legal framework for business" },
        ]
      },
      {
        name: "Second Year - Core Business",
        courses: [
          { name: "Marketing", credits: 12, description: "Marketing strategy and management" },
          { name: "Finance", credits: 12, description: "Corporate finance principles" },
          { name: "Operations Management", credits: 9, description: "Process and operations optimization" },
          { name: "Organizational Behavior", credits: 9, description: "Human resources and leadership" },
          { name: "Data Analytics", credits: 9, description: "Business data analysis" },
          { name: "Information Systems", credits: 9, description: "IT in business management" },
        ]
      },
      {
        name: "Third Year - Advanced Topics",
        courses: [
          { name: "Strategic Management", credits: 12, description: "Business strategy formulation" },
          { name: "International Business", credits: 9, description: "Global business operations" },
          { name: "Entrepreneurship", credits: 9, description: "New venture creation" },
          { name: "Business Project", credits: 9, description: "Applied business consulting" },
          { name: "Electives", credits: 12, description: "Specialized subjects" },
          { name: "Final Thesis", credits: 9, description: "Research project" },
        ]
      }
    ]
  },
  "3": {
    title: "Management and Artificial Intelligence",
    category: "Management & Technology",
    languages: ["English"],
    duration: "3 years",
    credits: 180,
    intake: "September",
    description: "The Bachelor's Degree in Management and Artificial Intelligence responds to the growing demand for professionals in artificial intelligence, big data management and digitalisation, with a solid business and entrepreneurial vision.",
    semesters: [
      {
        name: "First Year - Foundation",
        courses: [
          { name: "Programming Fundamentals", credits: 12, description: "Introduction to coding and algorithms" },
          { name: "Business Administration", credits: 12, description: "Core business concepts" },
          { name: "Mathematics for AI", credits: 9, description: "Mathematical foundations" },
          { name: "Statistics and Probability", credits: 9, description: "Statistical methods" },
          { name: "Economics", credits: 9, description: "Economic principles" },
          { name: "Introduction to AI", credits: 9, description: "AI fundamentals and applications" },
        ]
      },
      {
        name: "Second Year - AI & Data Science",
        courses: [
          { name: "Machine Learning", credits: 12, description: "ML algorithms and applications" },
          { name: "Data Management", credits: 12, description: "Database systems and big data" },
          { name: "Business Analytics", credits: 9, description: "Data-driven decision making" },
          { name: "Digital Marketing", credits: 9, description: "AI in marketing strategies" },
          { name: "Operations and Supply Chain", credits: 9, description: "AI in operations" },
          { name: "Ethics of AI", credits: 9, description: "Responsible AI development" },
        ]
      },
      {
        name: "Third Year - Advanced Applications",
        courses: [
          { name: "Deep Learning", credits: 12, description: "Neural networks and applications" },
          { name: "AI Strategy and Innovation", credits: 9, description: "AI transformation strategies" },
          { name: "Natural Language Processing", credits: 9, description: "Text and language AI" },
          { name: "AI Project Workshop", credits: 9, description: "Hands-on AI projects" },
          { name: "Electives", credits: 12, description: "Specialized AI topics" },
          { name: "Final Thesis", credits: 9, description: "AI research project" },
        ]
      }
    ]
  },
  "4": {
    title: "Economics and Business",
    category: "Economics & Business",
    languages: ["English"],
    duration: "3 years",
    credits: 180,
    intake: "September",
    description: "The Bachelor's Degree Programme in Economics and Business provides comprehensive training in economics, finance and management, preparing students for careers in business, finance, consulting and public institutions.",
    semesters: [
      {
        name: "First Year - Fundamentals",
        courses: [
          { name: "Microeconomics", credits: 12, description: "Consumer and firm behavior" },
          { name: "Macroeconomics", credits: 12, description: "National and global economics" },
          { name: "Mathematics", credits: 9, description: "Calculus and linear algebra" },
          { name: "Statistics", credits: 9, description: "Descriptive and inferential statistics" },
          { name: "Accounting", credits: 9, description: "Financial accounting principles" },
          { name: "Business Law", credits: 9, description: "Legal foundations" },
        ]
      },
      {
        name: "Second Year - Core Economics",
        courses: [
          { name: "Econometrics", credits: 12, description: "Statistical methods for economics" },
          { name: "Corporate Finance", credits: 12, description: "Financial management" },
          { name: "Industrial Economics", credits: 9, description: "Market structures and competition" },
          { name: "International Economics", credits: 9, description: "Global trade and finance" },
          { name: "Public Economics", credits: 9, description: "Government and markets" },
          { name: "Marketing", credits: 9, description: "Marketing principles" },
        ]
      },
      {
        name: "Third Year - Specialization",
        courses: [
          { name: "Financial Markets", credits: 12, description: "Capital markets and instruments" },
          { name: "Economic Policy", credits: 9, description: "Policy analysis and design" },
          { name: "Business Strategy", credits: 9, description: "Strategic management" },
          { name: "Data Analysis", credits: 9, description: "Economic data analytics" },
          { name: "Electives", credits: 12, description: "Specialized courses" },
          { name: "Final Thesis", credits: 9, description: "Research project" },
        ]
      }
    ]
  },
  "5": {
    title: "Politics: Philosophy and Economics",
    category: "Politics & Economics",
    languages: ["English"],
    duration: "3 years",
    credits: 180,
    intake: "September",
    description: "The Bachelor's Degree Programme in Politics: Philosophy and Economics (PPE) combines political science, philosophy and economics to develop critical thinking and analytical skills for addressing complex societal challenges.",
    semesters: [
      {
        name: "First Year - Foundation",
        courses: [
          { name: "Political Philosophy", credits: 12, description: "Classic and modern political thought" },
          { name: "Microeconomics", credits: 12, description: "Economic theory fundamentals" },
          { name: "Introduction to Politics", credits: 9, description: "Political systems and institutions" },
          { name: "Logic and Critical Thinking", credits: 9, description: "Philosophical reasoning" },
          { name: "Mathematics", credits: 9, description: "Quantitative methods" },
          { name: "Statistics", credits: 9, description: "Statistical analysis" },
        ]
      },
      {
        name: "Second Year - Core Studies",
        courses: [
          { name: "Comparative Politics", credits: 12, description: "Political systems analysis" },
          { name: "Macroeconomics", credits: 12, description: "National and global economics" },
          { name: "Ethics and Political Theory", credits: 9, description: "Moral and political philosophy" },
          { name: "International Relations", credits: 9, description: "Global politics" },
          { name: "Political Economy", credits: 9, description: "Economics and politics interface" },
          { name: "History of Political Thought", credits: 9, description: "Evolution of political ideas" },
        ]
      },
      {
        name: "Third Year - Advanced Topics",
        courses: [
          { name: "Public Policy Analysis", credits: 12, description: "Policy design and evaluation" },
          { name: "Behavioural Economics", credits: 9, description: "Psychology and economics" },
          { name: "Global Governance", credits: 9, description: "International institutions" },
          { name: "Research Seminar", credits: 9, description: "Applied research methods" },
          { name: "Electives", credits: 12, description: "Specialized topics" },
          { name: "Final Thesis", credits: 9, description: "Research project" },
        ]
      }
    ]
  },
  "6": {
    title: "Giurisprudenza",
    category: "Law",
    languages: ["Italian"],
    duration: "5 years",
    credits: 300,
    intake: "September",
    description: "Il Corso di Laurea Magistrale a Ciclo Unico in Giurisprudenza fornisce una formazione giuridica completa e approfondita, preparando laureati per le professioni legali tradizionali e per ruoli nei settori pubblico e privato.",
    semesters: [
      {
        name: "Primo Anno - Fondamenti",
        courses: [
          { name: "Istituzioni di Diritto Privato", credits: 15, description: "Fondamenti del diritto privato" },
          { name: "Istituzioni di Diritto Romano", credits: 9, description: "Diritto romano e tradizione giuridica" },
          { name: "Economia Politica", credits: 9, description: "Principi di economia" },
          { name: "Filosofia del Diritto", credits: 9, description: "Teoria e filosofia del diritto" },
          { name: "Storia del Diritto", credits: 9, description: "Evoluzione storica del diritto" },
        ]
      },
      {
        name: "Secondo Anno - Diritto Pubblico",
        courses: [
          { name: "Diritto Costituzionale", credits: 15, description: "Sistema costituzionale italiano" },
          { name: "Diritto dell'Unione Europea", credits: 9, description: "Ordinamento UE" },
          { name: "Diritto Amministrativo", credits: 12, description: "Pubblica amministrazione" },
          { name: "Diritto Penale I", credits: 9, description: "Parte generale del diritto penale" },
          { name: "Diritto Commerciale I", credits: 9, description: "Impresa e società" },
        ]
      },
      {
        name: "Terzo Anno - Diritto Privato Avanzato",
        courses: [
          { name: "Diritto Civile", credits: 15, description: "Obbligazioni e contratti" },
          { name: "Diritto del Lavoro", credits: 12, description: "Rapporti di lavoro" },
          { name: "Diritto Commerciale II", credits: 9, description: "Titoli di credito e fallimento" },
          { name: "Diritto Processuale Civile I", credits: 9, description: "Processo civile" },
          { name: "Diritto Tributario", credits: 9, description: "Sistema fiscale" },
        ]
      },
      {
        name: "Quarto Anno - Diritto Processuale",
        courses: [
          { name: "Diritto Penale II", credits: 9, description: "Parte speciale" },
          { name: "Diritto Processuale Penale", credits: 12, description: "Processo penale" },
          { name: "Diritto Processuale Civile II", credits: 9, description: "Procedimenti speciali" },
          { name: "Diritto Internazionale", credits: 9, description: "Diritto internazionale pubblico" },
          { name: "Diritto Ecclesiastico", credits: 6, description: "Diritto e religione" },
        ]
      },
      {
        name: "Quinto Anno - Specializzazione",
        courses: [
          { name: "Materie a Scelta", credits: 18, description: "Insegnamenti elettivi" },
          { name: "Tirocinio", credits: 6, description: "Esperienza pratica" },
          { name: "Prova Finale", credits: 21, description: "Tesi di laurea" },
        ]
      }
    ]
  },
  "7": {
    title: "Economics and Management",
    category: "Economics & Management",
    languages: ["Italian"],
    duration: "3 years",
    credits: 180,
    intake: "September",
    description: "Il Corso di Laurea in Economia e Management fornisce una solida preparazione teorica e applicata nei metodi e nei contenuti delle discipline economiche e aziendali, con forte orientamento internazionale.",
    semesters: [
      {
        name: "Primo Anno - Base",
        courses: [
          { name: "Economia Aziendale", credits: 12, description: "Fondamenti di gestione aziendale" },
          { name: "Microeconomia", credits: 12, description: "Teoria microeconomica" },
          { name: "Matematica", credits: 9, description: "Metodi matematici" },
          { name: "Ragioneria", credits: 9, description: "Contabilità e bilancio" },
          { name: "Statistica", credits: 9, description: "Statistica descrittiva e inferenziale" },
          { name: "Diritto Privato", credits: 9, description: "Fondamenti di diritto privato" },
        ]
      },
      {
        name: "Secondo Anno - Caratterizzanti",
        courses: [
          { name: "Macroeconomia", credits: 12, description: "Teoria macroeconomica" },
          { name: "Marketing", credits: 12, description: "Strategia e gestione marketing" },
          { name: "Finanza Aziendale", credits: 9, description: "Gestione finanziaria" },
          { name: "Economia degli Intermediari Finanziari", credits: 9, description: "Sistema finanziario" },
          { name: "Diritto Commerciale", credits: 9, description: "Diritto dell'impresa" },
          { name: "Organizzazione Aziendale", credits: 9, description: "Strutture organizzative" },
        ]
      },
      {
        name: "Terzo Anno - Specializzazione",
        courses: [
          { name: "Strategia e Politica Aziendale", credits: 12, description: "Strategic management" },
          { name: "Economia Internazionale", credits: 9, description: "Commercio e finanza internazionale" },
          { name: "Controllo di Gestione", credits: 9, description: "Management control" },
          { name: "Business Analytics", credits: 9, description: "Analisi dati aziendali" },
          { name: "Materie a Scelta", credits: 12, description: "Corsi elettivi" },
          { name: "Prova Finale", credits: 9, description: "Tesi di laurea" },
        ]
      }
    ]
  },
  "8": {
    title: "Political Science",
    category: "Political Science",
    languages: ["Italian"],
    duration: "3 years",
    credits: 180,
    intake: "September",
    description: "Il Corso di Laurea in Scienze Politiche offre una formazione interdisciplinare nelle scienze politiche, economiche, giuridiche e sociali, preparando laureati per carriere nel settore pubblico, organizzazioni internazionali e settore privato.",
    semesters: [
      {
        name: "Primo Anno - Fondamenti",
        courses: [
          { name: "Scienza Politica", credits: 12, description: "Introduzione alla scienza politica" },
          { name: "Storia delle Dottrine Politiche", credits: 9, description: "Pensiero politico" },
          { name: "Diritto Pubblico", credits: 12, description: "Ordinamento costituzionale" },
          { name: "Economia Politica", credits: 9, description: "Principi economici" },
          { name: "Sociologia", credits: 9, description: "Teoria sociologica" },
          { name: "Storia Contemporanea", credits: 9, description: "Storia moderna" },
        ]
      },
      {
        name: "Secondo Anno - Approfondimenti",
        courses: [
          { name: "Sistema Politico Italiano", credits: 12, description: "Politica italiana" },
          { name: "Relazioni Internazionali", credits: 12, description: "Politica internazionale" },
          { name: "Diritto dell'Unione Europea", credits: 9, description: "Ordinamento UE" },
          { name: "Politica Economica", credits: 9, description: "Politiche economiche" },
          { name: "Metodologia della Ricerca Sociale", credits: 9, description: "Metodi di ricerca" },
          { name: "Storia delle Relazioni Internazionali", credits: 9, description: "Storia diplomatica" },
        ]
      },
      {
        name: "Terzo Anno - Specializzazione",
        courses: [
          { name: "Politica Comparata", credits: 12, description: "Sistemi politici comparati" },
          { name: "Analisi delle Politiche Pubbliche", credits: 9, description: "Public policy" },
          { name: "Comunicazione Politica", credits: 9, description: "Media e politica" },
          { name: "Governance Europea", credits: 9, description: "Istituzioni europee" },
          { name: "Materie a Scelta", credits: 12, description: "Corsi elettivi" },
          { name: "Prova Finale", credits: 9, description: "Tesi di laurea" },
        ]
      }
    ]
  }
};

const UndergraduateProgramDetail = () => {
  const { id } = useParams();
  const program = id ? undergraduateProgramsData[id] : null;

  if (!program) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Program Not Found</h1>
          <Link to="/school/undergraduate">
            <Button>Back to Undergraduate Programs</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <Link to="/school/undergraduate" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Undergraduate Programs
          </Link>
          
          <div className="max-w-4xl">
            <Badge className="mb-4 text-sm">{program.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {program.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {program.description}
            </p>
            
            {/* Program Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-semibold">{program.duration}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Credits</p>
                    <p className="font-semibold">{program.credits} ECTS</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Language</p>
                    <p className="font-semibold">{program.languages.join(", ")}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Intake</p>
                    <p className="font-semibold">{program.intake}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="courses">All Courses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curriculum" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span>Program Structure</span>
                  </CardTitle>
                  <CardDescription>
                    Complete curriculum organized by year and semester
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {program.semesters.map((semester: any, idx: number) => (
                      <AccordionItem key={idx} value={`semester-${idx}`}>
                        <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                          <div className="flex items-center space-x-2">
                            <ChevronRight className="h-5 w-5" />
                            <span>{semester.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {semester.courses.reduce((sum: number, course: any) => sum + course.credits, 0)} ECTS
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-4">
                            {semester.courses.map((course: any, courseIdx: number) => (
                              <Card key={courseIdx} className="bg-muted/50">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-foreground">{course.name}</h4>
                                    <Badge variant="secondary">{course.credits} ECTS</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{course.description}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Course List</CardTitle>
                  <CardDescription>
                    All courses in the {program.title} program
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {program.semesters.flatMap((semester: any) => 
                      semester.courses.map((course: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <p className="font-medium">{course.name}</p>
                            <p className="text-sm text-muted-foreground">{course.description}</p>
                          </div>
                          <Badge variant="outline">{course.credits} ECTS</Badge>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="mt-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
              <p className="text-muted-foreground mb-6">
                Start your journey with LUISS University's {program.title} program
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Users className="h-5 w-5 mr-2" />
                  Contact Admissions
                </Button>
                <Button size="lg" variant="outline">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UndergraduateProgramDetail;
