import { useState } from "react";
import { X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { columns, teamMembers } from "../data/seed";
import type { ColumnId } from "../types";

interface CreateTaskModalProps {
  onClose: () => void;
  defaultRelease?: string;
}

export function CreateTaskModal({ onClose, defaultRelease }: CreateTaskModalProps) {
  const { releases, addTask } = useAppContext();

  const [title, setTitle] = useState("");
  const [release, setRelease] = useState(defaultRelease ?? "");
  const [status, setStatus] = useState<ColumnId>("backlog");
  const [priority, setPriority] = useState("Med");
  const [tagsInput, setTagsInput] = useState("");
  const [timeEstimate, setTimeEstimate] = useState("");
  const [assignee, setAssignee] = useState(teamMembers[0].avatar);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const matchedRelease = releases.find((r) => {
      const prefix = r.name.split(" ")[0];
      return prefix === release || r.name === release;
    });
    const releasePrefix = matchedRelease ? matchedRelease.name.split(" ")[0] : release;
    const releaseColor = matchedRelease?.color ?? "#7B8FAB";

    addTask({
      release: releasePrefix,
      releaseColor,
      title: title.trim(),
      tags: tagsInput ? tagsInput.split(",").map((t) => t.trim()).filter(Boolean) : [],
      timeSpent: 0,
      timeEstimate: parseFloat(timeEstimate) || 0,
      priority,
      avatar: assignee,
      status,
    });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="w-[520px] bg-[#1A2230] border border-[#2A3650] rounded-2xl shadow-2xl pointer-events-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A3650]">
            <h2 className="text-lg font-bold text-[#DFE6F0]">Create New Task</h2>
            <button onClick={onClose} className="text-[#7B8FAB] hover:text-[#DFE6F0] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="px-6 py-4 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Title</label>
              <input
                type="text"
                placeholder="Task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-[#141A24] border border-[#1C2536] rounded-lg text-[#DFE6F0] placeholder:text-[#7B8FAB] focus:outline-none focus:border-[#34D399]"
              />
            </div>

            {/* Release */}
            <div>
              <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Release</label>
              <select
                value={release}
                onChange={(e) => setRelease(e.target.value)}
                className="w-full px-4 py-2 bg-[#141A24] border border-[#1C2536] rounded-lg text-[#DFE6F0] focus:outline-none focus:border-[#34D399]"
              >
                <option value="">Select release...</option>
                {releases.map((r) => (
                  <option key={r.id} value={r.name.split(" ")[0]}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ColumnId)}
                className="w-full px-4 py-2 bg-[#141A24] border border-[#1C2536] rounded-lg text-[#DFE6F0] focus:outline-none focus:border-[#34D399]"
              >
                {columns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority + Time Estimate row */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-2 bg-[#141A24] border border-[#1C2536] rounded-lg text-[#DFE6F0] focus:outline-none focus:border-[#34D399]"
                >
                  <option value="High">High</option>
                  <option value="Med">Med</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Time Estimate (hours)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={timeEstimate}
                  onChange={(e) => setTimeEstimate(e.target.value)}
                  className="w-full px-4 py-2 bg-[#141A24] border border-[#1C2536] rounded-lg text-[#DFE6F0] placeholder:text-[#7B8FAB] focus:outline-none focus:border-[#34D399]"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g. backend, feature, security"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-4 py-2 bg-[#141A24] border border-[#1C2536] rounded-lg text-[#DFE6F0] placeholder:text-[#7B8FAB] focus:outline-none focus:border-[#34D399]"
              />
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Assignee</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full px-4 py-2 bg-[#141A24] border border-[#1C2536] rounded-lg text-[#DFE6F0] focus:outline-none focus:border-[#34D399]"
              >
                {teamMembers.map((m) => (
                  <option key={m.id} value={m.avatar}>
                    {m.name} ({m.avatar})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#2A3650]">
            <button onClick={onClose} className="text-[#7B8FAB] hover:text-[#DFE6F0] transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#34D399] rounded-lg text-white font-medium hover:bg-[#2db885] transition-colors"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
