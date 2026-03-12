import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Search, ChevronDown, Play, Square, ArrowRightLeft } from "lucide-react";
import { TaskDetailPanel } from "../components/TaskDetailPanel";
import { useAppContext } from "../context/AppContext";
import { columns } from "../data/seed";
import type { ColumnId } from "../types";

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function KanbanBoard() {
  const {
    tasksByColumn, timer, searchQuery, releaseFilter, releases,
    setSearchQuery, setReleaseFilter, startTracking, stopTracking, moveTask,
  } = useAppContext();

  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);
  const [moveDropdownTask, setMoveDropdownTask] = useState<number | null>(null);
  const [showReleaseDropdown, setShowReleaseDropdown] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "#FB7185";
      case "Med": return "#FBBF24";
      case "Low": return "#38BDF8";
      default: return "#7B8FAB";
    }
  };

  const selectedReleaseName = releaseFilter
    ? releases.find((r) => r.name.startsWith(releaseFilter))?.name ?? releaseFilter
    : null;

  return (
    <div className="flex h-screen bg-[#0B0E14]">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-[#111720] border-b border-[#1C2536] px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-[#DFE6F0]">Kanban Board</h1>
              <p className="text-sm text-[#7B8FAB]">v3.2.0 Core Platform</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B8FAB]" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#161D2A] border border-[#1C2536] rounded-lg text-[#DFE6F0] placeholder:text-[#7B8FAB] w-64 focus:outline-none focus:border-[#34D399]"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowReleaseDropdown(!showReleaseDropdown)}
                  className="px-4 py-2 bg-[#161D2A] border border-[#1C2536] rounded-lg text-[#DFE6F0] flex items-center gap-2 hover:bg-[#1C2536] transition-colors"
                >
                  <span>{selectedReleaseName ?? "Release"}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showReleaseDropdown && (
                  <div className="absolute right-0 top-full mt-1 w-56 bg-[#1A2230] border border-[#2A3650] rounded-lg shadow-xl z-30 py-1">
                    <button
                      onClick={() => { setReleaseFilter(null); setShowReleaseDropdown(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#161D2A] transition-colors ${
                        !releaseFilter ? "text-[#34D399]" : "text-[#DFE6F0]"
                      }`}
                    >
                      All Releases
                    </button>
                    {releases.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          const prefix = r.name.split(" ")[0];
                          setReleaseFilter(prefix);
                          setShowReleaseDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-[#161D2A] transition-colors flex items-center gap-2 ${
                          releaseFilter && r.name.startsWith(releaseFilter) ? "text-[#34D399]" : "text-[#DFE6F0]"
                        }`}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                        {r.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Kanban Columns */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="h-full flex gap-4 p-6 min-w-max">
            {columns.map((column) => {
              const columnTasks = tasksByColumn[column.id] ?? [];
              return (
                <div key={column.id} className="w-64 flex flex-col">
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span style={{ color: column.color }}>{column.icon}</span>
                      <h2 className="font-medium text-[#DFE6F0]">{column.title}</h2>
                      <span className="px-2 py-0.5 bg-[#161D2A] text-[#7B8FAB] text-xs rounded-full">
                        {columnTasks.length}
                      </span>
                    </div>
                  </div>

                  {/* Task Cards */}
                  <div className="space-y-3 overflow-y-auto flex-1">
                    {columnTasks.map((task) => {
                      const isSelected = selectedTask === task.id;
                      const isHovered = hoveredTask === task.id;
                      const isTracking = timer.taskId === task.id;

                      return (
                        <div
                          key={task.id}
                          onClick={() => setSelectedTask(task.id)}
                          onMouseEnter={() => setHoveredTask(task.id)}
                          onMouseLeave={() => { setHoveredTask(null); setMoveDropdownTask(null); }}
                          className={`bg-[#161D2A] rounded-lg p-4 cursor-pointer transition-all relative ${
                            isTracking
                              ? "border-2 border-[#34D399] shadow-[0_0_16px_rgba(52,211,153,0.2)]"
                              : isSelected
                              ? "border-2 shadow-[0_0_16px_rgba(52,211,153,0.15)]"
                              : isHovered
                              ? "border border-[#2A3650] shadow-lg"
                              : "border border-[#1C2536]"
                          }`}
                          style={
                            isSelected && !isTracking
                              ? {
                                  borderColor: task.releaseColor,
                                  borderLeftWidth: "4px",
                                  boxShadow: `0 0 16px ${task.releaseColor}30`,
                                }
                              : task.status === "dev_fail"
                              ? { borderLeftWidth: "3px", borderLeftColor: "#FB7185" }
                              : {}
                          }
                        >
                          {/* Move button - visible on hover */}
                          {isHovered && (
                            <div className="absolute top-2 right-2 z-20">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMoveDropdownTask(moveDropdownTask === task.id ? null : task.id);
                                }}
                                className="p-1 rounded bg-[#1C2536] hover:bg-[#2A3650] text-[#7B8FAB] hover:text-[#DFE6F0] transition-colors"
                              >
                                <ArrowRightLeft className="w-3.5 h-3.5" />
                              </button>
                              {moveDropdownTask === task.id && (
                                <div className="absolute right-0 top-full mt-1 w-52 bg-[#1A2230] border border-[#2A3650] rounded-lg shadow-xl z-30 py-1">
                                  {columns
                                    .filter((c) => c.id !== task.status)
                                    .map((c) => (
                                      <button
                                        key={c.id}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          moveTask(task.id, c.id);
                                          setMoveDropdownTask(null);
                                        }}
                                        className="w-full text-left px-3 py-1.5 text-sm text-[#DFE6F0] hover:bg-[#161D2A] transition-colors flex items-center gap-2"
                                      >
                                        <span style={{ color: c.color }}>{c.icon}</span>
                                        {c.title}
                                      </button>
                                    ))}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Hover Tooltip */}
                          {isHovered && !isSelected && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1A2230] border border-[#2A3650] rounded text-xs text-[#7B8FAB] whitespace-nowrap z-10 shadow-lg">
                              Click to view
                            </div>
                          )}

                          {/* Selected State Info */}
                          {isSelected && (
                            <div
                              className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1A2230] border border-[#2A3650] rounded text-xs whitespace-nowrap z-10 shadow-lg"
                              style={{ color: task.releaseColor }}
                            >
                              Enter to open · Esc to close
                            </div>
                          )}

                          {/* Release Tag */}
                          <div className="mb-2">
                            <span
                              className="text-xs px-2 py-1 rounded"
                              style={{
                                backgroundColor: `${task.releaseColor}20`,
                                color: task.releaseColor,
                              }}
                            >
                              {task.release}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-medium text-[#DFE6F0] mb-2">{task.title}</h3>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {task.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-[#1C2536] text-[#7B8FAB] rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Time Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-[#7B8FAB] mb-1">
                              <span>
                                {task.timeSpent}h / {task.timeEstimate}h
                              </span>
                              <span>{task.timeEstimate > 0 ? Math.round((task.timeSpent / task.timeEstimate) * 100) : 0}%</span>
                            </div>
                            <div className="h-1.5 bg-[#1C2536] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#34D399] rounded-full transition-all"
                                style={{ width: `${task.timeEstimate > 0 ? (task.timeSpent / task.timeEstimate) * 100 : 0}%` }}
                              />
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-xs px-2 py-1 rounded font-medium"
                                style={{
                                  backgroundColor: `${getPriorityColor(task.priority)}20`,
                                  color: getPriorityColor(task.priority),
                                }}
                              >
                                {task.priority}
                              </span>
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center text-xs text-white">
                                {task.avatar}
                              </div>
                            </div>
                            {isTracking ? (
                              <button
                                onClick={(e) => { e.stopPropagation(); stopTracking(); }}
                                className="flex items-center gap-1 px-2 py-1 bg-[#FB7185]/20 text-[#FB7185] rounded text-xs font-medium hover:bg-[#FB7185]/30 transition-colors"
                              >
                                <Square className="w-3 h-3 fill-current" />
                                <span>Stop</span>
                                <span className="ml-1">{formatTime(timer.elapsedSeconds)}</span>
                              </button>
                            ) : (
                              <button
                                onClick={(e) => { e.stopPropagation(); startTracking(task.id); }}
                                className="flex items-center gap-1 px-2 py-1 bg-[#34D399]/20 text-[#34D399] rounded text-xs font-medium hover:bg-[#34D399]/30 transition-colors"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span>Track</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {selectedTask && <TaskDetailPanel taskId={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  );
}
