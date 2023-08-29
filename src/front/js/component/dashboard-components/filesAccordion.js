import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import Accordion from 'react-bootstrap/Accordion';



export const FilesAccordion = ({ projects }) => {


    return (<>
        <div className="pb-4 col-md-6 simple-card w49">
            <div className="accordion-wrapper p-3 " style={{ maxHeight: '200px', overflowY: 'auto', overflow: 'auto' }}>
                <h5 className="card-title">Files</h5>
                <Accordion flush>
                    {projects && projects.length > 0 ? (
                        projects.map((project, index) => (
                            <Accordion.Item key={index} eventKey={index}>
                                <Accordion.Header>{project.title}</Accordion.Header>
                                <Accordion.Body>

                                    {project.files && project.files.length > 0 ? (
                                        <ul className="list-unstyled">
                                            {project.files.map((file, index) => (
                                                <li key={index} className="tag-wrapper text-center file-list"><a className="file-url" target="_blank" href={`${process.env.AWS_FILE_URL}/${file}`}>{file}</a></li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No files available</p>
                                    )}

                                </Accordion.Body>
                            </Accordion.Item>
                        ))
                    ) : (
                        <div></div>
                    )}

                </Accordion>

            </div>
        </div>

    </>)
}