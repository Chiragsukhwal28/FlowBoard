# FlowBoard - Kanban Board with Optimistic UI

A modern, production-ready Kanban board application built with React, featuring **Optimistic UI updates**, robust state management, and elegant error handling with automatic rollback.

![FlowBoard Demo](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

## 🚀 Live Demo

**[View Live Application](https://your-deployment-url.vercel.app)**

## ✨ Key Features

- **Optimistic UI**: Instant feedback on all actions (add, move, delete)
- **Automatic Rollback**: Failed operations revert UI to previous state
- **Mock API**: Simulates backend with 1-2s latency and 20% failure rate
- **Drag & Drop**: Smooth task movement between columns
- **Persistent State**: User session and tasks saved to localStorage
- **Beautiful UI**: Custom-designed interface with Framer Motion animations
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## 🎯 Technical Highlights

### Optimistic UI Implementation

This application demonstrates a production-grade approach to optimistic updates:

#### 1. **Immediate UI Updates**
When a user performs an action (add/move/delete task), the UI updates **instantly** without waiting for the server:

```javascript
// Example: Moving a task
moveTask: async (taskId, targetColumn) => {
  const originalColumn = taskToMove.column;
  
  // ✅ OPTIMISTIC UPDATE - Happens immediately
  set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, column: targetColumn } : task
    ),
  }));
  
  try {
    // API call happens in background
    await mockAPI.moveTask(taskId, originalColumn, targetColumn);
  } catch (error) {
    // ❌ ROLLBACK - If API fails, revert to original state
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, column: originalColumn } : task
      ),
    }));
  }
}
```

#### 2. **State Snapshot Pattern**
Before any operation, we capture the current state:
- For **move operations**: Store original column
- For **delete operations**: Store entire task object
- For **add operations**: Use temporary IDs that get replaced

#### 3. **Automatic Rollback Mechanism**
When the API fails (20% of the time in our mock):
- The UI automatically reverts to the snapshot state
- User sees a clear error notification
- No data loss or inconsistency

#### 4. **Error Handling**
```javascript
try {
  await mockAPI.deleteTask(taskId);
  toast.success('Task deleted successfully!');
} catch (error) {
  // Restore the deleted task in its original position
  set((state) => ({
    tasks: [...state.tasks, taskToDelete].sort(
      (a, b) => a.createdAt - b.createdAt
    ),
  }));
  toast.error(error.message);
}
```

### State Management Architecture

**Zustand Store** (`src/store/kanbanStore.js`):
- Centralized state management
- Persist middleware for localStorage
- Atomic operations with rollback support
- Clean separation of concerns

**Why Zustand?**
- Simple API with minimal boilerplate
- Built-in persistence
- Excellent TypeScript support
- Small bundle size (~1kb)
- Perfect for optimistic updates

## 📁 Project Structure

```
kanban-board/
├── src/
│   ├── components/
│   │   ├── TaskCard.jsx          # Individual task with edit/delete
│   │   ├── Column.jsx             # Kanban column with drop zone
│   │   └── AddTaskForm.jsx        # Task creation form
│   ├── pages/
│   │   ├── LandingPage.jsx        # Login screen
│   │   └── BoardPage.jsx          # Main Kanban board
│   ├── store/
│   │   └── kanbanStore.js         # Zustand state management
│   ├── utils/
│   │   └── mockAPI.js             # Mock backend with failures
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 18.2** - UI library
- **Zustand 4.4** - State management with persistence
- **Framer Motion 10** - Smooth animations
- **React Hot Toast** - Beautiful notifications
- **Tailwind CSS 3.4** - Utility-first styling
- **Vite 5** - Lightning-fast build tool

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kanban-board.git
cd kanban-board
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🎮 How to Use

1. **Login**: Enter any username on the landing page
2. **Add Tasks**: Click "Add New Task" and enter a task title
3. **Move Tasks**: Drag and drop tasks between columns
4. **Edit Tasks**: Click on a task title to edit it inline
5. **Delete Tasks**: Hover over a task and click the delete icon
6. **Watch the Magic**: Notice how all actions are instant, and failed operations automatically rollback!

## 🧪 Testing the Optimistic UI

The mock API has a **20% failure rate**. To see the optimistic updates in action:

1. Add several tasks quickly - some will succeed, some will fail
2. Try moving tasks between columns - watch for rollbacks
3. Delete tasks - failed deletions will restore the task
4. Check the toast notifications for success/error feedback

You'll notice:
- ✅ UI updates **instantly** (no loading states)
- ❌ Failed operations **automatically rollback**
- 📢 Clear **error notifications** appear
- 🔄 State remains **consistent** throughout

## 🎨 Design Philosophy

This application follows a **refined, editorial aesthetic**:

- **Typography**: DM Serif Display for headers (elegant, editorial), DM Sans for body (clean, readable)
- **Color Palette**: Deep blues with vibrant accent colors (highlight pink, success green)
- **Motion**: Subtle, purposeful animations using Framer Motion
- **Spacing**: Generous whitespace for breathing room
- **Layout**: Card-based design with soft shadows and rounded corners

## 📊 Performance Considerations

- **Optimistic updates** eliminate perceived latency
- **Zustand** provides minimal re-renders
- **Framer Motion** uses GPU-accelerated animations
- **Code splitting** ready (can be added if needed)
- **Production build** is fully optimized with Vite

## 🔒 State Persistence

User sessions and tasks are automatically saved to localStorage:
- Login state persists across page refreshes
- Tasks are saved after every operation
- User can close browser and return to same state

## 🚧 Future Enhancements

Potential additions for a real-world application:
- [ ] Real backend integration (REST API or GraphQL)
- [ ] User authentication (OAuth, JWT)
- [ ] Task due dates and priorities
- [ ] Task search and filtering
- [ ] Multiple boards per user
- [ ] Collaborative features (real-time updates)
- [ ] Task assignments to team members
- [ ] Activity history and audit log
- [ ] Dark mode toggle
- [ ] Export/import functionality

## 📝 License

MIT License - feel free to use this project for learning or as a starting point for your own applications.

## 👨‍💻 Author

Built with ❤️ as a demonstration of optimistic UI patterns and modern React best practices.

---

## 🎓 Learning Resources

Want to dive deeper into the concepts used in this project?

- [Optimistic UI Patterns](https://www.apollographql.com/docs/react/performance/optimistic-ui/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [React DnD Patterns](https://react-dnd.github.io/react-dnd/about)

## 🐛 Troubleshooting

**Q: Tasks aren't persisting after refresh?**  
A: Check browser console for localStorage errors. Some browsers restrict localStorage in incognito mode.

**Q: Drag and drop not working?**  
A: Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge latest versions).

**Q: Build fails?**  
A: Delete `node_modules` and `package-lock.json`, then run `npm install` again.

## 🤝 Contributing

This is a demo project, but feel free to fork and extend it! Some ideas:
- Add TypeScript types
- Implement real API integration
- Add unit tests with Vitest
- Create E2E tests with Playwright
- Add more column customization options

---

**Note**: This application uses a mock API that randomly fails 20% of the time to demonstrate optimistic UI and rollback patterns. In a production application, you would replace `mockAPI.js` with real API calls to your backend.
