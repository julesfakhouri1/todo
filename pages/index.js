import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Apprendre Next.js", completed: false },
    { id: 2, text: "Créer une application de liste de tâches", completed: false },
    { id: 3, text: "Explorer Vercel pour le déploiement", completed: false }
  ]);

  const toggleCompletion = (id) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <div>
      <h1>Ma Liste de Tâches</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
            <button onClick={() => toggleCompletion(task.id)}>
              {task.completed ? 'Marquer comme non complétée' : 'Marquer comme complétée'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
