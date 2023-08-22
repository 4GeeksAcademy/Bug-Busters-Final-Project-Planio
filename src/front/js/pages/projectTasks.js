import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import swal from "sweetalert2";
import "../../styles/home.css";
import "../../styles/dashboard.css";
import "../../styles/tasks.css";
import { Button } from "@prismane/core";
import { CreateProject } from "../component/createProject";
import { NumberCard } from "../component/dashboard-components/numberCard";
import { UploadFile } from "../component/uploadFile";
import { DateTime } from "../component/dateTime";
import { CreateTask } from "../component/createTask";
import { TaskCard } from "../component/dashboard-components/taskCard";


export const ProjectTasks = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const { project_id } = useParams();
    const parsedProjectId = parseInt(project_id);
    const [loading, setLoading] = useState(true);


    const handleUpdateComponent = () => {
        setUpdatedComponent(!updatedComponent);
    };


    useEffect(() => {
        if (!validated_token) {
            swal.fire({ title: "You must log in", text: "You will be redirected to login.", icon: "error", confirmButtonColor: '#fa9643' }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        } else {
            actions.getUserInfo()
                .then((userInfo) => {
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [validated_token, updatedComponent]);

    const userInfo = store.user_info[0];

    const project = userInfo?.projects?.find(project => project.id === parsedProjectId);

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border loading-spinner" role="status">
                <span className="sr-only loading-spinner">Loading...</span>
            </div>
        </div>
    }

    if (!validated_token) {
        return null;
    }

    if (validated_token) {

        return (
            <div className="tasks p-4">
                <div className="container-fluid">
                    <div className="row">
                        {project ? <h1>{project?.title}</h1> : <p>Project not found or doesn't exist</p>}
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-4 simple-card my-4 p-4 overflow-hidden text-break">
                            <div className="task-list d-flex justify-content-between">
                                <h2>To do</h2>
                                <div className="d-flex">
                                    <CreateTask projectId={project.id} ctaText={<i className="addIcon fa-solid fa-plus"></i>} butClass="addNew" onCreateComplete={handleUpdateComponent} />
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-ellipsis"></i>} butClass="addNew" />
                                </div>
                            </div>
                            {project.tasks ? (
                                project.tasks.map((task, index) => (
                                    <TaskCard
                                        key={index + task.id}
                                        index={index}
                                        tag="tag"
                                        title={task.title}
                                        description={task.description}
                                        todo_list={task.todo_list}
                                        numberToDos={task.todo_list.length}
                                        due_at={task.due_at}
                                        task_id={task.id}
                                        onDeleteCompleted={handleUpdateComponent}
                                    />
                                ))
                            ) : (
                                <p>No pending tasks, click + and create one.</p>
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
