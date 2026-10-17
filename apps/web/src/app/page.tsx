import Link from "next/link";
import { getActiveSchoolConfig } from "@universal-school/config";
import { Card, Badge, Button } from "@/components/ui";

export default function Home() {
  const config = getActiveSchoolConfig();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-[var(--radius-2xl)] bg-[var(--surface-base)] border border-[var(--border-subtle)] backdrop-blur-sm relative overflow-hidden shadow-xl">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="primary" size="sm">
              Phase 01 Active
            </Badge>
            <Badge variant="success" size="sm">
              Session: {config.academicYear}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] font-heading tracking-tight mb-2">
            Welcome to {config.school.name}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            Universal multi-branch school administration console. Manage campus networks,
            institutional profiles, and operational parameters from a single foundation.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/organization">
              <Button variant="primary" size="md">
                Manage Campuses & Branches →
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Foundation Status & Campus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Campuses Overview */}
        <Card variant="elevated">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[var(--foreground)] font-heading">
              Authorized Campuses
            </h2>
            <Badge variant="neutral">
              {config.branches.length} Registered
            </Badge>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-4">
            Active branches connected to this institutional deployment:
          </p>
          <ul className="space-y-2 text-xs">
            {config.branches.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between p-2.5 rounded-[var(--radius-lg)] bg-[var(--surface-base)] border border-[var(--border-subtle)]"
              >
                <div>
                  <span className="font-semibold text-[var(--foreground)] block">{b.name}</span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">[{b.code}]</span>
                </div>
                {b.isMain ? (
                  <Badge variant="warning" size="sm">Main Campus</Badge>
                ) : (
                  <Badge variant="neutral" size="sm">Branch</Badge>
                )}
              </li>
            ))}
          </ul>
        </Card>

        {/* Card 2: Institutional Parameters */}
        <Card variant="elevated">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[var(--foreground)] font-heading">
              Regional Parameters
            </h2>
            <Badge variant="success">Active</Badge>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-4">
            Localization, currency, and academic calendar parameters:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-[var(--radius-lg)] bg-[var(--surface-base)] border border-[var(--border-subtle)]">
              <span className="text-[var(--text-secondary)]">Standard Currency</span>
              <span className="font-mono text-[var(--color-success)] font-bold">{config.currency}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-[var(--radius-lg)] bg-[var(--surface-base)] border border-[var(--border-subtle)]">
              <span className="text-[var(--text-secondary)]">System Locale</span>
              <span className="font-mono text-[var(--foreground)]">{config.locale}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-[var(--radius-lg)] bg-[var(--surface-base)] border border-[var(--border-subtle)]">
              <span className="text-[var(--text-secondary)]">Institution Code</span>
              <span className="font-mono text-[var(--text-muted)]">{config.school.shortName}</span>
            </div>
          </div>
        </Card>

        {/* Card 3: Foundation Architecture */}
        <Card variant="elevated">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[var(--foreground)] font-heading">
              Foundation Governance
            </h2>
            <Badge variant="neutral">Baseline v1.0</Badge>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-4">
            Design tokens and domain decoupling guarantees:
          </p>
          <div className="space-y-2 text-xs text-[var(--text-secondary)]">
            <div className="p-2.5 rounded-[var(--radius-lg)] bg-[var(--surface-base)] border border-[var(--border-subtle)]">
              <span className="text-[var(--foreground)] font-medium block">Database Independence</span>
              <span className="text-[11px] text-[var(--text-muted)]">In-memory active; SQLite & PostgreSQL portable.</span>
            </div>
            <div className="p-2.5 rounded-[var(--radius-lg)] bg-[var(--surface-base)] border border-[var(--border-subtle)]">
              <span className="text-[var(--foreground)] font-medium block">Design System v1.0</span>
              <span className="text-[11px] text-[var(--text-muted)]">Token-only palette and shared UI primitives.</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
