import { useState } from "react";
import { createTask, getAISuggestedTask } from "@/utils/api";

const TaskForm = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setLoading(true);
    await createTask({ title, description });
    setTitle("");
    setDescription("");
    setLoading(false);
    onTaskAdded();
  };

  const handleAISuggestion = async () => {
    const suggestion = await getAISuggestedTask("Suggest a task");
    if (suggestion) {
      setTitle(suggestion.title);
      setDescription(suggestion.description);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
      <button
        type="button"
        onClick={handleAISuggestion}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        AI Suggest Task
      </button>
    </form>
  );
};

export default TaskForm;
