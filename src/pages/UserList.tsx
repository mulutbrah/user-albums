import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getUsers } from '../api/users';
import List from "../components/List";

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
            <List  key={user.id}>
                <div>{user.name}</div>

                <div className="actions">
                    <Link to={`/users/${user.id}/posts`}>View Posts</Link>
                    <Link to={`/users/${user.id}/albums`}>View Albums</Link>
                </div>
            </List>
            ))}
        </ul>
    </div>
  );
}

export default UserList;
