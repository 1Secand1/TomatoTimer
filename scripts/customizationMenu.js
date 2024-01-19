export class CustomizationMenu {
  currentStatus = "";

  #menuElement = undefined;
  #openTigersElement = undefined;
  #closeTigersElement = undefined;

  runOnOpening = () => { };
  runOnClose = () => { };

  constructor(menuId, openTigersId, closeTigersId, funOpen, funClose) {
    this.#menuElement = document.getElementById(menuId);
    this.#openTigersElement = document.getElementById(openTigersId);
    this.#closeTigersElement = document.getElementById(closeTigersId);

    this.runOnOpening = funOpen;
    this.runOnClose = funClose;

    this.#menuElement.style.display = "none";

    this.closeMenu();
  }

  openMenu() {
    this.currentStatus = "open";
    this.#menuElement.style.display = "grid";
    this.#closeTigersElement.addEventListener("click", this.switch);
    this.#openTigersElement.removeEventListener("click", this.switch);

    this.runOnOpening?.();
  }
  closeMenu() {
    this.currentStatus = "closed";
    this.#menuElement.style.display = "none";
    this.#openTigersElement.addEventListener("click", this.switch);
    this.#closeTigersElement.removeEventListener("click", this.switch);

    this.runOnClose?.();
  }

  switch = () => {
    if (this.currentStatus == "open") {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  };
  currentStatus() { }

}

