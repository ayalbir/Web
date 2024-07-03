import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './CommentsSection.css';

const CommentsSection = ({ videoId, comments, addComment, deleteComment, editComment, user }) => {
  const [newComment, setNewComment] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const navigate = useNavigate();

  const handleAddComment = () => {
    if (!user || !user.signedIn) {
      navigate("/signin");
      return;
    }

    if (newComment.trim() === '') return;

    addComment({ 
      videoId: videoId,
      email: user.email, 
      text: newComment, 
      profilePicture: user.profileImage, 
      createdAt: new Date().toISOString()
    });
    setNewComment('');
  };

  const handleDeleteComment = (index, commentId) => {
    deleteComment(videoId, commentId);
  };

  const handleEditComment = (index, commentId) => {
    setEditingIndex(index);
    setEditedComment(comments[videoId][index].text);
  };

  const handleSaveEdit = (index, commentId) => {
    editComment(videoId, commentId, editedComment);
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
              <img src={comment.profilePicture} alt="Profile" className="profile-picture" />
              <div className="comment-user">{comment.email}</div>
              <div className="comment-actions">
              <button onClick={() => handleEditComment(index, comment._id)}><i className="bi bi-pencil icon"></i> Edit</button>
              <button onClick={() => handleDeleteComment(index,  comment._id)}><i className="bi bi-trash icon"></i> Delete</button>
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
                  <button className="save-button" onClick={() => handleSaveEdit(index, comment._id)}>Save</button>
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