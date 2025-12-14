import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface VerificationToken {
  id: string;
  courseId: string;
  courseName: string;
  grade: string;
  verifiedAt: Date;
  txHash: string;
}

interface DAOProject {
  id: string;
  name: string;
  description: string;
  members: DAOMember[];
  proposals: DAOProposal[];
  treasury: {
    balance: number;
    currency: string;
    transactions: TreasuryTransaction[];
  };
  createdAt: Date;
}

interface DAOMember {
  address: string;
  name: string;
  role: "founder" | "member" | "advisor";
  votingPower: number;
  joinedAt: Date;
}

interface DAOProposal {
  id: string;
  title: string;
  description: string;
  type: "direction" | "role" | "funding" | "milestone";
  status: "active" | "passed" | "rejected" | "executed";
  votes: { for: number; against: number; abstain: number };
  deadline: Date;
  createdBy: string;
  createdAt: Date;
}

interface TreasuryTransaction {
  id: string;
  type: "deposit" | "withdrawal" | "milestone_release";
  amount: number;
  description: string;
  approvedBy: string[];
  txHash: string;
  createdAt: Date;
}

interface BlockchainContextType {
  // Wallet
  walletAddress: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  
  // Verification
  verificationTokens: VerificationToken[];
  isVerifying: boolean;
  requestVerification: (courseId: string, courseName: string) => Promise<boolean>;
  hasVerifiedCourse: (courseId: string) => boolean;
  
  // DAOs
  userDAOs: DAOProject[];
  createDAO: (name: string, description: string) => Promise<DAOProject>;
  joinDAO: (daoId: string) => Promise<boolean>;
  createProposal: (daoId: string, proposal: Omit<DAOProposal, "id" | "status" | "votes" | "createdAt">) => Promise<boolean>;
  vote: (daoId: string, proposalId: string, vote: "for" | "against" | "abstain") => Promise<boolean>;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

// Simulated delay for blockchain operations
const simulateBlockchainDelay = () => new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

// Generate fake transaction hash
const generateTxHash = () => "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [verificationTokens, setVerificationTokens] = useState<VerificationToken[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [userDAOs, setUserDAOs] = useState<DAOProject[]>([]);

  // Check for existing wallet connection
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.on) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error("MetaMask not installed! Please install MetaMask extension.");
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        toast.success("Wallet connected successfully!");
      }
    } catch (error: any) {
      if (error.code === 4001) {
        toast.error("Connection rejected by user");
      } else {
        toast.error("Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setVerificationTokens([]);
    toast.info("Wallet disconnected");
  };

  const requestVerification = async (courseId: string, courseName: string): Promise<boolean> => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return false;
    }

    setIsVerifying(true);
    try {
      // Simulate Oracle query to university system
      toast.info("🔮 Oracle querying university database...");
      await simulateBlockchainDelay();

      // Simulate verification (80% success rate for demo)
      const isVerified = Math.random() > 0.2;

      if (isVerified) {
        // Simulate smart contract issuing token
        toast.info("📝 Smart Contract issuing verification token...");
        await simulateBlockchainDelay();

        const grades = ["26/30", "27/30", "28/30", "29/30", "30/30", "30L/30"];
        const randomGrade = grades[Math.floor(Math.random() * grades.length)];

        const newToken: VerificationToken = {
          id: `vt-${Date.now()}`,
          courseId,
          courseName,
          grade: randomGrade,
          verifiedAt: new Date(),
          txHash: generateTxHash()
        };

        setVerificationTokens(prev => [...prev, newToken]);
        toast.success("✅ Verification successful! Token issued to your wallet.");
        return true;
      } else {
        toast.error("❌ Verification failed. Course attendance not confirmed.");
        return false;
      }
    } catch (error) {
      toast.error("Verification process failed");
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const hasVerifiedCourse = (courseId: string): boolean => {
    return verificationTokens.some(token => token.courseId === courseId);
  };

  const createDAO = async (name: string, description: string): Promise<DAOProject> => {
    if (!walletAddress) {
      throw new Error("Wallet not connected");
    }

    toast.info("🏗️ Deploying DAO smart contract...");
    await simulateBlockchainDelay();

    const newDAO: DAOProject = {
      id: `dao-${Date.now()}`,
      name,
      description,
      members: [{
        address: walletAddress,
        name: "You",
        role: "founder",
        votingPower: 100,
        joinedAt: new Date()
      }],
      proposals: [],
      treasury: {
        balance: 0,
        currency: "ETH",
        transactions: []
      },
      createdAt: new Date()
    };

    setUserDAOs(prev => [...prev, newDAO]);
    toast.success("🎉 DAO created successfully!");
    return newDAO;
  };

  const joinDAO = async (daoId: string): Promise<boolean> => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return false;
    }

    toast.info("📝 Joining DAO...");
    await simulateBlockchainDelay();

    setUserDAOs(prev => prev.map(dao => {
      if (dao.id === daoId) {
        return {
          ...dao,
          members: [...dao.members, {
            address: walletAddress,
            name: "New Member",
            role: "member" as const,
            votingPower: 10,
            joinedAt: new Date()
          }]
        };
      }
      return dao;
    }));

    toast.success("Welcome to the DAO!");
    return true;
  };

  const createProposal = async (
    daoId: string, 
    proposal: Omit<DAOProposal, "id" | "status" | "votes" | "createdAt">
  ): Promise<boolean> => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return false;
    }

    toast.info("📋 Creating proposal on-chain...");
    await simulateBlockchainDelay();

    const newProposal: DAOProposal = {
      ...proposal,
      id: `prop-${Date.now()}`,
      status: "active",
      votes: { for: 0, against: 0, abstain: 0 },
      createdAt: new Date()
    };

    setUserDAOs(prev => prev.map(dao => {
      if (dao.id === daoId) {
        return {
          ...dao,
          proposals: [...dao.proposals, newProposal]
        };
      }
      return dao;
    }));

    toast.success("Proposal created successfully!");
    return true;
  };

  const vote = async (daoId: string, proposalId: string, voteType: "for" | "against" | "abstain"): Promise<boolean> => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return false;
    }

    toast.info("🗳️ Recording vote on-chain...");
    await simulateBlockchainDelay();

    setUserDAOs(prev => prev.map(dao => {
      if (dao.id === daoId) {
        return {
          ...dao,
          proposals: dao.proposals.map(prop => {
            if (prop.id === proposalId) {
              const newVotes = { ...prop.votes };
              newVotes[voteType] += 1;
              return { ...prop, votes: newVotes };
            }
            return prop;
          })
        };
      }
      return dao;
    }));

    toast.success("Vote recorded!");
    return true;
  };

  return (
    <BlockchainContext.Provider value={{
      walletAddress,
      isConnecting,
      connectWallet,
      disconnectWallet,
      verificationTokens,
      isVerifying,
      requestVerification,
      hasVerifiedCourse,
      userDAOs,
      createDAO,
      joinDAO,
      createProposal,
      vote
    }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error("useBlockchain must be used within a BlockchainProvider");
  }
  return context;
};
