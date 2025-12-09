import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, DollarSign, Zap, BarChart3, HelpCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard Home',
    href: '/',
    icon: Home,
    description: 'Executive summary and key metrics'
  },
  {
    title: 'Fault Diagnosis',
    href: '/fault-diagnosis',
    icon: Activity,
    description: 'Analyze charger failures and errors'
  },
  {
    title: 'Cost Analysis',
    href: '/cost-analysis',
    icon: DollarSign,
    description: 'Calculate revenue loss from downtime'
  },
  {
    title: 'Predictive Failure',
    href: '/predictive',
    icon: Zap,
    description: 'Identify at-risk chargers before failure'
  },
  {
    title: 'Performance Analytics',
    href: '/performance-analytics',
    icon: BarChart3,
    description: 'Site and charger performance metrics'
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-sidebar text-sidebar-foreground animate-slide-in">
      <div className="flex h-full flex-col">
        {/* Logo & Branding */}
        <div className="border-b border-border/50 p-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-smooth group-hover:scale-110">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">FoloCharge</h1>
              <p className="text-xs text-muted-foreground">v1.0</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          <TooltipProvider>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Tooltip key={item.href} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-premium'
                          : 'text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>

        {/* Footer Links */}
        <div className="border-t border-border/50 p-4 space-y-1">
          <Link
            to="/help"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-hover transition-smooth"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help & Documentation</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-hover transition-smooth"
          >
            <Info className="h-4 w-4" />
            <span>About FoloCharge</span>
          </Link>
          <div className="mt-4 px-3 text-xs text-muted-foreground">
            <p>Built by <span className="font-semibold text-accent">Folonite</span></p>
          </div>
        </div>
      </div>
    </aside>
  );
}
