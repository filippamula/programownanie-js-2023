const boomSound = document.querySelector("#boom");
const clapSound = document.querySelector("#clap");
const hihatSound = document.querySelector("#hihat");
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
const playSelectedBtn = document.querySelector("#playSelected");

const channels = [];

document.addEventListener("keydown", (event) => {
  play(soundMap[event.key]);
});

function play(sound) {
  sound.currentTime = 0;
  sound.play();

  channels.forEach((channel) => {
    if (channel.isRecording) {
      const currentTime = new Date().getTime();
      const previousSoundTime =
        channel.recordedSounds.length > 0
          ? channel.recordedSounds[channel.recordedSounds.length - 1].endTime
          : currentTime;

      const gap = currentTime - previousSoundTime;

      const recordedSound = {
        sound: sound,
        startTime: previousSoundTime,
        endTime: currentTime,
        gap: gap,
      };

      channel.recordedSounds.push(recordedSound);
    }
  });
}

addChannelBtn.addEventListener("click", () => {
  const channel = createChannel();
  channelContainer.appendChild(channel);
  channels.push(channel);
});

playSelectedBtn.addEventListener("click", () => {
  channels.forEach((channel) => {
    if (channel.isSelected) {
      playRecordedSounds(channel.recordedSounds);
    }
  });
});

function playRecordedSounds(recordedSounds) {
  recordedSounds.forEach((recordedSound) => {
    setTimeout(() => {
      recordedSound.sound.currentTime = 0;
      recordedSound.sound.play();
    }, recordedSound.gap);
  });
}

function createChannel() {
  let channel = document.createElement("div");
  channel.classList.add("channel");
  channel.isRecording = false;
  channel.isSelected = false;
  channel.recordedSounds = [];

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    channel.isSelected = checkbox.checked;
  });

  let recordBtn = document.createElement("button");
  recordBtn.classList.add("record");
  recordBtn.type = "button";
  recordBtn.textContent = "RECORD";

  recordBtn.addEventListener("click", () => {
    channel.isRecording = !channel.isRecording;
    recordBtn.textContent = channel.isRecording ? "STOP" : "RECORD";
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteChannel");
  deleteBtn.type = "button";
  deleteBtn.textContent = "DELETE";

  deleteBtn.addEventListener("click", () => {
    channelContainer.removeChild(channel);
  });

  channel.appendChild(checkbox);
  channel.appendChild(recordBtn);
  channel.appendChild(deleteBtn);
  return channel;
}
