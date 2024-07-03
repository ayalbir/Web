import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/tokenService'; // Import your token service

const useVideos = (initialVideos) => {
    const [videoList, setVideoList] = useState(initialVideos);
    const [comments, setComments] = useState({});
    const [userInteractions, setUserInteractions] = useState({});
    const [likesDislikes, setLikesDislikes] = useState({});

    const fetchVideosFromDB = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/videos');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            if (response.status === 204) {
                console.log('No content in response');
                return; // Exit if there's no content
            }
    
            const data = await response.json();
            console.log('Data:', data);
            setVideoList(prevList => [...prevList, ...data]); // Initialize with the fetched data
        } catch (error) {
            console.error('Error fetching videos from DB:', error);
        }
    };
    
    useEffect(() => {
        fetchVideosFromDB();
    }, []);
    

    const token = getToken(); 

    const addVideo = async (newVideo, userEmail) => {
        const token = getToken(); 
        try {
            const res = await axios.post(`http://127.0.0.1:8080/api/users/${userEmail}/videos`, newVideo, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
            setVideoList(prevList => [...prevList, res.data]);
        } catch (error) {
            console.error('Error adding video:', error);
        }
    };
    
    const deleteVideo = async (id, userEmail) => {
        console.log('Deleting video:', id);
        try {
            const token = getToken(); 
            await axios.delete(`http://127.0.0.1:8080/api/users/${userEmail}/videos/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            setVideoList(prevList => prevList.filter(video => (video.id || video._id) !== id));
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };
    

    const editVideo = async (id, newTitle, newDescription, newUrl, newPic, userEmail) => {
        try {
            const updatedVideo = { title: newTitle, description: newDescription, url: newUrl , pic:newPic};
            const res = await axios.patch(`http://127.0.0.1:8080/api/users/${userEmail}/videos/${id}`, updatedVideo, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setVideoList(prevList =>
                prevList.map(video =>
                    (video.id || video._id) === id ? { ...video, ...res.data } : video
                )
            );
        } catch (error) {
            console.error('Error editing video:', error);
        }
    };

    const addComment = async (comment) => {
        const videoId = comment.videoId;
        try {
            const token = getToken();
            const res = await axios.post(`http://127.0.0.1:8080/api/videos/${comment.videoId}/comments`, comment.email, comment.text, comment.profilePicture, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments(prevComments => ({
                ...prevComments,
                [videoId]: [...(prevComments[videoId] || []), res.data],
            }));
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const deleteComment = async (videoId, commentId) => {
        try {
            const token = getToken();
            await axios.delete(`http://127.0.0.1:8080/api/videos/${videoId}/comments/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments(prevComments => ({
                ...prevComments,
                [videoId]: prevComments[videoId].filter(comment => comment._id !== commentId),
            }));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const editComment = async (videoId, commentId, newText) => {
        try {
            const token = getToken();
            const res = await axios.patch(`http://127.0.0.1:8080/api/videos/comments/${commentId}`, { text: newText }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments(prevComments => ({
                ...prevComments,
                [videoId]: prevComments[videoId].map(comment =>
                    comment._id === commentId ? { ...comment, text: res.data.text } : comment
                ),
            }));
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    const handleLike = (videoId) => {
        setUserInteractions(prev => {
            const newState = { ...prev[videoId], like: !prev[videoId]?.like };
            if (newState.like) {
                newState.dislike = false;
            }
            return { ...prev, [videoId]: newState };
        });

        setLikesDislikes(prev => ({
            ...prev,
            [videoId]: {
                likes: (prev[videoId]?.likes || 0) + (userInteractions[videoId]?.like ? -1 : 1),
                dislikes: userInteractions[videoId]?.dislike ? (prev[videoId]?.dislikes || 0) - 1 : (prev[videoId]?.dislikes || 0)
            }
        }));
    };

    const handleDislike = (videoId) => {
        setUserInteractions(prev => {
            const newState = { ...prev[videoId], dislike: !prev[videoId]?.dislike };
            if (newState.dislike) {
                newState.like = false;
            }
            return { ...prev, [videoId]: newState };
        });

        setLikesDislikes(prev => ({
            ...prev,
            [videoId]: {
                likes: userInteractions[videoId]?.like ? (prev[videoId]?.likes || 0) - 1 : (prev[videoId]?.likes || 0),
                dislikes: (prev[videoId]?.dislikes || 0) + (userInteractions[videoId]?.dislike ? -1 : 1)
            }
        }));
    };

    const updateVideoViews = (id) => {
        setVideoList(prevList =>
            prevList.map(video =>
                (video.id || video._id) === id ? { ...video, views: video.views + 1 } : video
            )
        );
    };

    return {
        videoList,
        addVideo,
        setVideoList,
        deleteVideo,
        editVideo,
        comments,
        addComment,
        deleteComment,
        editComment,
        userInteractions,
        handleLike,
        handleDislike,
        likesDislikes,
        updateVideoViews
    };
};

export default useVideos;
