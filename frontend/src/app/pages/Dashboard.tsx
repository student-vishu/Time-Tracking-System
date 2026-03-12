import { Sidebar } from "../components/Sidebar";
import { Grid3x3, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const kpis = [
  { id: 1, label: "Total Tasks", value: "15", color: "#38BDF8", icon: Grid3x3 },
  { id: 2, label: "Completed", value: "2", color: "#34D399", icon: CheckCircle2 },
  { id: 3, label: "Hours Logged", value: "51", color: "#FBBF24", icon: Clock },
  { id: 4, label: "Over Estimate", value: "2", color: "#FB7185", icon: AlertTriangle },
];

const releases = [
  {
    id: 1, name: "v3.2.0 Core Platform", color: "#34D399", progress: 57,
    targetDate: "Mar 20, 2026", hoursLogged: "28h", completed: 2, dev_done: 2, active: 3, dev_fail: 0, queued: 5, totalTasks: 12,
  },
  {
    id: 2, name: "v3.3.0 Analytics Suite", color: "#38BDF8", progress: 25,
    targetDate: "Apr 5, 2026", hoursLogged: "15h", completed: 0, dev_done: 0, active: 2, dev_fail: 0, queued: 2, totalTasks: 4,
  },
  {
    id: 3, name: "v4.0.0 Mobile Redesign", color: "#A78BFA", progress: 0,
    targetDate: "May 10, 2026", hoursLogged: "8h", completed: 0, dev_done: 0, active: 1, dev_fail: 1, queued: 1, totalTasks: 3,
  },
];

const teamMembers = [
  { id: 1, name: "Kai Tanaka", avatar: "KT", color: "#34D399", tasks: 3, completed: 1, hours: "12h", progress: 33 },
  { id: 2, name: "Mira Patel", avatar: "MP", color: "#38BDF8", tasks: 2, completed: 1, hours: "14h", progress: 50 },
  { id: 3, name: "Arjun Mehta", avatar: "AM", color: "#A78BFA", tasks: 2, completed: 1, hours: "8h", progress: 50 },
  { id: 4, name: "Sara Chen", avatar: "SC", color: "#FBBF24", tasks: 2, completed: 0, hours: "7h", progress: 0 },
  { id: 5, name: "Leo Rivera", avatar: "LR", color: "#FB7185", tasks: 3, completed: 1, hours: "9h", progress: 33 },
  { id: 6, name: "Jordan Davis", avatar: "JD", color: "#F472B6", tasks: 3, completed: 0, hours: "1h", progress: 0 },
];

export function Dashboard() {
  return (
    <div className="flex h-screen bg-[#0B0E14]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-[#111720] border-b border-[#1C2536] px-6 py-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-[#DFE6F0]">Dashboard</h1>
          <p className="text-sm text-[#7B8FAB]">Executive overview of release progress</p>
        </header>

        <div className="p-6 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.id} className="bg-[#161D2A] border border-[#1C2536] rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs uppercase text-[#7B8FAB] mb-2 tracking-wide">{kpi.label}</p>
                      <p className="text-3xl font-bold text-[#DFE6F0]">{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${kpi.color}20` }}>
                      <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Release Progress */}
          <div>
            <h2 className="text-xs uppercase text-[#7B8FAB] mb-4 tracking-wide">Release Progress</h2>
            <div className="grid grid-cols-3 gap-4">
              {releases.map((release) => (
                <div key={release.id} className="bg-[#161D2A] border border-[#1C2536] rounded-lg p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="#1C2536" strokeWidth="4" fill="none" />
                        <circle
                          cx="32" cy="32" r="28" stroke={release.color} strokeWidth="4" fill="none"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - release.progress / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#DFE6F0]">{release.progress}%</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#DFE6F0] mb-1">{release.name}</h3>
                      <p className="text-xs text-[#7B8FAB]">Target: {release.targetDate}</p>
                      <p className="text-xs text-[#7B8FAB]">{release.hoursLogged} logged</p>
                    </div>
                  </div>

                  <div className="h-2 bg-[#1C2536] rounded-full overflow-hidden mb-3">
                    <div className="h-full flex">
                      <div className="h-full" style={{ backgroundColor: "#22C55E", width: `${(release.completed / release.totalTasks) * 100}%` }} />
                      <div className="h-full" style={{ backgroundColor: "#34D399", width: `${(release.dev_done / release.totalTasks) * 100}%` }} />
                      <div className="h-full" style={{ backgroundColor: "#FBBF24", width: `${(release.active / release.totalTasks) * 100}%` }} />
                      <div className="h-full" style={{ backgroundColor: "#FB7185", width: `${(release.dev_fail / release.totalTasks) * 100}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <span className="text-[#7B8FAB]">{release.completed} Completed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#34D399]" />
                        <span className="text-[#7B8FAB]">{release.dev_done} Dev Done</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#FBBF24]" />
                        <span className="text-[#7B8FAB]">{release.active} Active</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#FB7185]" />
                        <span className="text-[#7B8FAB]">{release.dev_fail} Fail</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#3F506A]" />
                        <span className="text-[#7B8FAB]">{release.queued} Queued</span>
                      </div>
                    </div>
                    <span className="font-medium text-[#DFE6F0]">
                      {release.completed}/{release.totalTasks} Tasks
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Workload */}
          <div>
            <h2 className="text-xs uppercase text-[#7B8FAB] mb-4 tracking-wide">Team Workload</h2>
            <div className="grid grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-[#161D2A] border border-[#1C2536] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium text-white border-2"
                      style={{ backgroundColor: `${member.color}40`, borderColor: member.color }}
                    >
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#DFE6F0]">{member.name}</h3>
                      <p className="text-xs text-[#7B8FAB]">
                        {member.tasks} tasks • {member.completed} completed • {member.hours}
                      </p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#1C2536] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ backgroundColor: member.color, width: `${member.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
