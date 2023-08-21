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

export const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const navigate = useNavigate();

    const userInfo = store.user_info[0];
    console.log(userInfo);



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
                        <div className="col-md-8">
                            <div className="row">
                                <h1>Hi, {userInfo.name}</h1>
                                <h6><DateTime /></h6>
                            </div>
                            <div className="row justify-content-between">
                                <NumberCard
                                    title={"Projects"}
                                    isProjects={true}
                                    folderUrl={"#"}
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
                                Calendario
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-6 ">
                            <div className="simple-card p-4">
                                <div className="card-info d-flex justify-content-between">
                                    <h5 className="card-title">titulo</h5>

                                </div>
                                <div className="card-number d-flex justify-content-between">
                                    <p className="card-text">0</p>
                                    <div className="card-icon d-flex">
                                        <a href="#"><i className="viewFolder fa-regular fa-folder"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="second-card">
                                <p>holahoalhaohaolsh</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
};
