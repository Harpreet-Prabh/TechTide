import React from "react";

function VideoCard() {
  return (
    <div className="video-grid">
      <div className="video-card">
        <img src="https://via.placeholder.com/300x180" alt="Video 1" />
        <p>Mountain Waterfall</p>
      </div>
      <div className="video-card">
        <img src="https://via.placeholder.com/300x180" alt="Video 2" />
        <p>Ocean Tech Review</p>
      </div>
      <div className="video-card">
        <img src="https://via.placeholder.com/300x180" alt="Video 3" />
        <p>Gadget Talk</p>
      </div>
      <div className="video-card">
        <img src="https://via.placeholder.com/300x180" alt="Video 4" />
        <p>Future of AI</p>
      </div>
    </div>
  );
}

export default VideoCard;
