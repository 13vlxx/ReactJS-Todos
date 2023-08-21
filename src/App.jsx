import { useState } from "react";
import { nanoid } from "nanoid";
import ListItem from "./components/ListItem";

function App() {
  const [todoList, setTodoList] = useState([]);

  const [todo, setTodo] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  function deleteTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (todo === "") {
      setShowValidation(true);
      return;
    }
    setTodoList([...todoList, { id: nanoid(8), content: todo }]);
    setTodo("");
    setShowValidation(false);
  }

  return (
    <div className="h-screen">
      <div className="max-w-4xl mx-auto pt-20 px-6">
        <h1 className="text-3xl text-slate-100 mb-4">ToDo List</h1>

        <form onSubmit={handleSubmit} className="mb-10">
          <label htmlFor="todo-item" className="text-slate-50">
            Ajouter une chose à faire
          </label>
          <input
            placeholder="Apprendre ReactJS"
            type="text"
            className="mt-1 block w-full rounded"
            id="todo-item"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          {showValidation && (
            <p className="text-red-400">Ajoutez d&apos;abord du contenu à votre tâche</p>
          )}
          <button className="mt-4 py-2 px-2 bg-slate-50 rounded min-w-[115px]">Ajouter</button>
        </form>
        <ul>
          {todoList.length === 0 && (
            <li className="text-slate-50 text-md">Pas d&apos;items à afficher...</li>
          )}
          {todoList.length > 0 &&
            todoList.map((item) => (
              <ListItem key={item.id} itemData={item} deleteTodo={deleteTodo} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
