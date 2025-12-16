import { useState } from "react";
import { Users, Plus, Vote, Wallet, ChevronRight, Crown, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBlockchain } from "@/contexts/BlockchainContext";

const DAOPanel = () => {
  const { walletAddress, connectWallet, userDAOs, createDAO } = useBlockchain();
  const [isCreating, setIsCreating] = useState(false);
  const [newDAOName, setNewDAOName] = useState("");
  const [newDAODescription, setNewDAODescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateDAO = async () => {
    if (!newDAOName.trim()) return;
    
    setIsCreating(true);
    try {
      await createDAO(newDAOName, newDAODescription);
      setNewDAOName("");
      setNewDAODescription("");
      setIsDialogOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  if (!walletAddress) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="p-5 sm:p-8 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
            <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-violet-500" />
          </div>
          <h3 className="font-bold text-base sm:text-lg mb-2">Connect Wallet to Access DAOs</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            Create or join DAOs for your student projects.
          </p>
          <Button onClick={connectWallet} className="bg-gradient-to-r from-violet-500 to-purple-600 h-9 sm:h-10 text-sm">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Vote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
          Your Project DAOs
        </CardTitle>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600 h-8 sm:h-9 text-xs sm:text-sm">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Create DAO
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-2 sm:mx-auto max-h-[90vh] overflow-y-auto">
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
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6">
        {userDAOs.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-muted-foreground">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No DAOs yet. Create one for your next project!</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {userDAOs.map((dao) => (
              <div
                key={dao.id}
                className="group p-3 sm:p-4 rounded-lg sm:rounded-xl border border-border hover:border-violet-500/50 hover:bg-violet-500/5 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                      <h4 className="font-semibold text-sm sm:text-base truncate">{dao.name}</h4>
                      <Badge variant="secondary" className="text-[10px] sm:text-xs">
                        {dao.members.length} member{dao.members.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{dao.description}</p>
                    
                    <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3 text-[10px] sm:text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Vote className="w-3 h-3" />
                        {dao.proposals.filter(p => p.status === "active").length} active
                      </span>
                      <span className="flex items-center gap-1">
                        <Crown className="w-3 h-3 text-amber-500" />
                        {dao.treasury.balance} {dao.treasury.currency}
                      </span>
                    </div>
                  </div>
                  
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-violet-500 transition-colors flex-shrink-0" />
                </div>

                {/* Members Preview */}
                <div className="flex items-center gap-0.5 sm:gap-1 mt-2 sm:mt-3">
                  {dao.members.slice(0, 4).map((member, i) => (
                    <div
                      key={member.address}
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white ${
                        member.role === "founder" 
                          ? "bg-gradient-to-br from-amber-500 to-orange-600" 
                          : "bg-gradient-to-br from-violet-500 to-purple-600"
                      }`}
                      style={{ marginLeft: i > 0 ? "-6px" : "0" }}
                      title={`${member.name} (${member.role})`}
                    >
                      {member.role === "founder" ? <Crown className="w-3 h-3 sm:w-4 sm:h-4" /> : member.name[0]}
                    </div>
                  ))}
                  {dao.members.length > 4 && (
                    <span className="text-[10px] sm:text-xs text-muted-foreground ml-1 sm:ml-2">
                      +{dao.members.length - 4}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DAOPanel;
