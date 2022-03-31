import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState([]);

	const getfetchData = () => {
		fetch(
			"https://3000-4geeksacademy-flaskresth-tgr5khi77ku.ws-us38.gitpod.io/todo"
		)
			.then((response) => response.json())
			// .then((data) => console.log(data));
			.then((data) => setTaskList(data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getfetchData();
	}, []);

	const targetValue = (e) => {
		const newValue = e.target.value;
		setInputValue(newValue);
	};

	const createTask = (e) => {
		if (e.key === "Enter") {
			fetch(
				"https://3000-4geeksacademy-flaskresth-tgr5khi77ku.ws-us38.gitpod.io/todo",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						task: inputValue, // Use your own property name / key
						done: false,
					}),
				}
			)
				.then((res) => res.json())
				.then((result) => setTaskList(result))
				.catch((err) => console.log("error"));
			setInputValue("");
		}
	};

	const deleteTask = (id) => {
		fetch(
			"https://3000-4geeksacademy-flaskresth-tgr5khi77ku.ws-us38.gitpod.io/todo/" +
				id,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => res.json())
			.then((result) => setTaskList(result))
			.catch((err) => console.log("error"));
	};

	return (
		<div className="todo-list">
			<h1> To-Do List</h1>
			<input
				className="mb-4"
				placeholder="Add Something"
				type="text"
				value={inputValue}
				onChange={targetValue}
				onKeyDown={createTask}
			/>
			<ul className="list-group">
				{taskList.map((task, index) => {
					return (
						<li
							className="list-group-item"
							onClick={() => deleteTask(task.id)}
							key={index}>
							{task.task}
							<FontAwesomeIcon
								className="iconPosition"
								icon={faTrashCan}></FontAwesomeIcon>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
