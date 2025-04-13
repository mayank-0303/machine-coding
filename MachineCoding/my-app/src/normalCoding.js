console.log("code start ----");

function fnConstructor(name) {
  this.name = name;
}

fnConstructor.job = "coder";

//OR

// class fnConstructor {
//   constructor(name) {
//     this.name = name;
//   }
// }

const objFn = new fnConstructor("mayank");
objFn.lastname = "singh";

console.log(objFn);

const newObjectwithproto = Object.create(objFn); // helps you to create a new object with some prototype

newObjectwithproto.age = 26;

console.log(newObjectwithproto);

// const copiedObj = structuredClone();

function x() {
  let dd = "eded";
}

console.log(x);

console.log("code end ----");

function ed(call1, call2) {
  let data; // api
  call1;
}

// getName((name) => {
//     getAge(name, (age) => {
//         getEmail(name,age, (emeail) => {
//                                                         // callback hell
//         })
//     })
// })

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn.apply(this, args), delay);
  };
}
