import React from "react";
import { TodoList } from "./todolist";

//include images into your bundle

//create your first component
const Home = () => {
	return (
		<div className="container-fluid  text-center">
			<TodoList />
		</div>
	);
};

export default Home;
