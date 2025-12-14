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

interface DemoUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  university: string;
  program: string;
  year: number;
  joinedAt: Date;
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
  
  // Demo
  loadDemoData: () => void;
  isDemoMode: boolean;
  demoUser: DemoUser | null;
  demoLogout: () => void;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

// Simulated delay for blockchain operations
const simulateBlockchainDelay = () => new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

// Generate fake transaction hash
const generateTxHash = () => "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

// Generate fake wallet address
const generateDemoWallet = () => "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

// Demo data
const createDemoDAOs = (walletAddress: string): DAOProject[] => [
  {
    id: "demo-dao-1",
    name: "AI Startup Team Alpha",
    description: "Building the next generation of AI-powered educational tools for university students.",
    members: [
      { address: walletAddress, name: "You", role: "founder", votingPower: 40, joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      { address: generateDemoWallet(), name: "Marco R.", role: "member", votingPower: 25, joinedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
      { address: generateDemoWallet(), name: "Sofia L.", role: "member", votingPower: 25, joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },
      { address: generateDemoWallet(), name: "Prof. Bianchi", role: "advisor", votingPower: 10, joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) }
    ],
    proposals: [
      {
        id: "demo-prop-1",
        title: "Pivot to B2B Enterprise Market",
        description: "Shift our focus from B2C to B2B enterprise clients for better revenue potential.",
        type: "direction",
        status: "active",
        votes: { for: 2, against: 1, abstain: 0 },
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        createdBy: walletAddress,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: "demo-prop-2",
        title: "Hire Part-time UX Designer",
        description: "Allocate 0.1 ETH from treasury to hire a UX design student for 3 months.",
        type: "funding",
        status: "active",
        votes: { for: 3, against: 0, abstain: 1 },
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        createdBy: generateDemoWallet(),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: "demo-prop-3",
        title: "MVP Launch Milestone Complete",
        description: "Approve release of milestone 1 funds after successful MVP deployment.",
        type: "milestone",
        status: "passed",
        votes: { for: 4, against: 0, abstain: 0 },
        deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        createdBy: walletAddress,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      }
    ],
    treasury: {
      balance: 0.85,
      currency: "ETH",
      transactions: [
        { id: "tx-1", type: "deposit", amount: 1.0, description: "University Innovation Grant", approvedBy: [walletAddress], txHash: generateTxHash(), createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },
        { id: "tx-2", type: "milestone_release", amount: 0.15, description: "MVP Development Complete", approvedBy: [walletAddress, generateDemoWallet()], txHash: generateTxHash(), createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) }
      ]
    },
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: "demo-dao-2",
    name: "Green Campus Initiative",
    description: "Student-led sustainability project to reduce campus carbon footprint by 30%.",
    members: [
      { address: walletAddress, name: "You", role: "member", votingPower: 20, joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
      { address: generateDemoWallet(), name: "Elena V.", role: "founder", votingPower: 35, joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000) },
      { address: generateDemoWallet(), name: "Luca M.", role: "member", votingPower: 25, joinedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000) },
      { address: generateDemoWallet(), name: "Giulia P.", role: "member", votingPower: 20, joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    ],
    proposals: [
      {
        id: "demo-prop-4",
        title: "Partner with Local Recycling Company",
        description: "Establish partnership with EcoRecycle SRL for campus waste management.",
        type: "direction",
        status: "active",
        votes: { for: 1, against: 0, abstain: 0 },
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdBy: generateDemoWallet(),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ],
    treasury: {
      balance: 0.25,
      currency: "ETH",
      transactions: [
        { id: "tx-3", type: "deposit", amount: 0.25, description: "Sustainability Fund Allocation", approvedBy: [generateDemoWallet()], txHash: generateTxHash(), createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) }
      ]
    },
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
  }
];

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [verificationTokens, setVerificationTokens] = useState<VerificationToken[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [userDAOs, setUserDAOs] = useState<DAOProject[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);

  const loadDemoData = () => {
    const demoWallet = generateDemoWallet();
    setWalletAddress(demoWallet);
    setUserDAOs(createDemoDAOs(demoWallet));
    setVerificationTokens([
      {
        id: "demo-token-1",
        courseId: "ug-5-0",
        courseName: "Political Philosophy",
        grade: "28/30",
        verifiedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        txHash: generateTxHash()
      },
      {
        id: "demo-token-2",
        courseId: "1-0-0",
        courseName: "Corporate Finance",
        grade: "30L/30",
        verifiedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        txHash: generateTxHash()
      }
    ]);
    setDemoUser({
      id: "demo-user-001",
      email: "francesco.laconi@studenti.luiss.it",
      name: "Francesco Laconi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Francesco",
      university: "LUISS Guido Carli",
      program: "Economics and Business",
      year: 3,
      joinedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
    });
    setIsDemoMode(true);
    toast.success("🎮 Demo Mode Activated!", {
      description: "Logged in as Francesco Laconi with sample DAOs, proposals, and verified courses.",
      duration: 5000
    });
  };

  const demoLogout = () => {
    setWalletAddress(null);
    setUserDAOs([]);
    setVerificationTokens([]);
    setDemoUser(null);
    setIsDemoMode(false);
    toast.info("Demo session ended", {
      description: "All demo data has been cleared."
    });
  };

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

    const dao = userDAOs.find(d => d.id === daoId);
    toast.info("📋 Creating proposal on-chain...", {
      description: `Submitting to ${dao?.name || "DAO"}...`
    });
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

    const typeEmoji = proposal.type === "direction" ? "🎯" : 
                      proposal.type === "role" ? "👥" : 
                      proposal.type === "funding" ? "💰" : "🏁";

    toast.success(`${typeEmoji} New Proposal Created!`, {
      description: `"${proposal.title}" is now open for voting in ${dao?.name}`,
      duration: 5000,
      action: {
        label: "View",
        onClick: () => window.location.href = "/dao-management"
      }
    });
    return true;
  };

  const vote = async (daoId: string, proposalId: string, voteType: "for" | "against" | "abstain"): Promise<boolean> => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return false;
    }

    const dao = userDAOs.find(d => d.id === daoId);
    const proposal = dao?.proposals.find(p => p.id === proposalId);

    toast.info("🗳️ Recording vote on-chain...", {
      description: `Voting ${voteType.toUpperCase()} on "${proposal?.title}"`
    });
    await simulateBlockchainDelay();

    let updatedProposal: DAOProposal | undefined;

    setUserDAOs(prev => prev.map(dao => {
      if (dao.id === daoId) {
        return {
          ...dao,
          proposals: dao.proposals.map(prop => {
            if (prop.id === proposalId) {
              const newVotes = { ...prop.votes };
              newVotes[voteType] += 1;
              updatedProposal = { ...prop, votes: newVotes };
              return updatedProposal;
            }
            return prop;
          })
        };
      }
      return dao;
    }));

    const voteEmoji = voteType === "for" ? "✅" : voteType === "against" ? "❌" : "⚪";
    const totalVotes = updatedProposal ? 
      updatedProposal.votes.for + updatedProposal.votes.against + updatedProposal.votes.abstain : 0;

    toast.success(`${voteEmoji} Vote Recorded!`, {
      description: `You voted ${voteType.toUpperCase()} • Total votes: ${totalVotes}`,
      duration: 4000
    });
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
      vote,
      loadDemoData,
      isDemoMode,
      demoUser,
      demoLogout
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
