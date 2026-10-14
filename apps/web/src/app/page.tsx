import { getActiveSchoolConfig } from "@universal-school/config";

export default function Home() {
  const config = getActiveSchoolConfig();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-8 font-sans">
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/20">
            {config.school.shortName.slice(0, 2)}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">{config.school.name}</h1>
            <p className="text-xs text-slate-400">{config.school.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Session: {config.academicYear}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Baseline v0.1.0
          </span>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto my-12">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-3">
            Universal School Platform
          </h2>
          <p className="text-slate-400 max-w-2xl text-base leading-relaxed">
            Multi-branch school administration system foundation. Shared architecture, clean domain boundaries,
            and zero hardcoded branding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 font-semibold text-sm">
              01
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">School & Branches</h3>
            <p className="text-sm text-slate-400 mb-4">
              Configured branches for this instance:
            </p>
            <ul className="space-y-2 text-xs">
              {config.branches.map((b) => (
                <li key={b.id} className="flex justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                  <span className="font-medium text-slate-200">{b.name}</span>
                  <span className="text-slate-500 font-mono">[{b.code}]</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <div className="h-8 w-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 font-semibold text-sm">
              02
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Regional Settings</h3>
            <p className="text-sm text-slate-400 mb-4">
              Configured localization and currency parameters:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400">Currency</span>
                <span className="font-mono text-emerald-400">{config.currency}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400">Locale</span>
                <span className="font-mono text-slate-200">{config.locale}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 font-semibold text-sm">
              03
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Baseline Architecture</h3>
            <p className="text-sm text-slate-400 mb-4">
              Modular domain boundaries ready for Phase 2:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {["Identity", "Students", "Admissions", "Attendance", "Fees", "Examinations"].map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded bg-slate-700/50 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl w-full mx-auto border-t border-slate-800 pt-6 text-xs text-slate-500 flex justify-between">
        <span>Universal School Platform · Master Baseline</span>
        <span>No active database connection required in Phase 1</span>
      </footer>
    </div>
  );
}
