import { React, useState } from "react";
import { useTodo } from "../hook/useTodo";
import { useNavigate, useParams } from "react-router-dom";

const EditTodo = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { editTodo, getTodoById, loadTodo } = useTodo();
	const oldTodo = getTodoById(id);
	const [todos, setTodos] = useState({ ...oldTodo });

	const handleSubmit = async (event) => {
		event.preventDefault();
		await editTodo(id, todos);
		loadTodo();
		navigate(`/todos/${id}`);
	};

	const handleCancel = () => {
		setTodos({ ...oldTodo });
		navigate(`/todos/${id}`);
	};

	const handleChange = (event) => {
		const { value, name } = event.target;

		setTodos((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handlePage = () => {
		navigate(`/todos/${id}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<h2>{"Задание № - " + id}</h2>
				<h2>{todos.name}</h2>
				<input
					type="text"
					name="name"
					value={todos.name || ""}
					onChange={handleChange}
				/>
				<button type="submit">Сохранить изменения</button>
				<button type="button" onClick={handleCancel}>
					Отменить изменения
				</button>
				<button type="button" onClick={handlePage}>
					🡰
				</button>
			</div>
		</form>
	);
};

export default EditTodo;
