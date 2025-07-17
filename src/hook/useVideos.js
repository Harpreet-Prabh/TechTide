import { useState, useEffect } from "react";
export default function useVideos() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("mostLiked");
  const [pageLimit, setPageLimit] = useState();
  const [nextPage, setNextPage] = useState(false);

  async function videosLoad(input, sortByValue, pageLimit, currentPage) {
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
        if (input || sortByValue) {
          url += `&limit=${pageLimit}`;
        } else {
          url += `?limit=${pageLimit}`;
        }
      }

      if (currentPage) {
        if (input || sortByValue || pageLimit) {
          url += `&page=${currentPage}`;
        } else {
          url += `?page=${currentPage}`;
        }
      }

      let response = await fetch(url);
      let data = await response.json();

      let videos = data.data.data;
      setNextPage(data.data.nextPage);
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
    setSortBy(e.target.value);
    videosLoad(searchInput, sortBy);
  }

  function handlePageLimit(e) {
    setPageLimit(e.target.value);
    videosLoad(searchInput, sortBy, pageLimit);
  }

  function handlePreviousButton() {
    if (currentPage == 1) {
      return false;
    }
    setCurrentPage(currentPage - 1);
    console.log(currentPage, "this is the previous page");
  }

  function handleNextButton() {
    setCurrentPage(currentPage + 1);
    console.log(currentPage, "this is next page click");
  }

  useEffect(() => {
    videosLoad(searchInput, sortBy, pageLimit, currentPage);
  }, [currentPage]);

  return {
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
  };
}
