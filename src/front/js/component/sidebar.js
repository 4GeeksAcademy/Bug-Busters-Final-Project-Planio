import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import planioLogo from "../../img/planio-logo.png";
import { Avatar, Badge } from "@prismane/core";
import "../../styles/sidebar.css";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Sidebar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const [activeItem, setActiveItem] = useState(location.pathname);

    const handleNavigation = (path) => {
        setActiveItem(path);
        navigate(path);
    };

    const menuItems = [
        { path: '/dashboard', icon: 'fa-solid fa-layer-group', text: 'Dashboard' },
        { path: '/projects', icon: 'fa-solid fa-desktop', text: 'Projects' },
        { path: '/calendar', icon: 'fa-regular fa-calendar', text: 'Calendar' },
        { path: '/tasks', icon: 'fa-solid fa-list-check', text: 'Tasks' },
        { path: '/settings', icon: 'fa-solid fa-gear', text: 'Settings' },
        // Agregar más elementos según necesites
    ];

    const getButtonContent = () => {
        if (location.pathname === '/dashboard' || location.pathname === '/projects' || location.pathname === '/calendar' || location.pathname === '/tasks' || location.pathname === '/settings') {
            return <>
                {/* <div className="sidebar">

                    <ul className="list-group m-4">
                        <li className={activeItem === '/dashboard' ? 'list-group-item active' : 'list-group-item'}>
                            <a onClick={() => {
                                navigate("/dashboard")
                            }}>
                                <i className="fa-solid fa-layer-group" style={{ color: "#000000" }}></i>
                                Dashboard
                            </a>
                        </li>
                        <li className={`list-group-item ${activeItem === '/projects' ? 'active' : ''}`}>
                            <a onClick={() => {
                                navigate("/projects")
                            }}>
                                <i className="fa-solid fa-desktop" style={{ color: "#000000" }}></i>
                                Projects
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a onClick={() => {
                                navigate("/calendar")
                            }}>
                                <i className="fa-regular fa-calendar" style={{ color: "#000000" }}></i>
                                Calendar
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a onClick={() => {
                                navigate("/tasks")
                            }}>
                                <i className="fa-solid fa-list-check" style={{ color: "#000000" }}></i>
                                Tasks
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a onClick={() => {
                                navigate("/settings")
                            }}>
                                <i className="fa-solid fa-gear" style={{ color: "#000000" }}></i>
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
                </div> */}

                <div className="sidebar">
                    <ul className="list-group m-4">
                        {menuItems.map((item) => (
                            <li
                                key={item.path}
                                className={activeItem === item.path ? 'list-group-item active' : 'list-group-item'}
                            >
                                <a onClick={() => handleNavigation(item.path)}>
                                    <i className={item.icon} style={{ color: "#000000" }}></i>
                                    {item.text}
                                </a>
                            </li>
                        ))}
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