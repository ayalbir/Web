import React from 'react';
import VideoItem from '../../videoLogic/videoItem/VideoItem';
// import './TopVideos.css';

const TopVideos = ({ videos, getUserByEmail }) => {
  const topVideos = [...videos]
    .sort((a, b) => b.views - a.views)
    .slice(0, 20);

  return (
    <div className="top-videos">
      <h2>Top 20 Most Viewed Videos</h2>
      <div className="video-list">
        {topVideos.map(video => (
          <VideoItem key={(video.id || video._id)} video={video} getUserByEmail={getUserByEmail} isTopVideo={true} />
        ))}
      </div>
    </div>
  );
};

export default TopVideos;
