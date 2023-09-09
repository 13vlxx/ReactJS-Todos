/* eslint-disable no-unused-vars */
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [todoAlreadyExist, setTodoAlreadyExist] = useState(false);

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");

    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!todo) {
      setEmptyInputError(true);
      return;
    }

    const todoAlreadyExist = todoList.some((item) => item.text === todo);

    if (todoAlreadyExist) {
      setTodoAlreadyExist(true);
      return;
    }

    const newTodoList = [...todoList, { id: nanoid(8), text: todo }];
    setTodoList(newTodoList);
    setTodo("");
    setEmptyInputError(false);
    setTodoAlreadyExist(false);

    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  }

  function deleteTodo(id) {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);

    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  }

  let errorMessage;
  if (todoList.length !== 0) {
    if (emptyInputError) {
      errorMessage = <p className="mt-2 text-red-500">Veuillez bien remplir le champ...</p>;
    } else if (todoAlreadyExist) {
      errorMessage = <p className="mt-2 text-red-500">Tache déjà existante...</p>;
    }
  } else {
    errorMessage = <p className="mt-2">Aucune tache à afficher...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <h1 className="text-3xl font-semibold select-none">React Todos</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          placeholder="Entrez une tache à réaliser"
          className="text-slate-950 rounded w-full py-2 pl-2 outline-blue-600"
          type="text"
        />
        <button className="bg-blue-600 px-2 rounded hover:bg-blue-700 transition-colors duration-100">
          Valider
        </button>
      </form>
      {errorMessage}
      <ul className="mt-4">
        {todoList.map((todo) => (
          <TodoList key={todo.id} content={todo} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}
export default App;
