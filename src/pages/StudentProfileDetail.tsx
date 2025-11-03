import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, User, GraduationCap, Building2, MapPin, Briefcase, BookOpen, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { useState } from "react";

// This would normally come from a database or global state
// For now, we'll duplicate the profiles data
const profiles = [
  {
    id: "1",
    name: "Francesco Laconi",
    email: "francesco.laconi@luiss.it",
    university: "LUISS University",
    city: "Rome",
    course: "Strategic Management",
    skills: "Marketing and Business Planning",
    bio: "Expert in digital marketing and using AI for it. Passionate about leveraging artificial intelligence to optimize marketing strategies and drive business growth."
  },
  {
    id: "2",
    name: "Sofia Bianchi",
    email: "sofia.bianchi@example.com",
    university: "Politecnico di Milano",
    city: "Milan",
    course: "Data Science & Engineering",
    skills: "Data Analysis, Python, Machine Learning",
    bio: "Engineering student specialized in data science. Interested in AI-driven projects and sustainable technology solutions."
  },
  {
    id: "3",
    name: "Luca Verdi",
    email: "luca.verdi@example.com",
    university: "Università Cattolica",
    city: "Milan",
    course: "Marketing & Digital Communication",
    skills: "Marketing, Social Media, Content Creation",
    bio: "Business student with a passion for digital marketing and brand development."
  },
  {
    id: "4",
    name: "Elena Neri",
    email: "elena.neri@example.com", 
    university: "LUISS University",
    city: "Rome",
    course: "Economics & Finance",
    skills: "Finance, Excel, Financial Modeling",
    bio: "Economics student interested in fintech and investment analysis projects."
  }
];

const StudentProfileDetail = () => {
  const { id } = useParams();
  const profile = profiles.find(p => p.id === id);
  const [questions, setQuestions] = useState([
    { id: 1, question: "What tools do you use for digital marketing?", answer: "I primarily use Google Analytics, SEMrush, and HubSpot for campaign management." },
    { id: 2, question: "Are you available for collaboration?", answer: "" }
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answerText, setAnswerText] = useState<{ [key: number]: string }>({});

  if (!profile) {
    return <Navigate to="/student-board" replace />;
  }

  const skillsList = profile.skills.split(',').map(skill => skill.trim());
  
  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      setQuestions([...questions, { id: Date.now(), question: newQuestion, answer: "" }]);
      setNewQuestion("");
    }
  };

  const handleSubmitAnswer = (questionId: number) => {
    if (answerText[questionId]?.trim()) {
      setQuestions(questions.map(q => 
        q.id === questionId ? { ...q, answer: answerText[questionId] } : q
      ));
      setAnswerText({ ...answerText, [questionId]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <Button variant="ghost" asChild className="mb-6 hover:bg-accent/50">
          <Link to="/student-board">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Student Board
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-start space-x-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-2xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-4xl mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {profile.name}
                  </CardTitle>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span className="text-sm">{profile.course}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span className="text-sm">{profile.university}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{profile.city}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* About */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <BookOpen className="h-6 w-6 text-primary" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-base">{profile.bio}</p>
            </CardContent>
          </Card>

          {/* Skills & Expertise */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Briefcase className="h-6 w-6 text-primary" />
                Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {skillsList.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm px-4 py-2 font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Q&A Section */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MessageCircle className="h-6 w-6 text-primary" />
                Questions & Answers
              </CardTitle>
              <CardDescription>Ask questions to {profile.name.split(' ')[0]} - visible to everyone</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Ask a Question Form */}
              <form onSubmit={handleSubmitQuestion} className="space-y-4 p-4 rounded-lg bg-accent/30 border">
                <div className="space-y-2">
                  <Label htmlFor="question">Ask a Question</Label>
                  <Textarea
                    id="question"
                    placeholder="What would you like to know?"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Question
                </Button>
              </form>

              {/* Questions List */}
              <div className="space-y-4">
                {questions.map((q) => (
                  <div key={q.id} className="p-4 rounded-lg border bg-card space-y-3">
                    <div>
                      <p className="font-semibold text-foreground mb-1">Question:</p>
                      <p className="text-muted-foreground">{q.question}</p>
                    </div>
                    
                    {q.answer ? (
                      <div className="pl-4 border-l-2 border-primary/50">
                        <p className="font-semibold text-primary mb-1">{profile.name.split(' ')[0]}'s Answer:</p>
                        <p className="text-muted-foreground">{q.answer}</p>
                      </div>
                    ) : (
                      <div className="space-y-2 pl-4 border-l-2 border-muted">
                        <Label htmlFor={`answer-${q.id}`} className="text-sm text-muted-foreground">
                          Answer this question (profile owner only)
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id={`answer-${q.id}`}
                            placeholder="Type your answer..."
                            value={answerText[q.id] || ""}
                            onChange={(e) => setAnswerText({ ...answerText, [q.id]: e.target.value })}
                          />
                          <Button 
                            onClick={() => handleSubmitAnswer(q.id)}
                            size="sm"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileDetail;
