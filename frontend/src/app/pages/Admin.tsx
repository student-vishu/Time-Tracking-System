import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Check, Minus } from "lucide-react";

const roles = [
  { id: "admin", name: "System Admin", color: "#FB7185", description: "Full access to all features and settings" },
  { id: "pm", name: "Project Manager", color: "#FBBF24", description: "Manage releases and assign tasks" },
  { id: "dev", name: "Developer", color: "#34D399", description: "Work on tasks and log time" },
  { id: "designer", name: "Designer", color: "#A78BFA", description: "Design and prototype interfaces" },
  { id: "viewer", name: "Viewer", color: "#3F506A", description: "Read-only access to project data" },
];

const teamMembers = [
  { id: 1, name: "Kai Tanaka", email: "kai@releasepilot.com", avatar: "KT", role: "admin", color: "#FB7185" },
  { id: 2, name: "Mira Patel", email: "mira@releasepilot.com", avatar: "MP", role: "pm", color: "#FBBF24" },
  { id: 3, name: "Arjun Mehta", email: "arjun@releasepilot.com", avatar: "AM", role: "dev", color: "#34D399" },
  { id: 4, name: "Sara Chen", email: "sara@releasepilot.com", avatar: "SC", role: "dev", color: "#34D399" },
  { id: 5, name: "Leo Rivera", email: "leo@releasepilot.com", avatar: "LR", role: "designer", color: "#A78BFA" },
  { id: 6, name: "Jordan Davis", email: "jordan@releasepilot.com", avatar: "JD", role: "viewer", color: "#3F506A" },
];

const permissions = [
  { id: "releases", name: "Manage Releases", description: "Create, edit, and delete releases" },
  { id: "tasks", name: "Manage Tasks", description: "Create, edit, and assign tasks" },
  { id: "users", name: "Manage Users", description: "Invite, remove, and change user roles" },
  { id: "roles", name: "Manage Roles", description: "Create and edit role permission sets" },
  { id: "dashboard", name: "View Dashboard", description: "Access analytics and progress reports" },
  { id: "time", name: "Time Tracking", description: "Log and edit time entries on tasks" },
  { id: "delete", name: "Delete Data", description: "Permanently delete records and releases" },
];

const permissionMatrix = {
  admin: { releases: true, tasks: true, users: true, roles: true, dashboard: true, time: true, delete: true },
  pm: { releases: true, tasks: true, users: false, roles: false, dashboard: true, time: true, delete: false },
  dev: { releases: false, tasks: true, users: false, roles: false, dashboard: true, time: true, delete: false },
  designer: { releases: false, tasks: true, users: false, roles: false, dashboard: true, time: true, delete: false },
  viewer: { releases: false, tasks: false, users: false, roles: false, dashboard: true, time: false, delete: false },
};

