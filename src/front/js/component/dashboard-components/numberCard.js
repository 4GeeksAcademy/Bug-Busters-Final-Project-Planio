import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../styles/sidebar.css";
import "../../../styles/home.css";
import { Context } from "../../store/appContext";
import { CreateProject } from "../createProject";
import { CreateTask } from "../createTask";
import { UploadFile } from "../uploadFile";

export const NumberCard = ({

    title,
    isProjects,
    isFiles,
    folderUrl,

}) => {

    const { store, actions } = useContext(Context);
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const [totalFiles, setTotalFiles] = useState(0); // Estado para almacenar el total de archivos

    const userInfo = store.user_info[0];

    const project = userInfo.projects && userInfo.projects.map(project => project.id);


    useEffect(() => {
        if (userInfo.projects) {
            const calculatedTotalFiles = userInfo.projects && userInfo.projects.reduce((accumulator, project) => {
                return accumulator + (project.files && project.files.length ? project.files.length : "0");
            }, 0);
            setTotalFiles(calculatedTotalFiles);
        }
    }, [userInfo]);




    useEffect(() => {

        actions.getUserInfo()
            .then((userInfo) => {
                console.log(userInfo);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [updatedComponent]);

    const handleDelete = async (file_name, project_id) => {
        try {
            await actions.deleteFile(file_name, project_id);
            setUpdatedComponent(!updatedComponent);
        } catch (error) {
            console.error("Error deleting file:", error);
        }

    }

    const handleUpdateComponent = () => {
        setUpdatedComponent(!updatedComponent);
    };

    return (
        <div className="col-md-6 simple-card w49 p-4">

                {
                    isProjects &&
                    <>
                        <div className="card-info d-flex justify-content-between">
                            <h5 className="card-title">{title}</h5>
                            <CreateProject username={userInfo.username} projectCreated={handleUpdateComponent} ctaText={<i className="addIcon fa-solid fa-plus"></i>} butClass="addNew"/>
                        </div>
                        <div className="card-number d-flex justify-content-between">
                            <p className="card-text">{userInfo.projects && userInfo.projects.length ? userInfo.projects.length : "0"}</p>
                            <div className="card-icon d-flex">
                                <a href={folderUrl}><i className="viewFolder fa-regular fa-folder"></i></a>
                            </div>
                        </div>
                    </>
                        

                }

                {
                    isFiles &&
                    <>
                        <div className="card-info d-flex justify-content-between">
                            <h5 className="card-title">{title}</h5>
                            <UploadFile projectId={project} onUploadComplete={handleUpdateComponent} ctaText={<i className="addIcon fa-solid fa-plus"></i>} butClass="addNew"/>
                        </div>
                        <div className="card-number d-flex justify-content-between">
                            <p className="card-text">{totalFiles}</p>
                            <div className="card-icon d-flex">
                                <a href={folderUrl}><i className="viewFolder fa-regular fa-folder"></i></a>
                            </div>
                        </div>
                    </>


                }

        </div>

    )
}
