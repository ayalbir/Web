import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/tokenService'; // Import your token service

const useVideos = (initialVideos) => {
    const [videoList, setVideoList] = useState(initialVideos);
    const [comments, setComments] = useState({});
    const [userInteractions, setUserInteractions] = useState({});
    const [likesDislikes, setLikesDislikes] = useState({});

    const token = getToken(); 

    const addVideo = async (newVideo, userEmail) => {
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
        try {
            await axios.delete(`http://127.0.0.1:8080/api/users/${userEmail}/videos/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setVideoList(prevList => prevList.filter(video => video.id !== id));
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    const editVideo = async (id, newTitle, newDescription, newUrl, userEmail) => {
        try {
            const updatedVideo = { title: newTitle, description: newDescription, url: newUrl };
            const res = await axios.patch(`http://127.0.0.1:8080/api/users/${userEmail}/videos/${id}`, updatedVideo, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setVideoList(prevList =>
                prevList.map(video =>
                    video.id === id ? { ...video, ...res.data } : video
                )
            );
        } catch (error) {
            console.error('Error editing video:', error);
        }
    };

    const addComment = (videoId, comment) => {
        setComments(prevComments => ({
            ...prevComments,
            [videoId]: [...(prevComments[videoId] || []), comment],
        }));
    };

    const deleteComment = (videoId, index) => {
        setComments(prevComments => ({
            ...prevComments,
            [videoId]: prevComments[videoId].filter((_, i) => i !== index),
        }));
    };

    const editComment = (videoId, index, newText) => {
        setComments(prevComments => ({
            ...prevComments,
            [videoId]: prevComments[videoId].map((comment, i) =>
                i === index ? { ...comment, text: newText } : comment
            ),
        }));
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
                video.id === id ? { ...video, views: video.views + 1 } : video
            )
        );
    };

    return {
        videoList,
        addVideo,
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
