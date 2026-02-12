// Mock API to simulate backend interactions with latency and random failures
const API_LATENCY = 1500; // 1.5 seconds
const FAILURE_RATE = 0.2; // 20% failure rate

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldFail = () => Math.random() < FAILURE_RATE;

class MockAPIError extends Error {
  constructor(message, operation) {
    super(message);
    this.name = 'MockAPIError';
    this.operation = operation;
  }
}

export const mockAPI = {
  // Add a new task
  addTask: async (task) => {
    await delay(API_LATENCY);
    
    if (shouldFail()) {
      throw new MockAPIError('Failed to add task. Please try again.', 'add');
    }
    
    // Simulate server response with assigned ID
    return {
      ...task,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
  },

  // Move a task between columns
  moveTask: async (taskId, fromColumn, toColumn) => {
    await delay(API_LATENCY);
    
    if (shouldFail()) {
      throw new MockAPIError('Failed to move task. Please try again.', 'move');
    }
    
    return { success: true, taskId, fromColumn, toColumn };
  },

  // Delete a task
  deleteTask: async (taskId) => {
    await delay(API_LATENCY);
    
    if (shouldFail()) {
      throw new MockAPIError('Failed to delete task. Please try again.', 'delete');
    }
    
    return { success: true, taskId };
  },

  // Update task title
  updateTask: async (taskId, updates) => {
    await delay(API_LATENCY);
    
    if (shouldFail()) {
      throw new MockAPIError('Failed to update task. Please try again.', 'update');
    }
    
    return { success: true, taskId, updates };
  },
};
