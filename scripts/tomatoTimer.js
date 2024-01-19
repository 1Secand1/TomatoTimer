import { Timer } from "./timer.js";
import { linkInputInObject } from "./linkInputInObject.js";

export class TomatoTimer extends Timer {
  #defaultSettings = {
    workTime: 25,
    longBreak: 30,
    shortBreak: 5,
    rounds: 2,
  };

  textStatuses = {
    workTime: "Время работать",
    longBreak: "Теперь можно отдохнуть",
    shortBreak: "Самое время сделать перерыв",
  };

  #currentInterval = 0;
  #currentRound = 1;
  #IdOutputStatus = undefined;

  currentIteration = undefined;

  constructor(...argum) {
    super(argum);

    this.userSettings = {
      ...this.#defaultSettings,
    };
    this.currentStatus = "";


    let inputLinker = new linkInputInObject(this.userSettings);
    inputLinker.connect("inputTimer", ["workTime", "valueTimer"]);
    inputLinker.connect("inputShortBreak", ["shortBreak", "valueShortBreak"]);
    inputLinker.connect("inputLongBreak", ["longBreak", "valueLongBreak"]);
    inputLinker.connect("inputRounds", ["rounds", "valueRounds"]);
  }

  startTomatoTimer() {
    if (this.time === this.timerDuration || !this.timerDuration) {
      this.startRound();
    }
    this.startTimer();
  }

  startRound() {
    this.callOnCompletion = this.skipIteration;
    this.setCurrentTime();
  }

  skipIteration() {
    this.#currentInterval += 1;

    if (this.#currentInterval > 1) {
      this.#currentInterval = 0;
      this.#currentRound += 1;
    }

    if (
      this.#currentRound > this.userSettings.rounds &&
      this.#currentInterval == 1
    ) {
      this.#currentRound = 1;
    }

    this.setCurrentTime();
  }

  resetTomatoTimer() {
    this.setCurrentTime();
  }

  setCurrentTime() {
    const { rounds } = this.userSettings;

    const isLongBreak = rounds >= 2 && this.#currentRound + 1 > rounds && this.#currentInterval === 1;

    const breakTime = isLongBreak
      ? "longBreak"
      : "shortBreak";

    const currentStatus = this.#currentInterval === 0
      ? "workTime"
      : breakTime;

    this.currentStatus = currentStatus;

    this.setTime(0, this.userSettings[currentStatus]);
    this.setStatus(this.currentStatus, this.#IdOutputStatus);
  }

  restartTimer() {
    this.#currentInterval = 0;
    this.#currentRound = 1;

    this.stopTimer();
    this.setStatus("workTime", this.#IdOutputStatus);
    this.setTime(0, this.userSettings.workTime);
  }

  setIdOutputStatus(id) {
    this.#IdOutputStatus = id;
  }

  setStatus(nameStatus, idHtmlElement) {
    const element = document.getElementById(idHtmlElement);
    element.innerText = this.textStatuses[nameStatus];
  }

}
