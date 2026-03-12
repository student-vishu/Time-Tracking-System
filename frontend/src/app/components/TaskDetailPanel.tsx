import { useState } from "react";
import { X, Play, Plus, ChevronDown, Square } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { columns, teamMembers } from "../data/seed";

interface TaskDetailPanelProps {
  taskId: number;
  onClose: () => void;
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatHours(hours: number) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

const activityLog = [
  {
    id: 1,
    user: { name: "Kai Tanaka", avatar: "KT" },
    action: "moved to In Progress",
    time: "2h ago",
    color: "#34D399",
  },
  {
    id: 2,
    user: { name: "Sara Chen", avatar: "SC" },
    action: "added a comment",
    time: "5h ago",
    color: "#38BDF8",
  },
  {
    id: 3,
    user: { name: "Mira Patel", avatar: "MP" },
    action: "changed priority to High",
    time: "1d ago",
    color: "#FBBF24",
  },
  {
    id: 4,
    user: { name: "Arjun Mehta", avatar: "AM" },
    action: "created this task",
    time: "3d ago",
    color: "#7B8FAB",
  },
];

export function TaskDetailPanel({ taskId, onClose }: TaskDetailPanelProps) {
  const { tasks, timer, moveTask, startTracking, stopTracking } = useAppContext();
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const task = tasks.find((t) => t.id === taskId);
  if (!task) return null;

  const currentColumn = columns.find((c) => c.id === task.status);
  const isTracking = timer.taskId === taskId;
  const assignee = teamMembers.find((m) => m.avatar === task.avatar);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "#FB7185";
      case "Med": return "#FBBF24";
      case "Low": return "#38BDF8";
      default: return "#7B8FAB";
    }
  };

  const progressPercent = task.timeEstimate > 0
    ? Math.round((task.timeSpent / task.timeEstimate) * 100)
    : 0;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Side Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-[420px] bg-[#111720] shadow-[-8px_0_24px_rgba(0,0,0,0.3)] z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#1C2536]">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-bold text-[#DFE6F0]">{task.title}</h2>
                <span
                  className="text-xs px-2 py-1 rounded font-medium"
                  style={{
                    backgroundColor: `${getPriorityColor(task.priority)}20`,
                    color: getPriorityColor(task.priority),
                  }}
                >
                  {task.priority}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-[#7B8FAB] hover:text-[#DFE6F0] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex items-center gap-1 px-2 py-1 rounded text-sm"
                style={{
                  backgroundColor: `${currentColumn?.color ?? "#7B8FAB"}20`,
                  color: currentColumn?.color ?? "#7B8FAB",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentColumn?.color }}
                />
                {currentColumn?.title ?? task.status}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showStatusDropdown && (
                <div className="absolute left-0 top-full mt-1 w-40 bg-[#1A2230] border border-[#2A3650] rounded-lg shadow-xl z-10 py-1">
                  {columns.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { moveTask(taskId, c.id); setShowStatusDropdown(false); }}
                      className={`w-full text-left px-3 py-1.5 text-sm hover:bg-[#161D2A] transition-colors flex items-center gap-2 ${
                        c.id === task.status ? "text-[#34D399]" : "text-[#DFE6F0]"
                      }`}
                    >
                      <span style={{ color: c.color }}>{c.icon}</span>
                      {c.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center text-xs text-white">
                {task.avatar}
              </div>
              <span className="text-sm text-[#DFE6F0]">{assignee?.name ?? task.avatar}</span>
            </div>
            <span
              className="text-xs px-2 py-1 rounded"
              style={{ backgroundColor: `${task.releaseColor}20`, color: task.releaseColor }}
            >
              {task.release}
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Time Tracking Section */}
          <div className="p-6 border-b border-[#1C2536]">
            <h3 className="text-xs uppercase text-[#7B8FAB] mb-3 tracking-wide">Time Tracking</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl font-mono text-[#DFE6F0]">
                {isTracking ? formatTime(timer.elapsedSeconds) : "00:00:00"}
              </div>
              {isTracking ? (
                <button
                  onClick={stopTracking}
                  className="px-3 py-1.5 bg-[#FB7185] rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:bg-[#e5667a] transition-colors"
                >
                  <Square className="w-3 h-3 fill-current" />
                  Stop Timer
                </button>
              ) : (
                <button
                  onClick={() => startTracking(taskId)}
                  className="px-3 py-1.5 bg-[#34D399] rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:bg-[#2db885] transition-colors"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Start Timer
                </button>
              )}
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-xs text-[#7B8FAB] mb-1">
                <span>
                  Time Spent: {formatHours(task.timeSpent)} / {formatHours(task.timeEstimate)} estimated
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-1.5 bg-[#1C2536] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#34D399] rounded-full"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>
            </div>
            <button className="text-xs text-[#7B8FAB] hover:text-[#DFE6F0] transition-colors flex items-center gap-1">
              <Plus className="w-3 h-3" />
              Manual Entry
            </button>
          </div>

          {/* Details Section */}
          <div className="p-6 border-b border-[#1C2536] space-y-3">
            <div>
              <p className="text-xs text-[#7B8FAB] mb-2">Tags</p>
              <div className="flex gap-2 flex-wrap">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-[#1C2536] text-[#DFE6F0] rounded flex items-center gap-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-[#7B8FAB]">Priority</span>
              <span className="text-sm" style={{ color: getPriorityColor(task.priority) }}>
                {task.priority}
              </span>
            </div>
          </div>

          {/* Activity Log */}
          <div className="p-6">
            <h3 className="text-xs uppercase text-[#7B8FAB] mb-4 tracking-wide">Activity</h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[13px] top-0 bottom-0 w-px bg-[#1C2536]" />

              <div className="space-y-4">
                {activityLog.map((entry) => (
                  <div key={entry.id} className="flex gap-3 relative">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white z-10 flex-shrink-0"
                      style={{ backgroundColor: entry.color }}
                    >
                      {entry.user.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#DFE6F0]">
                        <span className="font-medium">{entry.user.name}</span> {entry.action}
                      </p>
                      <p className="text-xs text-[#7B8FAB] mt-0.5">{entry.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comment Input - Sticky at Bottom */}
        <div className="p-4 border-t border-[#1C2536] bg-[#111720]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center text-xs text-white flex-shrink-0">
              {task.avatar}
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 bg-[#161D2A] border border-[#1C2536] rounded-lg text-[#DFE6F0] placeholder:text-[#7B8FAB] text-sm focus:outline-none focus:border-[#34D399]"
            />
            <button className="w-8 h-8 bg-[#34D399] rounded-lg flex items-center justify-center text-white hover:bg-[#2db885] transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8L14 2L8 14L7 9L2 8Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
