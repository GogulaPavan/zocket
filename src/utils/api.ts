const API_URL = "http://localhost:8080";

// Fetch all tasks
export const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Create a new task
export const createTask = async (taskData: { title: string; description: string }) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};

// Get AI-Suggested Task
export const getAISuggestedTask = async (userInput: string) => {
  try {
    const response = await fetch(`${API_URL}/ai-suggest-task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching AI suggestion:", error);
    return null;
  }
};
