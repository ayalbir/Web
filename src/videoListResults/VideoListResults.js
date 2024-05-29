import VideoItem from "../videoItem/VideoItem";


function VideoListResults({ videos }) {
  const videoList = videos.map((video, key) => {
    return <VideoItem {...video} key={key} />
  });

  return (
    <div className="row gx-3">
      {videoList}
    </div>
  );
}

export default VideoListResults;