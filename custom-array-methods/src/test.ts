import { MyArray } from "./main";

const arr = new MyArray<number>(1, 2, 3);

// push
arr.push(4); // [1, 2, 3, 4]

// pop
console.log(arr.pop()); // 4

// forEach
arr.forEach((el, i) => console.log(`Index ${i}: ${el}`));

// map
const doubled = arr.map((x) => x * 2);
console.log(doubled.toArray()); // [2, 4, 6]

// filter
const evens = arr.filter((x) => x % 2 === 0);
console.log(evens.toArray()); // [2]

// find
console.log(arr.find((x) => x > 1)); // 2

// includes
console.log(arr.includes(2)); // true

// indexOf
console.log(arr.indexOf(3)); // 2

// every
console.log(arr.every((x) => x > 0)); // true

// some
console.log(arr.some((x) => x === 2)); // true
