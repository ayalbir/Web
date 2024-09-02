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
    const comment = comments[videoId][index];
    if (user && comment.email === user.email) {  // Check if the logged-in user is the comment owner
      deleteComment(videoId, commentId);
    } else {
      alert("You can only delete your own comments.");
    }
  }

  const handleEditComment = (index, commentId) => {
    const comment = comments[videoId][index];
    if (user && comment.email === user.email) {  // Check if the logged-in user is the comment owner
      setEditingIndex(index);
      setEditedComment(comment.text);
    } else {
      alert("You can only edit your own comments.");
    }
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

              {user && comment.email === user.email && ( // Only show if user is the owner
                <div className="comment-actions">
                  <button onClick={() => handleEditComment(index, comment._id)}>
                    <i className="bi bi-pencil icon"></i> Edit
                  </button>
                  <button onClick={() => handleDeleteComment(index, comment._id)}>
                    <i className="bi bi-trash icon"></i> Delete
                  </button>
                </div>
              )}

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