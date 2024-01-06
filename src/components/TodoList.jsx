import { React, useState } from "react";
import { useTodo } from "../hook/useTodo";
import { Link } from "react-router-dom";

const TodoList = () => {
	const { todos, addTodo, sortTodosAlphabet, search, setSearch } = useTodo();
	const [inputValue, setInputValue] = useState("");

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = () => {
		if (!inputValue.trim()) {
			return;
		}
		const newTodo = {
			id: todos.length + 1,
			name: inputValue,
		};
		addTodo(newTodo);
		setInputValue("");
	};

	const handleCancel = () => {
		setInputValue("");
	};

	const truncateText = (text, maxLength) => {
		if (text.length > maxLength) {
			return text.substring(0, maxLength - 3) + "...";
		}
		return text;
	};

	return (
		<>
			<input
				placeholder="Поиск заданий..."
				value={search}
				onChange={handleSearch}
			/>
			<button onClick={sortTodosAlphabet}>
				Отсортировать по Алфавиту
			</button>
			<h1>Todolist На Новый Год!!!</h1>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name={todos.id}
					value={inputValue}
					onChange={handleChange}
				/>
				<button type="submit">Добавить задачу</button>
				<button type="button" onClick={handleCancel}>
					Отменить
				</button>
			</form>

			{todos.map((todo) => (
				<div key={todo.id}>
					<Link
						to={`/todos/${todo.id}`}
						name={truncateText(todo.name, 30)}
					>
						{truncateText(todo.name, 30)}
					</Link>
				</div>
			))}
		</>
	);
};
export default TodoList;
