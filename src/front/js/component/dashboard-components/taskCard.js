import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../styles/sidebar.css";
import "../../../styles/home.css";
import "../../../styles/tasks.css";
import { Context } from "../../store/appContext";
import { CreateProject } from "../createProject";
import { CreateTask } from "../createTask";
import { UploadFile } from "../uploadFile";
import { TaskModal } from "./taskModal";
import { DeleteTaskButton } from "./deleteTaskButton";
import { Draggable } from "react-beautiful-dnd";


export const TaskCard = ({
    index,
    tag,
    title,
    description,
    todo_list,
    numberToDos,
    due_at,
    task_id,
    _onDeleteCompleted

}) => {

    const { store, actions } = useContext(Context);
    const [updatedComponent, setUpdatedComponent] = useState(false);

    const handleDelete = async (file_name, project_id) => {
        try {
            await actions.deleteFile(file_name, project_id);
            setUpdatedComponent(!updatedComponent);
        } catch (error) {
            console.error("Error deleting file:", error);
        }

    }

    const handleUpdateComponent = () => {
        if (onDeleteCompleted) {
            onDeleteCompleted();
        }
    };

    return (

        <Draggable draggableId={`${task_id}`} key={task_id} index={index}>
            {(provided, snapshot) => (
                <div className="task-card mt-3 p-4" key={index} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>

                    <div className="hero-section d-flex justify-content-between">
                        <div className="task-tag">
                            <p>{tag}</p>
                        </div>
                        <div className="edit-tag d-flex gap-1">
                            <TaskModal />
                            <DeleteTaskButton task_id={task_id} onDeleteCompleted={_onDeleteCompleted} />
                        </div>
                    </div>
                    <div className="task-title">
                        <p>{title}</p>
                    </div>
                    <div className="task-description">
                        <p>{description}</p>
                    </div>
                    <div className="task-todo-list">
                        {todo_list && todo_list.length > 0 ? (
                            <div className="">
                                <ul className="p-0 d-flex flex-column align-items-start ">
                                    {todo_list.map((todo, index) => (
                                        <li key={index} className="list-body d-flex gap-2 ms-5">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">{todo}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>There are no Todo's</p>
                        )}
                    </div>
                    <div className="task-footer d-flex justify-content-between">
                        <div className="task-todos d-flex px-2">
                            <i className="addIcon fa-solid fa-list-check px-2"></i>
                            <span className="todo-text">
                                {numberToDos}
                            </span>
                        </div>

                        <div className="task-date d-flex px-2">
                            <i className="addIcon fa-regular fa-calendar px-2"></i>
                            <span className="date-text">
                                {due_at}
                            </span>
                        </div>
                        {provided.placeholder}
                    </div>
                    {provided.placeholder}
                </div>)}


        </Draggable>
    );
}
