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

export const TaskCard = ({
    index,
    tag,
    title,
    description,
    todo_list,
    numberToDos,
    due_at,

}) => {

    const { store, actions } = useContext(Context);
    const [updatedComponent, setUpdatedComponent] = useState(false);

    const userInfo = store.user_info[0];

    const project = userInfo.projects && userInfo.projects.map(project => project.id);


    useEffect(() => {

        actions.getUserInfo()
            .then((userInfo) => {
                console.log(userInfo);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [updatedComponent]);

    const handleDelete = async (file_name, project_id) => {
        try {
            await actions.deleteFile(file_name, project_id);
            setUpdatedComponent(!updatedComponent);
        } catch (error) {
            console.error("Error deleting file:", error);
        }

    }

    const handleUpdateComponent = () => {
        setUpdatedComponent(!updatedComponent);
    };

    return (
        <div className="task-card mt-3 p-4" key={index}>
            <div className="hero-section d-flex justify-content-between">
                <div className="task-tag">
                    <p>{tag}</p>
                </div>
                <div className="edit-tag">
                    <TaskModal />
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
                    <p>There is no Todo's</p>
                )}
            </div>
            <div className="task-footer d-flex justify-content-end">
                <div className="task-todos d-flex px-2">
                    <i className="addIcon fa-solid fa-list-check px-2"></i>
                    <span className="todo-text">
                        {numberToDos}
                    </span>
                </div>
                {/* <div className="task-file d-flex px-2">
                    <i className="addIcon fa-solid fa-paperclip px-2"></i>
                    <span className="file-text">
                        {numberFiles}
                    </span>
                </div> */}
                <div className="task-date d-flex px-2">
                    <i className="addIcon fa-regular fa-calendar px-2"></i>
                    <span className="date-text">
                        {due_at}
                    </span>
                </div>
            </div>
        </div>

    )
}
