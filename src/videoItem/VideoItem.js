function VideoItem({video}){
    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <a className="card" href="details.html">
                <img src></img>
                <div className="card-body">
                    <h5 className="card-title">{video.title}</h5>
                    <p className="card-text">{video.author}</p>
                    <p className="card-text">{video.views} views. {video.date}</p>
                    </div>
            </a>
        </div>
    );

}

export default VideoItem;