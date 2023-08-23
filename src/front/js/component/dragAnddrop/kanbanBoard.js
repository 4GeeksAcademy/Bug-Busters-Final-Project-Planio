import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import { Column } from "./Column";
import { DragDropContext } from "react-beautiful-dnd";



export const KanbanBoard = () => {

    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const navigate = useNavigate();
    const { project_id } = useParams();
    const parsedProjectId = parseInt(project_id);
    const [loading, setLoading] = useState(true);

    const [todoList, setTodoList] = useState([]);
    const [inProgressList, setInProgressList] = useState([]);
    const [doneList, setDoneList] = useState([]);


    const handleUpdateComponent = () => {
        setUpdatedComponent(!updatedComponent);
    };


    useEffect(() => {
        if (!validated_token) {
            swal.fire({ title: "You must log in", text: "You will be redirected to login.", icon: "error", confirmButtonColor: '#fa9643' }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        } else {
            actions.getUserInfo()
                .then((userInfo) => {
                    const foundProject = userInfo?.projects?.find(project => project.id === parsedProjectId);
                    setProject(foundProject);

                    return foundProject;
                })
                .then((foundProject) => {
                    setTodoList(foundProject?.tasks);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [validated_token, updatedComponent]);



    const userInfo = store.user_info[0];
    const [project, setProject] = useState(null);


    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border loading-spinner" role="status">
                <span className="sr-only loading-spinner">Loading...</span>
            </div>
        </div>
    }

    if (!validated_token) {
        return null;
    }



    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }


        const draggedTask = project?.tasks.find(task => task.id.toString() === draggableId);

        if (!draggedTask) {
            return;
        }

        if (destination.droppableId === "1") {
            const updatedInProgressList = inProgressList.filter(task => task.id !== draggedTask.id);
            setInProgressList(updatedInProgressList);

            setTodoList([...todoList, draggedTask]);
        } else if (destination.droppableId === "2") {
            const updatedTodoList = todoList.filter(task => task.id !== draggedTask.id);
            setTodoList(updatedTodoList);

            setInProgressList([...inProgressList, draggedTask]);
        } else if (destination.droppableId === "3") {
            const updatedDoneList = doneList.filter(task => task.id !== draggedTask.id);
            setDoneList(updatedDoneList);

            setInProgressList([...inProgressList, draggedTask]);
        }
    };




    if (validated_token) {

        return (
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="tasks p-4">
                    <div className="container-fluid">
                        <div className="row">
                            {project ? <h1>{project?.title}</h1> : <p>Project not found or doesn't exist</p>}
                        </div>
                        <div className="row justify-content-between">
                            <div className="col-6 simple-card my-4 p-4 overflow-hidden text-break">
                                <Column title={"To-do"} projectTasks={todoList} id={"1"} />
                            </div>
                            <div className="col-6 simple-card my-4 p-4 overflow-hidden text-break">
                                <Column title={"In Progress"} projectTasks={inProgressList} id={"2"} />
                            </div>
                            <div className="col-6 simple-card my-4 p-4 overflow-hidden text-break">
                                <Column title={"Done"} projectTasks={doneList} id={"3"} />
                            </div>
                        </div>
                    </div>
                </div>
            </DragDropContext>
        )
    }

}

