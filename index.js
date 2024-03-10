const express = require('express');
const cors = require('cors');
const videoRoutes = require('./routes/videos');
const app = express();

const PORT = process.env.PORT || 5001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
// Enable JSON parsing for reading POST/PUT requests
app.use(express.json());
// Enable CORS so API can be used on client-side
app.use(cors({ origin: CORS_ORIGIN }));
// Allows GET requests to get static assets in /public folder
app.use(express.static("public"));

// log the request to the console.
// Practical application would be to write the log to a file or logging server (like New Relic / AWS)
app.use((req, _res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);

    next();
})

// Enable routes with paths starting with /contestants
app.use("/videos", videoRoutes);

app.listen(PORT, function() {
    console.log(PORT)
    console.log("Server is now listening at " + CORS_ORIGIN);
});