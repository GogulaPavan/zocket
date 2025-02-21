const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const fetchTasks = async () => {
  try {
    const res = await fetch(`${API_URL}/tasks`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const createTask = async (taskData) => {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    return res.json();
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export const suggestTask = async (input) => {
  try {
    const res = await fetch(`${API_URL}/ai-suggest-task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
  }
};
