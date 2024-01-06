import React from "react";
import { useParams, Navigate } from "react-router-dom";
import EditTodo from "../components/EditTodo";
import TodoPage from "../components/TodoPage";
import TodoList from "../components/TodoList";
import { TodoProvider } from "../hook/useTodo";

const TodoLayout = () => {
	const { id, edit } = useParams();

	const isValidId = (id) => {
		return (
			// eslint-disable-next-line
			!isNaN(id) && parseInt(id) == id && !isNaN(parseInt(id, 10))
		);
	};

	if (id && !isValidId(id)) {
		return <Navigate to="/404" />;
	}

	if (id && edit && edit !== "edit") {
		return <Navigate to="/404" />;
	}

	return (
		<TodoProvider>
			<div>
				{id ? (
					edit === "edit" ? (
						<EditTodo />
					) : (
						<TodoPage />
					)
				) : (
					<TodoList />
				)}
			</div>
		</TodoProvider>
	);
};

export default TodoLayout;
