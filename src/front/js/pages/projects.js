import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import swal from "sweetalert2";
import "../../styles/home.css";
import "../../styles/dashboard.css";
import { UploadFile } from "../component/uploadFile";
import { DateTime } from "../component/dateTime";
import { CreateProject } from "../component/createProject";
import { NumberOfProjects } from "../component/dashboard-components/numberOfProjects";
import { NumberCard } from "../component/dashboard-components/numberCard";

export const Projects = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const navigate = useNavigate();

    const userInfo = store.user_info[0];
    // const projectsLength = userInfo.projects.length;

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
            <div className="dashboard p-4">

                <div className="container-fluid">
                    <div className="row">
                        <h1>These are your projects, {userInfo.name}</h1>
                    </div>
                    <div className="row">
                        {userInfo.projects && userInfo.projects.map((project) => (
                        <div className="col-md-6 project-card">
                            <div className="simple-card p-4 my-3">
                                <div className="card-info d-flex justify-content-between">
                                    <div key={project.id} className="">
                                        <h2>{project.title}</h2>
                                        <p className="card-title">{project.description}</p>
                                        <h3>Number of images and documents: <span>{project.files.length}</span></h3>
                                        <h3>Total number of tasks: <span>12</span></h3>
                                        {/* <h4>Your images and documents:</h4>
                                        {project.files && project.files.length > 0 ? (
                                            <ul className="list-unstyled">
                                                {project.files.map((file, index) => (
                                                    <li key={index}>{file}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>Upload your images or documents</p>
                                        )}
                                        <UploadFile 
                                            projectId={project.id} 
                                            ctaText={"Upload file"}
                                            butClass={"upload-file-button"}
                                        /> */}
                                        <button onClick={() => {navigate(`/dashboard/${project.id}`)}} className="upload-file-button mt-3">Go to this project</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                                    ))}

                    </div>
                </div>




                {/* <img src="https://bug-busters-planio-bucket-demostration.s3.amazonaws.com/planio-logo-png.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXYLU2MAGUBRWUAAP%2F20230808%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20230808T161037Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5c00e4dfeae0ca3e1e33ab61c5cf5f0ba51526ad286513706a47aeaef8c6f8ad" alt="Image from AWS" />
                <div className="mt-5 mb-5"> <a href="https://bug-busters-planio-bucket-demostration.s3.amazonaws.com/4Geeks_restAPI.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXYLU2MAGUBRWUAAP%2F20230809%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20230809T170002Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4eacd9d260244d19346e56452ac1adbf099aeb86b1aba7f34c4688a98eabd4eb" target="_blank">YOUR PDF FILE</a></div> */}
            </div>

        );
    }
};
