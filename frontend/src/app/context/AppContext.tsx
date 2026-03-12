import { createContext, useContext, useReducer, useEffect, useMemo, useCallback, type ReactNode } from "react";
import type { Task, Release, TimerState, ColumnId } from "../types";
import { initialTasks, initialReleases, columns } from "../data/seed";

interface AppState {
  tasks: Task[];
  releases: Release[];
  timer: TimerState;
  searchQuery: string;
  releaseFilter: string | null;
}

type Action =
  | { type: "ADD_RELEASE"; payload: Omit<Release, "id"> }
  | { type: "ADD_TASK"; payload: Omit<Task, "id" | "tracking"> }
  | { type: "MOVE_TASK"; payload: { taskId: number; status: ColumnId } }
  | { type: "START_TRACKING"; payload: { taskId: number } }
  | { type: "STOP_TRACKING" }
  | { type: "TIMER_TICK" }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_RELEASE_FILTER"; payload: string | null };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_RELEASE": {
      const maxId = state.releases.reduce((max, r) => Math.max(max, r.id), 0);
      return {
        ...state,
        releases: [...state.releases, { ...action.payload, id: maxId + 1 }],
      };
    }
    case "ADD_TASK": {
      const maxId = state.tasks.reduce((max, t) => Math.max(max, t.id), 0);
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: maxId + 1, tracking: false }],
      };
    }
    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.taskId ? { ...t, status: action.payload.status } : t
        ),
      };
    case "START_TRACKING": {
      // Stop any current tracking first, accumulate time
      let tasks = state.tasks;
      if (state.timer.taskId !== null) {
        const elapsed = state.timer.elapsedSeconds;
        const elapsedHours = elapsed / 3600;
        tasks = tasks.map((t) =>
          t.id === state.timer.taskId
            ? { ...t, tracking: false, timeSpent: parseFloat((t.timeSpent + elapsedHours).toFixed(2)) }
            : t
        );
      }
      tasks = tasks.map((t) =>
        t.id === action.payload.taskId ? { ...t, tracking: true } : { ...t, tracking: false }
      );
      return {
        ...state,
        tasks,
        timer: { taskId: action.payload.taskId, startedAt: Date.now(), elapsedSeconds: 0 },
      };
    }
    case "STOP_TRACKING": {
      if (state.timer.taskId === null) return state;
      const elapsed = state.timer.elapsedSeconds;
      const elapsedHours = elapsed / 3600;
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === state.timer.taskId
            ? { ...t, tracking: false, timeSpent: parseFloat((t.timeSpent + elapsedHours).toFixed(2)) }
            : t
        ),
        timer: { taskId: null, startedAt: null, elapsedSeconds: 0 },
      };
    }
    case "TIMER_TICK": {
      if (state.timer.startedAt === null) return state;
      return {
        ...state,
        timer: {
          ...state.timer,
          elapsedSeconds: Math.floor((Date.now() - state.timer.startedAt) / 1000),
        },
      };
    }
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_RELEASE_FILTER":
      return { ...state, releaseFilter: action.payload };
    default:
      return state;
  }
}

const initialState: AppState = {
  tasks: initialTasks,
  releases: initialReleases,
  timer: { taskId: null, startedAt: null, elapsedSeconds: 0 },
  searchQuery: "",
  releaseFilter: null,
};

interface AppContextValue {
  tasks: Task[];
  releases: Release[];
  timer: TimerState;
  searchQuery: string;
  releaseFilter: string | null;
  tasksByColumn: Record<ColumnId, Task[]>;
  addRelease: (release: Omit<Release, "id">) => void;
  addTask: (task: Omit<Task, "id" | "tracking">) => void;
  moveTask: (taskId: number, status: ColumnId) => void;
  startTracking: (taskId: number) => void;
  stopTracking: () => void;
  setSearchQuery: (query: string) => void;
  setReleaseFilter: (release: string | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Timer tick effect
  useEffect(() => {
    if (state.timer.taskId === null) return;
    const interval = setInterval(() => dispatch({ type: "TIMER_TICK" }), 1000);
    return () => clearInterval(interval);
  }, [state.timer.taskId]);

  // Derived: filter tasks by search + release, group by column
  const tasksByColumn = useMemo(() => {
    const filtered = state.tasks.filter((task) => {
      const matchesSearch =
        !state.searchQuery ||
        task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        task.tags.some((tag) => tag.toLowerCase().includes(state.searchQuery.toLowerCase()));
      const matchesRelease = !state.releaseFilter || task.release === state.releaseFilter;
      return matchesSearch && matchesRelease;
    });
    const grouped: Record<ColumnId, Task[]> = { backlog: [], todo: [], test_case: [], in_progress: [], dev_done: [], test_case_check_done: [], dev_fail: [], completed: [] };
    for (const task of filtered) {
      grouped[task.status].push(task);
    }
    return grouped;
  }, [state.tasks, state.searchQuery, state.releaseFilter]);

  const addRelease = useCallback((release: Omit<Release, "id">) => {
    dispatch({ type: "ADD_RELEASE", payload: release });
  }, []);
  const addTask = useCallback((task: Omit<Task, "id" | "tracking">) => {
    dispatch({ type: "ADD_TASK", payload: task });
  }, []);
  const moveTask = useCallback((taskId: number, status: ColumnId) => {
    dispatch({ type: "MOVE_TASK", payload: { taskId, status } });
  }, []);
  const startTracking = useCallback((taskId: number) => {
    dispatch({ type: "START_TRACKING", payload: { taskId } });
  }, []);
  const stopTracking = useCallback(() => {
    dispatch({ type: "STOP_TRACKING" });
  }, []);
  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  }, []);
  const setReleaseFilter = useCallback((release: string | null) => {
    dispatch({ type: "SET_RELEASE_FILTER", payload: release });
  }, []);

  const value: AppContextValue = {
    tasks: state.tasks,
    releases: state.releases,
    timer: state.timer,
    searchQuery: state.searchQuery,
    releaseFilter: state.releaseFilter,
    tasksByColumn,
    addRelease,
    addTask,
    moveTask,
    startTracking,
    stopTracking,
    setSearchQuery,
    setReleaseFilter,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
