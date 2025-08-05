export class AsideItem extends HTMLElement {
  mainElem = this.querySelector("a")!;

  setActive(active: boolean) {
    if (active) {
      this.mainElem.dataset.active = "";
    } else {
      delete this.mainElem.dataset.active;
    }
  }
}

customElements.define("aside-item", AsideItem);
