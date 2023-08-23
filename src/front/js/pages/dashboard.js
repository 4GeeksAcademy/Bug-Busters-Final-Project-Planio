import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import swal from "sweetalert2";
import "../../styles/home.css";
import "../../styles/dashboard.css";
import { UploadFile } from "../component/uploadFile";
import { DateTime } from "../component/dateTime";
import { CreateProject } from "../component/createProject";
import { NumberCard } from "../component/dashboard-components/numberCard";
import { CalendarWidget } from "../component/dashboard-components/calendarWidget";
import { ProjectOverview } from "../component/dashboard-components/projectOverview";



export const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const userInfo = store.user_info[0];

    useEffect(() => {

        if (!validated_token) {
            swal.fire({ title: "You must log in", text: "You will be redirected to login page", icon: "error", confirmButtonColor: '#fa9643' }).then((result) => {
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
    }, []);

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
                        <div className="col-md-8">
                            <div className="row">
                                <h1>Hi, {userInfo.name}</h1>
                                <h6><DateTime /></h6>
                            </div>
                            <div className="row justify-content-between">
                                <NumberCard
                                    title={"Projects"}
                                    isProjects={true}
                                    folderUrl={"/projects"}
                                />
                                <NumberCard
                                    title={"Files"}
                                    isFiles={true}
                                    folderUrl={"#"}
                                    butClass={"addNew"}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-end">
                            <div className="calendar p-4">
                                Calendar                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        {userInfo.projects && userInfo.projects.map((project, index) => (
                            <ProjectOverview projectTitle={project.title} projectDescription={project.description} tasks={project.tasks} isProject={false} />
                        ))}



                    </div>
                </div>
            </div>

        );
    }
};
