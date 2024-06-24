import React from 'react';
import { Link } from 'react-router-dom';
import './SuggestedVideos.css';

const SuggestedVideos = ({ videos, getUserByEmail }) => (
  <div className="suggested-videos-section">
    <h3>Up Next</h3>
    <ul className="suggested-videos-list">
      {videos.map(video => (
        <li key={video.id} className="suggested-video-item">
          <Link to={`/video/${video.id}`} className="suggested-video-link">
            <img src={video.pic} alt={video.title} className="suggested-video-thumbnail" onError={(e) => { e.target.src = '/path/to/default/image.jpg'; }} />
            <div className="suggested-video-info">
              <h4 className="suggested-video-title">{video.title}</h4>
              <div className="author-details">
                {getUserByEmail && video.author && (
                  <Link to={`/user/${getUserByEmail(video.author)?.firstName}`} className="author-link">
                    <img src={getUserByEmail(video.author)?.profileImage} alt={video.author} className="author-profile-image" />
                    {getUserByEmail(video.author)?.firstName || video.author || 'Unknown'}
                  </Link>
                )}
              </div>
              <p className="suggested-video-views">{video.views} views</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default SuggestedVideos;
