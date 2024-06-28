import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoListResults from '../videoLogic/videoListResults/VideoListResults';

const SearchResults = ({ videos, getUserByEmail }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(query.toLowerCase()) || 
    video.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <VideoListResults videos={filteredVideos} getUserByEmail={getUserByEmail} />
    </div>
  );
};

export default SearchResults;
