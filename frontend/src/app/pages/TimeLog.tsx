import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Square, ChevronDown, Search } from "lucide-react";

const timeEntries = [
  { id: 1, date: "Mar 7", task: "API rate limiting", release: "v3.2.0", releaseColor: "#34D399", member: { name: "Kai T.", avatar: "KT" }, timeLogged: "8h 00m", estimated: "6h 00m", status: "Over", statusColor: "#FB7185" },
  { id: 2, date: "Mar 7", task: "User auth flow", release: "v3.2.0", releaseColor: "#34D399", member: { name: "Mira P.", avatar: "MP" }, timeLogged: "12h 00m", estimated: "12h 00m", status: "On Track", statusColor: "#34D399" },
  { id: 3, date: "Mar 6", task: "Dashboard widget system", release: "v3.2.0", releaseColor: "#34D399", member: { name: "Kai T.", avatar: "KT" }, timeLogged: "5h 00m", estimated: "8h 00m", status: "In Progress", statusColor: "#38BDF8" },
  { id: 4, date: "Mar 6", task: "Real-time analytics engine", release: "v3.3.0", releaseColor: "#38BDF8", member: { name: "Kai T.", avatar: "KT" }, timeLogged: "7h 00m", estimated: "16h 00m", status: "Active", statusColor: "#FBBF24" },
  { id: 5, date: "Mar 5", task: "Mobile nav redesign", release: "v4.0.0", releaseColor: "#A78BFA", member: { name: "Leo R.", avatar: "LR" }, timeLogged: "9h 00m", estimated: "10h 00m", status: "On Track", statusColor: "#34D399" },
  { id: 6, date: "Mar 5", task: "OAuth integration testing", release: "v3.2.0", releaseColor: "#34D399", member: { name: "Sara C.", avatar: "SC" }, timeLogged: "5h 00m", estimated: "6h 00m", status: "On Track", statusColor: "#34D399" },
  { id: 7, date: "Mar 4", task: "Component library setup", release: "v4.0.0", releaseColor: "#A78BFA", member: { name: "Leo R.", avatar: "LR" }, timeLogged: "8h 00m", estimated: "10h 00m", status: "Active", statusColor: "#FBBF24" },
  { id: 8, date: "Mar 4", task: "Database migration scripts", release: "v3.2.0", releaseColor: "#34D399", member: { name: "Mira P.", avatar: "MP" }, timeLogged: "3h 00m", estimated: "5h 00m", status: "In Progress", statusColor: "#38BDF8" },
  { id: 9, date: "Mar 3", task: "Project scaffolding", release: "v3.2.0", releaseColor: "#34D399", member: { name: "Arjun M.", avatar: "AM" }, timeLogged: "4h 00m", estimated: "4h 00m", status: "Done", statusColor: "#34D399" },
  { id: 10, date: "Mar 3", task: "API documentation", release: "v3.2.0", releaseColor: "#34D399", member: { name: "Jordan D.", avatar: "JD" }, timeLogged: "6h 00m", estimated: "6h 00m", status: "Done", statusColor: "#34D399" },
];

