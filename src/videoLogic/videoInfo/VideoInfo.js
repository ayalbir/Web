// src/videoDetails/VideoInfo.js
import React from 'react';
import './VideoInfo.css';

const VideoInfo = ({ video, onShareClick }) => (
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
      <button className="btn btn-light" onClick={onShareClick}><i className="bi bi-share"></i> Share</button>
    </div>
    <div className="video-description">
      <p>{video.description}</p>
    </div>
  </div>
);

export default VideoInfo;
