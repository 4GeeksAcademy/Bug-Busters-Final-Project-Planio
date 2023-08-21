import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import swal from "sweetalert2";
import "../../styles/home.css";
import "../../styles/dashboard.css";
import "../../styles/tasks.css";
import { CreateProject } from "../component/createProject";
import { NumberCard } from "../component/dashboard-components/numberCard";
import { UploadFile } from "../component/uploadFile";
import { DateTime } from "../component/dateTime";

export const ProjectTasks = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const { project_id } = useParams();
    const parsedProjectId = parseInt(project_id);

    const userInfo = store.user_info[0];

    const project = userInfo.projects.find(project => project.id === parsedProjectId);

    useEffect(() => {

        if (!validated_token) {
            swal.fire({ title: "You must log in", text: "bla bla bla bla.", icon: "error", confirmButtonColor: '#fa9643' }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        } else {
            actions.getUserInfo()
                .then((userInfo) => {
                    console.log('%cUser info successfully retrieved', 'color: cyan; background: black; font-size: 20px');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    if (!validated_token) {
        return null;
    }

    if (validated_token) {

        return (
            <div className="tasks p-4">
                <div className="container-fluid">
                    <div className="row">
                        {project ? <h1>{project.title}</h1> : <p>Project not found or doesn't exist</p>}
                    </div>

                    {/* PRUEBA PARA CARD DE TASK */}
                    <div className="row justify-content-between">
                        <div className="col-4 simple-card my-4 p-4">
                            <div className="task-list d-flex justify-content-between">
                                <h2>To do</h2>
                                <div className="d-flex">
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-plus"></i>} butClass="addNew" />
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-ellipsis"></i>} butClass="addNew" />
                                </div>
                            </div>
                            {project.tasks ? (
                                project.tasks.map((task, index) => (

                                    <div className="task-card mt-3 p-4" key={index} draggable>
                                        <div className="hero-section d-flex justify-content-between">
                                            <div className="task-tag">
                                                <p>Design system</p>
                                            </div>
                                            <div className="edit-tag">
                                                <i className="addIcon fa-solid fa-ellipsis"></i>
                                            </div>
                                        </div>
                                        <div className="task-title">
                                            <p>{task.title}</p>
                                        </div>
                                        <div className="task-description">
                                            <p>{task.description}</p>
                                        </div>
                                        {task.todo_list && task.todo_list.length > 0 ? (
                                            <div className="">
                                                <ul className="p-0 d-flex flex-column align-items-start ">
                                                    {task.todo_list.map((todo, index) => (
                                                        <li key={index} className="list-body d-flex gap-2 ms-5">
                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                            <label className="form-check-label" htmlFor="flexCheckDefault">{todo}</label>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div>{task.due_at}</div>
                                            </div>
                                        ) : (
                                            <p>There is no Todo's</p>
                                        )}
                                    </div>

                                ))
                            ) : (
                                <p>No tasks found for this project</p>
                            )}


                        </div>
                        <div className="col-4 simple-card my-4 p-4">
                            <div className="task-list d-flex justify-content-between">
                                <h2>In Progress</h2>
                                <div className="d-flex">
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-plus"></i>} butClass="addNew" />
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-ellipsis"></i>} butClass="addNew" />
                                </div>
                            </div>


                        </div>
                        <div className="col-4 simple-card my-4 p-4">
                            <div className="task-list d-flex justify-content-between">
                                <h2>Done</h2>
                                <div className="d-flex">
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-plus"></i>} butClass="addNew" />
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-ellipsis"></i>} butClass="addNew" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );

    }

};
