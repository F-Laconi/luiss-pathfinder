import { Link } from "react-router-dom";
import { Wallet, ChevronDown, LogOut, Shield, Vote, Bell, ArrowRight, User, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBlockchain } from "@/contexts/BlockchainContext";

const WalletButton = () => {
  const { 
    walletAddress, 
    isConnecting, 
    connectWallet, 
    disconnectWallet, 
    verificationTokens, 
    userDAOs,
    isDemoMode,
    demoUser,
    demoLogout
  } = useBlockchain();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Calculate active proposals across all DAOs
  const activeProposals = userDAOs.reduce(
    (acc, dao) => acc + dao.proposals.filter(p => p.status === "active").length,
    0
  );

  // Get recent proposals for notification preview (last 3)
  const recentProposals = userDAOs
    .flatMap(dao => dao.proposals.filter(p => p.status === "active").map(p => ({ ...p, daoName: dao.name, daoId: dao.id })))
    .slice(0, 3);

  if (!walletAddress) {
    return (
      <Button
        onClick={connectWallet}
        disabled={isConnecting}
        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
          alt="MetaMask" 
          className="w-5 h-5"
        />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Demo Mode User Profile */}
      {isDemoMode && demoUser && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-3 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <Avatar className="w-9 h-9 border-2 border-white/30">
                <AvatarImage src={demoUser.avatar} alt={demoUser.name} />
                <AvatarFallback className="bg-white/20 text-white font-bold">{demoUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-bold text-white">{demoUser.name.split(' ')[0]}</span>
                <span className="text-xs text-white/70">Demo Mode</span>
              </div>
              <ChevronDown className="w-4 h-4 text-white/80" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-card border-border">
            <div className="px-3 py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={demoUser.avatar} alt={demoUser.name} />
                  <AvatarFallback>{demoUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{demoUser.name}</p>
                    <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30 text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Demo
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{demoUser.email}</p>
                </div>
              </div>
            </div>
            
            <div className="px-3 py-3 space-y-2 border-b border-border">
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{demoUser.university}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{demoUser.program} • Year {demoUser.year}</span>
              </div>
            </div>

            <div className="px-3 py-2 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  Verified Courses
                </span>
                <span className="font-bold text-emerald-500">{verificationTokens.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Vote className="w-4 h-4 text-violet-500" />
                  Active DAOs
                </span>
                <span className="font-bold text-violet-500">{userDAOs.length}</span>
              </div>
            </div>

            <DropdownMenuSeparator />
            
            <Link to="/profile">
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                View Profile
              </DropdownMenuItem>
            </Link>
            
            <DropdownMenuItem 
              onClick={demoLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Exit Demo Mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Notification Bell */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="w-5 h-5" />
            {activeProposals > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {activeProposals}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 bg-card border-border">
          <div className="px-3 py-2 border-b border-border flex items-center justify-between">
            <span className="font-semibold flex items-center gap-2">
              <Vote className="w-4 h-4 text-violet-500" />
              DAO Activity
            </span>
            {activeProposals > 0 && (
              <Badge className="bg-violet-500/20 text-violet-600 border-violet-500/30">
                {activeProposals} pending
              </Badge>
            )}
          </div>
          
          {recentProposals.length === 0 ? (
            <div className="px-3 py-6 text-center text-muted-foreground">
              <Vote className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No active proposals</p>
            </div>
          ) : (
            <div className="py-1">
              {recentProposals.map((proposal) => (
                <Link key={proposal.id} to="/dao-management">
                  <DropdownMenuItem className="cursor-pointer p-3 hover:bg-violet-500/5">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">
                          {proposal.type === "direction" ? "🎯" : 
                           proposal.type === "role" ? "👥" : 
                           proposal.type === "funding" ? "💰" : "🏁"}
                        </span>
                        <span className="font-medium text-sm line-clamp-1">{proposal.title}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{proposal.daoName}</span>
                        <span className="text-violet-500">Vote now →</span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </Link>
              ))}
            </div>
          )}
          
          <DropdownMenuSeparator />
          <Link to="/dao-management">
            <DropdownMenuItem className="cursor-pointer justify-center text-violet-600 hover:text-violet-700">
              View All DAOs
              <ArrowRight className="w-4 h-4 ml-1" />
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Wallet Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg gap-2"
          >
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
              alt="MetaMask" 
              className="w-4 h-4"
            />
            {formatAddress(walletAddress)}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-card border-border">
          <div className="px-3 py-2 border-b border-border">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Connected Wallet</p>
              {isDemoMode && (
                <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30 text-xs">Demo</Badge>
              )}
            </div>
            <p className="font-mono text-sm truncate">{walletAddress}</p>
          </div>
          
          <div className="px-3 py-2 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4 text-emerald-500" />
                Verified Courses
              </span>
              <span className="font-bold text-emerald-500">{verificationTokens.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Vote className="w-4 h-4 text-violet-500" />
                Active DAOs
              </span>
              <span className="font-bold text-violet-500">{userDAOs.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Bell className="w-4 h-4 text-amber-500" />
                Pending Votes
              </span>
              <span className="font-bold text-amber-500">{activeProposals}</span>
            </div>
          </div>

          <DropdownMenuSeparator />
          
          <Link to="/dao-management">
            <DropdownMenuItem className="cursor-pointer">
              <Vote className="w-4 h-4 mr-2 text-violet-500" />
              DAO Dashboard
            </DropdownMenuItem>
          </Link>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={isDemoMode ? demoLogout : disconnectWallet}
            className="text-destructive focus:text-destructive cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {isDemoMode ? "Exit Demo Mode" : "Disconnect Wallet"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default WalletButton;
