const { DateTime } = luxon;

const isoClock = document.querySelector("#iso-clock");
const niceClock = document.querySelector("#nice-clock");
const niceClockCen = document.querySelector("#nice-clock-cen");
const jsClock = document.querySelector("#js-clock");
const ntpClock = document.querySelector("#ntp-clock");

// 2,208,988,800
const epochDiffSeconds = 2208988800;

function onFrame() {
  let now = DateTime.now();
  // TODO: all should be in UTC
  isoClock.textContent = now.toUTC().toISO();
  niceClock.textContent = now.toLocaleString(DateTime.TIME_24_WITH_LONG_OFFSET);
  niceClockCen.textContent = now.setZone('America/Chicago').toLocaleString(DateTime.TIME_24_WITH_LONG_OFFSET);
  jsClock.textContent = now.toMillis();
  ntpClock.textContent =
    epochDiffSeconds * 1000000 + now.toMillis() * 1000000;
}

// Define variables
let lastTimestamp = 0;
const fps = 60; // Frames per second
const frameInterval = 1000 / fps;

// Define your rendering function
function render(timestamp) {
  // Calculate the time elapsed since the last frame
  const deltaTime = timestamp - lastTimestamp;

  // Check if it's time to render a frame
  if (deltaTime >= frameInterval) {
    // Your rendering logic goes here
    onFrame();

    // Update the timestamp of the last frame
    lastTimestamp = timestamp;
  }

  // Request the next frame
  requestAnimationFrame(render);
}

// Start the rendering loop
requestAnimationFrame(render);
