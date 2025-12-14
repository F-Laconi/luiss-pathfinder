import { Shield, ShieldCheck, ShieldAlert, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ReviewVerificationBadgeProps {
  isVerified: boolean;
  grade?: string;
  txHash?: string;
  verifiedAt?: Date;
}

const ReviewVerificationBadge = ({ isVerified, grade, txHash, verifiedAt }: ReviewVerificationBadgeProps) => {
  if (isVerified) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 cursor-help">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600">Verified</span>
            {grade && (
              <span className="text-xs text-emerald-500/80">({grade})</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Blockchain Verified Student
            </div>
            <p className="text-xs text-muted-foreground">
              This reviewer's attendance and grade have been cryptographically verified via Oracle smart contract.
            </p>
            {txHash && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Transaction Hash:</p>
                <code className="text-xs font-mono bg-muted/50 px-2 py-1 rounded block truncate">
                  {txHash}
                </code>
              </div>
            )}
            {verifiedAt && (
              <p className="text-xs text-muted-foreground">
                Verified: {verifiedAt.toLocaleDateString()}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/50 border border-border cursor-help">
          <Shield className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Unverified</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground font-medium">
            <ShieldAlert className="w-4 h-4" />
            Not Blockchain Verified
          </div>
          <p className="text-xs text-muted-foreground">
            This reviewer has not verified their course attendance on the blockchain.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default ReviewVerificationBadge;
