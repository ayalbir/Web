import React, { useState } from 'react';
import './CommentsSection.css';

const CommentsSection = ({ videoId, comments, addComment, deleteComment, editComment }) => {
  const [newComment, setNewComment] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    addComment(videoId, { user: 'User', text: newComment });
    setNewComment('');
  };

  const handleDeleteComment = (index) => {
    deleteComment(videoId, index);
  };

  const handleEditComment = (index) => {
    setEditingIndex(index);
    setEditedComment(comments[videoId][index].text);
  };

  const handleSaveEdit = (index) => {
    editComment(videoId, index, editedComment);
    setEditingIndex(null);
    setEditedComment('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedComment('');
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
        {(comments[videoId] || []).map((comment, index) => (
          <div className="comment" key={index}>
            <div className="comment-header">
              <div className="comment-user">{comment.user}</div>
              <div className="comment-actions">
                <button onClick={() => handleEditComment(index)}><i className="bi bi-pencil icon"></i> Edit</button>
                <button onClick={() => handleDeleteComment(index)}><i className="bi bi-trash icon"></i> Delete</button>
              </div>
            </div>
            <div className="comment-body">
              {editingIndex === index ? (
                <div className="edit-comment-form">
                  <textarea
                    className="form-control"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                  <button className="save-button" onClick={() => handleSaveEdit(index)}>Save</button>
                  <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div className="comment-text">{comment.text}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
