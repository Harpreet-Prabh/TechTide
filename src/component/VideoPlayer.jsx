import React from "react";

function VideoPlayer() {
  return (
    <div className="video-player-overlay">
      <div className="player-box">
        <button className="close-btn">✖</button>
        <video controls>
          <source src="your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h2>Mountain Waterfall</h2>
      </div>
    </div>
  );
}

export default VideoPlayer;
