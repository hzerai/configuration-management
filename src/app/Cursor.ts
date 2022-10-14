export class Cursor {
  static startLoading(time: number) {
    document.getElementById('APP').style.cursor = 'wait';
    if (time) {
      setTimeout(() => {
        this.stopLoading();
      }, time);
    }
  }

  static stopLoading() {
    document.getElementById('APP').style.cursor = '';
  }
}
