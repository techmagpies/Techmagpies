function getParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    userName: urlParams.get("name"),
    roomID: urlParams.get("room") || "skillsphere-class"
  };
}

window.onload = function () {
  const { userName, roomID } = getParams();

  if (!userName) {
    alert("No username found");
    return;
  }

  const appID = 273983063;

  // ✅ IMPORTANT: use THIS serverSecret (latest one from dashboard)
  const serverSecret = "aa6cbe4b656d34923a643c966ac03a5b";

  const userID = Date.now().toString();

  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    userID,
    userName
  );

  const zp = ZegoUIKitPrebuilt.create(kitToken);

  zp.joinRoom({
    container: document.querySelector("#root"),
    scenario: {
      mode: ZegoUIKitPrebuilt.VideoConference,
    },
  });
};