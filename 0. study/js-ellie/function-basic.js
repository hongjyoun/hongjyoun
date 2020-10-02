'use strict'


// 함수 선언
function doSomething(dd) {
    console.log(dd)
    const result = dd(1,1)
    console.log(result)
}

function add(a,b) {
    const sum = a + b
    return sum
}



// 함수 호출
// doSomething(add) // doSomething(add()) -> X

// const result = add(1,2)
// console.log(result)


const addFun = add
console.log(addFun)
console.log(addFun(5,2))