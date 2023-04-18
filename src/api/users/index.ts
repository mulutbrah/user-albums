import axios, { AxiosResponse } from 'axios';

const USER_API_URL = `${process.env.REACT_APP_API_URL}/users`;

interface User {
    id: number;
    name: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
}

interface Albums {
  userId: number;
  id: number;
  media_url: string;
}
  
export const getUsers = async (): Promise<User[]> => {
    try {
      const response: AxiosResponse<User[]> = await axios.get(USER_API_URL);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
};

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const response: AxiosResponse<Post[]> = await axios.get(`${USER_API_URL}/${userId}/posts`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUserAlbums = async (userId: string): Promise<Albums[]> => {
  try {
    const response: AxiosResponse<Albums[]> = await axios.get(`${USER_API_URL}/${userId}/albums`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
