import axios, { AxiosResponse } from 'axios';

const POST_API_URL = `${process.env.REACT_APP_API_URL}/posts`;

interface Post {
  id: number;
  title: string;
  userId: number;
}

interface Comments {
  id: number;
  body: string;
  postId: number;
}

export const getPost = async (postId: string): Promise<Post | null> => {
  try {
    const response: AxiosResponse<Post> = await axios.get(`${POST_API_URL}/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null
  }
};
  
export const getPostComments = async (postId: string): Promise<Comments[]> => {
    try {
      const response: AxiosResponse<Comments[]> = await axios.get(`${POST_API_URL}/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
};
