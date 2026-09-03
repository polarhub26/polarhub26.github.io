import {
  Award,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  Droplets,
  Headphones,
  MessageCircleMore,
  PackageCheck,
  Printer,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  Trash2,
  UsersRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "../types";

// [GUIDE: ICONS] Sheet rows use the lowercase names listed in this map.
// Add a new imported icon and map entry before using a new name in Sheets.
const icons: Record<IconName, LucideIcon> = {
  printer: Printer,
  refresh: RefreshCcw,
  trash: Trash2,
  droplet: Droplets,
  messages: MessageCircleMore,
  wrench: Wrench,
  users: UsersRound,
  clock: Clock3,
  software: Code2,
  ink: Droplets,
  tools: Wrench,
  support: Headphones,
  calendar: CalendarDays,
  search: SearchCheck,
  check: CheckCircle2,
  package: PackageCheck,
  shield: ShieldCheck,
  award: Award,
  headphones: Headphones,
};

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  "aria-hidden"?: boolean;
}

export function Icon({ name, size = 24, strokeWidth = 2, className, ...rest }: IconProps) {
  const Component = icons[name] ?? Wrench;
  return <Component size={size} strokeWidth={strokeWidth} className={className} {...rest} />;
}
