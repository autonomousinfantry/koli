import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Team = ({ projectId }) => {
    const [team, setTeam] = useState(null);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('viewer');

    useEffect(() => {
        axios.get(`/api/teams/${projectId}`).then((response) => {
            setTeam(response.data);
        });
    }, [projectId]);

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/teams/add-member', {
                teamId: team._id,
                username,
                role,
            });
            setTeam(data);
            setUsername('');
        } catch (error) {
            console.error('Error adding member', error);
        }
    };

    return (
        <div className="team">
            <h3>Team Members</h3>
            {team ? (
                <ul>
                    {team.members.map((member) => (
                        <li key={member.userId._id}>
                            {member.userId.username} ({member.role})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No team members found</p>
            )}
            <form onSubmit={handleAddMember}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Add Member</button>
            </form>
        </div>
    );
};

export default Team;
