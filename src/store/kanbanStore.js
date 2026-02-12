import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockAPI } from '../utils/mockAPI';
import toast from 'react-hot-toast';

const COLUMNS = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  DONE: 'done',
};

// Initial state with sample tasks
const initialTasks = [
  {
    id: '1',
    title: 'Design landing page mockup',
    column: COLUMNS.TODO,
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Implement authentication flow',
    column: COLUMNS.IN_PROGRESS,
    createdAt: Date.now() - 1000,
  },
  {
    id: '3',
    title: 'Setup project repository',
    column: COLUMNS.DONE,
    createdAt: Date.now() - 2000,
  },
];

export const useKanbanStore = create(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      user: null,
      
      // Authentication
      login: (username) => {
        set({ user: { username, loggedInAt: Date.now() } });
      },
      
      logout: () => {
        set({ user: null, tasks: initialTasks });
      },
      
      // Task operations with optimistic updates
      addTask: async (title) => {
        const tempId = `temp-${Date.now()}`;
        const optimisticTask = {
          id: tempId,
          title,
          column: COLUMNS.TODO,
          createdAt: Date.now(),
        };
        
        // Optimistic update
        set((state) => ({
          tasks: [...state.tasks, optimisticTask],
        }));
        
        try {
          // Call mock API
          const serverTask = await mockAPI.addTask(optimisticTask);
          
          // Replace temp task with server response
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === tempId ? { ...serverTask, column: COLUMNS.TODO } : task
            ),
          }));
          
          toast.success('Task added successfully!');
        } catch (error) {
          // Rollback on failure
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== tempId),
          }));
          
          toast.error(error.message || 'Failed to add task');
        }
      },
      
      moveTask: async (taskId, targetColumn) => {
        const { tasks } = get();
        const taskToMove = tasks.find((task) => task.id === taskId);
        
        if (!taskToMove) return;
        
        const originalColumn = taskToMove.column;
        
        // Optimistic update
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, column: targetColumn } : task
          ),
        }));
        
        try {
          // Call mock API
          await mockAPI.moveTask(taskId, originalColumn, targetColumn);
          toast.success('Task moved successfully!');
        } catch (error) {
          // Rollback on failure
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, column: originalColumn } : task
            ),
          }));
          
          toast.error(error.message || 'Failed to move task');
        }
      },
      
      deleteTask: async (taskId) => {
        const { tasks } = get();
        const taskToDelete = tasks.find((task) => task.id === taskId);
        
        if (!taskToDelete) return;
        
        // Optimistic update
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
        
        try {
          // Call mock API
          await mockAPI.deleteTask(taskId);
          toast.success('Task deleted successfully!');
        } catch (error) {
          // Rollback on failure
          set((state) => ({
            tasks: [...state.tasks, taskToDelete].sort(
              (a, b) => a.createdAt - b.createdAt
            ),
          }));
          
          toast.error(error.message || 'Failed to delete task');
        }
      },
      
      updateTaskTitle: async (taskId, newTitle) => {
        const { tasks } = get();
        const taskToUpdate = tasks.find((task) => task.id === taskId);
        
        if (!taskToUpdate) return;
        
        const originalTitle = taskToUpdate.title;
        
        // Optimistic update
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
          ),
        }));
        
        try {
          // Call mock API
          await mockAPI.updateTask(taskId, { title: newTitle });
          toast.success('Task updated successfully!');
        } catch (error) {
          // Rollback on failure
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, title: originalTitle } : task
            ),
          }));
          
          toast.error(error.message || 'Failed to update task');
        }
      },
      
      // Helper to get tasks by column
      getTasksByColumn: (column) => {
        return get().tasks.filter((task) => task.column === column);
      },
    }),
    {
      name: 'kanban-storage',
      partialize: (state) => ({ user: state.user, tasks: state.tasks }),
    }
  )
);

export { COLUMNS };
