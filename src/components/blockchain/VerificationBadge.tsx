import { Shield, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBlockchain } from "@/contexts/BlockchainContext";

interface VerificationBadgeProps {
  courseId: string;
  courseName: string;
  compact?: boolean;
}

const VerificationBadge = ({ courseId, courseName, compact = false }: VerificationBadgeProps) => {
  const { walletAddress, isVerifying, requestVerification, hasVerifiedCourse, verificationTokens } = useBlockchain();
  
  const isVerified = hasVerifiedCourse(courseId);
  const token = verificationTokens.find(t => t.courseId === courseId);

  if (isVerified && token) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 ${compact ? 'text-xs' : 'text-sm'}`}>
            <ShieldCheck className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-emerald-500`} />
            <span className="font-semibold text-emerald-600">Verified Student</span>
            <span className="text-emerald-500/80">({token.grade})</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold text-emerald-500">✅ Blockchain Verified</p>
            <p className="text-xs text-muted-foreground">
              This review is backed by cryptographic proof of course attendance.
            </p>
            <div className="text-xs font-mono bg-muted/50 p-2 rounded truncate">
              TX: {token.txHash.slice(0, 20)}...
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  if (!walletAddress) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border ${compact ? 'text-xs' : 'text-sm'}`}>
            <Shield className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-muted-foreground`} />
            <span className="text-muted-foreground">Unverified</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Connect wallet to verify your student status
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => requestVerification(courseId, courseName)}
      disabled={isVerifying}
      className="gap-2 border-amber-500/30 text-amber-600 hover:bg-amber-500/10"
    >
      {isVerifying ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Verifying...
        </>
      ) : (
        <>
          <Shield className="w-4 h-4" />
          Verify Attendance
        </>
      )}
    </Button>
  );
};

export default VerificationBadge;
