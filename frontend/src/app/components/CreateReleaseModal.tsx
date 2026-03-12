import { useState } from "react";
import { X, Calendar, ChevronDown } from "lucide-react";
import type { Release } from "../types";
import { teamMembers } from "../data/seed";

interface CreateReleaseModalProps {
  onClose: () => void;
  onSubmit?: (release: Omit<Release, "id">) => void;
}

const colors = [
  "#34D399",
  "#38BDF8",
  "#A78BFA",
  "#FBBF24",
  "#FB7185",
  "#F472B6",
  "#2DD4BF",
  "#FB923C",
];

export function CreateReleaseModal({ onClose, onSubmit }: CreateReleaseModalProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [name, setName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<typeof teamMembers>([]);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);

  const removeMember = (id: number) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const addMember = (member: (typeof teamMembers)[number]) => {
    if (!selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers((prev) => [...prev, member]);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit?.({
      name: name.trim(),
      color: selectedColor,
      description: description || undefined,
      targetDate: targetDate || undefined,
      members: selectedMembers.length > 0 ? selectedMembers : undefined,
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
            <h2 className="text-lg font-bold text-[#DFE6F0]">Create New Release</h2>
            <button
              onClick={onClose}
              className="text-[#7B8FAB] hover:text-[#DFE6F0] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="px-6 py-4 space-y-4">
            {/* Release Name */}
            <div>
              <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Release Name</label>
              <input
                type="text"
                placeholder="e.g. v3.4.0 — Feature Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-[#141A24] border border-[#1C2536] rounded-lg text-[#DFE6F0] placeholder:text-[#7B8FAB] focus:outline-none focus:border-[#34D399]"
              />
            </div>

            {/* Target Date */}
            <div>
              <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Target Date</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select target date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-4 py-2 bg-[#141A24] border border-[#1C2536] rounded-lg text-[#DFE6F0] placeholder:text-[#7B8FAB] focus:outline-none focus:border-[#34D399]"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B8FAB]" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Description</label>
              <textarea
                rows={3}
                placeholder="Brief description of release goals..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 bg-[#141A24] border border-[#1C2536] rounded-lg text-[#DFE6F0] placeholder:text-[#7B8FAB] focus:outline-none focus:border-[#34D399] resize-none"
              />
            </div>

            {/* Release Color */}
            <div>
              <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Release Color</label>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full transition-all ${
                      selectedColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-[#1A2230]" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Assign Team Members */}
            <div>
              <label className="block text-sm font-medium text-[#DFE6F0] mb-2">Assign Team Members</label>
              <div className="relative">
                <div
                  onClick={() => setShowMemberDropdown(!showMemberDropdown)}
                  className="w-full px-4 py-2 bg-[#141A24] border border-[#1C2536] rounded-lg min-h-[42px] flex items-center gap-2 flex-wrap cursor-pointer hover:border-[#34D399] transition-colors"
                >
                  {selectedMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 px-2 py-1 bg-[#1C2536] rounded text-sm text-[#DFE6F0]"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center text-xs text-white">
                        {member.avatar}
                      </div>
                      <span>{member.name}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeMember(member.id); }}
                        className="text-[#7B8FAB] hover:text-[#DFE6F0] transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {selectedMembers.length === 0 && (
                    <span className="text-[#7B8FAB] text-sm">Select members...</span>
                  )}
                  <ChevronDown className="w-4 h-4 text-[#7B8FAB] ml-auto" />
                </div>
                {showMemberDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A2230] border border-[#2A3650] rounded-lg shadow-xl z-10 py-1">
                    {teamMembers
                      .filter((m) => !selectedMembers.find((s) => s.id === m.id))
                      .map((member) => (
                        <button
                          key={member.id}
                          onClick={() => { addMember(member); setShowMemberDropdown(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-[#DFE6F0] hover:bg-[#161D2A] flex items-center gap-2"
                        >
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center text-xs text-white">
                            {member.avatar}
                          </div>
                          {member.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#2A3650]">
            <button
              onClick={onClose}
              className="text-[#7B8FAB] hover:text-[#DFE6F0] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#34D399] rounded-lg text-white font-medium hover:bg-[#2db885] transition-colors"
            >
              Create Release
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
