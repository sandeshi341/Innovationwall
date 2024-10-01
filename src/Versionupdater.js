import React, { useState } from 'react';

const INITIAL_STATE = [
  { id: 1, ClientName: 'Tommy', Version: 'v1.0', Date: '2023-01-01', Environment: 'Production' },
  { id: 2, ClientName: 'Anna', Version: 'v2.0', Date: '2023-02-01', Environment: 'Development' },
  // Add more initial data as needed
];

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

const Versionupdater = () => {
  const [users, setUsers] = useState(INITIAL_STATE);
  const [newUser, setNewUser] = useState({ ClientName: '', Version: '', Date: '', Environment: '' });
  const [editingUserId, setEditingUserId] = useState(null);

  const renderUsers = () => {
    return users.map(({ id, ClientName, Version, Date, Environment }) => (
      <tr key={id}>
        <td style={tableCellStyle}>{id}</td>
        <td style={tableCellStyle}>{ClientName}</td>
        <td style={tableCellStyle}>{Version}</td>
        <td style={tableCellStyle}>{Date}</td>
        <td style={tableCellStyle}>{Environment}</td>
        <td style={tableCellStyle}>
          <button onClick={() => handleEdit(id)}>Edit</button>
        </td>
        <td style={tableCellStyle}>
          <button onClick={() => handleDelete(id)}>Delete</button>
        </td>
      </tr>
    ));
  };

  const renderHeader = () => {
    return (
      <tr>
        {Object.keys(INITIAL_STATE[0]).map((key) => (
          <th key={key} style={tableHeaderStyle}>{capitalize(key)}</th>
        ))}
        <th style={tableHeaderStyle}>Edit</th>
        <th style={tableHeaderStyle}>Delete</th>
      </tr>
    );
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditingUserId(id);
    setNewUser({ ...userToEdit });
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleAdd = () => {
    if (editingUserId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === editingUserId ? { ...newUser, id: editingUserId } : user
      );
      setUsers(updatedUsers);
      setEditingUserId(null);
    } else {
      const newId = users.length + 1;
      setUsers([...users, { ...newUser, id: newId }]);
    }
    setNewUser({ ClientName: '', Version: '', Date: '', Environment: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const tableHeaderStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  };

  return (
    <div style={{ margin: '50px' }}>
      <h1>Version Updater</h1>
      <table style={tableStyle}>
        <thead>{renderHeader()}</thead>
        <tbody>{renderUsers()}</tbody>
      </table>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Client Name"
          name="ClientName"
          value={newUser.ClientName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Version"
          name="Version"
          value={newUser.Version}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Date"
          name="Date"
          value={newUser.Date}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Environment"
          name="Environment"
          value={newUser.Environment}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>{editingUserId !== null ? 'Update User' : 'Add User'}</button>
      </div>
    </div>
  );
};

export default Versionupdater;
