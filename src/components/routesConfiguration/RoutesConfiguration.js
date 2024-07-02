// src/components/routesConfiguration/RoutesConfiguration.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../../loginLogic/SignIn';
import SignUp from '../../loginLogic/SignUp';
import SignUpStepTwo from '../../loginLogic/SignUpStepTwo';
import UploadProfileImage from '../../loginLogic/UploadProfileImage';
import VideoListResults from '../../videoLogic/videoListResults/VideoListResults';
import VideoMain from '../../videoLogic/videoMain/VideoMain';
import SearchResults from '../searchResults/SearchResults';
import CreateVideo from '../createVideo/CreateVideo';
import UserPage from '../userPage/UserPage';
import UpdateProfile from '../updateProfile/UpdateProfile';
// import the css file, even if it's empty
import './RoutesConfiguration.css';

const RoutesConfiguration = ({ 
  user, 
  registeredUsers, 
  setUser, 
  handleRegisterUser, 
  videoList, 
  comments, 
  addComment, 
  deleteComment, 
  editComment, 
  userInteractions, 
  handleLike, 
  handleDislike, 
  likesDislikes, 
  deleteVideo, 
  editVideo, 
  getUserByEmail, 
  updateVideoViews, 
  updateUser,
  addVideo 
}) => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn setUser={setUser} registeredUsers={registeredUsers} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup-step-two" element={<SignUpStepTwo registerUser={handleRegisterUser} />} />
      <Route path="/upload-profile-image" element={<UploadProfileImage email={user?.email} registeredUsers={registeredUsers} />} />
      <Route
        path="*"
        element={
          <>
            <VideoListResults videos={videoList} getUserByEmail={getUserByEmail} />
          </>
        }
      />
      <Route
        path="/video/:id"
        element={
          <VideoMain
            videos={videoList}
            comments={comments}
            addComment={addComment}
            deleteComment={deleteComment}
            editComment={editComment}
            user={user}
            userInteractions={userInteractions}
            handleLike={handleLike}
            handleDislike={handleDislike}
            likesDislikes={likesDislikes}
            deleteVideo={deleteVideo}
            editVideo={editVideo}
            getUserByEmail={getUserByEmail}
            updateVideoViews={updateVideoViews}
          />
        }
      />
      <Route path="/search" element={<SearchResults videos={videoList} getUserByEmail={getUserByEmail} />} />
      <Route path="/create" element={<CreateVideo addVideo={addVideo} user={user} />} />
      <Route path="/user/:name" element={<UserPage videos={videoList} getUserByEmail={getUserByEmail} />} />
      <Route path="/update-profile" element={<UpdateProfile user={user} updateUser={updateUser} />} />
    </Routes>
  );
};

export default RoutesConfiguration;
