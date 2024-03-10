const express = require('express');
const fs = require('fs');
const router = express.Router();

router.use(express.json());

const JSON_FILE_PATH =  "./data/videos.json";

function getVideos() {
    const videosJson = fs.readFileSync(JSON_FILE_PATH);
    return JSON.parse(videosJson);
}

function setVideos(videos) {
    const videosJson = JSON.stringify(videos);
    fs.writeFileSync(JSON_FILE_PATH, videosJson);
}

router.route("/")
    .get((_req, res) => { 
        const videos = getVideos();
        res.status(200).json(videos);
    });

router.route("/:videoId")
    .get((req, res) => { 
        const videoId = req.params.videoId;
        const videos = getVideos();
        const foundVideo = videos.find((video) => video.id === videoId);

        if (!foundVideo) {
            return res.status(404).json({ error: "Video not found" });
        }

        res.status(200).json(foundVideo);
    })

router.route("/upload")
    .post((req, res) => {
        const {
            image,
            title,
            description
        } = req.body;

        if (!image || !title || !description) {
            return res.status(400).json({error: "You're missing required fields!"});
        }
        const newVideo = {
            id: uuid.v4(),
            image: "../public/images/Upload-video-preview.jpg",
            title,
            description
        }

        const videos = getVideos();
        videos.push(newVideo);
        setVideos(videos);

        res.status(201).json(newVideo);
    });

module.exports = router;