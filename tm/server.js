const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { AccessToken } = require("livekit-server-sdk");

const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/getToken", (req, res) => {
  const { room, username } = req.query;

  if (!room || !username) {
    return res.status(400).json({ error: "Missing room or username" });
  }

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: username,
    }
  );

  at.addGrant({
    roomJoin: true,
    room: room,
    canPublish: true,
    canSubscribe: true,
  });

  const token = at.toJwt();

  res.json({ token });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});