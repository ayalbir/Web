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
            let email = localStorage.getItem('currentEmail');
            const response = await fetch(`http://127.0.0.1:8080/api/videos?email=${email}`, {
                method: 'GET',
            });            
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (response.status === 204) {
                console.log('No content in response');
                return; // Exit if there's no content
            }

            const data = await response.json();

            // Initialize likesDislikes with the fetched data
            const likesDislikesData = {};
            data.forEach(video => {
                likesDislikesData[video._id || video.id] = {
                    likes: video.likes,
                    dislikes: video.dislikes
                };
                // Add the prefix to the video URL
                video.url = `data:video/mp4;base64,${video.url}`;
                video.pic = `data:image/png;base64,${video.pic}`;
            });

            setVideoList(data);
            setLikesDislikes(likesDislikesData);
            await fetchCommentsForVideos(data);
        } catch (error) {
            console.error('Error fetching videos from DB:', error);
        }
    };

    const fetchCommentsForVideos = async (videos) => {
        try {
            const commentsData = {};
            for (const video of videos) {
                const response = await fetch(`http://127.0.0.1:8080/api/videos/${video._id || video.id}/comments`);
                if (response.ok) {
                    const data = await response.json();
                    commentsData[video._id || video.id] = data;
                }
            }
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchVideosFromDB();
        localStorage.removeItem('currentEmail');
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
            const updatedVideo = { title: newTitle, description: newDescription, url: newUrl, pic: newPic };
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
            const res = await axios.post(`http://127.0.0.1:8080/api/videos/${videoId}/comments`, {
                email: comment.email,
                text: comment.text,
                profilePicture: comment.profilePicture
            }, {
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
            const res = await axios.patch(`http://127.0.0.1:8080/api/comments/${commentId}`, { text: newText }, {
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

    const handleLike = async (videoId, email) => {
        try {
            const token = getToken();
            const response = await fetch(`http://127.0.0.1:8080/api/users/${email}/videos/${videoId}/likes`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedVideo = await response.json();

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
                    likes: updatedVideo.likes,
                    dislikes: updatedVideo.dislikes
                }
            }));
        } catch (error) {
            console.error('Error liking video:', error);
        }
    };

    const handleDislike = async (videoId, email) => {
        try {
            const token = getToken();
            const response = await fetch(`http://127.0.0.1:8080/api/users/${email}/videos/${videoId}/dislikes`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedVideo = await response.json();

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
                    likes: updatedVideo.likes,
                    dislikes: updatedVideo.dislikes
                }
            }));
        } catch (error) {
            console.error('Error disliking video:', error);
        }
    };

    const updateVideoViews = async (id, email) => {
        try {
            // Increment the view count locally
            setVideoList(prevList =>
                prevList.map(video =>
                    (video.id || video._id) === id ? { ...video, views: video.views + 1 } : video
                )
            );

            // Send the view update to the server with the email
            const response = await fetch(`http://127.0.0.1:8080/api/videos/${id}/views`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ views: 1, email: email })  // Include the email in the request body
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error updating video views:', error);
        }
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
