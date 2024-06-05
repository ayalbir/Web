// src/VideoMain/CommentsSection.js
import React, { useState, useEffect } from 'react';
import './CommentsSection.css';

const CommentsSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments-${videoId}`)) || [];
    setComments(savedComments);
  }, [videoId]);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const updatedComments = [...comments, { user: 'User', text: newComment }];
    setComments(updatedComments);
    setNewComment('');
    localStorage.setItem(`comments-${videoId}`, JSON.stringify(updatedComments));
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <div className="comment-form">
        <textarea
          className="form-control"
          placeholder="Add a public comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-button" onClick={handleAddComment}>Comment</button>
      </div>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div className="comment" key={index}>
            <div className="comment-user">{comment.user}</div>
            <div className="comment-text">{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
