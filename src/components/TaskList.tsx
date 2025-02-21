import { useEffect, useState } from "react";
import { getTasks } from "@/utils/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task: any) => (
          <li key={task.id} className="border p-3 rounded-lg shadow-md">
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
