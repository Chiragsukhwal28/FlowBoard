import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKanbanStore } from '../store/kanbanStore';
import TaskCard from './TaskCard';

const COLUMN_CONFIG = {
  todo: {
    title: 'To Do',
    color: 'from-blue-500 to-blue-600',
    icon: '📝',
  },
  inProgress: {
    title: 'In Progress',
    color: 'from-yellow-500 to-orange-500',
    icon: '🚀',
  },
  done: {
    title: 'Done',
    color: 'from-green-500 to-emerald-600',
    icon: '✓',
  },
};

export default function Column({ columnId }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const tasks = useKanbanStore((state) => state.getTasksByColumn(columnId));
  const moveTask = useKanbanStore((state) => state.moveTask);

  const config = COLUMN_CONFIG[columnId];

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');

    if (sourceColumn !== columnId) {
      moveTask(taskId, columnId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      {/* Column Header */}
      <div className={`bg-gradient-to-r ${config.color} rounded-t-2xl p-4 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{config.icon}</span>
            <h2 className="text-white font-display text-xl italic">{config.title}</h2>
          </div>
          <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white font-semibold text-sm font-sans">
              {tasks.length}
            </span>
          </div>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex-1 bg-gray-50 rounded-b-2xl p-4 transition-all duration-200 min-h-[500px] ${
          isDragOver ? 'bg-highlight/10 ring-2 ring-highlight ring-inset' : ''
        }`}
      >
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
          </AnimatePresence>

          {tasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-40 text-gray-400"
            >
              <svg
                className="w-12 h-12 mb-2 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-sm font-sans">
                {isDragOver ? 'Drop here' : 'No tasks yet'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
