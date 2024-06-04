// src/videoDetails/VideoDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import videos from '../videoItem/Videos';
import './VideoDetails.css';

const VideoDetails = () => {
  const { id } = useParams();
  const video = videos.find(v => v.id === parseInt(id));

  if (!video) {
    return <div className="video-not-found">Video not found</div>;
  }

  const suggestedVideos = videos.filter(v => v.id !== parseInt(id)).slice(0, 10);

  return (
    <div className="video-details-container">
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
            <button className="btn btn-light"><i className="bi bi-share"></i> Share</button>
            <button className="btn btn-light"><i className="bi bi-save"></i> Save</button>
          </div>
          <div className="video-description">
            <p>{video.description}</p>
          </div>
        </div>
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
    </div>
  );
};

export default VideoDetails;
