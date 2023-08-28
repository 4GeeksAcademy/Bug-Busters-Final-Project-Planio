import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import swal from "sweetalert2";
import "../../styles/dashboard.css";
import "../../styles/home.css";
import { UploadFile } from "../component/uploadFile";
import { DateTime } from "../component/dateTime";
import { CreateProject } from "../component/createProject";
import { NumberCard } from "../component/dashboard-components/numberCard";
import { ProjectOptions } from "../component/dashboard-components/projectOptions";

export const Projects = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const userInfo = store.user_info[0];

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
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [validated_token, updatedComponent]);

    const handleUpdateComponent = () => {
        setUpdatedComponent(!updatedComponent);
    };

    if (!validated_token) {
        return null;
    }

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border loading-spinner" role="status">
                <span className="sr-only loading-spinner">Loading...</span>
            </div>
        </div>
    }


    if (validated_token) {
        return (
            <div className="dashboard p-4">

                <div className="container-fluid">
                    <div className="row">
                        <h1>These are your projects, {userInfo.name}</h1>
                    </div>
                    <div className="row">
                        {userInfo.projects && userInfo.projects.length > 0 ? (
                            userInfo.projects.map((project, index) => (
                                <div className="col-md-6 project-card" key={index}>
                                    <div className="simple-card p-4 my-3">
                                        <div className="card-info">
                                            <div key={project.id} className="">
                                                <div className="d-flex justify-content-between">
                                                    <h2>{project.title}</h2>
                                                    <ProjectOptions projectId={project.id} onDeleteCompleted={handleUpdateComponent} />
                                                </div>
                                                <p className="card-title mb-4">{project.description}</p>
                                                <div className="numberOf">
                                                    <h3>Number of images and documents:</h3>
                                                    <span>{project.files.length > 0 ? project.files.length : 0}</span>
                                                </div>
                                                <div className="numberOf">
                                                    <h3>Total number of tasks:</h3>
                                                    <span>{project.tasks && project.tasks.length > 0 ? project.tasks.length : 0}</span>
                                                </div>
                                            </div>

                                            <div className="butProj">
                                                <UploadFile
                                                    projectId={project.id}
                                                    onUploadComplete={handleUpdateComponent}
                                                    ctaText={"Upload file"}
                                                    butClass={"secondary-button"}
                                                />
                                                <button onClick={() => { navigate(`/project/${project.id}/tasks`) }} className="primary-button">Go to this project</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="d-flex flex-column justify-content-start align-items-start mt-5">
                                <h2>Nothing here...</h2>
                                <div className="d-flex gap-2">
                                    <h3 className="pt-2">Create your first project</h3>
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-plus"></i>} butClass="btn-no-border" projectCreated={handleUpdateComponent} />
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

        );
    }
};
