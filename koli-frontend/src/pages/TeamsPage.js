import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      const { data } = await axios.get('/api/teams', {
        headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
      });
      setTeams(data);
    };

    fetchTeams();
  }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();

    const { data } = await axios.post('/api/teams', { name: teamName, members }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
    });

    setTeams([...teams, data]);
    setTeamName('');
    setMembers([]);
  };

  const handleAddMember = async (teamId, email) => {
    const { data: users } = await axios.get(`/api/users?email=${email}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
    });

    if (users.length > 0) {
      const memberId = users[0]._id;
      const { data } = await axios.post('/api/teams/add-member', { teamId, memberId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
      });

      setTeams(teams.map(team => team._id === teamId ? data : team));
    }
  };

  return (
    <div>
      <h1>Teams</h1>
      <form onSubmit={handleCreateTeam}>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button type="submit">Create Team</button>
      </form>
      <div>
        {teams.map(team => (
          <div key={team._id}>
            <h3>{team.name}</h3>
            <ul>
              {team.members.map(member => (
                <li key={member._id}>{member.name} ({member.email})</li>
              ))}
            </ul>
            <input
              type="email"
              placeholder="Member Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => handleAddMember(team._id, email)}>Add Member</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
