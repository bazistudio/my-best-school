import Link from "next/link";
import { getActiveSchoolConfig } from "@universal-school/config";
import { Card, Badge, Button } from "@/components/ui";

export default function Home() {
  const config = getActiveSchoolConfig();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between p-8 font-sans">
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-[var(--radius-xl)] bg-[var(--color-primary)] flex items-center justify-center font-bold text-lg text-[var(--color-primary-foreground)] shadow-lg shadow-[rgba(0,41,107,0.3)] border border-[rgba(255,255,255,0.1)]">
            {config.school.shortName.slice(0, 2)}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[var(--foreground)] font-heading">{config.school.name}</h1>
            <p className="text-xs text-[var(--text-secondary)]">{config.school.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/organization">
            <Button variant="primary" size="sm">
              Launch Organization Portal →
            </Button>
          </Link>
          <Badge variant="success">
            Session: {config.academicYear}
          </Badge>
          <Badge variant="neutral">
            Design System v1.0
          </Badge>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto my-12">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl mb-3 font-heading">
            School Universel Platform
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl text-base leading-relaxed">
            Multi-branch school administration system foundation. Powered by universal design tokens,
            shared UI primitives, and zero hardcoded branding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="h-8 w-8 rounded-[var(--radius-md)] bg-[rgba(0,41,107,0.25)] text-blue-300 flex items-center justify-center mb-4 font-semibold text-xs border border-[rgba(0,41,107,0.4)]">
              01
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 font-heading">School & Branches</h3>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Configured branches for this instance:
            </p>
            <ul className="space-y-2 text-xs">
              {config.branches.map((b) => (
                <li key={b.id} className="flex justify-between p-2 rounded-[var(--radius-md)] bg-[var(--surface-base)] border border-[var(--border-subtle)]">
                  <span className="font-medium text-[var(--foreground)]">{b.name}</span>
                  <span className="text-[var(--text-muted)] font-mono">[{b.code}]</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="h-8 w-8 rounded-[var(--radius-md)] bg-[var(--color-success-subtle)] text-emerald-400 flex items-center justify-center mb-4 font-semibold text-xs border border-[var(--color-success-border)]">
              02
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 font-heading">Regional Settings</h3>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Configured localization and currency parameters:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-[var(--radius-md)] bg-[var(--surface-base)] border border-[var(--border-subtle)]">
                <span className="text-[var(--text-secondary)]">Currency</span>
                <span className="font-mono text-[var(--color-success)] font-semibold">{config.currency}</span>
              </div>
              <div className="flex justify-between p-2 rounded-[var(--radius-md)] bg-[var(--surface-base)] border border-[var(--border-subtle)]">
                <span className="text-[var(--text-secondary)]">Locale</span>
                <span className="font-mono text-[var(--foreground)]">{config.locale}</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="h-8 w-8 rounded-[var(--radius-md)] bg-[var(--color-warning-subtle)] text-amber-300 flex items-center justify-center mb-4 font-semibold text-xs border border-[var(--color-warning-border)]">
              03
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 font-heading">Design Tokens</h3>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Single-source palette applied across all 22 modules:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2 py-0.5 rounded bg-[var(--color-primary)] text-white font-medium">Primary</span>
              <span className="px-2 py-0.5 rounded bg-[var(--color-secondary)] text-white font-medium">Secondary</span>
              <span className="px-2 py-0.5 rounded bg-[var(--color-success)] text-white font-medium">Success</span>
              <span className="px-2 py-0.5 rounded bg-[var(--color-warning)] text-black font-medium">Warning</span>
              <span className="px-2 py-0.5 rounded bg-[var(--color-error)] text-white font-medium">Error</span>
            </div>
          </Card>
        </div>
      </main>

      <footer className="max-w-6xl w-full mx-auto border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] flex justify-between">
        <span>School Universel Platform · Master Baseline</span>
        <span>Standardized Design System Foundation v1.0</span>
      </footer>
    </div>
  );
}
