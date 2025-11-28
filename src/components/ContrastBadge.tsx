import {
  getContrastResult,
  formatRatio,
  formatAPCA,
} from "@/lib/color/accessibility";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContrastBadgeProps {
  bgColor: string;
  fgColor: string;
  className?: string;
}

export default function ContrastBadge({
  bgColor,
  fgColor,
  className,
}: ContrastBadgeProps) {
  const result = getContrastResult(bgColor, fgColor);
  const { ratio, aa, aaa, apca, apcaLevel } = result;

  // Pass if WCAG AA (4.5) OR APCA Lc >= 60 (Large Text/Button)
  // Since we are using pure black/white, if this fails, the background is just difficult.
  const isPass = aa || Math.abs(apca) >= 60;

  let statusColor = "text-red-400";
  let Icon = X;

  if (aaa || Math.abs(apca) >= 75) {
    statusColor = "text-green-400";
    Icon = Check;
  } else if (isPass) {
    statusColor = "text-yellow-400"; // Warning/OK
    Icon = Check;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-[10px] font-mono bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-white shadow-sm border border-white/10 w-[100px]",
        className
      )}
      title={`WCAG Ratio: ${formatRatio(ratio)} (AA: ${
        aa ? "Pass" : "Fail"
      }, AAA: ${aaa ? "Pass" : "Fail"})\nAPCA: ${formatAPCA(
        apca
      )} (${apcaLevel})`}
    >
      <Icon size={12} className={statusColor} />
      <div className="flex flex-col leading-none gap-0.5 items-start">
        <div className="flex items-center gap-1">
          <span className="font-bold">{formatRatio(ratio)}</span>
          <span className="opacity-40">|</span>
          <span className="opacity-90">{aaa ? "AAA" : aa ? "AA" : "-"}</span>
        </div>
        <div className="text-[9px] opacity-70">
          Lc {Math.round(Math.abs(apca))}
        </div>
      </div>
    </div>
  );
}
