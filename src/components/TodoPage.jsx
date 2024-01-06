import { React } from "react";
import { useParams } from "react-router-dom";
import { useTodo } from "../hook/useTodo";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { deleteTodo, getTodoById } = useTodo();
	const todos = getTodoById(id);

	const handleEdit = () => {
		navigate(`/todos/${id}/edit`);
	};

	const handleDelete = () => {
		deleteTodo(id);
		navigate(`/todos`);
	};

	const handlePage = () => {
		navigate(`/todos`);
	};

	return (
		<>
			<h2>{"Задание № - " + id}</h2>
			<h2>{todos.name}</h2>
			<button type="button" onClick={handleEdit}>
				Изменить задачу
			</button>
			<button type="button" onClick={handleDelete}>
				Удалить задачу
			</button>
			<button type="button" onClick={handlePage}>
				🡰
			</button>
		</>
	);
};

export default TodoPage;
