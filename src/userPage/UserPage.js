import React, { useEffect, useState } from 'react';

//this will currently be unlivable, because we are waiting for the server to be up and running
// in the meantime, we can use the mock data to test the functionality of the page
// in this page, will be the user's videos, if using get, and added videos, if using post

const UserPage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Fetch user's videos from the server
        fetch('/api/videos')
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>User Page</h1>
            <ul>
                {videos.map(video => (
                    <li key={video.id}>{video.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserPage;