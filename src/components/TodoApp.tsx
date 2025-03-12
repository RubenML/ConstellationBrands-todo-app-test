import React, { useState } from 'react'
import { Check, X, Plus } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    const trimmed = input.trim()
    if (trimmed) {
      setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src="https://source.unsplash.com/collection/190727/800x200"
          alt="Header"
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
          My Todo List
        </h1>
      </div>
      <div className="p-4">
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTodo()
              }
            }}
          />
          <button
            onClick={addTodo}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 rounded-r-md flex items-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border-b border-gray-200 py-2"
            >
              <div
                onClick={() => toggleTodo(todo.id)}
                className={`flex-1 cursor-pointer ${
                  todo.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {todo.text}
              </div>
              <div className="flex space-x-2">
                {todo.completed && <Check className="w-5 h-5 text-green-500" />}
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoApp
