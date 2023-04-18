import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { getUserPosts } from '../api/users';

interface Post {
  id: number;
  userId: number;
  title: string;
}

const UserPosts: React.FC<{ userId: number }> = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUserPosts = async (userId?: string) => {
      if(!userId) return

      try {
        const res = await getUserPosts(userId);

        setUserPosts(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPosts(userId);
  }, [userId]);

  if (userPosts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Posts</h2>
      {userPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
