/* eslint-disable no-unused-vars */
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([
    {
      id: nanoid(8),
      text: "13vlxx",
    },
  ]);
  const [errors, setErrors] = useState({
    emptyInput: false,
    todoAlreadyExist: false,
  });

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");

    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!todo) {
      setErrors({ ...errors, emptyInput: true });
      return;
    }

    const tae = todoList.find((item) => item.text === todo);

    if (tae) {
      setErrors({ ...errors, todoAlreadyExist: true });
      return;
    }

    const newTodoList = [...todoList, { id: nanoid(8), text: todo }];
    setTodoList(newTodoList);
    setTodo("");
    setErrors({ ...errors, todoAlreadyExist: false, emptyInput: false });

    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  }

  function deleteTodo(id) {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
    setErrors({ ...errors, todoAlreadyExist: false, emptyInput: false });

    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  }

  let errorMessage;
  if (todoList.length === 0) {
    errorMessage = <p className="mt-2">Aucune tache à afficher...</p>;
  } else {
    if (errors.todoAlreadyExist) {
      errorMessage = <p className="mt-2 text-red-500">Tache déjà existante...</p>;
    }
    if (errors.emptyInput) {
      errorMessage = <p className="mt-2 text-red-500">Veuillez bien remplir le champ...</p>;
    }
  }

  if (errors.emptyInput) {
    errorMessage = <p className="mt-2 text-red-500">Veuillez bien remplir le champ...</p>;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 text-slate-50 p-8 ${
        todo === "vertical" && "cursor-vertical-text"
      } ${
        todo.includes("13vlxx") || todoList.find((item) => item.text === "13vlxx")
          ? "bg-slate-200 text-slate-950"
          : "bg-slate-900"
      }`}
    >
      <h1 className="text-3xl font-semibold select-none">React Todos</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          placeholder="Entrez une tache à réaliser"
          className="text-slate-950 rounded w-full py-2 pl-2 outline-blue-600"
          type="text"
        />
        <button
          disabled={!todo}
          className={`bg-blue-600 px-2 rounded hover:bg-blue-700 transition-colors duration-200 ${
            !todo && "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
          } ${
            todo.includes("13vlxx") || todoList.find((item) => item.text === "13vlxx")
              ? "bg-green-500 hover:bg-green-600 cursor-cell text-slate-50"
              : ""
          }`}
        >
          Valider
        </button>
      </form>
      {errorMessage}
      <ul
        className={`mt-4 ${
          todo.includes("13vlxx") || todoList.find((item) => item.text === "13vlxx")
            ? "text-slate-50"
            : ""
        }`}
      >
        {todoList.map((todo) => (
          <TodoList key={todo.id} content={todo} deleteTodo={deleteTodo} inputValue={todo} />
        ))}
      </ul>
    </div>
  );
}
export default App;
