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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Vote className="w-5 h-5 text-violet-500" />
          Governance Proposals
        </CardTitle>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              New Proposal
            </Button>
          </DialogTrigger>
          <DialogContent>
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
      
      <CardContent>
        {dao.proposals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Vote className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No proposals yet. Create one to start governance!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dao.proposals.map((proposal) => {
              const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
              const forPercent = totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0;
              const againstPercent = totalVotes > 0 ? (proposal.votes.against / totalVotes) * 100 : 0;
              
              return (
                <div
                  key={proposal.id}
                  className="p-4 rounded-xl border border-border"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getTypeIcon(proposal.type)}</span>
                        <h4 className="font-semibold">{proposal.title}</h4>
                        {getStatusBadge(proposal.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{proposal.description}</p>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-emerald-500">For: {proposal.votes.for}</span>
                      <span className="text-red-500">Against: {proposal.votes.against}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden flex">
                      <div 
                        className="bg-emerald-500 transition-all" 
                        style={{ width: `${forPercent}%` }} 
                      />
                      <div 
                        className="bg-red-500 transition-all" 
                        style={{ width: `${againstPercent}%` }} 
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Ends: {new Date(proposal.deadline).toLocaleDateString()}
                      </span>
                      <span>{totalVotes} total votes</span>
                    </div>
                  </div>

                  {/* Voting Buttons */}
                  {proposal.status === "active" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10"
                        onClick={() => handleVote(proposal.id, "for")}
                        disabled={votingProposalId === proposal.id}
                      >
                        {votingProposalId === proposal.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ThumbsUp className="w-4 h-4 mr-1" />
                        )}
                        For
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-500/30 text-red-600 hover:bg-red-500/10"
                        onClick={() => handleVote(proposal.id, "against")}
                        disabled={votingProposalId === proposal.id}
                      >
                        {votingProposalId === proposal.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ThumbsDown className="w-4 h-4 mr-1" />
                        )}
                        Against
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleVote(proposal.id, "abstain")}
                        disabled={votingProposalId === proposal.id}
                      >
                        {votingProposalId === proposal.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Minus className="w-4 h-4 mr-1" />
                        )}
                        Abstain
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
