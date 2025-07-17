import { ThumbsUp, Eye, MessageSquareText } from "lucide-react";
import useVideos from "../hook/useVideos";

function YouTube() {
  const {
    playVideo,
    handleInput,
    handleNextButton,
    handlePageLimit,
    handlePreviousButton,
    handleSearchButton,
    handleSortBy,
    videos,
    selectedVideo,
    currentPage,
    nextPage,
  } = useVideos();

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Tech Video Explorer
      </h1>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center justify-center mb-6">
        <input
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Search for videos..."
          onChange={(e) => handleInput(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors w-full sm:w-auto"
          onClick={handleSearchButton}
        >
          Search
        </button>
        <select
          name="sortby"
          id="sortby"
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
          onChange={handleSortBy}
        >
          <option value="mostLiked">Most Liked</option>
          <option value="mostViewed">Most Viewed</option>
          <option value="oldest">Oldest</option>
          <option value="latest">Latest</option>
        </select>
      </div>
      <div
        className={selectedVideo ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""}
      >
        <div
          className={
            selectedVideo
              ? "grid grid-cols-2 gap-4"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          }
        >
          {videos.map((video, index) => {
            let statistics = video.items.statistics;
            let snippet = video.items.snippet;
            return (
              <div
                key={index}
                className="border border-gray-200 shadow-md p-2 rounded-lg bg-white flex flex-col h-full"
              >
                <h3 className="text-left p-2 text-base md:text-lg font-semibold line-clamp-2 min-h-[3rem]">
                  {snippet.title}
                </h3>
                <img
                  className="w-full aspect-video object-cover cursor-pointer rounded"
                  src={snippet.thumbnails.medium.url}
                  alt={snippet.title}
                  onClick={() => playVideo(video)}
                />
                <div className="flex gap-2 justify-between mt-2 text-xs md:text-sm">
                  <span className="flex items-center gap-1">
                    <MessageSquareText color="#0ce45f" />
                    {statistics.commentCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp />
                    {statistics.likeCount}
                  </span>
                  <span className="flex items-center gap-1">
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
            <div className="p-2 md:p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {selectedVideo.items.snippet.title}
              </h3>
              <iframe
                className="w-full aspect-video rounded"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo.items.id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <p className="font-medium p-2 text-sm md:text-base mt-2">
                {selectedVideo.items.snippet.description}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <p className="p-2 text-sm">Items per page</p>
          <select
            name="pageLimit"
            id="pageLimit"
            className="border border-gray-300 rounded px-2 py-1"
            onChange={handlePageLimit}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            onClick={handlePreviousButton}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="p-2 text-base font-semibold">{currentPage}</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            disabled={!nextPage}
            onClick={handleNextButton}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default YouTube;
