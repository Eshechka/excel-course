export class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('Not provided method getRoot');
  }

  afterRender() {}

  destroy() {}
}
