import { nanoid } from "nanoid";
import { useState } from "react";
import Todo from "./components/Todo";
import noTodo from "./assets/noTodo.svg";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todosList, setTodoList] = useState([]);
  const [error, setError] = useState({
    undefined: false,
    taskAlreadyExist: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue) {
      setError({ ...error, undefined: true });
      return;
    }

    if (todosList.find((todo) => todo.name === inputValue)) {
      setError({ ...error, taskAlreadyExist: true });
      return;
    }

    setTodoList([...todosList, { id: nanoid(8), name: inputValue }]);
    setError({ ...error, undefined: false, taskAlreadyExist: false });
    setInputValue("");
  }

  function deleteTodo(id) {
    const todoToDelete = todosList.find((todo) => todo.id === id);
    if (confirm(`Voulez vous vraiment supprimer la tâche suivante : '${todoToDelete.name}' ?`)) {
      setTodoList(todosList.filter((todo) => todo.id !== id));
      setError({ ...error, undefined: false, taskAlreadyExist: false });
    }

    return;
  }

  function deleteAllTodos() {
    if (confirm("Voulez vous vraiment supprimer toutes les tâches ?")) {
      setTodoList([]);
    }
  }

  let errorMessage;
  if (error.undefined) {
    errorMessage = <p className="text-red-600">Veuillez rentrer une tâche...</p>;
  } else if (error.taskAlreadyExist) {
    errorMessage = <p className="text-red-600">Cette tâche à déjà été définie...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900">
      <div className="min-w-[280px] sm:min-w-[450px] md:min-w-[700px] min-h-[600px] bg-slate-100 rounded-xl p-4">
        <h1 className="text-3xl font-semibold text-center">Liste des tâches à faire</h1>
        <h2 className="text-xl font-semibold text-center">
          {todosList.length > 0 ? `${todosList.length} tâches en cours...` : "Bienvenue !"}
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            type="text"
            className="border border-blue-600 rounded outline-none px-2 py-1 w-full"
            placeholder="Entrez vos tâches ici..."
            id="todo"
          />
          <button
            disabled={!inputValue}
            className={`bg-blue-600 rounded px-4 text-slate-50 hover:bg-blue-700 transition-colors duration-100 ${
              !inputValue && "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            Valider
          </button>
        </form>

        {errorMessage}
        {todosList.length > 1 && (
          <button
            onClick={deleteAllTodos}
            className=" border-2 border-red-500 w-full mt-4 rounded bg-red-200 text-black"
          >
            Supprimer toutes les tâches
          </button>
        )}
        {todosList.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-24">
            <img className="w-40 md:w-60 place-content-center" src={noTodo} alt="liste vide" />
            <p className="mt-8 font-semibold">Aucune tâche à afficher...</p>
            <label
              htmlFor="todo"
              className="bg-blue-600 text-slate-50 mt-4 px-2 py-1 rounded hover:bg-blue-700 transition-colors duration-100 cursor-pointer select-none animate-bounce"
            >
              Je veux en rajouter une !
            </label>
          </div>
        )}
        <ul className="mt-4">
          {todosList.map((item) => (
            <Todo key={item.id} todo={item} deleteTodo={deleteTodo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
