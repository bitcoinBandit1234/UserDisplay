import { useState, useEffect } from 'react';
import "./App.scss";

interface User {
  ID: string;
  JobTitle: string;
  EmailAddress: string;
  FirstNameLastName: string;
  Email: string;
  Phone: string;
  Company: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `https://give-me-users-forever.vercel.app/api/users/${startIndex}/next`
      );
      const data = await response.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, [startIndex]);

  const renderUsers = () => {
    return users.map((user) => (
      <div className="user-card" key={user.ID}>
        <div className="user-info">
          <h2>{user.FirstNameLastName}</h2>
          <p>{user.JobTitle}</p>
          <p>{user.EmailAddress}</p>
          <p>{user.Phone}</p>
          <p>{user.Company}</p>
        </div>
      </div>
    ));
  };

  const handlePrevClick = () => {
    if (startIndex >= 10) {
      setStartIndex(Math.max(startIndex - 10,0));
    }
  };

  const handleNextClick = () => {
    setStartIndex(startIndex + 10);
  };

  return (
    <div className="app">
      <h1>Users</h1>
      <div className="buttons">
        <button className="prev-button" onClick={handlePrevClick}>Previous</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
      <div className="users-container">{renderUsers()}</div>

    </div>
  );
}

export default App;

