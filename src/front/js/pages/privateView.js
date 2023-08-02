import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const PrivateView = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();

    const userInfo = store.user_info[0];

    useEffect(() => {
        // Llama a la acción para obtener la información del usuario
        actions.getUserInfo()
            .then((userInfo) => {
                // La información del usuario se almacenó en el estado del store, puedes acceder a ella aquí
                console.log(userInfo);
            })
            .catch((error) => {
                console.error(error);
                // Maneja el error si lo deseas
            });
    }, []);

    if (validated_token) {
        return (
            <div className="text-center mt-5">
                <h1>PRIVATE VIEW!!!!</h1>
                <h2>{userInfo.name}</h2>
                <h2>{userInfo.email}</h2>
            </div>
        );
    }

};