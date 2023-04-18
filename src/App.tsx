import { Suspense } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import UserList from './pages/UserList';
import UserPosts from './pages/UserPosts';
import UserAlbums from './pages/UserAlbums';
import PostComments from './pages/PostComments';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:userId/posts" element={<UserPosts userId={Number(':userId')} />} />
          <Route path="/users/:userId/albums" element={<UserAlbums userId={Number(':userId')} />} />
          <Route path="/posts/:postId/comments" element={<PostComments postId={Number(':postId')} />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
