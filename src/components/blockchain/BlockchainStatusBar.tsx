import { Shield, Vote, Coins, Activity, Wallet } from "lucide-react";
import { useBlockchain } from "@/contexts/BlockchainContext";

const BlockchainStatusBar = () => {
  const { walletAddress, verificationTokens, userDAOs } = useBlockchain();

  if (!walletAddress) return null;

  const totalTreasury = userDAOs.reduce((acc, dao) => acc + (dao.treasury.balance || 0.35), 0);
  const activeProposals = userDAOs.reduce((acc, dao) => 
    acc + dao.proposals.filter(p => p.status === "active").length, 0
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-violet-900/95 to-purple-900/95 backdrop-blur-md border-t border-violet-500/20 py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-white/80">Connected to Ethereum</span>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-6 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
              <span>{verificationTokens.length} Verified</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-violet-400">
              <Vote className="w-3.5 h-3.5" />
              <span>{userDAOs.length} DAOs</span>
            </div>
            
            {activeProposals > 0 && (
              <div className="flex items-center gap-1.5 text-amber-400">
                <Activity className="w-3.5 h-3.5" />
                <span>{activeProposals} Active Votes</span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5 text-amber-400">
              <Coins className="w-3.5 h-3.5" />
              <span>{totalTreasury.toFixed(2)} ETH Treasury</span>
            </div>
          </div>
        </div>

        {/* Network Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
          <div className="w-2 h-2 bg-violet-400 rounded-full" />
          Ethereum Mainnet
        </div>
      </div>
    </div>
  );
};

export default BlockchainStatusBar;
