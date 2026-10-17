"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/lib/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FOUNDATION_NAVIGATION: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Organization & Campuses",
    href: "/organization",
  },
  {
    name: "Settings",
    href: "/settings/branches",
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[var(--surface-base)] border-r border-[var(--border-subtle)] flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-subtle)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-[var(--radius-lg)] bg-[var(--color-primary)] flex items-center justify-center font-bold text-sm text-[var(--color-primary-foreground)] shadow-md border border-[rgba(255,255,255,0.1)]">
              SU
            </div>
            <div>
              <span className="font-bold text-sm text-[var(--foreground)] tracking-tight font-heading block">
                School Universel
              </span>
              <span className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase block">
                Platform Core
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-[var(--text-muted)] hover:text-[var(--foreground)] p-1 rounded-[var(--radius-md)] hover:bg-[var(--surface-elevated)] transition-colors"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Foundation Core
          </div>

          {FOUNDATION_NAVIGATION.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-[var(--radius-lg)] text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)]"
                }`}
              >
                <span>{item.name}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-secondary)] shadow-sm" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] flex items-center justify-between">
          <span>Foundation v1.0</span>
          <span className="px-2 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[10px] font-mono">
            Phase 1
          </span>
        </div>
      </aside>
    </>
  );
};
