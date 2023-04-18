import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getUsers } from '../api/users';

interface IUser {
  id: number;
  name: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const res = await getUsers();

            setUsers(res);
        }catch {
            console.log('error');
        }
    }

    fetchUsers();

    return () => setUsers([]);
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
