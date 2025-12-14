import { Wallet, ChevronDown, LogOut, Shield, Vote, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBlockchain } from "@/contexts/BlockchainContext";

const WalletButton = () => {
  const { walletAddress, isConnecting, connectWallet, disconnectWallet, verificationTokens, userDAOs } = useBlockchain();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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
          <p className="text-xs text-muted-foreground">Connected Wallet</p>
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
        </div>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={disconnectWallet}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect Wallet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletButton;
