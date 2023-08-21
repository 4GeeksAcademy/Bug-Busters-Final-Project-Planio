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

    tag = "tag",
    title =" title",
    description = "Create a design system for a hero section in 2 different variants. Create a simple presentation with these components.",
    numberToDos = "5",
    numberFiles = "4",
    date = "Mar 13",

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
        <div className="task-card mt-3 p-4">
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
            <div className="task-footer d-flex justify-content-end">
                <div className="task-todos d-flex px-2">
                    <i className="addIcon fa-solid fa-list-check px-2"></i>
                    <span className="todo-text">
                        {numberToDos}
                    </span>
                </div>
                <div className="task-file d-flex px-2">
                    <i className="addIcon fa-solid fa-paperclip px-2"></i>
                    <span className="file-text">
                        {numberFiles}
                    </span>
                </div>
                <div className="task-date d-flex px-2">
                    <i className="addIcon fa-regular fa-calendar px-2"></i>
                    <span className="date-text">
                        {date}
                    </span>
                </div>
            </div>
        </div>

    )
}
