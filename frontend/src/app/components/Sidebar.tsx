import { Link, useLocation } from "react-router";
import { LayoutGrid, BarChart3, Clock, Settings, ChevronLeft, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { CreateReleaseModal } from "./CreateReleaseModal";
import { CreateTaskModal } from "./CreateTaskModal";

interface SidebarProps {
  onCreateRelease?: () => void;
}

export function Sidebar({ onCreateRelease }: SidebarProps) {
  const location = useLocation();
  const { releases, tasks, addRelease } = useAppContext();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedReleases, setExpandedReleases] = useState<number[]>([1]);
  const [hoveredNewRelease, setHoveredNewRelease] = useState(false);
  const [showCreateReleaseModal, setShowCreateReleaseModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [createTaskDefaultRelease, setCreateTaskDefaultRelease] = useState<string | undefined>();

  const toggleRelease = (releaseId: number) => {
    setExpandedReleases((prev) =>
      prev.includes(releaseId) ? prev.filter((id) => id !== releaseId) : [...prev, releaseId]
    );
  };

  const handleCreateRelease = () => {
    if (onCreateRelease) {
      onCreateRelease();
    } else {
      setShowCreateReleaseModal(true);
    }
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/time-log", label: "Time Log", icon: Clock },
    { path: "/admin", label: "Admin", icon: Settings },
  ];

  if (isCollapsed) {
    return (
      <aside className="w-16 h-screen bg-[#111720] border-r border-[#1C2536] flex flex-col items-center py-6">
        <button
          onClick={() => setIsCollapsed(false)}
          className="text-[#7B8FAB] hover:text-[#DFE6F0] transition-colors mb-8"
        >
          <ChevronLeft className="w-5 h-5 rotate-180" />
        </button>
        <Link
          to="/"
          className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-colors ${
            location.pathname === "/"
              ? "bg-[#34D399]/10 text-[#34D399]"
              : "text-[#7B8FAB] hover:text-[#DFE6F0]"
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
        </Link>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                isActive
                  ? "bg-[#34D399]/10 text-[#34D399]"
                  : "text-[#7B8FAB] hover:text-[#DFE6F0]"
              }`}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </aside>
    );
  }

  return (
    <>
      <aside className="w-[240px] h-screen bg-[#111720] border-r border-[#1C2536] flex flex-col">
        {/* Logo */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L15 4V12L8 16L1 12V4L8 0Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-[#DFE6F0]">ReleasePilot</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 flex-1 overflow-y-auto">
          {/* Board Link */}
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
              location.pathname === "/"
                ? "bg-[#34D399]/10 text-[#34D399]"
                : "text-[#7B8FAB] hover:text-[#DFE6F0] hover:bg-[#161D2A]"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span>Board</span>
          </Link>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? "bg-[#34D399]/10 text-[#34D399]"
                    : "text-[#7B8FAB] hover:text-[#DFE6F0] hover:bg-[#161D2A]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Releases Section */}
          <div className="mt-8">
            <h3 className="text-xs uppercase text-[#3F506A] px-3 mb-3 font-medium tracking-wider">
              RELEASES
            </h3>

            {/* New Release Button */}
            <button
              onClick={handleCreateRelease}
              onMouseEnter={() => setHoveredNewRelease(true)}
              onMouseLeave={() => setHoveredNewRelease(false)}
              className={`w-full mb-3 px-3 py-3 border-2 border-dashed rounded-lg transition-all ${
                hoveredNewRelease
                  ? "border-[#34D399] bg-[#34D399]/5"
                  : "border-[#1C2536]"
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Plus className={`w-4 h-4 ${hoveredNewRelease ? "text-[#34D399]" : "text-[#7B8FAB]"}`} />
                <span className={`text-sm ${hoveredNewRelease ? "text-[#34D399]" : "text-[#7B8FAB]"}`}>
                  New Release
                </span>
              </div>
              <p className="text-[10px] text-[#3F506A] italic">Admin only</p>
            </button>

            {/* Release Folders */}
            <div className="space-y-1">
              {releases.map((release) => {
                const isExpanded = expandedReleases.includes(release.id);
                const releaseTasks = tasks.filter((t) => {
                  const releasePrefix = release.name.split(" ")[0];
                  return t.release === releasePrefix;
                });
                const taskCount = releaseTasks.length;
                const doneCount = releaseTasks.filter((t) => t.status === "completed").length;
                const progressPercent = taskCount > 0 ? Math.round((doneCount / taskCount) * 100) : 0;

                return (
                  <div key={release.id} className="relative">
                    {/* Release Header */}
                    <button
                      onClick={() => toggleRelease(release.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        isExpanded ? "text-[#DFE6F0]" : "text-[#7B8FAB] hover:text-[#DFE6F0] hover:bg-[#161D2A]"
                      }`}
                      style={
                        isExpanded
                          ? {
                              backgroundColor: `${release.color}08`,
                              borderLeft: `3px solid ${release.color}`,
                              paddingLeft: "9px",
                            }
                          : {}
                      }
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      )}
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: release.color }}
                      />
                      <span className="text-sm truncate">{release.name}</span>
                    </button>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="ml-6 mt-1 mb-2 space-y-2">
                        {/* Task Stats */}
                        <div className="px-3 py-2">
                          <p className="text-xs text-[#7B8FAB] mb-2">
                            {taskCount} tasks · {doneCount} done
                          </p>
                          <div className="h-1 bg-[#1C2536] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                backgroundColor: release.color,
                                width: `${progressPercent}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Sub-items */}
                        <Link
                          to="/"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors bg-[#34D399]/10 text-[#34D399]"
                        >
                          <span className="text-sm">Tasks</span>
                        </Link>

                        <button
                          onClick={() => {
                            setCreateTaskDefaultRelease(release.name.split(" ")[0]);
                            setShowCreateTaskModal(true);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-colors hover:bg-[#161D2A]"
                          style={{ color: release.color }}
                        >
                          <Plus className="w-3 h-3" />
                          <span className="text-sm">New Task</span>
                        </button>

                        <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left text-[#7B8FAB] hover:text-[#DFE6F0] hover:bg-[#161D2A] transition-colors">
                          <span className="text-sm">Time Log</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-4 text-[#7B8FAB] hover:text-[#DFE6F0] transition-colors border-t border-[#1C2536] flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </aside>

      {showCreateReleaseModal && (
        <CreateReleaseModal
          onClose={() => setShowCreateReleaseModal(false)}
          onSubmit={(release) => addRelease(release)}
        />
      )}
      {showCreateTaskModal && (
        <CreateTaskModal
          onClose={() => setShowCreateTaskModal(false)}
          defaultRelease={createTaskDefaultRelease}
        />
      )}
    </>
  );
}
