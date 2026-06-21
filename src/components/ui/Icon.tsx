import {
  LayoutDashboard, BarChart3, Package, Wallet, FileText,
  HelpCircle, LogOut, Menu, Search, Bell, Settings,
  RefreshCw, Zap, ShieldCheck, Clock, Network, TrendingUp,
  PlusCircle, CheckCircle2, ArrowRight, SlidersHorizontal,
  Gauge, Timer, Cpu, Shield, X, Scale, AlertTriangle,
  RefreshCcw, Leaf, Diamond, Droplets, ChevronRight,
  FilePlus, Download, GitBranch, Wifi,
  type LucideIcon
} from 'lucide-react';

/**
 * Mapping nama ikon Material ke komponen Lucide React (SVG).
 * SVG render instan tanpa font shaping = performa jauh lebih baik.
 */
const iconMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  analytics: BarChart3,
  inventory_2: Package,
  inventory: Package,
  account_balance_wallet: Wallet,
  description: FileText,
  help: HelpCircle,
  logout: LogOut,
  menu: Menu,
  search: Search,
  notifications: Bell,
  settings: Settings,
  refresh: RefreshCw,
  bolt: Zap,
  verified_user: ShieldCheck,
  schedule: Clock,
  lan: Network,
  trending_up: TrendingUp,
  add_circle: PlusCircle,
  task_alt: CheckCircle2,
  arrow_forward: ArrowRight,
  tune: SlidersHorizontal,
  speed: Gauge,
  lock_clock: Timer,
  memory: Cpu,
  security: Shield,
  close: X,
  gavel: Scale,
  sync_problem: AlertTriangle,
  update: RefreshCcw,
  eco: Leaf,
  diamond: Diamond,
  water_drop: Droplets,
  chevron_right: ChevronRight,
  note_add: FilePlus,
  download: Download,
  account_tree: GitBranch,
  check_circle: CheckCircle2,
  warning: AlertTriangle,
  hub: Wifi,
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

/**
 * Komponen Icon universal — pengganti material-icons-outlined.
 * Menggunakan Lucide React SVG untuk rendering instan tanpa font overhead.
 */
export const Icon = ({ name, className = '', size = 20 }: IconProps) => {
  const LucideIcon = iconMap[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon size={size} className={className} />;
};

export default Icon;
