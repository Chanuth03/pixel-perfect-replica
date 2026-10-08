import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, AlertTriangle, ShoppingBag, Bug, GitPullRequestArrow, HardDrive, BookOpen, ClipboardList,
  Search, Bell, ChevronDown, Menu, X, Settings, LogOut, User, Headset,
} from "lucide-react";
import { Avatar } from "./Badges";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/incidents", label: "Incidents", icon: AlertTriangle, count: 24 },
  { to: "/jobs", label: "Jobs", icon: ClipboardList },
  { to: "/catalog", label: "Service Catalog", icon: ShoppingBag },
  { to: "/problems", label: "Problem", icon: Bug },
  { to: "/changes", label: "Change", icon: GitPullRequestArrow },
  { to: "/assets", label: "Assets", icon: HardDrive },
  { to: "/knowledge", label: "Knowledge Base", icon: BookOpen },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [notif, setNotif] = useState(false);

  return (
    <div className="min-h-screen">
      {open && <div className="fixed inset-0 z-30 bg-foreground/40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Headset size={17} /></span>
          <span className="font-bold tracking-tight">Servio<span className="text-sidebar-muted font-medium"> ITSM</span></span>
          <button className="ml-auto lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          <p className="px-3 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">Modules</p>
          {nav.map(({ to, label, icon: Icon, ...rest }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              activeOptions={{ exact: to === "/" }}
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-foreground">
              <Icon size={17} className="group-data-[status=active]:text-primary" />
              <span className="flex-1">{label}</span>
              {"count" in rest && <span className="rounded-md bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">{rest.count}</span>}
            </Link>
          ))}
        </nav>
        <div className="m-3 rounded-lg bg-sidebar-accent p-3 text-xs">
          <p className="font-semibold">SLA health</p>
          <div className="mt-2 h-1.5 rounded-full bg-sidebar-border"><div className="h-full w-[92%] rounded-full bg-success" /></div>
          <p className="mt-1.5 text-sidebar-muted">92% within target this week</p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-card/85 px-4 backdrop-blur sm:px-6">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
          <div className="relative min-w-0 flex-1 max-w-xl">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search tickets, assets, articles…" className="input-field pl-9 bg-muted border-transparent" />
            <kbd className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border bg-card px-1.5 font-mono text-[10px] text-muted-foreground sm:block">⌘K</kbd>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <div className="relative">
              <button onClick={() => { setNotif(!notif); setProfile(false); }} className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-muted" aria-label="Notifications">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
              </button>
              {notif && (
                <div className="card-surface rise absolute right-0 mt-2 w-80 p-2">
                  <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Notifications</p>
                  {["INC-10481 breached response SLA", "CHG-2201 awaiting your approval", "Sarah Chen commented on INC-10482"].map((n) => (
                    <div key={n} className="rounded-md px-2 py-2 text-sm hover:bg-muted">{n}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => { setProfile(!profile); setNotif(false); }} className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-muted">
                <Avatar name="Nimal Perera" className="h-8 w-8" />
                <span className="hidden text-left text-sm leading-tight sm:block"><span className="block font-semibold">Nimal Perera</span><span className="text-xs text-muted-foreground">Service Manager</span></span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </button>
              {profile && (
                <div className="card-surface rise absolute right-0 mt-2 w-48 p-1.5 text-sm">
                  {[[User, "My profile"], [Settings, "Settings"]].map(([I, l]: any) => (
                    <button key={l} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 hover:bg-muted"><I size={15} />{l}</button>
                  ))}
                  <Link to="/login" className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 hover:bg-muted"><LogOut size={15} />Sign out</Link>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
