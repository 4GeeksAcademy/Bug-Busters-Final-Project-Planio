import React from "react";


export const DateTime = () => {
    const date = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const dayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    let dayName = dayNames[date.getDay()];
    let day = date.getDate();
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    let currentDate = `${dayName} ${day} ${month} ${year}`;

    return (
        <p>{currentDate}</p>
    )
};