export class MyArray<T> {
  private items: T[];

  constructor(...elements: T[]) {
    this.items = elements;
  }

  push(...elements: T[]): number {
    for (const el of elements) {
      this.items[this.items.length] = el;
    }
    return this.items.length;
  }

  pop(): T | undefined {
    if (this.items.length === 0) return undefined;
    const last = this.items[this.items.length - 1];
    this.items.length = this.items.length - 1;
    return last;
  }

  forEach(
    callback: (element: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void {
    for (let i = 0; i < this.items.length; i++) {
      callback.call(thisArg, this.items[i], i, this.items);
    }
  }

  map<U>(
    callback: (element: T, index: number, array: T[]) => U,
    thisArg?: any
  ): MyArray<U> {
    const result = new MyArray<U>();
    for (let i = 0; i < this.items.length; i++) {
      result.push(callback.call(thisArg, this.items[i], i, this.items));
    }
    return result;
  }

  filter(
    callback: (element: T, index: number, array: T[]) => boolean,
    thisArg?: any
  ): MyArray<T> {
    const result = new MyArray<T>();
    for (let i = 0; i < this.items.length; i++) {
      if (callback.call(thisArg, this.items[i], i, this.items)) {
        result.push(this.items[i]);
      }
    }
    return result;
  }

  find(
    callback: (element: T, index: number, array: T[]) => boolean,
    thisArg?: any
  ): T | undefined {
    for (let i = 0; i < this.items.length; i++) {
      if (callback.call(thisArg, this.items[i], i, this.items)) {
        return this.items[i];
      }
    }
    return undefined;
  }

  includes(value: T, fromIndex: number = 0): boolean {
    for (let i = fromIndex; i < this.items.length; i++) {
      if (this.items[i] === value) return true;
    }
    return false;
  }

  indexOf(value: T, fromIndex: number = 0): number {
    for (let i = fromIndex; i < this.items.length; i++) {
      if (this.items[i] === value) return i;
    }
    return -1;
  }

  every(
    callback: (value: T, index: number, array: T[]) => boolean,
    thisArg?: any
  ): boolean {
    for (let i = 0; i < this.items.length; i++) {
      if (!callback.call(thisArg, this.items[i], i, this.items)) return false;
    }
    return true;
  }

  some(
    callback: (value: T, index: number, array: T[]) => boolean,
    thisArg?: any
  ): boolean {
    for (let i = 0; i < this.items.length; i++) {
      if (callback.call(thisArg, this.items[i], i, this.items)) return true;
    }
    return false;
  }

  // Optional: convert to plain array
  toArray(): T[] {
    return [...this.items];
  }
}
