import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentsSection from '../commentsSection/CommentsSection';
import './VideoMain.css';

const VideoMain = ({
  videos,
  comments,
  addComment,
  deleteComment,
  editComment,
  user,
  userInteractions,
  handleLike,
  handleDislike,
  likesDislikes,
  deleteVideo,
  editVideo,
  getUserByEmail,
  updateVideoViews
}) => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedFile, setEditedFile] = useState(null);
  const navigate = useNavigate();
  const hasUpdatedViews = useRef(false);

  useEffect(() => {
   
    const foundVideo = videos.find(v => (v._id || v.id) === id);
    if (foundVideo) {
      setVideo(foundVideo);
      setEditedTitle(foundVideo.title);
      setEditedDescription(foundVideo.description);
      if (!hasUpdatedViews.current) {
        updateVideoViews(foundVideo._id || foundVideo.id);
        hasUpdatedViews.current = true;
      }
    } else {
      setVideo(null);
    }
  }, [id, videos, updateVideoViews]);

 
  if (!video) {
    return <div className="video-not-found">Video not found</div>;
  }

  const suggestedVideos = videos.filter(v => (v._id || v.id) !== id).slice(0, 10);

  const handleShareClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleLikeClick = () => {
    if (user !== null && user.signedIn) {
      handleLike(video._id || video.id);
    } else {
      navigate("/signin");
    }
  };

  const handleDislikeClick = () => {
    if (user !== null && user.signedIn) {
      handleDislike(video._id || video.id);
    } else {
      navigate("/signin");
    }
  };

  const handleDeleteVideo = () => {
    deleteVideo(video._id || video.id);
    navigate('/');
  };

  const handleEditVideo = () => {
    if (editMode) {
      const newUrl = editedFile ? URL.createObjectURL(editedFile) : video.url;
      editVideo((video._id || video.id) , editedTitle, editedDescription, newUrl);
    }
    setEditMode(!editMode);
  };

  const handleFileChange = (e) => {
    setEditedFile(e.target.files[0]);
  };

  const interaction = userInteractions[video._id || video.id] || {};
  const isLiked = interaction.like || false;
  const isDisliked = interaction.dislike || false;

  const likesCount = likesDislikes[video._id || video.id]?.likes || 0;
  const dislikesCount = likesDislikes[video._id || video.id]?.dislikes || 0;

  const handleVideoClick = (clickedVideoId) => {
    updateVideoViews(clickedVideoId);
  };

  return (
    <div className="video-details-container">
      <div className="video-content">
        <div className="main-video-section">
          <div className="video-player-container">
            {editMode ? (
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="edit-file-input"
              />
            ) : (
              <video key={video.url} className="video-player" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <div className="video-info-container">
            <div className="video-header">
              {editMode ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    placeholder='Title'
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="edit-title-input"
                  />
                </>
              ) : (
                <h2 className="video-title">{video.title}</h2>
              )}
              <div className="video-stats">
                <p className="video-views">{video.views} views</p>
                <p className="video-date">{video.date}</p>
              </div>
            </div>
            <div className="video-actions">
              <button
                className={`btn btn-light ${isLiked ? 'liked' : ''}`}
                onClick={handleLikeClick}
              >
                <i className="bi bi-hand-thumbs-up"></i> {likesCount}
              </button>
              <button
                className={`btn btn-light ${isDisliked ? 'disliked' : ''}`}
                onClick={handleDislikeClick}
              >
                <i className="bi bi-hand-thumbs-down"></i> {dislikesCount}
              </button>
              <button className="btn btn-light" onClick={handleShareClick}><i className="bi bi-share"></i> Share</button>
              {user && (
                <>
                  <button className="btn btn-warning" onClick={handleEditVideo}>
                    {editMode ? 'Save' : 'Edit'}
                  </button>
                  <button className="btn btn-danger" onClick={handleDeleteVideo}>Delete</button>
                </>
              )}
            </div>
            <div className="video-description">
              {editMode ? (
                <>
                  <textarea
                    value={editedDescription}
                    placeholder='Description'
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="edit-description-input"
                  />
                </>
              ) : (
                <>
                  <div className="email-details">
                    {getUserByEmail && video.email && (
                      <Link to={`/user/${(video.email)}`} className="email-link">
                        <img src={getUserByEmail(video.email)?.profileImage} alt={getUserByEmail(video.email)?.firstName} className="email-profile-image" />
                        {getUserByEmail(video.email)?.firstName || 'Unknown'}
                      </Link>
                    )}
                  </div>
                  <p>{video.description}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <CommentsSection
          videoId={video._id || video.id}
          comments={comments}
          addComment={addComment}
          deleteComment={deleteComment}
          editComment={editComment}
          user={user}
        />
      </div>
      <div className="suggested-videos-section">
        <h3>Up Next</h3>
        <ul className="suggested-videos-list">
          {suggestedVideos.map(suggestedVideo => (
            <li key={suggestedVideo._id || suggestedVideo.id} className="suggested-video-item">
              <Link
                to={`/video/${suggestedVideo._id || suggestedVideo.id}`}
                className="suggested-video-link"
                onClick={() => handleVideoClick(suggestedVideo._id || suggestedVideo.id)}
              >
                <img src={suggestedVideo.pic} alt={suggestedVideo.title} className="suggested-video-thumbnail" onError={(e) => { e.target.src = '/path/to/default/image.jpg'; }} />
                <div className="suggested-video-info">
                  <h4 className="suggested-video-title">{suggestedVideo.title}</h4>
                  <div className="email-details">
                    {getUserByEmail && suggestedVideo.email && (
                      <Link to={`/user/${suggestedVideo.email}`} className="email-link">
                        <img src={getUserByEmail(suggestedVideo.email)?.profileImage} alt={getUserByEmail(suggestedVideo.email)?.firstName} className="email-profile-image" />
                        {getUserByEmail(suggestedVideo.email)?.firstName || suggestedVideo.email || 'Unknown'}
                      </Link>
                    )}
                  </div>
                  <p className="suggested-video-views">{suggestedVideo.views} views</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="share-modal-overlay" onClick={handleCloseModal}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h5 className="share-modal-title">Share</h5>
              <button type="button" className="close" aria-label="Close" onClick={handleCloseModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="share-modal-body">
              <div className="input-group">
                <input type="text" className="form-control" value={window.location.href} readOnly />
                <button className="btn btn-outline-secondary" type="button" onClick={handleCopyLink}>Copy</button>
              </div>
              <p>Share on social media:</p>
              <div className="social-buttons">
                <button className="btn btn-primary"><i className="bi bi-facebook"></i> Facebook</button>
                <button className="btn btn-info"><i className="bi bi-twitter"></i> Twitter</button>
                <button className="btn btn-danger"><i className="bi bi-pinterest"></i> Pinterest</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMain;
