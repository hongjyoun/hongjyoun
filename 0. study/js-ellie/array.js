'use strict'

// 1. 배열 선언
const arr1 = new Array()
const arr2 = []
const arr3 = [9,8,7,6]

for (let i of arr3) {
    console.log(i)
}

arr3.forEach(function(v, i, array) {
    console.log(v, i, array)
})

// 위와 같음
// arr3.forEach((v, i, array) => {
//     console.log(v, i, array)
// })



// 2. Addition, Deletion, Copy
// push : add an item to the end   뒤에 넣기
arr3.push(5)
console.log(arr3)

// pop : remove an item from the end   뒤에서부터 빼기
arr3.pop()
console.log(arr3)

arr3.pop()
console.log(arr3)

// unshift : 앞에 넣기
arr3.unshift(11)
console.log(arr3)


// shift : 앞에서부터 빼기
arr3.shift()
console.log(arr3)

// note!! shift 와 unshift 는 매우매우 느리다. (pop과 push 보다)

// 중간의 값을 자르는 것
arr3.splice(1, 2)
console.log(arr3)
arr3.push(5,6,7)
console.log(arr3)
arr3.splice(1, 2, 99, 100)  // arr3[1]값부터 2개까지 빼고, 그 자리에 99와 100을 넣어줘
console.log(arr3)



// 2개의 배열을 붙이는 것 : concat
const arr4 = [11,22,33]
console.log(arr4.concat(arr3))


// 3. Serching / find the index
console.log(arr3)
arr3.push(9)
console.log(arr3)
// indexOf
console.log(arr3.indexOf(100))  // 100이 arr3 배열 안에 몇 번째 있는지
console.log(arr3.indexOf(9)) // 9들 중에서 첫번째 아이의 위치를 알려줌
// lastIndexOf
console.log(arr3.lastIndexOf(9)) // 9 중에서 마지막에 있는 위치를 알려줌
// includes
console.log(arr3.includes(3))   // 3이 arr3 안에 있는지 없는지 -> 없으면 false 있으면 true

