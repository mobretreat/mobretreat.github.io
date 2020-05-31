class Array2d {
  constructor(width, height, initFn) {
    this.width = width;
    this.height = height;
    this.backing = new Array(height)
      .fill(undefined)
      .map((_, y) =>
        new Array(width).fill(undefined).map((_, x) => initFn(x, y))
      );
  }

  get(x, y) {
    return this.backing[y][x];
  }

  map(fn) {
    return new Array2d(this.width, this.height, (x, y) =>
      fn(this.get(x, y), x, y)
    );
  }

  forEach(fn) {
    return this.backing.forEach((row, y) =>
      row.forEach((value, x) => fn(value, x, y))
    );
  }

  resize(newWidth, newHeight, inserter, remover) {
    this.forEach((value, x, y) => {
      if (x >= newWidth || y >= newHeight) {
        remover(value, x, y);
      }
    });

    return new Array2d(newWidth, newHeight, (x, y) => {
      if (x >= this.width || y >= this.height) return inserter(x, y);
      return this.get(x, y);
    });
  }

  toString() {
    return `[
  [${this.backing
    .map((row) => row.map((column) => JSON.stringify(column)).join(", "))
    .join("],\n  [")}]
]`;
  }

  static fromArray(arr) {
    return new Array2d(arr[0].length, arr.length, (x, y) => arr[y][x]);
  }
}

export { Array2d };
