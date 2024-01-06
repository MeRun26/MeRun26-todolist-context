import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(`/todos`);
	};

	return (
		<div>
			<h1>Страница не найдена</h1>
			<button onClick={goBack}>Назад</button>
		</div>
	);
};

export default NotFoundPage;
