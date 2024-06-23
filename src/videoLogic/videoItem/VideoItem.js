// src/videoItem/VideoItem.js
import './VideoItem.css';
import { Link } from 'react-router-dom';

function VideoItem({ video }) {
  if (!video) {
    return null;
  }

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <Link to={`/video/${video.id}`} className="card video-card">
        <img src={video.pic} className="card-img-top" alt={video.title} /> {/* Ensure pic property exists */}
        <div className="card-body">
          <h5 className="card-title">{video.title}</h5>
          <div className="author-details">
            <Link to={`/user/${video.author}`} className="author-link">
              <img src={video.profileImage} alt={video.author} className="author-profile-image" />
              {video.author}
            </Link>
          </div>
          <p className="card-text">{video.views} views • {video.date}</p>
        </div>
      </Link>
    </div>
  );
}

export default VideoItem;
