import "./TechTide.css";
import { useState, useEffect } from "react";
import { ThumbsUp, Eye, MessageSquareText } from "lucide-react";

function Main() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  async function videosLoad(input, sortByValue, pageLimit) {
    try {
      let url = `https://api.freeapi.app/api/v1/public/youtube/videos`;
      if (input) {
        url += `?query=${input}`;
      }
      if (sortByValue) {
        if (input) {
          url += `&sortBy=${sortByValue}`;
        } else {
          url += `?sortBy=${sortByValue}`;
        }
      }

      if (pageLimit) {
        
      }

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

  function handleInput(input) {
    setSearchInput(input);
  }

  function handleSearchButton() {
    videosLoad(searchInput);
  }

  function handleSortBy(e) {
    videosLoad(searchInput, e.target.value);
  }

  function handlePageLimit(e) {
    videosLoad(searchInput, "latest", e.target.value);
  }
  return (
    <div className="container">
      <h1 className="p-4 ">Tech Video Explorer</h1>
      <div>
        <input
          className="border "
          type="text"
          onChange={(e) => {
            {
              handleInput(e.target.value);
            }
          }}
        />
        <button onClick={handleSearchButton}>Search</button>

        <select name="sortby" id="sortby" onChange={handleSortBy}>
          <option value="mostLiked">Most Liked</option>
          <option value="mostViewed">Most Viewed</option>
          <option value="oldest">Oldest</option>
          <option value="latest">Latest</option>
        </select>
      </div>
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
                  className=" w-full cursor-pointer"
                  src={snippet.thumbnails.medium.url}
                  alt=""
                  onClick={() => {
                    playVideo(video);
                  }}
                />
                <div className="flex gap-2 justify-between">
                  <span className="flex p-2 gap-1 ">
                    <MessageSquareText color="#0ce45f" />
                    {statistics.commentCount}
                  </span>
                  <span className="flex p-2 gap-1 ">
                    <ThumbsUp />
                    {statistics.likeCount}
                  </span>
                  <span className="flex p-2 gap-1 ">
                    <Eye color="#f2d750" />
                    {statistics.viewCount}
                  </span>
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
      <div className="flex x gap-2 p-4">
        <div className="flex gap-2">
          <p className="p-3">Items per page</p>
          <select name="pageLimit" id="pageLimit" onChange={handlePageLimit}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button>Previous</button>
          <p className="p-3">page number</p>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Main;
