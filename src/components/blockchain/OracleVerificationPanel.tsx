import { useState } from "react";
import { Shield, Database, FileCheck, Wallet, ArrowRight, CheckCircle2, XCircle, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBlockchain } from "@/contexts/BlockchainContext";

interface OracleVerificationPanelProps {
  courseId: string;
  courseName: string;
  onVerified?: () => void;
}

type VerificationStep = "idle" | "connecting" | "querying" | "validating" | "issuing" | "complete" | "failed";

const OracleVerificationPanel = ({ courseId, courseName, onVerified }: OracleVerificationPanelProps) => {
  const { walletAddress, connectWallet, requestVerification, hasVerifiedCourse, loadDemoData, isDemoMode } = useBlockchain();
  const [currentStep, setCurrentStep] = useState<VerificationStep>("idle");
  
  const isVerified = hasVerifiedCourse(courseId);

  const steps = [
    { id: "connecting", label: "Connect Wallet", icon: Wallet, description: "Link your anonymous wallet" },
    { id: "querying", label: "Oracle Query", icon: Database, description: "Query university database" },
    { id: "validating", label: "Smart Contract", icon: FileCheck, description: "Validate credentials" },
    { id: "issuing", label: "Issue Token", icon: Shield, description: "Mint verification NFT" },
  ];

  const handleVerify = async () => {
    if (!walletAddress) {
      setCurrentStep("connecting");
      await connectWallet();
      setCurrentStep("idle");
      return;
    }

    setCurrentStep("querying");
    await new Promise(r => setTimeout(r, 1500));
    
    setCurrentStep("validating");
    await new Promise(r => setTimeout(r, 1500));
    
    setCurrentStep("issuing");
    const success = await requestVerification(courseId, courseName);
    
    if (success) {
      setCurrentStep("complete");
      onVerified?.();
    } else {
      setCurrentStep("failed");
    }
  };

  const getStepStatus = (stepId: string) => {
    const stepOrder = ["connecting", "querying", "validating", "issuing"];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (currentStep === "complete") return "complete";
    if (currentStep === "failed" && stepIndex <= currentIndex) return "failed";
    if (stepIndex < currentIndex) return "complete";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  if (isVerified) {
    return (
      <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-emerald-600">Verification Complete</h3>
              <p className="text-sm text-muted-foreground">
                Your attendance for "{courseName}" is cryptographically verified.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-b border-border">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="block">Oracle Verification System</span>
            <span className="text-sm font-normal text-muted-foreground">Blockchain-powered student verification</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Process Visualization */}
        <div className="relative">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const Icon = step.icon;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    status === "complete" ? "bg-gradient-to-br from-emerald-500 to-teal-500" :
                    status === "active" ? "bg-gradient-to-br from-violet-500 to-purple-600 animate-pulse" :
                    status === "failed" ? "bg-gradient-to-br from-red-500 to-rose-600" :
                    "bg-muted"
                  }`}>
                    {status === "active" ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : status === "complete" ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : status === "failed" ? (
                      <XCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 ${status === "pending" ? "text-muted-foreground" : "text-white"}`} />
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium text-center ${
                    status === "active" ? "text-violet-500" :
                    status === "complete" ? "text-emerald-500" :
                    status === "failed" ? "text-red-500" :
                    "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute -right-8 top-4 w-4 h-4 text-muted-foreground/50" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center p-4 rounded-xl bg-muted/50">
          {currentStep === "idle" && (
            <p className="text-sm text-muted-foreground">
              Verify your course attendance anonymously using blockchain technology. 
              Your wallet address cannot be traced back to your identity.
            </p>
          )}
          {currentStep === "querying" && (
            <p className="text-sm text-violet-500 animate-pulse">
              🔮 Oracle querying university database for enrollment records...
            </p>
          )}
          {currentStep === "validating" && (
            <p className="text-sm text-violet-500 animate-pulse">
              📝 Smart contract validating credentials and grade data...
            </p>
          )}
          {currentStep === "issuing" && (
            <p className="text-sm text-violet-500 animate-pulse">
              🎫 Minting verification token to your wallet...
            </p>
          )}
          {currentStep === "complete" && (
            <p className="text-sm text-emerald-500">
              ✅ Verification complete! You can now leave verified reviews.
            </p>
          )}
          {currentStep === "failed" && (
            <p className="text-sm text-red-500">
              ❌ Verification failed. Course attendance could not be confirmed.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {currentStep !== "complete" && (
          <div className="space-y-3">
            <Button
              onClick={handleVerify}
              disabled={currentStep !== "idle" && currentStep !== "failed"}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
            >
              {!walletAddress ? (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet to Verify
                </>
              ) : currentStep === "idle" || currentStep === "failed" ? (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Start Verification
                </>
              ) : (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              )}
            </Button>
            
            {!walletAddress && !isDemoMode && (
              <>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex-1 h-px bg-border" />
                  <span>or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <Button
                  onClick={loadDemoData}
                  variant="outline"
                  className="w-full border-amber-500/30 text-amber-600 hover:bg-amber-500/10"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Try Demo Mode
                </Button>
              </>
            )}
          </div>
        )}

        {/* Privacy Notice */}
        <p className="text-xs text-center text-muted-foreground">
          🔒 Your identity remains anonymous. Only your wallet address is linked to the verification token.
        </p>
      </CardContent>
    </Card>
  );
};

export default OracleVerificationPanel;
