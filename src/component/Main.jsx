import React from "react";
import "./TechTide.css";
import { useState, useEffect } from "react";

function Main() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  async function videosLoad() {
    try {
      let url = `https://api.freeapi.app/api/v1/public/youtube/videos`;
      let response = await fetch(url);
      let data = await response.json();
      let videos = data.data.data;
      console.log(videos);
      setVideos(videos);
    } catch (error) {}
  }

  useEffect(() => {
    videosLoad();
  }, []);

  function playVideo(video) {
    setSelectedVideo(video);
  }

  return (
    <div className="container">
      <h1>Tech Video Explorer</h1>
      {selectedVideo && (
        <div>
          <h1>{selectedVideo.items.snippet.title}</h1>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedVideo.items.id}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <p>{selectedVideo.items.snippet.description}</p>
        </div>
      )}
      {videos.map((video, index) => {
        let snippet = video.items.snippet;
        return (
          <div key={index}>
            <h3>{snippet.title}</h3>
            <img
              src={snippet.thumbnails.medium.url}
              alt=""
              onClick={() => {
                playVideo(video);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Main;
