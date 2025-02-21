import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm onTaskAdded={() => setRefresh(!refresh)} />
      <TaskList key={refresh.toString()} />
    </div>
  );
}
