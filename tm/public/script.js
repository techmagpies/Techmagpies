let room;
let isMicOn = true;
let isCamOn = true;

async function joinRoom() {
  try {
    const username = document.getElementById("username").value;
    const roomName = document.getElementById("room").value;

    if (!username || !roomName) {
      alert("Enter name and room");
      return;
    }

    console.log("Joining room...", username, roomName);

    // ✅ fetch token
    const res = await fetch(
      `http://localhost:3000/getToken?room=${roomName}&username=${username}`
    );

    const data = await res.json();
    console.log("Token response:", data);

    if (!data.token) {
      alert("Token not received!");
      return;
    }

    // ✅ create room
    room = new LivekitClient.Room();

    // ✅ connect
    await room.connect(
      "wss://skillsphere-azlzmg0j.livekit.cloud",
      data.token
    );

    console.log("Connected to LiveKit!");

    document.getElementById("controls").style.display = "block";

    // ✅ enable camera & mic
    await room.localParticipant.enableCameraAndMicrophone();

    // ✅ show LOCAL video
    room.localParticipant.videoTrackPublications.forEach((publication) => {
      if (publication.track) {
        const el = publication.track.attach();
        document.getElementById("videoContainer").appendChild(el);
      }
    });

    // ✅ show REMOTE users
    room.on("trackSubscribed", (track, publication, participant) => {
      console.log("New participant joined:", participant.identity);

      const el = track.attach();
      document.getElementById("videoContainer").appendChild(el);
    });

    // ✅ debug connection
    room.on("participantConnected", (p) => {
      console.log("Participant connected:", p.identity);
    });

  } catch (err) {
    console.error("ERROR JOINING:", err);
    alert("Something failed — check console (F12)");
  }
}

// 🎤 mic toggle
function toggleMic() {
  if (!room) return;

  isMicOn = !isMicOn;
  room.localParticipant.setMicrophoneEnabled(isMicOn);
}

// 📹 cam toggle
function toggleCam() {
  if (!room) return;

  isCamOn = !isCamOn;
  room.localParticipant.setCameraEnabled(isCamOn);
}