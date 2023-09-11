/* eslint-disable react/prop-types */
export default function Todo({ todo, deleteTodo }) {
  return (
    <li className="bg-blue-100 border-2 relative border-blue-600 mt-2 rounded px-2 py-1">
      {todo.name}
      <button
        onClick={() => deleteTodo(todo.id)}
        className="absolute right-2 bg-red-500 text-slate-50 w-6 h-6 rounded-full"
      >
        X
      </button>
    </li>
  );
}
