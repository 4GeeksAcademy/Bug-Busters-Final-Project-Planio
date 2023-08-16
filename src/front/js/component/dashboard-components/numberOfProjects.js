import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../styles/sidebar.css";
import "../../../styles/home.css";
import { Context } from "../../store/appContext";
import { CreateProject } from "../createProject";

export const NumberOfProjects = () => {

    const { store, actions } = useContext(Context);
    const [updatedComponent, setUpdatedComponent] = useState(false);

    const userInfo = store.user_info[0];

    useEffect(() => {

        actions.getUserInfo()
            .then((userInfo) => {
                console.log(userInfo);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [updatedComponent]);

    const handleUpdateComponent = () => {
        setUpdatedComponent(!updatedComponent);
    };

    return (
        <div className="col-md-6 simple-card p-4 d-flex justify-content-between">
            <div className="card-info">
                <h5 className="card-title">Projects</h5>

                <p className="card-text">{userInfo.projects && userInfo.projects.length ? userInfo.projects.length : "0"}</p>
                <CreateProject username={userInfo.username} projectCreated={handleUpdateComponent} />
            </div>
            <div className="card-icon d-flex">
                <a href="#"><i className="fa-regular fa-folder" style={{ color: "#ff7c33" }}></i></a>
            </div>
        </div>

    )
}
