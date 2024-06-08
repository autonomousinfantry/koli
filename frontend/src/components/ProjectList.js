import React from 'react';

const ProjectList = ({ projects, selectProject }) => {
    return (
        <div className="project-list">
            <button onClick={() => selectProject(null)}>Create New Project</button>
            {projects.map((project) => (
                <div key={project._id} className="project" onClick={() => selectProject(project)}>
                    <p>{project.name}</p>
                </div>
            ))}
        </div>
    );
};

export default ProjectList;
