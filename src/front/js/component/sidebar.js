import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import planioLogo from "../../img/planio-logo.png";
import { Avatar, Badge } from "@prismane/core";
import "../../styles/sidebar.css";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Sidebar = () => {

    const location = useLocation();
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);

    const getButtonContent = () => {
        if (location.pathname === '/private-view') {
            return <>
                <div className="sidebar">

                    <ul className="list-group m-4">
                        <li className="list-group-item active">
                            <a onClick={() => {
                                    navigate("/")
                            }}>
                                <i className="fa-solid fa-layer-group" style={{color: "#000000"}}></i>
                                Dashboard
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a onClick={() => {
                                    navigate("/")
                            }}>
                                <i className="fa-solid fa-desktop" style={{color: "#000000"}}></i>
                                Projects
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a onClick={() => {
                                    navigate("/")
                            }}>
                                <i className="fa-regular fa-calendar" style={{color: "#000000"}}></i>
                                Calendar
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a onClick={() => {
                                    navigate("/")
                            }}>
                                <i className="fa-solid fa-list-check" style={{color: "#000000"}}></i>
                                Tasks
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a onClick={() => {
                                navigate("/")
                            }}>
                                <i className="fa-solid fa-gear" style={{color: "#000000"}}></i>
                                Settings
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a onClick={() => {
                                localStorage.removeItem("jwt-token"); navigate("/")
                            }}>
                                <i className="fas fa-sign-out-alt" style={{ color: "#d70404" }}></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>


            </>
        }
        return <>
            <div className="sidebar d-none">
            </div>
        </>
    };

    return (
        <div>
            {getButtonContent()}
        </div>
    );
}