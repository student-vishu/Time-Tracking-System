export type ColumnId = "backlog" | "todo" | "test_case" | "in_progress" | "dev_done" | "test_case_check_done" | "dev_fail" | "completed";

export interface Task {
  id: number;
  release: string;
  releaseColor: string;
  title: string;
  tags: string[];
  timeSpent: number;
  timeEstimate: number;
  priority: string;
  avatar: string;
  tracking: boolean;
  status: ColumnId;
}

export interface Release {
  id: number;
  name: string;
  color: string;
  description?: string;
  targetDate?: string;
  members?: { id: number; name: string; avatar: string }[];
}

export interface TimerState {
  taskId: number | null;
  startedAt: number | null;
  elapsedSeconds: number;
}

export interface Column {
  id: ColumnId;
  title: string;
  icon: string;
  color: string;
}
