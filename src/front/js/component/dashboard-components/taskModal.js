import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/dashboard.css";
import "../../../styles/home.css";




export const TaskModal = ({
    taskTitle = "task title",
    taskDescription = "task description",
    username = "",
    todoList,
    taskId,
    projectCreated,
    ctaText = "View task",
    butClass = "addNew",

}) => {
    const { store, actions } = useContext(Context);
    const [form, setForm] = useState(
        {
            title: "",
            username: [username]
        }
    );


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        actions.createNewProject(form)
            .then(() => {
                if (projectCreated) {
                    projectCreated();
                    console.error("project created");
                }
            })
            .catch((error) => {
                console.error("Error creating the project:", error);
            });


    }

    useEffect(() => {
        setForm(form => ({ ...form, username }));
    }, [username]);

    return (<>

        <button type="button" className={butClass} data-bs-toggle="modal" data-bs-target={`#taskModal${taskId}`}>
            {ctaText}
        </button>
        <div className="tasks">
            <div className="modal fade" id={`taskModal${taskId}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{taskTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="task-description">
                                {taskDescription}
                            </div>
                            <div className="task-todo-list">
                                {todoList && Object.keys(todoList).length > 0 ? (
                                    <div className="">
                                        {Object.keys(todoList).map((todo, index) => (

                                            <div key={index+100} className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    {todo}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>There are no Todo's</p>
                                )}


                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="secondary-button" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="primary-button">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)

}