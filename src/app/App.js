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

const demoUser = {
  id: 1,
  name: "Demo User",
  signedIn: true,
  profilePicture: "/images/logo.svg"
};


function App() {
  const [videoList, setVideoList] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [comments, setComments] = useState({});
  const [userInteractions, setUserInteractions] = useState({});
  const [user, setUser] = useState(demoUser);
  const [likesDislikes, setLikesDislikes] = useState({});

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
    setUserInteractions(prevInteractions => {
      const currentInteraction = prevInteractions[videoId] || {};
      const alreadyLiked = currentInteraction.like;

      // If the user already liked the video, remove the like
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

      // If the user already disliked the video, remove the dislike and add like
      if (currentInteraction.dislike) {
        setLikesDislikes(prevLikesDislikes => ({
          ...prevLikesDislikes,
          [videoId]: {
            likes: prevLikesDislikes[videoId].likes + 1,
            dislikes: prevLikesDislikes[videoId].dislikes - 1,
          }
        }));
      } else {
        // Otherwise, simply add the like
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

      // If the user already disliked the video, remove the dislike
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

      // If the user already liked the video, remove the like and add dislike
      if (currentInteraction.like) {
        setLikesDislikes(prevLikesDislikes => ({
          ...prevLikesDislikes,
          [videoId]: {
            likes: prevLikesDislikes[videoId].likes - 1,
            dislikes: prevLikesDislikes[videoId].dislikes + 1,
          }
        }));
      } else {
        // Otherwise, simply add the dislike
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








  const handleSignOut = () => {
    setUser({ ...user, signedIn: false });
  };

  return (
    <Router>
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
                <button type="button" className="btn btn-primary" onClick={handleSignOut}>
                  <img src={user.profilePicture} alt="Profile" className="profile-picture" />
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
                  user={user}
                  userInteractions={userInteractions}
                  handleLike={handleLike}
                  handleDislike={handleDislike}
                  likesDislikes={likesDislikes}
                />
              } />
              <Route path="/search" element={<SearchResults videos={videoList} />} />
              <Route path="/create" element={<CreateVideo setVideoList={setVideoList} user={user} />} />
              <Route path="/signin" element={<h1>Sign In</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