export function TimeLog() {
  const [isTracking, setIsTracking] = useState(true);
  const [timer] = useState("02:34:18");

  return (
    <div className="flex h-screen bg-[#0B0E14]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-[#111720] border-b border-[#1C2536] px-6 py-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-[#DFE6F0]">Time Log</h1>
          <p className="text-sm text-[#7B8FAB]">Track time and audit logged hours</p>
        </header>

        <div className="p-6 space-y-6">
          {/* Active Timer Banner */}
          {isTracking ? (
            <div className="bg-[#161D2A] border-2 border-[#34D399] rounded-lg p-6 shadow-[0_0_24px_rgba(52,211,153,0.15)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-[#7B8FAB] mb-1">Currently tracking</p>
                    <h3 className="text-xl font-bold text-[#DFE6F0] mb-2">Dashboard widget system</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "#34D39920", color: "#34D399" }}>
                        v3.2.0
                      </span>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center text-xs text-white">
                        KT
                      </div>
                    </div>
                  </div>
                  <div className="ml-8">
                    <div className="text-4xl font-mono font-bold text-[#34D399]">{timer}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsTracking(false)}
                    className="px-4 py-2 bg-[#FB7185] rounded-lg text-white font-medium flex items-center gap-2 hover:bg-[#f85a72] transition-colors"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    Stop
                  </button>
                  <button className="text-[#7B8FAB] hover:text-[#DFE6F0] transition-colors">
                    Discard
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#161D2A] border border-[#1C2536] rounded-lg p-6">
              <p className="text-center text-[#7B8FAB]">▶ Start tracking a task</p>
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-[#161D2A] border border-[#1C2536] rounded-full text-[#DFE6F0] flex items-center gap-2 hover:bg-[#1C2536] transition-colors">
              <span>This Week — Mar 3–7, 2026</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-[#161D2A] border border-[#1C2536] rounded-full text-[#DFE6F0] flex items-center gap-2 hover:bg-[#1C2536] transition-colors">
              <span>Release</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-[#161D2A] border border-[#1C2536] rounded-full text-[#DFE6F0] flex items-center gap-2 hover:bg-[#1C2536] transition-colors">
              <span>Team Member</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B8FAB]" />
              <input
                type="text"
                placeholder="Search entries..."
                className="pl-9 pr-4 py-2 bg-[#161D2A] border border-[#1C2536] rounded-full text-[#DFE6F0] placeholder:text-[#7B8FAB] w-full focus:outline-none focus:border-[#34D399]"
              />
            </div>
          </div>

          {/* Time Log Table */}
          <div className="bg-[#161D2A] border border-[#1C2536] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1C2536]">
                  <th className="text-left px-4 py-3 text-xs uppercase text-[#7B8FAB] font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-xs uppercase text-[#7B8FAB] font-medium">Task Name</th>
                  <th className="text-left px-4 py-3 text-xs uppercase text-[#7B8FAB] font-medium">Release</th>
                  <th className="text-left px-4 py-3 text-xs uppercase text-[#7B8FAB] font-medium">Team Member</th>
                  <th className="text-left px-4 py-3 text-xs uppercase text-[#7B8FAB] font-medium">Time Logged</th>
                  <th className="text-left px-4 py-3 text-xs uppercase text-[#7B8FAB] font-medium">Estimated</th>
                  <th className="text-left px-4 py-3 text-xs uppercase text-[#7B8FAB] font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {timeEntries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-[#1C2536] hover:bg-[#1C2536] transition-colors ${
                      index % 2 === 0 ? "bg-[#161D2A]" : "bg-[#111720]"
                    }`}
                  >
                    <td className="px-4 py-3 text-sm text-[#DFE6F0]">{entry.date}</td>
                    <td className="px-4 py-3 text-sm text-[#DFE6F0]">{entry.task}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${entry.releaseColor}20`, color: entry.releaseColor }}>
                        {entry.release}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white"
                          style={{ background: `linear-gradient(to bottom right, ${entry.releaseColor}, ${entry.releaseColor}dd)` }}
                        >
                          {entry.member.avatar}
                        </div>
                        <span className="text-sm text-[#DFE6F0]">{entry.member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#DFE6F0] font-mono">{entry.timeLogged}</td>
                    <td className="px-4 py-3 text-sm text-[#7B8FAB] font-mono">{entry.estimated}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded font-medium" style={{ backgroundColor: `${entry.statusColor}20`, color: entry.statusColor }}>
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Bar */}
          <div className="bg-[#161D2A] border border-[#1C2536] border-t-2 border-t-[#34D399] rounded-lg px-6 py-4 flex items-center justify-between">
            <p className="text-[#DFE6F0] font-medium">Total This Week: 28h 40m</p>
            <p className="text-[#7B8FAB]">Weekly Avg: 5h 43m per person</p>
          </div>
        </div>
      </main>
    </div>
  );
}
