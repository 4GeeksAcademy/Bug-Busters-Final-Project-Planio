import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import swal from "sweetalert2";
import "../../styles/home.css";
import { UploadFile } from "../component/uploadFile";

export const PrivateView = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const navigate = useNavigate();

    const userInfo = store.user_info[0];

    useEffect(() => {

        if (!validated_token) {
            swal.fire({ title: "You must log in", text: "bla bla bla bla.", icon: "error", confirmButtonColor: '#fa9643' }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        } else {
            console.log(updatedComponent)
            actions.getUserInfo()
                .then((userInfo) => {
                    console.log('%cUser info successfully retrieved', 'color: cyan; background: black; font-size: 20px');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [validated_token, updatedComponent]);


    const handleDelete = (file_name, project_id) => {
        actions.deleteFile(file_name, project_id)
        setUpdatedComponent(!updatedComponent);

    }


    if (!validated_token) {
        return null;
    }

    if (validated_token) {
        return (
            <div className="text-center mt-5">
                <h1>DASHBOARD</h1>
                <h2>Hi, {userInfo.name}</h2>

                <h1>Your projects below:</h1>
                {userInfo.projects && userInfo.projects.map((project) => (
                    <div key={project.id} className="mt-5">
                        <h2>{project.title}</h2>
                        <h5>{project.description}</h5>
                        <h4>Your images and documents:</h4>
                        {project.files && project.files.length > 0 ? (
                            <ul className="list-unstyled">
                                {project.files.map((file, index) => (
                                    <li key={index} className="list-body">
                                        <a href={`${process.env.AWS_FILE_URL}/${file}`} target="_blank">{file}</a>
                                        <button className="delete-button" onClick={() => handleDelete(file, project.id)}>X</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Upload your images or documents</p>
                        )}
                        <UploadFile projectId={project.id} />
                    </div>

                ))}
                <img src="https://bug-busters-planio-bucket-demostration.s3.eu-west-3.amazonaws.com/planio-logo-png.png" alt="Image from AWS" />
            </div>

        );
    }
};
