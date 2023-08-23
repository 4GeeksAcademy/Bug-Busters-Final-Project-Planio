import React from "react";


export const ProjectOverview = ({ projectTitle = "Title", projectDescription = "blablabla", numberOfTodos = "0", tasks, isProject }) => {


    return (
        <div className="col-md-6 project-card" >
            <div className="simple-card p-4 my-3">
                <div className="card-info">
                    <div className="">
                        <h2>{projectTitle}</h2>
                        <p className="card-title mb-4">{projectDescription}</p>
                        {tasks && tasks.length > 0 ? tasks && tasks.map((task, index) => (
                            < div className="numberOf" >
                                <h3>{task.title}</h3>
                                <span>{task.todo_list.length}</span>
                            </div>

                        )) : "NO HAY NADAAA"}




                    </div>
                </div>
            </div>
        </div >
    )

};