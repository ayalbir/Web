import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../loginLogic/SignIn';
import SignUp from '../loginLogic/SignUp';
import SignUpTwo from '../loginLogic/SignUpTwo';
import VideoListResults from '../../videoLogic/videoListResults/VideoListResults';
import VideoMain from '../../videoLogic/videoMain/VideoMain';
import SearchResults from '../searchResults/SearchResults';
import CreateVideo from '../createVideo/CreateVideo';
import UserPage from '../userPage/UserPage';
import UpdateProfile from '../updateProfile/UpdateProfile';
import MainLayout from '../mainLayout/MainLayout';
import './RoutesConfiguration.css';

const RoutesConfiguration = ({
  user,
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
  handleRegisterUser,
  setUser,
  registeredUsers,
  updateUser,
  isDarkMode,
  toggleDarkMode,
  expanded,
  setExpanded,
  handleSignOut,
  addVideo
}) => {
  return (
    <Routes>
      {/* Routes without application layout */}
      <Route path="/signin" element={<SignIn setUser={setUser} registeredUsers={registeredUsers} />} />
      <Route path="/signup" element={<SignUp handleRegisterUser={handleRegisterUser} />} />
      <Route path="/sign-up-step-two" element={<SignUpTwo handleRegisterUser={handleRegisterUser} />} />

      {/* Routes with application layout */}
      <Route
        path="/*"
        element={
          <MainLayout
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            user={user}
            handleSignOut={handleSignOut}
            expanded={expanded}
            setExpanded={setExpanded}
          >
            <VideoListResults videos={videoList} getUserByEmail={getUserByEmail} />
          </MainLayout>
        }
      />
      <Route
        path="/video/:id"
        element={
          <MainLayout
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            user={user}
            handleSignOut={handleSignOut}
            expanded={expanded}
            setExpanded={setExpanded}
          >
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
          </MainLayout>
        }
      />
      <Route
        path="/search"
        element={
          <MainLayout
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            user={user}
            handleSignOut={handleSignOut}
            expanded={expanded}
            setExpanded={setExpanded}
          >
            <SearchResults videos={videoList} getUserByEmail={getUserByEmail} />
          </MainLayout>
        }
      />
      <Route
        path="/create"
        element={
          <MainLayout
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            user={user}
            handleSignOut={handleSignOut}
            expanded={expanded}
            setExpanded={setExpanded}
          >
            <CreateVideo addVideo={addVideo} user={user}/>
          </MainLayout>
        }
      />
      <Route
        path="/user/:name"
        element={
          <MainLayout
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            user={user}
            handleSignOut={handleSignOut}
            expanded={expanded}
            setExpanded={setExpanded}
          >
            <UserPage videos={videoList} getUserByEmail={getUserByEmail} />
          </MainLayout>
        }
      />
      <Route
        path="/update-profile"
        element={
          <MainLayout
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            user={user}
            handleSignOut={handleSignOut}
            expanded={expanded}
            setExpanded={setExpanded}
          >
            <UpdateProfile
              user={user}
              updateUser={updateUser}
              setUser={setUser}
              registeredUsers={registeredUsers}
            />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default RoutesConfiguration;
