export class DomListener {
  constructor(root) {
    if (!root) {
      throw new Error('not root provided for DomListener');
    }
    this.$root = root;
  }
}
