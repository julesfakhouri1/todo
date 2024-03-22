import React, { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Apprendre Next.js", completed: false },
    { id: 2, text: "Créer une application de liste de tâches", completed: false },
    { id: 3, text: "Explorer Vercel pour le déploiement", completed: false }
  ]);

  const [newTask, setNewTask] = useState(""); 
  const [editedTask, setEditedTask] = useState(null);

  const toggleCompletion = async (id) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);

    fetch(`http://localhost:3001/todoListApp/tasks/${id}/toggle-completion`, { method: 'PUT' });
  };

  const handleAddTask = async () => {
    if (newTask.trim() === "") return; 
    const updatedTasks = [...tasks, { id: tasks.length + 1, text: newTask, completed: false }]; 
    setTasks(updatedTasks); 
    setNewTask("");

    fetch('http://localhost:3001/todoListApp/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newTask })
    });
  };

  const handleRemoveTask = async (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);

    fetch(`http://localhost:3001/todoListApp/tasks/${id}`, { method: 'DELETE' });
  };

  const handleEditTask = (task) => {
    setEditedTask(task);
    setNewTask(task.text);
  };

  const handleSaveEditedTask = async () => {
    if (newTask.trim() === "") return;
    const updatedTasks = tasks.map(task => {
      if (task.id === editedTask.id) {
        return { ...task, text: newTask };
      }
      return task;
    });
    setTasks(updatedTasks);
    setNewTask("");
    setEditedTask(null);

    fetch(`http://localhost:3001/todoListApp/tasks/${editedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newTask })
    });
  };

  const getTasks = async () => {
    try {
      const response = await fetch('http://localhost:3001/todoListApp/tasks');
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des tâches');
      }
      
      const data = await response.json();
      console.log("Réponse de l'API:", data); // Affichage des données récupérées depuis l'API
      setTasks(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  };
  

  useEffect(() => {
    getTasks();
  }, []);
  

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
            <button onClick={() => handleRemoveTask(task.id)}>Supprimer la tâche</button>
            <button onClick={() => handleEditTask(task)}>Modifier la tâche</button>
          </li>
        ))}
      </ul>

      <div>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        {editedTask ? (
          <button onClick={handleSaveEditedTask}>Enregistrer la modification</button>
        ) : (
          <button onClick={handleAddTask}>Ajouter une tâche</button>
        )}
      </div>
    </div>
  );
}
