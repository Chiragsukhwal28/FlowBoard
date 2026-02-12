import { motion } from 'framer-motion';
import { useKanbanStore, COLUMNS } from '../store/kanbanStore';
import Column from '../components/Column';
import AddTaskForm from '../components/AddTaskForm';

export default function BoardPage() {
  const user = useKanbanStore((state) => state.user);
  const logout = useKanbanStore((state) => state.logout);
  const tasks = useKanbanStore((state) => state.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.column === COLUMNS.DONE).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 shadow-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl rotate-12 flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white -rotate-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="font-display text-2xl text-gray-100 italic">FlowBoard</h1>
                <p className="text-sm text-gray-400 font-sans">Welcome back, {user?.username}</p>
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden sm:flex items-center gap-6 bg-slate-700 rounded-xl px-4 py-2 border border-slate-600"
              >
                <div className="text-center">
                  <div className="text-xs text-gray-400 font-sans">Tasks</div>
                  <div className="text-lg font-bold text-gray-100 font-sans">{totalTasks}</div>
                </div>
                <div className="w-px h-8 bg-slate-600"></div>
                <div className="text-center">
                  <div className="text-xs text-gray-400 font-sans">Done</div>
                  <div className="text-lg font-bold text-success font-sans">{completedTasks}</div>
                </div>
                <div className="w-px h-8 bg-slate-600"></div>
                <div className="text-center">
                  <div className="text-xs text-gray-400 font-sans">Progress</div>
                  <div className="text-lg font-bold text-highlight font-sans">{completionRate}%</div>
                </div>
              </motion.div>

              {/* Logout Button */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-gray-200 rounded-xl transition-colors font-sans font-medium"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Board */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Task Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <AddTaskForm />
        </motion.div>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column columnId={COLUMNS.TODO} />
          <Column columnId={COLUMNS.IN_PROGRESS} />
          <Column columnId={COLUMNS.DONE} />
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
        >
          <h3 className="font-display text-lg text-gray-100 mb-3 italic">How to use</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-400 font-sans">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-highlight rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-highlight font-bold">1</span>
              </div>
              <div>
                <div className="font-semibold text-gray-200 mb-1">Add Tasks</div>
                <div>Click "Add New Task" to create items</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-highlight/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-highlight font-bold">2</span>
              </div>
              <div>
                <div className="font-semibold text-gray-200 mb-1">Drag & Drop</div>
                <div>Move tasks between columns</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-highlight/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-highlight font-bold">3</span>
              </div>
              <div>
                <div className="font-semibold text-gray-200 mb-1">Edit & Delete</div>
                <div>Hover over tasks to see options</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center"
        >
          <p className="text-xs text-gray-500 font-sans">
            ⚡ Optimistic UI enabled • All actions update instantly with automatic rollback on failure
          </p>
        </motion.div>
      </main>
    </div>
  );
}
