import type { ReactNode } from "react";
import type { ProjectVisual as Kind } from "@/content/profile";

/** Decorative, code-drawn previews for projects that don't have screenshots yet. */
export function ProjectVisual({ kind }: { kind: Kind }) {
  const Visual = VISUALS[kind];
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-bg font-mono text-[10px] text-subtle select-none sm:aspect-[16/10]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(28rem_16rem_at_80%_0%,var(--glow),transparent_70%)]" />
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="relative h-full p-4 sm:p-5">
        <Visual />
      </div>
    </div>
  );
}

function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-lg border border-border-strong bg-bg-elev/90 shadow-lg shadow-black/10 ${className}`}>
      {children}
    </div>
  );
}

function Line({ w, strong }: { w: string; strong?: boolean }) {
  return <div className={`h-1.5 rounded-full ${strong ? "bg-fg/30" : "bg-fg/12"}`} style={{ width: w }} />;
}

function Tempo() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const blocks: Array<[number, number, number, string]> = [
    // day, top %, height %, label
    [0, 8, 22, "Gym"],
    [0, 55, 26, "Docs"],
    [1, 30, 30, "ML"],
    [2, 10, 18, "Call"],
    [2, 62, 22, "Gym"],
    [3, 20, 36, "Focus"],
    [4, 48, 24, "Gym"],
  ];
  return (
    <div className="flex h-full items-stretch gap-3">
      <Panel className="flex w-[34%] flex-col gap-2 p-3">
        <span className="text-accent">brain_dump.txt</span>
        <span className="truncate text-fg/70">gym 3x this week</span>
        <span className="truncate text-fg/70">finish the report</span>
        <span className="truncate text-fg/70">study for ML exam</span>
        <span className="hidden truncate text-fg/70 sm:block">call the bank</span>
        <span className="hidden truncate text-fg/70 sm:block">2h deep work</span>
        <span className="mt-auto flex items-center gap-1 text-accent">
          plan my week <span className="caret">▍</span>
        </span>
      </Panel>
      <div className="grid w-6 place-items-center text-base text-accent">→</div>
      <Panel className="flex flex-1 flex-col p-3">
        <div className="grid grid-cols-5 gap-1.5 pb-2">
          {days.map((d) => (
            <span key={d} className="text-center">
              {d}
            </span>
          ))}
        </div>
        <div className="relative grid flex-1 grid-cols-5 gap-1.5">
          {days.map((d, i) => (
            <div key={d} className="relative rounded-md bg-fg/[0.04]">
              {blocks
                .filter((b) => b[0] === i)
                .map(([, top, h, label]) => (
                  <div
                    key={`${top}`}
                    className="absolute inset-x-0.5 overflow-hidden rounded border-l-2 border-accent bg-accent-soft px-1 pt-0.5 text-[8.5px] leading-tight text-fg/80"
                    style={{ top: `${top}%`, height: `${h}%` }}
                  >
                    <span className="hidden sm:inline">{label}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Pedagogo() {
  return (
    <div className="flex h-full items-center gap-3">
      <Panel className="w-[42%] p-3">
        <div className="mb-2 flex justify-between text-fg/70">
          <span>Student</span>
          <span>Reading</span>
        </div>
        {[72, 88, 54, 91, 66].map((score, i) => (
          <div key={i} className="flex items-center gap-2 border-t border-border py-1.5">
            <span className="size-3 rounded-full bg-fg/15" />
            <Line w={`${30 + ((i * 13) % 25)}%`} />
            <span className="ml-auto text-fg/70">{score}</span>
          </div>
        ))}
      </Panel>
      <div className="grid place-items-center text-accent">
        <SparkleGlyph />
      </div>
      <Panel className="flex flex-1 flex-col gap-2 self-stretch p-3">
        <div className="flex items-center justify-between">
          <span className="text-fg/80">Progress report</span>
          <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-accent">AI draft</span>
        </div>
        <Line w="92%" strong />
        <Line w="80%" />
        <Line w="86%" />
        <Line w="64%" />
        <div className="mt-1.5" />
        <Line w="88%" strong />
        <Line w="76%" />
        <Line w="58%" />
        <div className="mt-auto flex gap-1.5">
          <span className="rounded border border-border px-1.5 py-0.5">Strengths</span>
          <span className="rounded border border-border px-1.5 py-0.5">Next steps</span>
        </div>
      </Panel>
    </div>
  );
}

function GymGames() {
  const rows = [
    ["Alpha", 1240],
    ["Owls", 1185],
    ["Night", 990],
    ["Core", 870],
  ] as const;
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <div className="h-full w-[58%] max-w-[11rem] rounded-[1.4rem] border border-border-strong bg-bg-elev p-2 shadow-xl sm:w-[38%]">
        <div className="flex h-full flex-col gap-2 rounded-[1rem] bg-fg/[0.03] p-2.5">
          <div className="mx-auto h-1 w-8 rounded-full bg-fg/20" />
          <span className="truncate text-center text-fg/80">Season 4 · Week 6</span>
          <div className="rounded-md bg-accent-soft p-2 text-center">
            <span className="block truncate text-accent">Squad vs. Squad</span>
            <span className="text-sm font-semibold text-fg">12 × 9</span>
          </div>
          {rows.map(([name, pts], i) => (
            <div key={name} className="flex items-center gap-1.5">
              <span className={i === 0 ? "text-accent" : ""}>{i + 1}</span>
              <span className="size-3 rounded-full bg-fg/15" />
              <span className="truncate text-fg/70">{name}</span>
              <span className="ml-auto">{pts}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden flex-col gap-2 sm:flex">
        <Panel className="px-3 py-2">
          <span className="block text-lg font-semibold text-fg">1,100+</span>users
        </Panel>
        <Panel className="px-3 py-2">
          <span className="block text-lg font-semibold text-fg">5.0★</span>App Store · Play
        </Panel>
        <Panel className="px-3 py-2">
          <span className="block text-lg font-semibold text-fg">50%</span>active
        </Panel>
      </div>
    </div>
  );
}

function Platform() {
  return (
    <div className="flex h-full gap-3">
      <Panel className="flex flex-1 gap-2 p-2.5">
        <div className="flex w-5 flex-col items-center gap-2 pt-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`size-2.5 rounded ${i === 1 ? "bg-accent" : "bg-fg/15"}`} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {["Trials", "Retention", "Renewals"].map((k) => (
              <div key={k} className="flex flex-col gap-1.5 rounded-md border border-border p-1.5">
                <span className="block truncate">{k}</span>
                <Line w="60%" strong />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-1 rounded-md border border-border p-2">
            {[40, 55, 35, 70, 62, 80, 58, 90, 74, 86].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-accent/70" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </Panel>
      <div className="flex w-[36%] flex-col justify-center gap-2">
        <div className="rounded-lg rounded-tl-sm border border-border bg-bg-elev p-2 text-fg/80">
          Hi! Your trial class is confirmed for Tue, 7pm.
        </div>
        <div className="ml-4 hidden rounded-lg rounded-tr-sm bg-accent-soft p-2 text-fg/80 sm:block">Great, see you there!</div>
        <div className="rounded-lg rounded-tl-sm border border-border bg-bg-elev p-2 text-fg/80">
          We miss you! Come back this week?
        </div>
        <span className="text-right">via WhatsApp · n8n</span>
      </div>
    </div>
  );
}

function Leaderboard() {
  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex w-[82%] flex-1 flex-col rounded-lg border-[5px] border-fg/15 bg-bg-elev p-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-fg/80">Weekly ranking</span>
          <span className="text-accent">● LIVE</span>
        </div>
        <div className="mt-2 flex flex-1 items-end justify-center gap-2">
          {[
            [2, 44],
            [1, 64],
            [3, 32],
          ].map(([place, h]) => (
            <div key={place} className="flex w-14 flex-col items-center gap-1">
              <span className="size-5 rounded-full bg-fg/15" />
              <div
                className={`grid w-full place-items-start justify-center rounded-t-md pt-1 text-sm font-semibold ${
                  place === 1 ? "bg-accent text-accent-fg" : "bg-fg/10 text-fg"
                }`}
                style={{ height: h }}
              >
                {place}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-2 w-10 bg-fg/15" />
      <div className="flex gap-2 pt-1">
        <span className="rounded-full border border-border bg-bg-elev px-2 py-0.5">−75% images</span>
        <span className="rounded-full border border-border bg-bg-elev px-2 py-0.5">−80% payload</span>
      </div>
    </div>
  );
}

function Research() {
  const matrix = [
    [0.92, 0.05, 0.02, 0.01],
    [0.06, 0.86, 0.06, 0.02],
    [0.02, 0.08, 0.84, 0.06],
    [0.01, 0.03, 0.07, 0.89],
  ];
  return (
    <div className="flex h-full items-center gap-4">
      <Panel className="p-3">
        <span className="mb-2 block text-fg/70">Confusion matrix</span>
        <div className="grid grid-cols-4 gap-1">
          {matrix.flat().map((v, i) => (
            <div
              key={i}
              className="size-7 rounded-sm sm:size-8"
              style={{ background: `color-mix(in oklab, var(--accent) ${Math.round(v * 100)}%, transparent)` }}
            />
          ))}
        </div>
      </Panel>
      <Panel className="flex flex-1 flex-col self-stretch p-3">
        <div className="flex justify-between">
          <span className="text-fg/70">training curve</span>
          <span className="text-accent">ResNet152 + KAN</span>
        </div>
        <svg viewBox="0 0 200 100" className="mt-2 w-full flex-1" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            points="0,92 20,70 40,52 60,40 80,32 100,27 120,23 140,21 160,19 180,18 200,17"
          />
        </svg>
        <div className="flex gap-3">
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-3 bg-accent" />
            KAN variants
          </span>
        </div>
      </Panel>
    </div>
  );
}

function SparkleGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5 14 9a2 2 0 0 0 1.3 1.3l6.2 1.7-6.2 1.8A2 2 0 0 0 14 15l-2 6.5-1.9-6.4a2 2 0 0 0-1.3-1.3L2.5 12l6.3-1.8A2 2 0 0 0 10.1 9z" />
    </svg>
  );
}

const VISUALS: Record<Kind, () => ReactNode> = {
  tempo: Tempo,
  pedagogo: Pedagogo,
  gymgames: GymGames,
  platform: Platform,
  leaderboard: Leaderboard,
  research: Research,
};
