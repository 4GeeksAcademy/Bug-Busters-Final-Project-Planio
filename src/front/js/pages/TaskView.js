import React, { useContext, useState } from "react";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const TaskView = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Task</h1>
			<div className="card-columns">
				{store.tasks.map((task, index) => (
					<div key={index} className="card">
						<div className="card-body">
							<h5 className="card-title">{task.title}</h5>
							<p className="card-text">{task.description}</p>
							<a href="#" className="btn btn-primary">Hola</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};


