import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import swal from "sweetalert2";
import "../../styles/home.css";
import "../../styles/dashboard.css";
import "../../styles/tasks.css";
import { UploadFile } from "../component/uploadFile";
import { DateTime } from "../component/dateTime";
import { CreateProject } from "../component/createProject";
import { NumberCard } from "../component/dashboard-components/numberCard";

export const Tasks = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const navigate = useNavigate();

    const userInfo = store.user_info[0];

    const project = userInfo.projects && userInfo.projects[1].title;
    console.log(userInfo)
    console.log(project)

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
                        <h1>{project}</h1>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-4 simple-card my-4 p-4">
                            <div className="task-list d-flex justify-content-between">
                                <h2>To do</h2>
                                <div className="d-flex">
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-plus"></i>} butClass="addNew" />
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-ellipsis"></i>} butClass="addNew" />
                                </div>
                            </div>
                            <div className="task-card mt-3 p-4">
                                <div className="hero-section d-flex justify-content-between">
                                    <div className="task-tag">
                                        <p>Design system</p>
                                    </div>
                                    <div className="edit-tag">
                                        <i className="addIcon fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <div className="task-title">
                                    <p>Typography change</p>
                                </div>
                                <div className="task-description">
                                    <p>Create a design system for a hero section in 2 different variants. Create a simple presentation with these components.</p>
                                </div>
                                <div className="task-todo-list">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 1
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 2
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 3
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 4
                                        </label>
                                    </div>
                                </div>
                                <div className="task-footer d-flex justify-content-end">
                                    <div className="task-date d-flex">
                                        <i className="addIcon fa-regular fa-calendar"></i>
                                        <span className="date-text">
                                            Mar 13
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="task-card mt-3 p-4">
                                <div className="hero-section d-flex justify-content-between">
                                    <div className="task-tag">
                                        <p>Design system</p>
                                    </div>
                                    <div className="edit-tag">
                                        <i className="addIcon fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <div className="task-title">
                                    <p>Typography change</p>
                                </div>
                                <div className="task-description">
                                    <p>Create a design system for a hero section in 2 different variants. Create a simple presentation with these components.</p>
                                </div>
                                <div className="task-todo-list">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 1
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 2
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 3
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 4
                                        </label>
                                    </div>
                                </div>
                                <div className="task-footer d-flex justify-content-end">
                                    <div className="task-date d-flex">
                                        <i className="addIcon fa-regular fa-calendar"></i>
                                        <span className="date-text">
                                            Mar 13
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-4 simple-card my-4 p-4">
                            <div className="task-list d-flex justify-content-between">
                                <h2>To do</h2>
                                <div className="d-flex">
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-plus"></i>} butClass="addNew" />
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-ellipsis"></i>} butClass="addNew" />
                                </div>
                            </div>
                            <div className="task-card mt-3 p-4">
                                <div className="hero-section d-flex justify-content-between">
                                    <div className="task-tag">
                                        <p>Design system</p>
                                    </div>
                                    <div className="edit-tag">
                                        <i className="addIcon fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <div className="task-title">
                                    <p>Typography change</p>
                                </div>
                                <div className="task-description">
                                    <p>Create a design system for a hero section in 2 different variants. Create a simple presentation with these components.</p>
                                </div>
                                <div className="task-todo-list">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 1
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 2
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 3
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 4
                                        </label>
                                    </div>
                                </div>
                                <div className="task-footer d-flex justify-content-end">
                                    <div className="task-date d-flex">
                                        <i className="addIcon fa-regular fa-calendar"></i>
                                        <span className="date-text">
                                            Mar 13
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="task-card mt-3 p-4">
                                <div className="hero-section d-flex justify-content-between">
                                    <div className="task-tag">
                                        <p>Design system</p>
                                    </div>
                                    <div className="edit-tag">
                                        <i className="addIcon fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <div className="task-title">
                                    <p>Typography change</p>
                                </div>
                                <div className="task-description">
                                    <p>Create a design system for a hero section in 2 different variants. Create a simple presentation with these components.</p>
                                </div>
                                <div className="task-todo-list">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 1
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 2
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 3
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 4
                                        </label>
                                    </div>
                                </div>
                                <div className="task-footer d-flex justify-content-end">
                                    <div className="task-date d-flex">
                                        <i className="addIcon fa-regular fa-calendar"></i>
                                        <span className="date-text">
                                            Mar 13
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-4 simple-card my-4 p-4">
                            <div className="task-list d-flex justify-content-between">
                                <h2>To do</h2>
                                <div className="d-flex">
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-plus"></i>} butClass="addNew" />
                                    <CreateProject username={userInfo.username} ctaText={<i className="addIcon fa-solid fa-ellipsis"></i>} butClass="addNew" />
                                </div>
                            </div>
                            <div className="task-card mt-3 p-4">
                                <div className="hero-section d-flex justify-content-between">
                                    <div className="task-tag">
                                        <p>Design system</p>
                                    </div>
                                    <div className="edit-tag">
                                        <i className="addIcon fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <div className="task-title">
                                    <p>Typography change</p>
                                </div>
                                <div className="task-description">
                                    <p>Create a design system for a hero section in 2 different variants. Create a simple presentation with these components.</p>
                                </div>
                                <div className="task-todo-list">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 1
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 2
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 3
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 4
                                        </label>
                                    </div>
                                </div>
                                <div className="task-footer d-flex justify-content-end">
                                    <div className="task-date d-flex">
                                        <i className="addIcon fa-regular fa-calendar"></i>
                                        <span className="date-text">
                                            Mar 13
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="task-card mt-3 p-4">
                                <div className="hero-section d-flex justify-content-between">
                                    <div className="task-tag">
                                        <p>Design system</p>
                                    </div>
                                    <div className="edit-tag">
                                        <i className="addIcon fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <div className="task-title">
                                    <p>Typography change</p>
                                </div>
                                <div className="task-description">
                                    <p>Create a design system for a hero section in 2 different variants. Create a simple presentation with these components.</p>
                                </div>
                                <div className="task-todo-list">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 1
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 2
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Todo 3
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Todo 4
                                        </label>
                                    </div>
                                </div>
                                <div className="task-footer d-flex justify-content-end">
                                    <div className="task-date d-flex">
                                        <i className="addIcon fa-regular fa-calendar"></i>
                                        <span className="date-text">
                                            Mar 13
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>




                {/* <img src="https://bug-busters-planio-bucket-demostration.s3.amazonaws.com/planio-logo-png.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXYLU2MAGUBRWUAAP%2F20230808%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20230808T161037Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5c00e4dfeae0ca3e1e33ab61c5cf5f0ba51526ad286513706a47aeaef8c6f8ad" alt="Image from AWS" />
                <div className="mt-5 mb-5"> <a href="https://bug-busters-planio-bucket-demostration.s3.amazonaws.com/4Geeks_restAPI.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXYLU2MAGUBRWUAAP%2F20230809%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20230809T170002Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4eacd9d260244d19346e56452ac1adbf099aeb86b1aba7f34c4688a98eabd4eb" target="_blank">YOUR PDF FILE</a></div> */}
            </div>

        );
    }
};
