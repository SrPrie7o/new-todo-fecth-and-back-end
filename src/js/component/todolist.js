import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState([]);

	const targetValue = (e) => {
		const newValue = e.target.value;
		setInputValue(newValue);
	};

	const createTask = (e) => {
		if (e.key === "Enter") {
			setTaskList([...taskList, inputValue]);
			setInputValue("");
		}
	};

	const deleteTask = (deletePosition) => {
		const deleteValue = taskList.filter(
			(taskDelete, index) => deletePosition != index
		);
		setTaskList(deleteValue);
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
							onClick={() => deleteTask(index)}
							key={index}>
							{task}
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
