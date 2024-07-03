import { useState } from 'react';

const useVideos = (initialVideos) => {
    const [videoList, setVideoList] = useState(initialVideos);
    const [comments, setComments] = useState({});
    const [userInteractions, setUserInteractions] = useState({});
    const [likesDislikes, setLikesDislikes] = useState({});

    const addVideo = (newVideo) => {
        setVideoList(prevList => [...prevList, newVideo]);
    };

    const deleteVideo = (id) => {
        setVideoList(prevList => prevList.filter(video => video.id !== id));
    };

    const editVideo = (id, newTitle, newDescription, newUrl) => {
        setVideoList(prevList =>
            prevList.map(video =>
                video.id === id ? { ...video, title: newTitle, description: newDescription, url: newUrl } : video
            )
        );
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
