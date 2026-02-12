import { useState } from 'react';
import { motion } from 'framer-motion';
import { useKanbanStore } from '../store/kanbanStore';

export default function TaskCard({ task, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const deleteTask = useKanbanStore((state) => state.deleteTask);
  const updateTaskTitle = useKanbanStore((state) => state.updateTaskTitle);

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('sourceColumn', task.column);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      updateTaskTitle(task.id, editTitle.trim());
    } else {
      setEditTitle(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      layout
      draggable
      onDragStart={handleDragStart}
      className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 cursor-move border border-gray-100 hover:border-highlight/30"
    >
      <div className="flex items-start justify-between gap-3">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-1 text-sm text-gray-800 font-medium outline-none border-b-2 border-highlight focus:border-highlight font-sans"
            autoFocus
          />
        ) : (
          <p
            onClick={handleEdit}
            className="flex-1 text-sm text-gray-800 font-medium leading-relaxed cursor-text hover:text-highlight transition-colors font-sans"
          >
            {task.title}
          </p>
        )}

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEdit}
            className="text-gray-400 hover:text-highlight transition-colors"
            title="Edit task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            className="text-gray-400 hover:text-highlight transition-colors"
            title="Delete task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Drag indicator */}
      <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
      </div>
    </motion.div>
  );
}
