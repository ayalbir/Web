import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './VideoItem.css';

function VideoItem({ video, getUserByEmail, isTopVideo }) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (video && getUserByEmail) {
      const user = getUserByEmail(video.author);
      setUserDetails(user);
    }
  }, [video, getUserByEmail]);

  if (!video) {
    return null;
  }

  return (
    <div className={`video-item ${isTopVideo ? 'top-video-item' : 'regular-video-item'}`}>
      <div className={`card video-card ${isTopVideo ? 'top-video-card' : 'regular-video-card'}`}>
        <Link to={`/video/${video.id}`}>
          <img src={video.pic} className="card-img-top" alt={video.title} />
        </Link>
        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/video/${video.id}`} className="video-title-link">
              {video.title}
            </Link>
          </h5>
          <div className="author-details">
            {userDetails && userDetails.profileImage && (
              <img
                src={userDetails.profileImage}
                alt={video.author}
                className="author-profile-image"
              />
            )}
            <Link
              to={`/user/${userDetails ? userDetails.firstName : video.author}`}
              className="author-link"
            >
              {userDetails ? userDetails.firstName : video.author}
            </Link>
          </div>
          <p className="card-text">
            {video.views} views • {video.date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
