export class ActiveRoute {
  static get address() {
    return window.location.hash;
  }
  static get params() {
    return ActiveRoute.address.split('/')[1];
  }
  static navigate(link) {
    window.location.hash = link;
  }
}
