import React from 'react';
import VideoItem from '../videoItem/VideoItem';

const VideoListResults = ({ videos, getUserByEmail}) => {
  if (!videos || videos.length === 0) {
    return <div>No videos available</div>;
  }

  return (
    <div className="row">
      {videos.map(video => (
        <VideoItem key={video.id} video={video} getUserByEmail={getUserByEmail}/>
      ))}
    </div>
  );
};

export default VideoListResults;
