import React from "react";
import "./TechTide.css";

function Main() {
  return (
    <div className="container">
      <h1>Tech Video Explorer</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search for videos..." />
        <button>Search</button>
      </div>

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
    </div>
  );
}

export default Main;
