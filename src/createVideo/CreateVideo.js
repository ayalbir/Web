import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateVideo.css";

const CreateVideo = ({ setVideoList, user }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null); // State to store the video file
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.signedIn) {
      navigate("/signin");
    }
  }, [navigate, user.signedIn]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!image || !video) {
      alert("Please upload both an image and a video.");
      return;
    }
  
    const videoUrl = URL.createObjectURL(video); // Convert video file to URL
  
    const newVideo = {
      id: Date.now(),
      title,
      pic: URL.createObjectURL(image),
      url: URL.createObjectURL(video),
      author: user.name, // Assuming user's name is the author
      views: 0,
      date: new Date().toLocaleDateString(),
      description: "",
    };
    
  
    setVideoList((prevList) => [...prevList, newVideo]);
    navigate("/");
  };
  
  
  

  return (
    <form className="create-video-form" onSubmit={handleSubmit}>
      <h2>Create a Video</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </label>
      <label>
        Video:
        <input
          type="file"
          accept="video/*" 
          onChange={(e) => setVideo(e.target.files[0])}
          required
        />
      </label>
      <button type="submit">Create Video</button>
    </form>
  );
};

export default CreateVideo;
