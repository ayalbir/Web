import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LeftMenu from '../leftMenu/LeftMenu';
import videosData from '../videoLogic/videoItem/Videos.json';
import Search from '../search/Search';
import CreateVideo from '../createVideo/CreateVideo';
import VideoListResults from '../videoLogic/videoListResults/VideoListResults';
import VideoMain from '../videoLogic/videoMain/VideoMain';
import SearchResults from '../search/SearchResults';
import DarkModeButton from '../darkMode/DarkModeButton';
import SignIn from '../loginSignin/SignIn';
import Register from '../loginSignin/Register';
import SetUp from '../loginSignin/SetupEmailPassword';
import UploadImage from '../loginSignin/UploadImage';
import SetUpLayout from '../loginSignin/SetUpLayout';
import SignInLayout from '../loginSignin/SignInLayout';
import ProtectedRoute from './ProtectedRoute';
import RegisterLayout from '../loginSignin/RegisterLayout';
import UploadImageLayout from '../loginSignin/UploadImageLayout';

function App() {
  const [videoList, setVideoList] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [comments, setComments] = useState({});
  const [userInteractions, setUserInteractions] = useState({});
  const [likesDislikes, setLikesDislikes] = useState({});
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  const updateUser = (newUser) => {
    setUser(newUser);
    setSignedIn(true);
  };

  const handleSignOut = () => {
    setUser(null);
    setSignedIn(false);
  };

  const updateUserImage = (image) => {
    setUser(prevUser => ({
      ...prevUser,
      profilePicture: image
    }));
  };

  useEffect(() => {
    const initialLikesDislikes = videosData.reduce((acc, video) => {
      acc[video.id] = { likes: 0, dislikes: 0 };
      return acc;
    }, {});
    setVideoList(videosData);
    setLikesDislikes(initialLikesDislikes);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode');
  };

  const addComment = (videoId, comment) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: [...(prevComments[videoId] || []), comment],
    }));
  };

  const editComment = (videoId, index, newText) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].map((comment, i) =>
        i === index ? { ...comment, text: newText } : comment
      ),
    }));
  };

  const deleteComment = (videoId, index) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].filter((_, i) => i !== index),
    }));
  };

  const handleLike = (videoId) => {
    setUserInteractions(prevInteractions => {
      const currentInteraction = prevInteractions[videoId] || {};
      const alreadyLiked = currentInteraction.like;

      if (alreadyLiked) {
        setLikesDislikes(prevLikesDislikes => ({
          ...prevLikesDislikes,
          [videoId]: {
            likes: prevLikesDislikes[videoId].likes - 1,
            dislikes: prevLikesDislikes[videoId].dislikes,
          }
        }));
        return {
          ...prevInteractions,
          [videoId]: { like: false, dislike: false }
        };
      }

      if (currentInteraction.dislike) {
        setLikesDislikes(prevLikesDislikes => ({
          ...prevLikesDislikes,
          [videoId]: {
            likes: prevLikesDislikes[videoId].likes + 1,
            dislikes: prevLikesDislikes[videoId].dislikes - 1,
          }
        }));
      } else {
        setLikesDislikes(prevLikesDislikes => ({
          ...prevLikesDislikes,
          [videoId]: {
            likes: prevLikesDislikes[videoId].likes + 1,
            dislikes: prevLikesDislikes[videoId].dislikes,
          }
        }));
      }

      return {
        ...prevInteractions,
        [videoId]: { like: true, dislike: false }
      };
    });
  };

  const handleDislike = (videoId) => {
    setUserInteractions(prevInteractions => {
      const currentInteraction = prevInteractions[videoId] || {};
      const alreadyDisliked = currentInteraction.dislike;

      if (alreadyDisliked) {
        setLikesDislikes(prevLikesDislikes => ({
          ...prevLikesDislikes,
          [videoId]: {
            likes: prevLikesDislikes[videoId].likes,
            dislikes: prevLikesDislikes[videoId].dislikes - 1,
          }
        }));
        return {
          ...prevInteractions,
          [videoId]: { like: false, dislike: false }
        };
      }

      if (currentInteraction.like) {
        setLikesDislikes(prevLikesDislikes => ({
          ...prevLikesDislikes,
          [videoId]: {
            likes: prevLikesDislikes[videoId].likes - 1,
            dislikes: prevLikesDislikes[videoId].dislikes + 1,
          }
        }));
      } else {
        setLikesDislikes(prevLikesDislikes => ({
          ...prevLikesDislikes,
          [videoId]: {
            likes: prevLikesDislikes[videoId].likes,
            dislikes: prevLikesDislikes[videoId].dislikes + 1,
          }
        }));
      }

      return {
        ...prevInteractions,
        [videoId]: { like: false, dislike: true }
      };
    });
  };

  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          <Route
            path="/signin"
            element={<SignInLayout><SignIn setSignedIn={setSignedIn} setUser={setUser} /></SignInLayout>}
          />
          <Route path="/register" element={<RegisterLayout><Register /></RegisterLayout>} />
          <Route path="/setup-email-password" element={<SetUpLayout><SetUp updateUser={updateUser} /></SetUpLayout>} />
          <Route path="/upload-image" element={<UploadImageLayout><UploadImage updateUserImage={updateUserImage} /></UploadImageLayout>} />

          <Route path="*" element={
            <div className="row">
              <LeftMenu expanded={expanded} setExpanded={setExpanded} />
              <div className={`col main-content ${expanded ? 'offset-md-3' : 'offset-md-1'}`}>
                <div className="search-signin-container">
                  <Link to="/create" className="btn create-button">
                    <i className="bi bi-patch-plus"></i>
                  </Link>
                  <Search className="search-bar" />
                  <Link to="/" className="app-logo-link">
                    <img src={isDarkMode ? "/images/logo-dark.svg" : "/images/logo-light.svg"} alt="Logo" className="app-logo" />
                  </Link>
                  <DarkModeButton toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                  {user && signedIn ? (
                    <button type="button" className="btn btn-primary" onClick={handleSignOut}>
                      {user.profilePicture && <img src={user.profilePicture} alt="Profile" className="profile-picture" />}
                      {user.name && <span className="username">{user.name}</span>}
                      <span className="signin-text">Sign out</span>
                    </button>
                  ) : (
                    <Link to="/signin" className="signin-link">
                      <button type="button" className="btn btn-primary">
                        <span className="bi bi-person-circle" aria-hidden="true"></span>
                        <span className="signin-text">Sign in</span>
                      </button>
                    </Link>
                  )}
                </div>
                <Routes>
                  <Route path="/" element={<VideoListResults videos={videoList} />} />
                  <Route path="/video/:id" element={
                    <VideoMain
                      videos={videoList}
                      comments={comments}
                      addComment={addComment}
                      deleteComment={deleteComment}
                      editComment={editComment}
                      user={user || { signedIn: false }} // Initialize user if it's null
                      userInteractions={userInteractions}
                      handleLike={handleLike}
                      handleDislike={handleDislike}
                      likesDislikes={likesDislikes}
                    />
                  } />
                  <Route path="/search" element={<SearchResults videos={videoList} />} />
                  <Route path="/create" element={<ProtectedRoute user={user}><CreateVideo setVideoList={setVideoList} user={user} /></ProtectedRoute>} />
                </Routes>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;