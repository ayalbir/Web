import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './VideoItem.css';

function VideoItem({ video, getUserByEmail, isTopVideo }) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (video && getUserByEmail) {
      const user = getUserByEmail(video.email);
      setUserDetails(user);
    }
  }, [video, getUserByEmail]);

  if (!video) {
    return null;
  }

  return (
    <div className={`video-item ${isTopVideo ? 'top-video-item' : 'regular-video-item'}`}>
      <div className={`card video-card ${isTopVideo ? 'top-video-card' : 'regular-video-card'}`}>
        <Link to={`/video/${video._id}`}>
          <img src={video.pic} className="card-img-top" alt={video.title} />
        </Link>
        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/video/${video._id}`} className="video-title-link">
              {video.title}
            </Link>
          </h5>
          <div className="email-details">
            {userDetails && userDetails.profileImage && (
              <img
                src={userDetails.profileImage}
                alt={video.email}
                className="email-profile-image"
              />
            )}
            <Link
              to={`/user/${userDetails ? userDetails.email : video.email}`}
              className="email-link"
            >
              {userDetails ? userDetails.firstName : video.firstName}
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
