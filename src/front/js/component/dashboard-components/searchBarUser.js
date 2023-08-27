import React, { useState } from "react";

export const SearchBarUser = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by email or username"
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    );
};

