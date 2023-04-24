export default class LoadMoreBtn {
  constructor({ selector, isHidden = false }) {
    this.button = this.getButton(selector);
    if ((isHidden = true)) {
      this.hide();
    } else {
      this.show();
    }
  }

  getButton(selector) {
    return document.querySelector(selector);
  }
  disable() {
    // this.button.classList.add('hidden');
    this.button.disabled = true;
  }

  anable() {
    // this.button.classList.add('hidden');
    this.button.disabled = false;
  }
  hide() {
    this.button.classList.add('hidden');
  }
  show() {
    this.button.classList.remove('hidden');
  }
}
