const express = require("express");
const fs = require("fs");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const JSON_FILE_PATH = "./data/videos.json";

router.use(express.json());

function getVideos() {
  // Reading the video json file for data
  const videosJson = fs.readFileSync(JSON_FILE_PATH);
  return JSON.parse(videosJson);
}

function setVideos(videos) {
  const videosJson = JSON.stringify(videos);
  // Writing to video json file with new data
  fs.writeFileSync(JSON_FILE_PATH, videosJson);
}

router.route("/").get((_req, res) => {
  const allVideos = getVideos();
  // Creating new video obj with limited info to be sent to the client
  const videos = allVideos.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  res.status(200).json(videos);
});

router.route("/:videoId").get((req, res) => {
  // Fetching video id from request body
  const videoId = req.params.videoId;
  const videos = getVideos();
  const foundVideo = videos.find((video) => video.id === videoId);
  if (!foundVideo) {
    // Return 404 in case of invalid video id
    return res.status(404).json({ error: "No video with that id exists" });
  }
  res.status(200).json(foundVideo);
});

router.route("/upload").post((req, res) => {
  // Fetching title,description and image  from request body
  const { title, description, image } = req.body;
  if (!image || !title || !description) {
    // Return 400 in case of missing info
    return res.status(400).json({ error: "You're missing required fields!" });
  }
  const newVideo = {
    id: uuidv4(), // Generating unique id
    image,
    title,
    description,
  };
  const videos = getVideos();
  videos.push(newVideo);
  setVideos(videos);
  res.status(201).json(newVideo);
});

module.exports = router;
