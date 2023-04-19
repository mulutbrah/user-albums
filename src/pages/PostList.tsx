import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPosts, deletePost, editPost } from '../api/posts';

import Modal from "../components/Modal";

interface IPost {
  id: number;
  title: string;
  userId: number;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postDataSelected, setPostDataSelected] = useState<IPost>({
    id: 0,
    title: '',
    userId: 0
  });

  const [isOpen, setIsOpen] = useState(false);
  const [modalPurpose, setModalPurpose] = useState('');

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleEditComment = async (newValue: string) => {
    const payload = {
      ...postDataSelected,
      title: newValue
    }

    const res = await editPost(payload);

    setPosts(prevState => prevState.map(post => {
      if (post.id === payload.id) {
        return { ...post, ...res };
      } else {
        return post;
      }
    }));
  };

  const preparingForEditPost = (post: IPost) => {
    handleOpenModal();
    setModalPurpose('Update');
    setPostDataSelected(post)
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
      {/* Dialog */}
      <Modal isOpen={isOpen} onClose={handleCloseModal} onSubmit={handleEditComment} action={modalPurpose} title="Post" />
      {/* end of Dialog */}

      <h2>Post List</h2>

      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}/comments`}>
            {post.title}
          </Link>
          
          <span onClick={() => preparingForEditPost(post)}>Edit</span>
          <span onClick={() => handleDeleteComment(post.id)}>delete</span>
        </div>
      ))}
    </div>
  );
};

export default PostList;
