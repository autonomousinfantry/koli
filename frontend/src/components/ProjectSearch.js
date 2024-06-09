import React, { useState } from 'react';
import axios from 'axios';

const ProjectSearch = ({ setProjects }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/projects/search?query=${query}`);
            setProjects(data);
        } catch (error) {
            console.error('Error searching projects', error);
        }
    };

    return (
        <div className="project-search">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search projects"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default ProjectSearch;
