import React, { useEffect, useState } from "react";

import { getPosts, deletePost, editPost } from '../api/posts';
import List from "../components/List";

interface IPost {
  id: number;
  title: string;
  userId: number;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isPostEdited, setIsPostEdited] = useState(false);
  const [inputPostValue, setInputPostValue] = useState('');

  const handleInputPostValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPostValue(event.target.value);
  }

  const handleEditComment = async (post: IPost) => {
    const payload = {
      ...post,
      title: inputPostValue
    }

    const res = await editPost(payload);

    console.log(res);

    setIsPostEdited(false);
  };

  const preparingForEditPost = async (post: IPost) => {
    setIsPostEdited(true);

    // await handleEditComment(post)
  }

  const handleDeleteComment = async (id: number) => {
    await deletePost(id);

    setPosts(prevState => prevState.filter(comment => comment.id !== id));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      
      try {
        const res = await getPosts();

        setPosts(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Post List</h2>

      <ul>
        {posts.map((post) => (
          <List key={post.id}>
            {isPostEdited ? (
              <input type="text" value={inputPostValue} onChange={handleInputPostValue} />
            ):(
              <p>{post.title}</p>
            )}
            
            <div className="actions">
              <span onClick={() => preparingForEditPost(post)}>Edit</span>
              <span onClick={() => handleDeleteComment(post.id)}>delete</span>
              </div>
          </List>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
