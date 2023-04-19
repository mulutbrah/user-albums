import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

import { getUserPosts } from '../api/users';
import { createPost, editPost, deletePost } from '../api/posts';

import Modal from "../components/Modal";
import List from "../components/List";

interface IPost {
  id: number;
  userId: number;
  title: string;
}

const UserPosts: React.FC<{ userId: number }> = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [modalPurpose, setModalPurpose] = useState('');
  const [postDataSelected, setPostDataSelected] = useState<IPost>({
    id: 0,
    title: '',
    userId: 0
  });

  const handleCreateComment = async (newValue: string) => {
    const payload = {
      id: userPosts[userPosts.length-1].id +1,
      title: newValue,
      userId: Number(userId),
    }
    
    await createPost(payload);

    setUserPosts(prevState => prevState.concat(payload));
  };

  const handleEditComment = async (newValue: string) => {
    const payload = {
      ...postDataSelected,
      title: newValue
    }

    const res = await editPost(payload);

    setUserPosts(prevState => prevState.map(post => {
      if (post.id === payload.id) {
        return { ...post, ...res };
      } else {
        return post;
      }
    }));
  };

  const handleDeleteComment = async (id: number) => {
    await deletePost(id);

    setUserPosts(prevState => prevState.filter(comment => comment.id !== id));
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const preparingForCreatePost = () => {
    handleOpenModal();
    setModalPurpose('Create')
  }

  const preparingForEditPost = (post: IPost) => {
    handleOpenModal();
    setModalPurpose('Update');
    setPostDataSelected(post)
  }

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
       {/* Dialog */}
       <Modal isOpen={isOpen} onClose={handleCloseModal} onSubmit={modalPurpose === 'Create' ? handleCreateComment : handleEditComment} action={modalPurpose} title="Post" />
      {/* end of Dialog */}

      <h2>User Posts</h2>

      <div>
        <button onClick={preparingForCreatePost}>Create Post</button>
      </div>

      <ul>
        {userPosts.map((post) => (
          <List key={post.id}>
            <div>
              {post.title}
            </div>
            
            <div className="actions">
              <Link to={`/posts/${post.id}/comments`}>Comment</Link>
              <span onClick={() => preparingForEditPost(post)}>Edit</span>
              <span onClick={() => handleDeleteComment(post.id)}>delete</span>
            </div>
          </List>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
