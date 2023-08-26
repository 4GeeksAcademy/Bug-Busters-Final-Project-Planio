import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Signup } from "./pages/signup";
import { ForgotPassword } from "./pages/forgot-password";
import { ResetPassword } from "./pages/reset-password";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { Sidebar } from "./component/sidebar";
import { Projects } from "./pages/projects";
import { Settings } from "./pages/settings";

import "../styles/sidebar.css";
import { Tasks } from "./pages/tasks";
import { ProjectTasks } from "./pages/projectTasks";


const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>

            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <div className="d-flex ">

                        <Sidebar />

                        <div className="container-fluid p-0">

                            <Routes>
                                <Route element={<Home />} path="/" />
                                <Route element={<Signup />} path="/signup" />
                                <Route element={<Login />} path="/login" />
                                <Route element={<ForgotPassword />} path="/forgot-password" />
                                <Route element={<ResetPassword />} path="/reset-password/:user_id" />
                                <Route element={<Settings />} path="/settings" />
                                <Route element={<Dashboard />} path="/dashboard" />
                                <Route element={<Projects />} path="/projects" />
                                <Route element={<Tasks />} path="/tasks" />
                                <Route element={<ProjectTasks />} path="/project/:project_id/tasks" />
                                <Route element={<h1>Not found!</h1>} />
                            </Routes>
                        </div>
                    </div>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
