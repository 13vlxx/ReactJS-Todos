/* eslint-disable react/prop-types */
export default function TodoList({ content, deleteTodo }) {
  return (
    <div className="flex items-center mt-2 relative">
      <li className="w-full bg-slate-50 text-slate-950 px-2 py-2 rounded"> {content.text}</li>
      <button
        onClick={() => deleteTodo(content.id)}
        className="h-[25px] w-[25px] flex items-center justify-center bg-red-500 absolute right-2 rounded-full hover:bg-red-600 transition-colors duration-100"
      >
        X
      </button>
    </div>
  );
}
