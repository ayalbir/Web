import React from 'react';
import VideoItem from '../videoItem/VideoItem';

const VideoListResults = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return <div>No videos available</div>;
  }

  return (
    <div className="row">
      {videos.map(video => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoListResults;
