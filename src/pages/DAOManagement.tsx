import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Vote, Users, Coins, ArrowLeft, Plus, Crown, Shield, 
  Wallet, ChevronRight, Activity, TrendingUp, Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DAOVotingPanel from "@/components/blockchain/DAOVotingPanel";
import TreasuryPanel from "@/components/blockchain/TreasuryPanel";
import { useBlockchain } from "@/contexts/BlockchainContext";

const DAOManagement = () => {
  const { walletAddress, connectWallet, userDAOs, createDAO } = useBlockchain();
  const [selectedDAOId, setSelectedDAOId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newDAOName, setNewDAOName] = useState("");
  const [newDAODescription, setNewDAODescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const selectedDAO = userDAOs.find(d => d.id === selectedDAOId);

  const handleCreateDAO = async () => {
    if (!newDAOName.trim()) return;
    
    setIsCreating(true);
    try {
      const newDAO = await createDAO(newDAOName, newDAODescription);
      setNewDAOName("");
      setNewDAODescription("");
      setIsDialogOpen(false);
      setSelectedDAOId(newDAO.id);
    } finally {
      setIsCreating(false);
    }
  };

  const totalProposals = userDAOs.reduce((acc, dao) => acc + dao.proposals.length, 0);
  const activeProposals = userDAOs.reduce(
    (acc, dao) => acc + dao.proposals.filter(p => p.status === "active").length, 
    0
  );
  const totalMembers = userDAOs.reduce((acc, dao) => acc + dao.members.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/business-partner">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold uppercase tracking-tight">DAO MANAGEMENT</h1>
            <p className="text-muted-foreground">Manage your decentralized project teams</p>
          </div>
        </div>

        {!walletAddress ? (
          /* Connect Wallet Prompt */
          <Card className="max-w-lg mx-auto border-dashed border-2">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                <Wallet className="w-10 h-10 text-violet-500" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-6">
                Connect your Web3 wallet to access DAO management features, vote on proposals, and manage treasury funds.
              </p>
              <Button 
                onClick={connectWallet} 
                size="lg"
                className="bg-gradient-to-r from-violet-500 to-purple-600"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                      <Vote className="w-5 h-5 text-violet-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{userDAOs.length}</div>
                      <div className="text-xs text-muted-foreground">Your DAOs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{activeProposals}</div>
                      <div className="text-xs text-muted-foreground">Active Votes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{totalMembers}</div>
                      <div className="text-xs text-muted-foreground">Total Members</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <Coins className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{totalProposals}</div>
                      <div className="text-xs text-muted-foreground">Total Proposals</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* DAO List Sidebar */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Your DAOs</h2>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600">
                        <Plus className="w-4 h-4 mr-1" />
                        Create
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Vote className="w-5 h-5 text-violet-500" />
                          Create New Project DAO
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Project Name</label>
                          <Input
                            placeholder="e.g., AI Startup Team Alpha"
                            value={newDAOName}
                            onChange={(e) => setNewDAOName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Description</label>
                          <Textarea
                            placeholder="Describe your project and team goals..."
                            value={newDAODescription}
                            onChange={(e) => setNewDAODescription(e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
                          <p className="font-medium text-foreground mb-1">What you'll get:</p>
                          <ul className="space-y-1">
                            <li>• On-chain governance for team decisions</li>
                            <li>• Multi-signature treasury for funding</li>
                            <li>• Immutable voting records</li>
                            <li>• Milestone-based fund releases</li>
                          </ul>
                        </div>
                        <Button
                          onClick={handleCreateDAO}
                          disabled={isCreating || !newDAOName.trim()}
                          className="w-full bg-gradient-to-r from-violet-500 to-purple-600"
                        >
                          {isCreating ? "Deploying..." : "Deploy DAO Contract"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {userDAOs.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="p-8 text-center">
                      <Vote className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                      <p className="text-muted-foreground">No DAOs yet. Create one to get started!</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {userDAOs.map((dao) => (
                      <Card
                        key={dao.id}
                        className={`cursor-pointer transition-all hover:border-violet-500/50 ${
                          selectedDAOId === dao.id 
                            ? "border-violet-500 bg-violet-500/5" 
                            : ""
                        }`}
                        onClick={() => setSelectedDAOId(dao.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{dao.name}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {dao.description || "No description"}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mt-3">
                                <Badge variant="secondary" className="text-xs">
                                  <Users className="w-3 h-3 mr-1" />
                                  {dao.members.length}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  <Vote className="w-3 h-3 mr-1" />
                                  {dao.proposals.filter(p => p.status === "active").length} active
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  <Coins className="w-3 h-3 mr-1" />
                                  {dao.treasury.balance} ETH
                                </Badge>
                              </div>
                            </div>
                            
                            <ChevronRight className={`w-5 h-5 text-muted-foreground transition-colors ${
                              selectedDAOId === dao.id ? "text-violet-500" : ""
                            }`} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* DAO Details Panel */}
              <div className="lg:col-span-2">
                {!selectedDAO ? (
                  <Card className="h-full flex items-center justify-center border-dashed">
                    <CardContent className="p-12 text-center">
                      <Vote className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                      <h3 className="text-xl font-semibold mb-2">Select a DAO</h3>
                      <p className="text-muted-foreground">
                        Choose a DAO from the list to view proposals, treasury, and members.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {/* DAO Header */}
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h2 className="text-2xl font-bold">{selectedDAO.name}</h2>
                            <p className="text-muted-foreground">{selectedDAO.description}</p>
                          </div>
                          <Badge className="bg-violet-500/20 text-violet-600 border-violet-500/30">
                            <Shield className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                        
                        {/* Members */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground mr-2">Members:</span>
                          {selectedDAO.members.slice(0, 6).map((member, i) => (
                            <div
                              key={member.address}
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                member.role === "founder" 
                                  ? "bg-gradient-to-br from-amber-500 to-orange-600" 
                                  : member.role === "advisor"
                                  ? "bg-gradient-to-br from-emerald-500 to-green-600"
                                  : "bg-gradient-to-br from-violet-500 to-purple-600"
                              }`}
                              style={{ marginLeft: i > 0 ? "-8px" : "0", zIndex: 10 - i }}
                              title={`${member.name} (${member.role})`}
                            >
                              {member.role === "founder" ? <Crown className="w-4 h-4" /> : member.name[0]}
                            </div>
                          ))}
                          {selectedDAO.members.length > 6 && (
                            <span className="text-sm text-muted-foreground ml-2">
                              +{selectedDAO.members.length - 6} more
                            </span>
                          )}
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Plus className="w-4 h-4 mr-1" />
                            Invite
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Tabs for Proposals and Treasury */}
                    <Tabs defaultValue="proposals" className="w-full">
                      <TabsList className="w-full">
                        <TabsTrigger value="proposals" className="flex-1">
                          <Vote className="w-4 h-4 mr-2" />
                          Proposals
                        </TabsTrigger>
                        <TabsTrigger value="treasury" className="flex-1">
                          <Coins className="w-4 h-4 mr-2" />
                          Treasury
                        </TabsTrigger>
                        <TabsTrigger value="members" className="flex-1">
                          <Users className="w-4 h-4 mr-2" />
                          Members
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="proposals" className="mt-4">
                        <DAOVotingPanel daoId={selectedDAO.id} />
                      </TabsContent>
                      
                      <TabsContent value="treasury" className="mt-4">
                        <TreasuryPanel daoId={selectedDAO.id} />
                      </TabsContent>
                      
                      <TabsContent value="members" className="mt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Users className="w-5 h-5 text-violet-500" />
                              Team Members
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {selectedDAO.members.map((member) => (
                                <div
                                  key={member.address}
                                  className="flex items-center justify-between p-4 rounded-xl border border-border"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                                      member.role === "founder" 
                                        ? "bg-gradient-to-br from-amber-500 to-orange-600" 
                                        : member.role === "advisor"
                                        ? "bg-gradient-to-br from-emerald-500 to-green-600"
                                        : "bg-gradient-to-br from-violet-500 to-purple-600"
                                    }`}>
                                      {member.role === "founder" ? <Crown className="w-5 h-5" /> : member.name[0]}
                                    </div>
                                    <div>
                                      <div className="font-semibold">{member.name}</div>
                                      <div className="text-sm text-muted-foreground font-mono">
                                        {member.address.slice(0, 6)}...{member.address.slice(-4)}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <Badge className={
                                      member.role === "founder" 
                                        ? "bg-amber-500/20 text-amber-600 border-amber-500/30"
                                        : member.role === "advisor"
                                        ? "bg-emerald-500/20 text-emerald-600 border-emerald-500/30"
                                        : "bg-violet-500/20 text-violet-600 border-violet-500/30"
                                    }>
                                      {member.role}
                                    </Badge>
                                    <div className="text-right">
                                      <div className="text-sm font-semibold">{member.votingPower}%</div>
                                      <div className="text-xs text-muted-foreground">Voting Power</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default DAOManagement;
