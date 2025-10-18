import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, PartyPopper, Trophy, Music, Coffee, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Mock activities data
const mockActivities = [
  {
    id: 1,
    title: "Football Match at Campo Marte",
    description: "Looking for players for a friendly football match this Saturday afternoon. All skill levels welcome!",
    type: "Sports",
    location: "Campo Marte, Florence",
    date: "2025-10-20",
    time: "15:00",
    participants: 8,
    maxParticipants: 22,
    organizer: "Marco Rossi",
  },
  {
    id: 2,
    title: "Aperitivo & Networking",
    description: "Join us for drinks and networking at a cozy bar in Santo Spirito. Great opportunity to meet new people!",
    type: "Social",
    location: "Bar Santo Spirito",
    date: "2025-10-22",
    time: "19:00",
    participants: 15,
    maxParticipants: 30,
    organizer: "Sofia Bianchi",
  },
  {
    id: 3,
    title: "Study Group - Economics",
    description: "Weekly study group for Economics students. Let's help each other prepare for exams!",
    type: "Study",
    location: "University Library",
    date: "2025-10-21",
    time: "14:00",
    participants: 6,
    maxParticipants: 10,
    organizer: "Luca Verdi",
  },
  {
    id: 4,
    title: "Photography Walk",
    description: "Exploring Florence with our cameras. Bring your camera or smartphone and let's capture the beauty of the city!",
    type: "Creative",
    location: "Piazzale Michelangelo",
    date: "2025-10-23",
    time: "10:00",
    participants: 4,
    maxParticipants: 12,
    organizer: "Emma Ferrari",
  },
];

const activityIcons = {
  Sports: Trophy,
  Social: PartyPopper,
  Study: Coffee,
  Creative: Camera,
  Music: Music,
};

export default function StudentActivities() {
  const [selectedActivity, setSelectedActivity] = useState<typeof mockActivities[0] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activities, setActivities] = useState(mockActivities);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = (data: any) => {
    const newActivity = {
      id: activities.length + 1,
      ...data,
      participants: 1,
      organizer: "You",
    };
    setActivities([newActivity, ...activities]);
    setShowForm(false);
    reset();
    toast.success("Activity posted successfully!");
  };

  const filteredActivities = activeFilter === "All" 
    ? activities 
    : activities.filter(activity => activity.type === activeFilter);

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              Student Activities
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover and join activities, or create your own! Connect with fellow students through sports, parties, study groups, and more.
            </p>
            
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Propose New Activity
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Propose a New Activity</DialogTitle>
                  <DialogDescription>
                    Fill in the details about the activity you want to organize
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Activity Title</Label>
                    <Input id="title" {...register("title")} placeholder="e.g., Football Match, Study Group..." required />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Activity Type</Label>
                    <Select onValueChange={(value) => setValue("type", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Social">Social</SelectItem>
                        <SelectItem value="Study">Study</SelectItem>
                        <SelectItem value="Creative">Creative</SelectItem>
                        <SelectItem value="Music">Music</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      {...register("description")} 
                      placeholder="Describe your activity..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" {...register("date")} required />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" {...register("time")} required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" {...register("location")} placeholder="Where will this take place?" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="maxParticipants">Maximum Participants</Label>
                    <Input 
                      id="maxParticipants" 
                      type="number" 
                      {...register("maxParticipants")} 
                      placeholder="e.g., 20"
                      min="2"
                      required 
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Post Activity</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-8">
            <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full max-w-4xl">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full h-auto gap-2 bg-card/50 p-2">
                <TabsTrigger value="All" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  All
                </TabsTrigger>
                <TabsTrigger value="Sports" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Trophy className="h-4 w-4" />
                  Sports
                </TabsTrigger>
                <TabsTrigger value="Social" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <PartyPopper className="h-4 w-4" />
                  Party
                </TabsTrigger>
                <TabsTrigger value="Study" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Coffee className="h-4 w-4" />
                  Study
                </TabsTrigger>
                <TabsTrigger value="Creative" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Camera className="h-4 w-4" />
                  Creative
                </TabsTrigger>
                <TabsTrigger value="Music" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Music className="h-4 w-4" />
                  Music
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No activities found in this category.</p>
                <p className="text-muted-foreground text-sm mt-2">Try selecting a different filter or create a new activity!</p>
              </div>
            ) : (
              filteredActivities.map((activity) => {
                const Icon = activityIcons[activity.type as keyof typeof activityIcons] || PartyPopper;
                const spotsLeft = activity.maxParticipants - activity.participants;
                
                return (
                  <Card 
                    key={activity.id}
                    className="hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent-foreground">
                          {activity.type}
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {activity.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {activity.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(activity.date).toLocaleDateString()} at {activity.time}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {activity.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {activity.participants} / {activity.maxParticipants} participants
                        <span className="ml-2 text-xs text-primary">
                          ({spotsLeft} spots left)
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={(e) => {
                        e.stopPropagation();
                        toast.success("Joined activity!");
                      }}>
                        Join Activity
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Activity Detail Dialog */}
        <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
          <DialogContent className="max-w-2xl">
            {selectedActivity && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {(() => {
                      const Icon = activityIcons[selectedActivity.type as keyof typeof activityIcons] || PartyPopper;
                      return <Icon className="h-8 w-8 text-primary" />;
                    })()}
                    <span className="text-sm px-3 py-1 rounded-full bg-accent/20 text-accent-foreground">
                      {selectedActivity.type}
                    </span>
                  </div>
                  <DialogTitle className="text-2xl">{selectedActivity.title}</DialogTitle>
                  <DialogDescription className="text-base">
                    Organized by {selectedActivity.organizer}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedActivity.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Date & Time
                      </h4>
                      <p className="text-muted-foreground">
                        {new Date(selectedActivity.date).toLocaleDateString()}
                        <br />
                        {selectedActivity.time}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Location
                      </h4>
                      <p className="text-muted-foreground">{selectedActivity.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Participants
                    </h4>
                    <p className="text-muted-foreground">
                      {selectedActivity.participants} / {selectedActivity.maxParticipants} people
                      <span className="ml-2 text-primary font-medium">
                        ({selectedActivity.maxParticipants - selectedActivity.participants} spots left)
                      </span>
                    </p>
                  </div>
                </div>
                
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setSelectedActivity(null)}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    toast.success(`You've joined: ${selectedActivity.title}`);
                    setSelectedActivity(null);
                  }}>
                    Join This Activity
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
