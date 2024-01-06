import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import TodoLayout from "./layout/TodoLayout";
import NotFoundPage from "./components/NotFoundPage";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<TodoLayout />} />
				<Route path="/todos/:id?/:edit?" element={<TodoLayout />} />
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
}

export default App;
