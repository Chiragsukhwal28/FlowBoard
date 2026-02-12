import { Toaster } from 'react-hot-toast';
import { useKanbanStore } from './store/kanbanStore';
import LandingPage from './pages/LandingPage';
import BoardPage from './pages/BoardPage';

function App() {
  const user = useKanbanStore((state) => state.user);

  return (
    <>
      {user ? <BoardPage /> : <LandingPage />}
      
      {/* Toast notifications for all API operations */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a2e',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontFamily: 'DM Sans, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#00d9a3',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#e94560',
              secondary: '#fff',
            },
            duration: 4000,
          },
        }}
      />
    </>
  );
}

export default App;
