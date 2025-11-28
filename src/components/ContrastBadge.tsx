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
        "flex items-center gap-1 text-[10px] font-mono bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-full text-white shadow-sm border border-white/10",
        className
      )}
      title={`WCAG Ratio: ${formatRatio(ratio)} (AA: ${
        aa ? "Pass" : "Fail"
      }, AAA: ${aaa ? "Pass" : "Fail"})\nAPCA: ${formatAPCA(
        apca
      )} (${apcaLevel})`}
    >
      <Icon size={10} className={statusColor} />
      <span>{formatRatio(ratio)}</span>
      <span className="opacity-40 mx-0.5">|</span>
      <span className="text-[9px] opacity-80" title={`APCA: ${apcaLevel}`}>
        Lc {Math.round(Math.abs(apca))}
      </span>
      {aaa && <span className="text-[9px] opacity-70 ml-0.5">AAA</span>}
      {!aaa && aa && <span className="text-[9px] opacity-70 ml-0.5">AA</span>}
    </div>
  );
}
