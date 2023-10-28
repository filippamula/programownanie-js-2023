const boomSound = document.querySelector("#boom");
const clapSound = document.querySelector("#clap");
const hihatSound = document.querySelector("#hiha");
const kickSound = document.querySelector("#kick");
const openhatSound = document.querySelector("#openhat");
const rideSound = document.querySelector("#ride");
const snareSound = document.querySelector("#snare");
const tinkSound = document.querySelector("#tink");
const tomSound = document.querySelector("#tom");
const soundMap = {
  q: clapSound,
  w: hihatSound,
  e: kickSound,
  r: openhatSound,
  " ": boomSound,
  u: rideSound,
  i: snareSound,
  o: tinkSound,
  p: tomSound,
};

const channelContainer = document.querySelector(".channels-container");
const addChannelBtn = document.querySelector("#addChannel");

document.addEventListener("keydown", (event) => {
  play(soundMap[event.key]);
});

function play(sound) {
  sound.currentTime = 0;
  sound.play();
}

addChannelBtn.addEventListener("click", () => {
  channelContainer.appendChild(createChannel());
});

function createChannel() {
  let channel = document.createElement("div");
  channel.classList.add("channel");

  let recordBtn = document.createElement("button");
  recordBtn.classList.add("record");
  recordBtn.type = "button";
  recordBtn.textContent = "RECORD";

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delteChannel");
  deleteBtn.type = "button";
  deleteBtn.textContent = "DELETE";

  deleteBtn.addEventListener("click", () => {
    channelContainer.removeChild(channel);
  });

  channel.appendChild(recordBtn);
  channel.appendChild(deleteBtn);
  return channel;
}
