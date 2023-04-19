import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { getUserAlbums } from '../api/users';

interface Albums {
  id: number;
  userId: number;
  media_url: string;
}

const UserAlbums: React.FC<{ userId: number }> = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [userAlbums, setUserAlbums] = useState<Albums[]>([]);

  useEffect(() => {
    const fetchUserAlbums = async (userId?: string) => {
      if(!userId) return
      
      try {
        const res = await getUserAlbums(userId);

        setUserAlbums(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserAlbums(userId);
  }, [userId]);

  if (userAlbums.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Albums</h2>
      {userAlbums.map((post) => (
        <div key={post.id}>
          <img src={post.media_url} alt="album" />
        </div>
      ))}
    </div>
  );
};

export default UserAlbums;
