import React from "react";
import { Link, useNavigate } from "react-router-dom";


export const ProjectOverview = ({ projectTitle = "Title", projectDescription = "blablabla", numberOfTodos = "0", tasks, isProject, projectId }) => {

    const navigate = useNavigate();

    return (
        <>

            <div className="col-md-6 project-card">
                <div className="simple-card p-4 my-3">
                    <div className="card-info">
                        <div className="">
                            <h2>{projectTitle}</h2>
                            <p className="card-title mb-4">{projectDescription}</p>
                            {tasks && tasks.length > 0 ? (
                                <div className="numberOf">
                                    <h3>Pending Tasks</h3>
                                    <span>
                                        {tasks.length}
                                    </span>
                                </div>
                            ) : (
                                <div className="numberOf">
                                    <h3>No tasks in this project yet.</h3>
                                    <span>0</span>
                                </div>
                            )}

                        </div>
                    </div>
                    <button onClick={() => { navigate(`/project/${projectId}/tasks`) }} className="primary-button" style={{ marginLeft: 'auto', display: 'flex' }}>Go to this project</button>
                </div>
            </div>

        </>

    )

};