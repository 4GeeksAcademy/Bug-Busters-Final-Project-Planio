import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Column } from "../component/dragAnddrop/Column";
import { DragDropContext } from "react-beautiful-dnd";
import swal from "sweetalert2";
import { UploadFile } from "../component/uploadFile";



export const ProjectTasks = () => {

    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const navigate = useNavigate();
    const { project_id } = useParams();
    const parsedProjectId = parseInt(project_id);
    const [loading, setLoading] = useState(true);

    const [tasksTodos, setTasksTodos] = useState([[], [], []])


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
                    setTasksTodos([foundProject?.tasks, [], []]);
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
        const origin_id = source.index
        const destination_id = destination.index
        const origin_column = source.droppableId
        const destination_column = destination.droppableId


        const updatedOrigin = [...tasksTodos[origin_column]]
        updatedOrigin.splice(origin_id, 1)
        const updatedDestination = origin_column === destination_column ? updatedOrigin : [...tasksTodos[destination_column]]
        updatedDestination.splice(destination_id, 0, draggedTask)


        const updatedTasksTodos = [...tasksTodos]
        updatedTasksTodos[origin_column] = updatedOrigin
        updatedTasksTodos[destination_column] = updatedDestination

        setTasksTodos(updatedTasksTodos);


    };




    if (validated_token) {

        return (
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="tasks p-4">
                    <div className="container-fluid">
                        <div className="row d-flex justify-content-end">
                            {project ? <h1>{project?.title}</h1> : <p>Project not found or doesn't exist</p>}
                            <div className="d-flex justify-content-end">
                                <div className="">
                                    <h5 className="p-2">Number of images and documents:</h5>
                                </div>
                                    <h5 className="p-2">{project.files.length > 0 ? project.files.length : 0}</h5>
                                {project ? 
                                    <UploadFile
                                        projectId={project.id}
                                        onUploadComplete={handleUpdateComponent}
                                        ctaText={"Upload file"}
                                        butClass={"primary-button"}
                                    /> 
                                : ""}
                            </div>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col-6 simple-card my-4 p-4 overflow-hidden text-break">
                                <Column title={"To-do"} projectTasks={tasksTodos[0]} projectId={project.id} id={"0"} _onCreateComplete={handleUpdateComponent} __onDeleteCompleted={handleUpdateComponent} />
                            </div>
                            <div className="col-6 simple-card my-4 p-4 overflow-hidden text-break">
                                <Column title={"In Progress"} projectTasks={tasksTodos[1]} projectId={project.id} id={"1"} _onCreateComplete={handleUpdateComponent} __onDeleteCompleted={handleUpdateComponent} />
                            </div>
                            <div className="col-6 simple-card my-4 p-4 overflow-hidden text-break">
                                <Column title={"Done"} projectTasks={tasksTodos[2]} id={"2"} _onCreateComplete={handleUpdateComponent} __onDeleteCompleted={handleUpdateComponent} />
                            </div>
                        </div>
                    </div>
                </div>
            </DragDropContext>
        )
    }

}

