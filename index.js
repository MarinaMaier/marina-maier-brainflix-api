const express = require("express");
const cors = require("cors");
const videoRoutes = require("./routes/videos");
const app = express();
const PORT = process.env.PORT || 5001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.static("public"));
app.use((req, _res, next) => {
  next();
});
// Configuring video endpoints
app.use("/videos", videoRoutes);

app.listen(PORT, function () {
  console.log(`Server is now listening at ${PORT}`);
});
