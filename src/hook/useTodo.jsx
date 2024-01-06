import { createContext, useContext, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const TodoContext = createContext({});

export const useTodo = () => {
	return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");

	const debounceValue = useDebounce(search, 2000);

	const loadTodo = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`http://localhost:1326/todos?q=${debounceValue}`
			);
			const data = await response.json();
			setTodos(data);
			setIsLoading(false);
		} catch (error) {}
	};

	let sortedTodos = [];

	const sortTodosAlphabet = () => {
		sortedTodos = todos.slice().sort((a, b) => (a.name > b.name ? 1 : -1));
		setTodos(sortedTodos);
	};

	const addTodo = async (newTodo) => {
		try {
			const response = await fetch("http://localhost:1326/todos", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTodo),
			});
			const data = await response.json();

			setTodos((prevTodos) => [...prevTodos, data]);
		} catch (error) {}
	};

	const editTodo = async (id, payload) => {
		try {
			const response = await fetch(`http://localhost:1326/todos/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			const updateData = await response.json();

			const updateArray = todos.map((todo) => {
				if (todo.id === id) {
					todo = updateData;
				}
				return todo;
			});

			setTodos(updateArray);
		} catch (error) {}
	};

	const deleteTodo = (id) => {
		fetch(`http://localhost:1326/todos/${id}`, {
			method: "DELETE",
			"Content-Type": "application/json",
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodos(
					todos.filter((todo, index, array) => {
						return todo.id !== id;
					})
				);
			});
	};

	const getTodoById = (id) => {
		return todos.find((todo) => todo.id === Number(id));
	};

	useEffect(() => {
		loadTodo();
		// eslint-disable-next-line
	}, [debounceValue]);

	return (
		<TodoContext.Provider
			value={{
				todos,
				search,
				loadTodo,
				getTodoById,
				addTodo,
				editTodo,
				deleteTodo,
				setSearch,
				sortTodosAlphabet,
			}}
		>
			<div>{isLoading ? <h1>ЗАГРУЗКА...</h1> : children}</div>
		</TodoContext.Provider>
	);
};
