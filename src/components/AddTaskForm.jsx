import { useState } from 'react';
import { motion } from 'framer-motion';
import { useKanbanStore } from '../store/kanbanStore';

export default function AddTaskForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const addTask = useKanbanStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskTitle.trim()) return;
    
    addTask(taskTitle.trim());
    setTaskTitle('');
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setTaskTitle('');
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full bg-highlight text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 font-sans hover:opacity-90"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New Task
      </motion.button>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="bg-slate-800 rounded-xl p-4 shadow-lg border-2 border-highlight/30"
    >
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter task title..."
        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition-all mb-3 font-sans"
        autoFocus
      />

      <div className="flex gap-2">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!taskTitle.trim()}
          className="flex-1 bg-highlight text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-sans hover:opacity-90"
        >
          Add Task
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setIsOpen(false);
            setTaskTitle('');
          }}
          className="px-4 py-2 bg-slate-700 text-gray-200 font-semibold rounded-lg hover:bg-slate-600 transition-colors font-sans"
        >
          Cancel
        </motion.button>
      </div>

      <p className="text-xs text-gray-400 mt-2 font-sans">
        Press <kbd className="px-1 py-0.5 bg-slate-700 rounded text-gray-300">Esc</kbd> to cancel
      </p>
    </motion.form>
  );
}
