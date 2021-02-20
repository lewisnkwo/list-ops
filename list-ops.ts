class List<T> {
  constructor(public values: T[] = []) {}
  append(list: List<T>): List<T> {
    return new List([...this.values, ...list.values]);
  }

  concat(list: List<List<T>>): List<T> {
    const [list2, list3, list4] = list.values;
    return this.values.length === 0
      ? new List([])
      : new List([
          ...this.values,
          ...list2.values,
          ...list3.values,
          ...list4.values,
        ]);
  }

  filter(el: (el: T) => boolean): List<T> {
    let filteredValues: T[] = [];
    for (let n = 0; n < this.values.length; n++) {
      if (el(this.values[n])) {
        filteredValues = [...filteredValues, this.values[n]];
      }
    }
    return new List(filteredValues);
  }

  length(): number {
    let counter = 0;
    for (let n = 0; n < this.values.length; n++) {
      counter++;
    }
    return counter;
  }

  map(el: (el: T) => T): List<T> {
    let mappedValues: T[] = [];
    for (let n = 0; n < this.values.length; n++) {
      if (this.values[n] !== undefined) {
        mappedValues = [...mappedValues, el(this.values[n])];
      }
    }
    return new List(mappedValues);
  }

  foldl(
    divide: (acc: number, currentValue: T) => number,
    initAcc: number
  ): number {
    let sum = initAcc;
    if (this.values.length !== 0) {
      for (let n = 0; n < this.values.length; n++) {
        sum = divide(sum, this.values[n]);
      }
    }
    return sum;
  }

  foldr(
    divide: (acc: number, currentValue: T) => number,
    initAcc: number
  ): number {
    let sum = initAcc;
    if (this.values.length !== 0) {
      for (let n = this.values.length - 1; n > -1; n--) {
        sum = divide(sum, this.values[n]);
      }
    }
    return sum;
  }
}

export default List;
