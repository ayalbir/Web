// src/videoItem/VideoItem.js 
import './VideoItem.css'; 
import { Link } from 'react-router-dom'; 
import { useEffect, useState } from 'react'; 
 
function VideoItem({ video, getUserByEmail }) { 
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
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4"> 
      <div className="card video-card">
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
              <img src={userDetails.profileImage} alt={video.author} className="author-profile-image" /> 
            )} 
            <Link to={`/user/${userDetails ? userDetails.firstName : video.author}`} className="author-link">
              {userDetails ? userDetails.firstName : video.author}
            </Link>
          </div> 
          <p className="card-text">{video.views} views • {video.date}</p> 
        </div> 
      </div> 
    </div> 
  ); 
} 
 
export default VideoItem;
