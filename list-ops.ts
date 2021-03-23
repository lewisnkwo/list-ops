class List<T> {
  public nonEmptyList: boolean;
  constructor(public values: T[] = []) {
    this.nonEmptyList = this.values.length !== 0;
  }

  append(list: List<T>): List<T> {
    return new List([...this.values, ...list.values]);
  }

  concat(list: List<List<T>>): List<T> {
    let concatArray: T[] = [];
    for (let i = 0; i < list.length(); i++) {
      concatArray = [...concatArray, ...list.values[i].values];
    }
    return this.append(new List(concatArray));
  }

  // filter(el: (el: T) => boolean): List<T> {
  //   let filteredValues: T[] = [];
  //   for (let n = 0; n < this.values.length; n++) {
  //     if (el(this.values[n])) {
  //       filteredValues = [...filteredValues, this.values[n]];
  //     }
  //   }
  //   return new List(filteredValues);
  // }

  // length(): number {
  //   let counter = 0;
  //   for (let n = 0; n < this.values.length; n++) {
  //     counter++;
  //   }
  //   return counter;
  // }

  // map<U>(el: (el: T) => U): List<U> {
  //   let mappedValues: U[] = [];
  //   for (let n = 0; n < this.values.length; n++) {
  //     if (this.values[n] !== undefined) {
  //       mappedValues = [...mappedValues, el(this.values[n])];
  //     }
  //   }
  //   return new List(mappedValues);
  // }
  // use append instead of spread ^^^^

  map<U>(el: (el: T) => U): List<U> {
    return this.foldl(
      (acc, currentValue) => acc.append(new List([el(currentValue)])),
      new List<U>()
    );
  }

  filter(el: (el: T) => boolean): List<T> {
    return this.foldl(
      (acc, currentValue) =>
        el(currentValue) ? acc.append(new List([currentValue])) : acc,
      new List<T>()
    );
  }

  length(): number {
    return this.foldl((acc, _) => acc + 1, 0);
  }

  foldl<U>(divide: (acc: U, currentValue: T) => U, initAcc: U): U {
    let sum = initAcc;
    if (this.nonEmptyList) {
      for (let n = 0; n < this.values.length; n++) {
        sum = divide(sum, this.values[n]);
      }
    }
    return sum;
  }

  foldr<U>(divide: (acc: U, currentValue: T) => U, initAcc: U): U {
    let sum = initAcc;
    if (this.nonEmptyList) {
      for (let n = this.values.length - 1; n > -1; n--) {
        sum = divide(sum, this.values[n]);
      }
    }
    return sum;
  }

  reverse(): List<T> {
    let reversedArray: T[] = [];
    for (let n = this.values.length - 1; n > -1; n--) {
      reversedArray = [...reversedArray, this.values[n]];
    }
    return new List(reversedArray);
  }
}

export default List;
