import { useState } from "react";
import { Vote, ThumbsUp, ThumbsDown, Minus, Clock, CheckCircle2, XCircle, Plus, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBlockchain } from "@/contexts/BlockchainContext";

interface DAOVotingPanelProps {
  daoId: string;
}

const DAOVotingPanel = ({ daoId }: DAOVotingPanelProps) => {
  const { userDAOs, vote, createProposal, walletAddress } = useBlockchain();
  const [votingProposalId, setVotingProposalId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    type: "direction" as const,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdBy: walletAddress || ""
  });

  const dao = userDAOs.find(d => d.id === daoId);
  if (!dao) return null;

  const handleVote = async (proposalId: string, voteType: "for" | "against" | "abstain") => {
    setVotingProposalId(proposalId);
    await vote(daoId, proposalId, voteType);
    setVotingProposalId(null);
  };

  const handleCreateProposal = async () => {
    if (!newProposal.title.trim()) return;
    
    await createProposal(daoId, {
      ...newProposal,
      createdBy: walletAddress || ""
    });
    
    setNewProposal({
      title: "",
      description: "",
      type: "direction",
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdBy: walletAddress || ""
    });
    setIsDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Active</Badge>;
      case "passed":
        return <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">Passed</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-600 border-red-500/30">Rejected</Badge>;
      case "executed":
        return <Badge className="bg-violet-500/20 text-violet-600 border-violet-500/30">Executed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "direction": return "🎯";
      case "role": return "👥";
      case "funding": return "💰";
      case "milestone": return "🏁";
      default: return "📋";
    }
  };

  return (
    <Card className="bg-[#12121a]/80 backdrop-blur-xl border-white/10">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-white text-base sm:text-lg">
          <Vote className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />
          Governance Proposals
        </CardTitle>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-8 text-xs sm:text-sm">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              New Proposal
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-2 sm:mx-auto bg-card border-border max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Proposal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Proposal Type</label>
                <Select
                  value={newProposal.type}
                  onValueChange={(value: any) => setNewProposal(p => ({ ...p, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direction">🎯 Project Direction</SelectItem>
                    <SelectItem value="role">👥 Role Division</SelectItem>
                    <SelectItem value="funding">💰 Funding Request</SelectItem>
                    <SelectItem value="milestone">🏁 Milestone Approval</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  placeholder="e.g., Pivot to B2B market strategy"
                  value={newProposal.title}
                  onChange={(e) => setNewProposal(p => ({ ...p, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Explain your proposal in detail..."
                  value={newProposal.description}
                  onChange={(e) => setNewProposal(p => ({ ...p, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <Button
                onClick={handleCreateProposal}
                disabled={!newProposal.title.trim()}
                className="w-full"
              >
                Submit Proposal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6">
        {dao.proposals.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-muted-foreground">
            <Vote className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm sm:text-base">No proposals yet. Create one to start!</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {dao.proposals.map((proposal) => {
              const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
              const forPercent = totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0;
              const againstPercent = totalVotes > 0 ? (proposal.votes.against / totalVotes) * 100 : 0;
              
              return (
                <div
                  key={proposal.id}
                  className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 sm:mb-3 gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                        <span className="text-base sm:text-lg">{getTypeIcon(proposal.type)}</span>
                        <h4 className="font-semibold text-sm sm:text-base text-white truncate">{proposal.title}</h4>
                        {getStatusBadge(proposal.status)}
                      </div>
                      <p className="text-xs sm:text-sm text-white/60 line-clamp-2">{proposal.description}</p>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    <div className="flex justify-between text-[10px] sm:text-xs">
                      <span className="text-emerald-400">For: {proposal.votes.for}</span>
                      <span className="text-red-400">Against: {proposal.votes.against}</span>
                    </div>
                    <div className="h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden flex">
                      <div 
                        className="bg-emerald-500 transition-all" 
                        style={{ width: `${forPercent}%` }} 
                      />
                      <div 
                        className="bg-red-500 transition-all" 
                        style={{ width: `${againstPercent}%` }} 
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {new Date(proposal.deadline).toLocaleDateString()}
                      </span>
                      <span>{totalVotes} votes</span>
                    </div>
                  </div>

                  {/* Voting Buttons */}
                  {proposal.status === "active" && (
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 h-8 sm:h-9 text-xs sm:text-sm px-1 sm:px-3"
                        onClick={() => handleVote(proposal.id, "for")}
                        disabled={votingProposalId === proposal.id}
                      >
                        {votingProposalId === proposal.id ? (
                          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                        ) : (
                          <>
                            <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                            <span className="hidden sm:inline">For</span>
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 h-8 sm:h-9 text-xs sm:text-sm px-1 sm:px-3"
                        onClick={() => handleVote(proposal.id, "against")}
                        disabled={votingProposalId === proposal.id}
                      >
                        {votingProposalId === proposal.id ? (
                          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                        ) : (
                          <>
                            <ThumbsDown className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                            <span className="hidden sm:inline">Against</span>
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white/60 hover:bg-white/10 h-8 sm:h-9 text-xs sm:text-sm px-1 sm:px-3"
                        onClick={() => handleVote(proposal.id, "abstain")}
                        disabled={votingProposalId === proposal.id}
                      >
                        {votingProposalId === proposal.id ? (
                          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                        ) : (
                          <>
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                            <span className="hidden sm:inline">Abstain</span>
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DAOVotingPanel;
