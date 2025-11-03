import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, User, Mail, GraduationCap, Building2, MapPin, Briefcase, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

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

  if (!profile) {
    return <Navigate to="/student-board" replace />;
  }

  const skillsList = profile.skills.split(',').map(skill => skill.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/student-board">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Student Board
          </Link>
        </Button>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl">{profile.name}</CardTitle>
                  <CardDescription className="text-lg">Student Profile</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start space-x-3">
                  <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Course/Program</p>
                    <p className="text-muted-foreground">{profile.course}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">University</p>
                    <p className="text-muted-foreground">{profile.university}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground">{profile.city}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Expertise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact {profile.name.split(' ')[0]}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileDetail;
