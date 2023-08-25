import React, { useContext, useRef, useState } from "react";
import { Context } from "../store/appContext";


export const UploadFile = ({
    projectId,
    onUploadComplete,
    ctaText = "Upload file",
    butClass = "primary-button",

}) => {
    const { store, actions } = useContext(Context);
    const inputRef = useRef();

    const handleClick = () => {

        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) {
            return;
        };

        actions.uploadFile(fileObj, projectId)
            .then(() => {
                if (onUploadComplete) {
                    onUploadComplete();
                }
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
            });

        e.target.value = null;
    };


    return (
        <div className="primary-button-container d-flex">
            <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleFileChange} />

            <button onClick={handleClick} className={butClass}>{ctaText}</button>
        </div>
    );


};