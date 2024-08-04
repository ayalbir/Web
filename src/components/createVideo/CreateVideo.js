import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateVideo.css";

const CreateVideo = ({ addVideo, user }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.signedIn) {
      navigate("/signin");
    }
  }, [navigate, user]);

  const handleFileRead = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!image || !video) {
      alert("Please upload both an image and a video.");
      return;
    }
  
    const encodeFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
              const result = reader.result;
              // Remove the first 21 characters of the base64 string
              const encodedString = result.substring(21);
              resolve(encodedString);
          };
          reader.onerror = (error) => reject(error);
      });
  };
  
  
    try {
      const imageBase64 = await encodeFileToBase64(image);
      const videoBase64 = await encodeFileToBase64(video);
  
      const newVideo = {
        title,
        pic: imageBase64,
        url: videoBase64,
        email: user ? user.email : "Anonymous",
        views: 0,
        createdAt: new Date().toISOString(),
        description: "",
        uploaderName: user ? user.firstName : "Anonymous",
        profileImage: user ? user.profileImage : null,
        likes: 0,
        likedBy: [],
        dislikes: 0,
        dislikedBy: [],
        comments: [],
      };
  
      addVideo(newVideo, user.email);
      navigate("/");
    } catch (error) {
      console.error("Error encoding files:", error);
    }
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
