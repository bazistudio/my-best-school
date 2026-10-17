"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Badge } from "@/components/ui";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  const getPageTitle = () => {
    if (pathname === "/") return "Executive Overview";
    if (pathname.startsWith("/organization")) return "Organization & Campus Management";
    if (pathname.startsWith("/settings")) return "System Settings & Configuration";
    return "Universal School Platform";
  };

  return (
    <header className="h-16 bg-[var(--surface-base)]/80 backdrop-blur-md border-b border-[var(--border-subtle)] sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8">
      {/* Left side: Mobile Toggle + Breadcrumb / Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] font-medium">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
              Platform
            </Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)] capitalize">
              {pathname === "/" ? "Home" : pathname.replace("/", "")}
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[var(--foreground)] font-heading tracking-tight leading-tight">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Right side: Session status / Campus Context / User state */}
      <div className="flex items-center gap-3">
        <Badge variant="neutral" className="hidden sm:inline-flex text-[11px]">
          Campus: All Authorized
        </Badge>

        {/* Auth / Identity State display without fabrication */}
        {isAuthenticated && user ? (
          <div className="flex items-center gap-2.5 pl-3 border-l border-[var(--border-subtle)]">
            <div className="h-7 w-7 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-semibold">
              {user.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="hidden md:block text-left text-xs">
              <span className="font-semibold block leading-tight text-[var(--foreground)]">{user.name}</span>
              <span className="text-[10px] text-[var(--text-muted)] block leading-tight">{user.role}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 pl-3 border-l border-[var(--border-subtle)]">
            <Badge variant="warning" className="text-[10px] gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-warning)]" />
              Auth Baseline Pending
            </Badge>
          </div>
        )}
      </div>
    </header>
  );
};
