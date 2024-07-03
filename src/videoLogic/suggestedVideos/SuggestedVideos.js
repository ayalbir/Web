import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SuggestedVideos.css';

function SuggestedVideos({ videos, getUserByEmail }) {
  const navigate = useNavigate();

  const handleAuthorClick = (emailEmail) => {
    const user = getUserByEmail(emailEmail);
    if (user) {
      navigate(`/user/${user.firstName}`);
    }
  };

  return (
    <div className="suggested-videos-section">
      <h3>Up Next</h3>
      <ul className="suggested-videos-list">
        {videos.map(video => (
          <li key={video.id} className="suggested-video-item">
            <Link to={`/video/${video.id}`} className="suggested-video-link">
              <img src={video.pic} alt={video.title} className="suggested-video-thumbnail" onError={(e) => { e.target.src = '/path/to/default/image.jpg'; }} />
              <div className="suggested-video-info">
                <h4 className="suggested-video-title">{video.title}</h4>
                <div className="email-details">
                  {getUserByEmail && video.email && (
                    <span className="email-link" onClick={() => handleAuthorClick(video.email)} style={{ cursor: 'pointer' }}>
                      <img src={getUserByEmail(video.email)?.profileImage} alt={video.email} className="email-profile-image" />
                      {getUserByEmail(video.email)?.firstName || video.email || 'Unknown'}
                    </span>
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
}

export default SuggestedVideos;