export function Admin() {
  const [selectedMember, setSelectedMember] = useState<number | null>(1);
  const [activeRole, setActiveRole] = useState("admin");

  const getRoleName = (roleId: string) => roles.find((r) => r.id === roleId)?.name || roleId;
  const getRoleColor = (roleId: string) => roles.find((r) => r.id === roleId)?.color || "#3F506A";
  const activeRoleData = roles.find((r) => r.id === activeRole);
  const memberCount = teamMembers.filter((m) => m.role === activeRole).length;

  return (
    <div className="flex h-screen bg-[#0B0E14]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-[#111720] border-b border-[#1C2536] px-6 py-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-[#DFE6F0]">Admin</h1>
          <p className="text-sm text-[#7B8FAB]">Manage team members and permissions</p>
        </header>

        <div className="p-6 flex gap-6">
          {/* Left Column - Team Members */}
          <div className="w-[300px] flex-shrink-0">
            <h2 className="text-xs uppercase text-[#7B8FAB] mb-4 tracking-wide">Team Members</h2>
            <div className="space-y-2">
              {teamMembers.map((member) => {
                const isSelected = selectedMember === member.id;
                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member.id)}
                    className={`bg-[#161D2A] rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected ? "border-2 border-[#34D399]" : "border border-[#1C2536] hover:border-[#34D399]"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium text-white"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[#DFE6F0]">{member.name}</h3>
                        <p className="text-xs text-[#7B8FAB] truncate">{member.email}</p>
                      </div>
                      <span
                        className="text-xs px-2 py-1 rounded font-medium"
                        style={{ backgroundColor: `${getRoleColor(member.role)}20`, color: getRoleColor(member.role) }}
                      >
                        {getRoleName(member.role)}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-[#1C2536]">
                        <p className="text-xs uppercase text-[#7B8FAB] mb-2">Change Role</p>
                        <div className="flex flex-wrap gap-1">
                          {roles.map((role) => (
                            <button
                              key={role.id}
                              className={`text-xs px-2 py-1 rounded transition-colors ${
                                member.role === role.id ? "font-medium" : "text-[#7B8FAB] hover:text-[#DFE6F0]"
                              }`}
                              style={
                                member.role === role.id
                                  ? { backgroundColor: `${role.color}20`, color: role.color }
                                  : {}
                              }
                            >
                              {role.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <button className="w-full bg-transparent border-2 border-dashed border-[#1C2536] rounded-lg p-4 text-[#7B8FAB] hover:text-[#DFE6F0] hover:border-[#34D399] transition-colors flex items-center justify-center gap-2">
                <span className="text-xl">+</span>
                <span>Invite Team Member</span>
              </button>
            </div>
          </div>

          {/* Right Column - Role Permissions */}
          <div className="flex-1">
            <h2 className="text-xs uppercase text-[#7B8FAB] mb-4 tracking-wide">Role Permissions</h2>

            {/* Role Tabs */}
            <div className="flex gap-2 mb-6">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeRole === role.id
                      ? "border-2"
                      : "border border-[#1C2536] text-[#7B8FAB] hover:text-[#DFE6F0] hover:border-[#34D399]"
                  }`}
                  style={
                    activeRole === role.id
                      ? { backgroundColor: `${role.color}10`, color: role.color, borderColor: role.color }
                      : {}
                  }
                >
                  {role.name}
                </button>
              ))}
            </div>

            {/* Role Info Card */}
            {activeRoleData && (
              <div className="bg-[#161D2A] border border-[#1C2536] rounded-lg p-6 mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeRoleData.color }} />
                      <h3 className="text-xl font-bold text-[#DFE6F0]">{activeRoleData.name}</h3>
                    </div>
                    <p className="text-[#7B8FAB]">{activeRoleData.description}</p>
                  </div>
                  <span className="text-sm text-[#7B8FAB]">{memberCount} members</span>
                </div>
              </div>
            )}

            {/* Permission Toggles */}
            <div className="space-y-3 mb-8">
              {permissions.map((permission) => {
                const isEnabled = permissionMatrix[activeRole as keyof typeof permissionMatrix]?.[
                  permission.id as keyof (typeof permissionMatrix)["admin"]
                ];
                return (
                  <div key={permission.id} className="bg-[#161D2A] border border-[#1C2536] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-[#DFE6F0] mb-1">{permission.name}</h4>
                        <p className="text-sm text-[#7B8FAB]">{permission.description}</p>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full transition-all flex items-center ${
                          isEnabled ? "bg-[#34D399] justify-end" : "bg-[#1C2536] justify-start"
                        }`}
                      >
                        <div className="w-5 h-5 bg-white rounded-full mx-0.5 shadow-sm" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Matrix Overview */}
            <div className="bg-[#161D2A] border border-[#1C2536] rounded-lg p-6">
              <h3 className="text-xs uppercase text-[#7B8FAB] mb-4 tracking-wide">Matrix Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left px-3 py-2 text-xs text-[#7B8FAB] font-medium">Permission</th>
                      {roles.map((role) => (
                        <th key={role.id} className="text-center px-3 py-2 text-xs font-medium" style={{ color: role.color }}>
                          {role.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((permission) => (
                      <tr key={permission.id} className="border-t border-[#1C2536]">
                        <td className="px-3 py-2 text-sm text-[#DFE6F0]">{permission.name}</td>
                        {roles.map((role) => {
                          const hasPermission = permissionMatrix[role.id as keyof typeof permissionMatrix]?.[
                            permission.id as keyof (typeof permissionMatrix)["admin"]
                          ];
                          return (
                            <td key={role.id} className="text-center px-3 py-2">
                              {hasPermission ? (
                                <Check className="w-4 h-4 inline-block text-[#34D399]" />
                              ) : (
                                <Minus className="w-4 h-4 inline-block text-[#3F506A]" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
