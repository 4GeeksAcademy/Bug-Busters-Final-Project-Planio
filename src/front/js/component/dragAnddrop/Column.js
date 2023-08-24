import React, { useContext, useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { CreateTask } from "../createTask";
import { CreateProject } from "../createProject";
import { TaskCard } from "../dashboard-components/taskCard";

export const Column = ({ title, id, projectId, username, projectTasks, _onCreateComplete, __onDeleteCompleted }) => {
    const [updatedComponent, setUpdatedComponent] = useState(false);

    const handleUpdateComponent = () => {
        setUpdatedComponent(!updatedComponent);
    };




    return (
        <>
            <div className="task-list d-flex justify-content-between">
                <h2>{title}</h2>
                <div className="d-flex">
                    <CreateTask projectId={projectId} onCreateComplete={_onCreateComplete} ctaText={<i className="addIcon fa-solid fa-plus"></i>} butClass="addNew" />
                    <CreateProject username={username} ctaText={<i className="addIcon fa-solid fa-ellipsis"></i>} butClass="addNew" />
                </div>
            </div>

            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}

                        className="d-flex flex-column"
                    >
                        {projectTasks ? (
                            projectTasks.map((task, index) => (
                                <TaskCard
                                    key={index + task.id}
                                    index={index}
                                    tag="tag"
                                    title={task.title}
                                    description={task.description}
                                    todo_list={task.todo_list}
                                    numberToDos={task.todo_list.length}
                                    due_at={task.due_at}
                                    task_id={task.id}
                                    _onDeleteCompleted={__onDeleteCompleted}
                                />
                            ))
                        ) : (
                            <p>No pending tasks, click + and create one.</p>
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </>
    );
};