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
import SignUp from './SignUp';
import SignUpStepTwo from './SignUpStepTwo';
import UploadProfileImage from './UploadProfileImage';
import SignIn from './SignIn';

const demoUser = {
  id: 1,
  name: "Demo User",
  signedIn: false,
};

function App() {
  const [videoList, setVideoList] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [comments, setComments] = useState({});
  const [user, setUser] = useState(demoUser);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [userInteractions, setUserInteractions] = useState({});
  const [likesDislikes, setLikesDislikes] = useState({});

  useEffect(() => {
    setVideoList(videosData);
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

  const deleteComment = (videoId, index) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].filter((_, i) => i !== index),
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

  const handleLike = (videoId) => {
    setUserInteractions(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], like: !prev[videoId]?.like }
    }));
    setLikesDislikes(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], likes: (prev[videoId]?.likes || 0) + (userInteractions[videoId]?.like ? -1 : 1) }
    }));
  };

  const handleDislike = (videoId) => {
    setUserInteractions(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], dislike: !prev[videoId]?.dislike }
    }));
    setLikesDislikes(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], dislikes: (prev[videoId]?.dislikes || 0) + (userInteractions[videoId]?.dislike ? -1 : 1) }
    }));
  };

  const handleSignOut = () => {
    setUser({ ...user, signedIn: false });
  };

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn setUser={setUser} email={email} password={password} />} />
        <Route path="/signup" element={<SignUp setFirstName={setFirstName} />} />
        <Route path="/signup-step-two" element={<SignUpStepTwo email={email} firstName={firstName} setEmail={setEmail} setPassword={setPassword} />} />
        <Route path="/upload-profile-image" element={<UploadProfileImage setProfileImage={setProfileImage} />} />
        <Route
          path="*"
          element={
            <div className="container-fluid">
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
                    {user.signedIn ? (
                      <div className="user-info">
                        {profileImage && <img src={profileImage} alt="Profile" className="profile-image" />}
                        <span className="user-details">{firstName}</span>
                        <span className="user-details">{email}</span>
                        <button type="button" className="btn btn-primary" onClick={handleSignOut}>
                          <span className="bi bi-person-circle" aria-hidden="true"></span>
                          <span className="signin-text">Sign out</span>
                        </button>
                      </div>
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
                        user={{ ...user, firstName, profileImage }}
                        userInteractions={userInteractions}
                        handleLike={handleLike}
                        handleDislike={handleDislike}
                        likesDislikes={likesDislikes}
                      />
                    } />
                    <Route path="/search" element={<SearchResults videos={videoList} />} />
                    <Route path="/create" element={<CreateVideo setVideoList={setVideoList} user={user} />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
