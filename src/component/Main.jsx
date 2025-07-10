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
      console.log(data);

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
      <h1 className="p-4 ">Tech Video Explorer</h1>
      <div
        className={
          selectedVideo ? ` grid grid-cols-2 gap-4` : `grid grid-cols-1`
        }
      >
        <div
          className={
            selectedVideo
              ? `grid grid-cols-2 gap-4`
              : "grid grid-cols-3 gap-6 sm:grid-cols-1 md:grid-cols-3 "
          }
        >
          {videos.map((video, index) => {
            let statistics = video.items.statistics;
            let snippet = video.items.snippet;
            return (
              <div
                key={index}
                className=" border border-gray-300 shadow-md p-2 rounded-lg bg-white"
              >
                <h3 className="text-left p-2 text-sm font-semibold">
                  {snippet.title}
                </h3>
                <img
                  className=" w-full"
                  src={snippet.thumbnails.medium.url}
                  alt=""
                  onClick={() => {
                    playVideo(video);
                  }}
                />
                <div className="flex gap-2">
                  <span>Comment:{statistics.commentCount}</span>
                  <span>Count{statistics.likeCount}</span>
                  <span>View:{statistics.viewCount}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {selectedVideo && (
            <div className="p-4">
              <h3>{selectedVideo.items.snippet.title}</h3>
              <iframe
                className="w-full"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo.items.id}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              <p className="text-semibold p-2">
                {selectedVideo.items.snippet.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
