class Root {
  getThis() {
    return 'rootFoo';
  }

  _privateThing() {
    return 'unmodified';
  };
}

module.exports = Root;
