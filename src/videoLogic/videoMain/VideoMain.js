import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import videos from '../videoItem/Videos.json';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import VideoInfo from '../videoInfo/VideoInfo';
import SuggestedVideos from '../suggestedVideos/SuggestedVideos';
import CommentsSection from '../commentsSection/CommentsSection';
import './VideoMain.css';

const VideoMain = () => {
  const { id } = useParams();
  const video = videos.find(v => v.id === parseInt(id));
  const [showModal, setShowModal] = useState(false);

  if (!video) {
    return <div className="video-not-found">Video not found</div>;
  }

  const suggestedVideos = videos.filter(v => v.id !== parseInt(id)).slice(0, 10);

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

  return (
    <div className="video-details-container">
      <div className="video-content">
        <div className="main-video-section">
          <div className="video-player-container">
            <video className="video-player" controls>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="video-info-container">
            <div className="video-header">
              <h2 className="video-title">{video.title}</h2>
              <div className="video-stats">
                <p className="video-views">{video.views} views</p>
                <p className="video-date">{video.date}</p>
              </div>
            </div>
            <div className="video-actions">
              <button className="btn btn-light"><i className="bi bi-hand-thumbs-up"></i> Like</button>
              <button className="btn btn-light"><i className="bi bi-hand-thumbs-down"></i> Dislike</button>
              <button className="btn btn-light" onClick={handleShareClick}><i className="bi bi-share"></i> Share</button>
            </div>
            <div className="video-description">
              <p>{video.description}</p>
            </div>
          </div>
        </div>
        <CommentsSection videoId={video.id} />
      </div>
      <div className="suggested-videos-section">
        <h3>Up Next</h3>
        <ul className="suggested-videos-list">
          {suggestedVideos.map(suggestedVideo => (
            <li key={suggestedVideo.id} className="suggested-video-item">
              <Link to={`/video/${suggestedVideo.id}`} className="suggested-video-link">
                <img src={suggestedVideo.pic} alt={suggestedVideo.title} className="suggested-video-thumbnail" onError={(e) => { e.target.src = '/path/to/default/image.jpg'; }} />
                <div className="suggested-video-info">
                  <h4 className="suggested-video-title">{suggestedVideo.title}</h4>
                  <p className="suggested-video-author">{suggestedVideo.author}</p>
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
