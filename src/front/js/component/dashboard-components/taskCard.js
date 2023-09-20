import React, { useContext, useState, useEffect } from "react";
import "../../../styles/sidebar.css";
import "../../../styles/home.css";
import "../../../styles/tasks.css";
import { Context } from "../../store/appContext";
import { TaskModal } from "./taskModal";
import { DeleteTaskButton } from "./deleteTaskButton";
import { Draggable } from "react-beautiful-dnd";


export const TaskCard = ({
    index,
    tag,
    title,
    description,
    todo_list,
    due_at,
    task_id,
    _onDeleteCompleted

}) => {

    const { actions } = useContext(Context);
    const [todoListState, setTodoListState] = useState(todo_list);

    const handleTodoToggle = async (task, checked) => {
        const updatedTodoList = {
            ...todoListState,
            [task]: checked
        };

        try {
            await actions.updateTask(task_id, { todo_list: updatedTodoList });
            setTodoListState(updatedTodoList);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (

        <Draggable draggableId={`${task_id}`} key={task_id} index={index}>
            {(provided) => (
                <div className="task-card mt-3 p-4" key={index} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>

                    <div className="hero-section d-flex justify-content-between">
                        {/* <div className="task-tag">
                            <p>{tag}</p>
                        </div> */}
                        <div></div>
                        <div className="edit-tag d-flex gap-1">
                            <TaskModal butClass="addNewButton" ctaText={<i className="addIcon fa-solid fa-ellipsis"></i>} taskTitle={title} taskDescription={description} todoList={todoListState} taskId={task_id} />
                            <DeleteTaskButton task_id={task_id} onDeleteCompleted={_onDeleteCompleted} />
                        </div>
                    </div>
                    <div className="task-title">
                        <p>{title}</p>
                    </div>
                    <div className="task-description">
                        <p>{description}</p>
                    </div>
                    <div className="task-todo-list">
                        {todoListState && Object.keys(todoListState).length > 0 ? (
                            <div className="">
                                <ul className="p-0 d-flex flex-column align-items-start">
                                    {Object.keys(todoListState).map((todo, index) => (
                                        <li key={index} className="list-body d-flex gap-2 ms-5">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                onChange={() => handleTodoToggle(todo, !todoListState[todo])}
                                                checked={todoListState[todo]}
                                                id={`flexCheckDefault${index}`}
                                            />
                                            <label className="form-check-label" htmlFor={`flexCheckDefault${index}`}>
                                                {todo}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>There are no Todo's</p>
                        )}
                    </div>

                    <div className="task-footer d-flex justify-content-between">
                        <div className="task-todos d-flex px-2">
                            <i className="addIcon fa-solid fa-list-check px-2"></i>
                            <span className="todo-text">
                                {Object.keys(todoListState).length}
                            </span>
                        </div>

                        <div className="task-date d-flex px-2">
                            <i className="addIcon fa-regular fa-calendar px-2"></i>
                            <span className="date-text">
                                {due_at}
                            </span>
                        </div>
                        {provided.placeholder}
                    </div>
                    {provided.placeholder}
                </div>)}


        </Draggable>
    );
}