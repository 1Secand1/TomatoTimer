import { TomatoTimer } from "./scripts/tomatoTimer.js";

let tomatoTimer = new TomatoTimer("taimer");


const controls = document.getElementById("controls");

function switchToSetupMode() {
  const settings = document.getElementById("settings");
  const taimer = document.getElementById("taimer-box");

  function setDisplay() {
    return settings.style.display !== "none" ? "none" : "grid";;
  }

  settings.style.display = setDisplay();
  taimer.style.display = setDisplay();

} switchToSetupMode();

const closeSettings = document.getElementById("closeSettings");
closeSettings.addEventListener("click", () => {
  switchToSetupMode();
});

controls.onclick = ({ target }) => {
  if (!(target instanceof HTMLButtonElement)) return;

  const click = target.dataset.action;
  const events = {
    startTimer: () => tomatoTimer.startTomatoTimer(),
    stopTimer: () => tomatoTimer.stopTimer(),
    resetTimer: () => tomatoTimer.resetTomatoTimer(),
    skipIteration: () => tomatoTimer.skipIteration(),
    settings: () => switchToSetupMode(),
  };

  events[click]();
};