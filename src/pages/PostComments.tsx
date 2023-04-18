import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { getPost, getPostComments } from '../api/posts';

interface PostProps {
  id: number;
  title: string;
  userId: number;
}

interface Comments {
  id: number;
  body: string;
  postId: number;
}

const PostComments: React.FC<{ postId: number }> = () => {
  const { postId } = useParams<{ postId?: string }>();
  const [post, setPost] = useState<PostProps | null>(null);
  const [postComments, setPostComments] = useState<Comments[]>([]);

  useEffect(() => {
    const fetchPostComments = async (postId?: string) => {
      if(!postId) return
      
      try {
        const res = await getPost(postId);
        const res2 = await getPostComments(postId);

        setPost(res);
        setPostComments(res2);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostComments(postId);
  }, [postId]);

  if (postComments.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Comment From {post!.title}</h2>
      {postComments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
