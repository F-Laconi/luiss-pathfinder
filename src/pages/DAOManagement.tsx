import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Vote, Users, Coins, ArrowLeft, Plus, Crown, Shield, 
  Wallet, ChevronRight, Activity, Sparkles, Cpu, Network, 
  Hexagon, CircuitBoard, Zap, GitBranch, Box, Terminal
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
  const { walletAddress, connectWallet, userDAOs, createDAO, loadDemoData, isDemoMode } = useBlockchain();
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
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Animated Tech Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[200px]" />
        
        {/* Floating Tech Elements */}
        <div className="absolute top-40 left-20 opacity-20 animate-float">
          <Hexagon className="w-8 h-8 text-violet-400" />
        </div>
        <div className="absolute top-60 right-32 opacity-15 animate-float" style={{ animationDelay: '0.5s' }}>
          <CircuitBoard className="w-10 h-10 text-cyan-400" />
        </div>
        <div className="absolute bottom-40 left-40 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          <Network className="w-6 h-6 text-purple-400" />
        </div>
        <div className="absolute bottom-60 right-20 opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>
          <Cpu className="w-8 h-8 text-violet-400" />
        </div>
      </div>

      <Navigation />
      
      <main className="container mx-auto px-3 sm:px-4 pt-20 sm:pt-24 pb-16 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-10">
          <Link to="/business-partner">
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 border border-white/10 w-8 h-8 sm:w-10 sm:h-10">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30 flex-shrink-0">
                  <Box className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-3xl font-bold uppercase tracking-tight bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent truncate">
                    DAO MANAGEMENT
                  </h1>
                  <p className="text-white/50 text-xs sm:text-sm flex items-center gap-1 sm:gap-2 truncate">
                    <Terminal className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">Decentralized Organizations</span>
                  </p>
                </div>
              </div>
              {isDemoMode && (
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse self-start sm:ml-4 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Demo
                </Badge>
              )}
            </div>
          </div>
        </div>

        {!walletAddress ? (
          /* Connect Wallet Prompt */
          <div className="max-w-lg mx-auto px-2">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              
              <Card className="relative bg-[#12121a]/90 backdrop-blur-xl border-white/10">
                <CardContent className="p-6 sm:p-12 text-center">
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8">
                    {/* Animated Rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-violet-500/30 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-2 rounded-full border border-purple-500/40 animate-ping" style={{ animationDuration: '2.5s' }} />
                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-violet-500/40">
                      <Wallet className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                    </div>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                    Connect Your Wallet
                  </h2>
                  <p className="text-white/50 mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed">
                    Connect your Web3 wallet to access DAO management features.
                  </p>
                  
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <Button 
                      onClick={connectWallet} 
                      size="lg"
                      className="relative overflow-hidden bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 border-0 shadow-lg shadow-violet-500/30 group h-10 sm:h-12 text-sm sm:text-base"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <Wallet className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Connect Wallet
                    </Button>
                    
                    <div className="flex items-center gap-3 text-sm text-white/30">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <span className="uppercase text-xs tracking-wider">or explore</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                    
                    <Button 
                      onClick={loadDemoData} 
                      variant="outline"
                      size="lg"
                      className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50 bg-transparent h-10 sm:h-12 text-sm sm:text-base"
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Try Demo Mode
                    </Button>
                    <p className="text-xs text-white/30">
                      Explore with sample DAOs and data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-10">
              {[
                { icon: Vote, label: "Your DAOs", value: userDAOs.length, color: "violet", gradient: "from-violet-500 to-purple-600" },
                { icon: Activity, label: "Active Votes", value: activeProposals, color: "cyan", gradient: "from-cyan-500 to-blue-600" },
                { icon: Users, label: "Members", value: totalMembers, color: "emerald", gradient: "from-emerald-500 to-green-600" },
                { icon: Coins, label: "Proposals", value: totalProposals, color: "amber", gradient: "from-amber-500 to-orange-600" },
              ].map((stat, i) => (
                <div key={i} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity`} />
                  <Card className="relative bg-[#12121a]/80 backdrop-blur-xl border-white/10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 sm:w-20 h-12 sm:h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
                    <CardContent className="p-3 sm:p-5">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xl sm:text-3xl font-bold text-white">{stat.value}</div>
                          <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider truncate">{stat.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
              {/* DAO List Sidebar */}
              <div className="lg:col-span-1 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-violet-400" />
                    Your DAOs
                  </h2>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 border-0 shadow-lg shadow-violet-500/20 h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3">
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Create
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#12121a] border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-white">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <Vote className="w-5 h-5" />
                          </div>
                          Create New Project DAO
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-5 pt-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block text-white/70">Project Name</label>
                          <Input
                            placeholder="e.g., AI Startup Team Alpha"
                            value={newDAOName}
                            onChange={(e) => setNewDAOName(e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block text-white/70">Description</label>
                          <Textarea
                            placeholder="Describe your project and team goals..."
                            value={newDAODescription}
                            onChange={(e) => setNewDAODescription(e.target.value)}
                            rows={3}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500"
                          />
                        </div>
                        <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-xl p-4 border border-violet-500/20">
                          <p className="font-medium text-violet-300 mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            What you'll get:
                          </p>
                          <ul className="space-y-2 text-sm text-white/60">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                              On-chain governance for team decisions
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                              Multi-signature treasury for funding
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                              Immutable voting records
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                              Milestone-based fund releases
                            </li>
                          </ul>
                        </div>
                        <Button
                          onClick={handleCreateDAO}
                          disabled={isCreating || !newDAOName.trim()}
                          className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 border-0 shadow-lg shadow-violet-500/30"
                        >
                          {isCreating ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                              Deploying...
                            </>
                          ) : (
                            <>
                              <Cpu className="w-4 h-4 mr-2" />
                              Deploy DAO Contract
                            </>
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {userDAOs.length === 0 ? (
                  <Card className="border-dashed border-white/10 bg-[#12121a]/50">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/5 flex items-center justify-center">
                        <Vote className="w-8 h-8 text-white/30" />
                      </div>
                      <p className="text-white/50">No DAOs yet. Create one to get started!</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {userDAOs.map((dao) => (
                      <div key={dao.id} className="group relative">
                        {selectedDAOId === dao.id && (
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl blur opacity-40" />
                        )}
                        <Card
                          className={`relative cursor-pointer transition-all bg-[#12121a]/80 backdrop-blur-xl border-white/10 hover:border-violet-500/50 ${
                            selectedDAOId === dao.id ? "border-violet-500/70" : ""
                          }`}
                          onClick={() => setSelectedDAOId(dao.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                                    <Network className="w-4 h-4 text-violet-400" />
                                  </div>
                                  <h3 className="font-semibold text-white">{dao.name}</h3>
                                </div>
                                <p className="text-sm text-white/40 line-clamp-1 ml-10">
                                  {dao.description || "No description"}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mt-3 ml-10">
                                  <Badge className="bg-white/5 text-white/60 border-white/10 text-xs">
                                    <Users className="w-3 h-3 mr-1" />
                                    {dao.members.length}
                                  </Badge>
                                  <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs">
                                    <Vote className="w-3 h-3 mr-1" />
                                    {dao.proposals.filter(p => p.status === "active").length} active
                                  </Badge>
                                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">
                                    <Coins className="w-3 h-3 mr-1" />
                                    {dao.treasury.balance} ETH
                                  </Badge>
                                </div>
                              </div>
                              
                              <ChevronRight className={`w-5 h-5 transition-all ${
                                selectedDAOId === dao.id ? "text-violet-400 translate-x-1" : "text-white/30"
                              }`} />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DAO Details Panel */}
              <div className="lg:col-span-2">
                {!selectedDAO ? (
                  <Card className="h-full flex items-center justify-center border-dashed border-white/10 bg-[#12121a]/50 min-h-[400px]">
                    <CardContent className="p-12 text-center">
                      <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-2xl bg-white/5 animate-pulse" />
                        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center border border-white/10">
                          <Vote className="w-12 h-12 text-white/20" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Select a DAO</h3>
                      <p className="text-white/40">
                        Choose a DAO from the list to view proposals, treasury, and members.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {/* DAO Header */}
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/50 via-purple-500/50 to-cyan-500/50 rounded-xl blur opacity-30" />
                      <Card className="relative bg-[#12121a]/90 backdrop-blur-xl border-white/10 overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full" />
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                <Network className="w-7 h-7 text-white" />
                              </div>
                              <div>
                                <h2 className="text-2xl font-bold text-white">{selectedDAO.name}</h2>
                                <p className="text-white/50">{selectedDAO.description}</p>
                              </div>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                              <Shield className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          </div>
                          
                          {/* Members */}
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-sm text-white/40 mr-2">Members:</span>
                            <div className="flex -space-x-2">
                              {selectedDAO.members.slice(0, 6).map((member, i) => (
                                <div
                                  key={member.address}
                                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-[#12121a] ${
                                    member.role === "founder" 
                                      ? "bg-gradient-to-br from-amber-500 to-orange-600" 
                                      : member.role === "advisor"
                                      ? "bg-gradient-to-br from-emerald-500 to-green-600"
                                      : "bg-gradient-to-br from-violet-500 to-purple-600"
                                  }`}
                                  style={{ zIndex: 10 - i }}
                                  title={`${member.name} (${member.role})`}
                                >
                                  {member.role === "founder" ? <Crown className="w-4 h-4" /> : member.name[0]}
                                </div>
                              ))}
                            </div>
                            {selectedDAO.members.length > 6 && (
                              <span className="text-sm text-white/40 ml-2">
                                +{selectedDAO.members.length - 6} more
                              </span>
                            )}
                            <Button variant="ghost" size="sm" className="ml-auto text-violet-400 hover:text-violet-300 hover:bg-violet-500/10">
                              <Plus className="w-4 h-4 mr-1" />
                              Invite
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Tabs for Proposals and Treasury */}
                    <Tabs defaultValue="proposals" className="w-full">
                      <TabsList className="w-full bg-[#12121a]/80 border border-white/10 p-1 rounded-xl grid grid-cols-3 h-auto">
                        <TabsTrigger 
                          value="proposals" 
                          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg text-white/60 text-xs sm:text-sm py-2 px-1 sm:px-4"
                        >
                          <Vote className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Proposals</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="treasury" 
                          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg text-white/60 text-xs sm:text-sm py-2 px-1 sm:px-4"
                        >
                          <Coins className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Treasury</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="members" 
                          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg text-white/60 text-xs sm:text-sm py-2 px-1 sm:px-4"
                        >
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Members</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="proposals" className="mt-6">
                        <DAOVotingPanel daoId={selectedDAO.id} />
                      </TabsContent>
                      
                      <TabsContent value="treasury" className="mt-6">
                        <TreasuryPanel daoId={selectedDAO.id} />
                      </TabsContent>
                      
                      <TabsContent value="members" className="mt-6">
                        <Card className="bg-[#12121a]/80 backdrop-blur-xl border-white/10">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-white">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                                <Users className="w-5 h-5 text-violet-400" />
                              </div>
                              Team Members
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {selectedDAO.members.map((member) => (
                                <div
                                  key={member.address}
                                  className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 transition-all"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${
                                      member.role === "founder" 
                                        ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30" 
                                        : member.role === "advisor"
                                        ? "bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/30"
                                        : "bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/30"
                                    }`}>
                                      {member.role === "founder" ? <Crown className="w-5 h-5" /> : member.name[0]}
                                    </div>
                                    <div>
                                      <div className="font-semibold text-white">{member.name}</div>
                                      <div className="text-sm text-white/40 font-mono">
                                        {member.address.slice(0, 6)}...{member.address.slice(-4)}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4">
                                    <Badge className={
                                      member.role === "founder" 
                                        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                        : member.role === "advisor"
                                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                        : "bg-violet-500/20 text-violet-400 border-violet-500/30"
                                    }>
                                      {member.role}
                                    </Badge>
                                    <div className="text-right">
                                      <div className="text-sm font-semibold text-white">{member.votingPower}%</div>
                                      <div className="text-xs text-white/40">Voting Power</div>
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
