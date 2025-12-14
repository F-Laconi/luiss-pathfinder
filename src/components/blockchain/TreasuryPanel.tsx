import { Coins, ArrowUpRight, ArrowDownLeft, Shield, Clock, CheckCircle2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlockchain } from "@/contexts/BlockchainContext";

interface TreasuryPanelProps {
  daoId: string;
}

const TreasuryPanel = ({ daoId }: TreasuryPanelProps) => {
  const { userDAOs, walletAddress } = useBlockchain();

  const dao = userDAOs.find(d => d.id === daoId);
  if (!dao) return null;

  // Mock some transactions for demo
  const mockTransactions = [
    {
      id: "tx-1",
      type: "deposit" as const,
      amount: 0.5,
      description: "University Grant - Phase 1",
      approvedBy: [walletAddress || "0x..."],
      txHash: "0x1a2b3c4d5e6f...",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: "tx-2",
      type: "milestone_release" as const,
      amount: 0.15,
      description: "MVP Development Complete",
      approvedBy: [walletAddress || "0x...", "0x987..."],
      txHash: "0x7g8h9i0j1k2l...",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];

  const transactions = dao.treasury.transactions.length > 0 
    ? dao.treasury.transactions 
    : mockTransactions;

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-4 h-4 text-emerald-500" />;
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case "milestone_release":
        return <CheckCircle2 className="w-4 h-4 text-violet-500" />;
      default:
        return <Coins className="w-4 h-4" />;
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Coins className="w-4 h-4 text-white" />
          </div>
          Multi-Sig Treasury
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Balance Display */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
          <div className="text-sm text-muted-foreground mb-1">Total Balance</div>
          <div className="text-4xl font-bold text-amber-600">
            {dao.treasury.balance || 0.35} <span className="text-lg font-normal">ETH</span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            ≈ ${((dao.treasury.balance || 0.35) * 3200).toLocaleString()} USD
          </div>
        </div>

        {/* Multi-Sig Info */}
        <div className="p-4 rounded-xl bg-muted/50 space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-500" />
            <span className="font-semibold">Multi-Signature Protection</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Fund withdrawals require approval from multiple team members, ensuring transparent and secure treasury management.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{dao.members.length} signers</span>
            </div>
            <div>
              Required: <span className="font-semibold text-violet-500">{Math.ceil(dao.members.length / 2)}/{dao.members.length}</span>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            Transaction History
          </h4>
          
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      {getTransactionIcon(tx.type)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{tx.description}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    tx.type === "deposit" ? "text-emerald-500" : 
                    tx.type === "withdrawal" ? "text-red-500" : 
                    "text-violet-500"
                  }`}>
                    {tx.type === "deposit" ? "+" : "-"}{tx.amount} ETH
                  </div>
                </div>
                
                {/* Approval Signatures */}
                <div className="mt-2 pt-2 border-t border-border/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Approved by: {tx.approvedBy.map(formatAddress).join(", ")}
                    </span>
                    <a 
                      href={`https://etherscan.io/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-500 hover:underline"
                    >
                      View TX →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <ArrowDownLeft className="w-4 h-4 mr-1" />
            Request Funds
          </Button>
          <Button variant="outline" className="flex-1">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Release Milestone
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreasuryPanel;
