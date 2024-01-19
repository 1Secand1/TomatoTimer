import { TomatoTimer } from "./scripts/tomatoTimer.js";
import { CustomizationMenu } from "./scripts/customizationMenu.js";

let tomatoTimer = new TomatoTimer("taimer");

tomatoTimer.setIdOutputStatus('taimerStatus');

const controls = document.getElementById("controls");
const customizationMenu = new CustomizationMenu(
  "settings",
  "openSettings", "closeSettings",
  () => {
    controls.removeEventListener("click", controlsEvents);
  },
  () => {
    controls.addEventListener("click", controlsEvents);
    tomatoTimer.resetTomatoTimer();
  }
);


function controlsEvents({ target }) {
  if (!(target instanceof HTMLButtonElement)) return;

  const nameEvent = target.dataset.action;

  const events = {
    startTimer: () => tomatoTimer.startTomatoTimer(),
    stopTimer: () => tomatoTimer.stopTimer(),
    resetTimer: () => tomatoTimer.resetTomatoTimer(),
    skipIteration: () => tomatoTimer.skipIteration(),
    restartTimer: () => {
      tomatoTimer.restartTimer();
    },
  };

  events[nameEvent]?.();
};

