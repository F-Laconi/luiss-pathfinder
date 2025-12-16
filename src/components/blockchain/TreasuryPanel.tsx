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
    <Card className="bg-[#12121a]/80 backdrop-blur-xl border-white/10">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-white text-base sm:text-lg">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
          Multi-Sig Treasury
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6 pt-0 space-y-4 sm:space-y-6">
        {/* Balance Display */}
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
          <div className="text-xs sm:text-sm text-white/60 mb-1">Total Balance</div>
          <div className="text-2xl sm:text-4xl font-bold text-amber-400">
            {dao.treasury.balance || 0.35} <span className="text-sm sm:text-lg font-normal">ETH</span>
          </div>
          <div className="text-xs sm:text-sm text-white/50 mt-1">
            ≈ ${((dao.treasury.balance || 0.35) * 3200).toLocaleString()} USD
          </div>
        </div>

        {/* Multi-Sig Info */}
        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
            <span className="font-semibold text-white text-sm sm:text-base">Multi-Signature Protection</span>
          </div>
          <p className="text-xs sm:text-sm text-white/60">
            Withdrawals require multiple team approvals.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1 text-white/70">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{dao.members.length} signers</span>
            </div>
            <div className="text-white/70">
              Required: <span className="font-semibold text-violet-400">{Math.ceil(dao.members.length / 2)}/{dao.members.length}</span>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-white text-sm sm:text-base">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white/50" />
            Transaction History
          </h4>
          
          <div className="space-y-2 sm:space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-2.5 sm:p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      {getTransactionIcon(tx.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-xs sm:text-sm text-white truncate">{tx.description}</div>
                      <div className="text-[10px] sm:text-xs text-white/50 mt-0.5">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold text-xs sm:text-sm flex-shrink-0 ${
                    tx.type === "deposit" ? "text-emerald-400" : 
                    tx.type === "withdrawal" ? "text-red-400" : 
                    "text-violet-400"
                  }`}>
                    {tx.type === "deposit" ? "+" : "-"}{tx.amount} ETH
                  </div>
                </div>
                
                {/* Approval Signatures */}
                <div className="mt-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs">
                    <span className="text-white/50 truncate mr-2">
                      {tx.approvedBy.map(formatAddress).join(", ")}
                    </span>
                    <a 
                      href={`https://etherscan.io/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:underline flex-shrink-0"
                    >
                      View →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-9 sm:h-10 text-xs sm:text-sm">
            <ArrowDownLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Request
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-9 sm:h-10 text-xs sm:text-sm">
            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Release
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreasuryPanel;
