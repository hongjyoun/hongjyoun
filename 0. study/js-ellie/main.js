// 1. Use strict
// added in ES 5
// use this for Vanila Javascript
//이걸 선언하게 되면, 비상식적인 것들을 사용할 수 없게된다.

'use strict'  
console.log('hello')





// 2. Variable
// let (added in ES6)
// var (don't ever use this!)

let name = 'hahaha'
{
    let name = 'hong'
    console.log(name)
    name = 'kim'
    console.log(name)
}
console.log(name)


// 3. constants : 한 번 지정하면 바뀌지 않는 것
// favor immutable data type always for a few reason:
// - security
// - thread safety
// - reduce human mistakes

const daysInWeek = 7

// 4. Variacle types
// number
const count = 17
const size = 17.1

const infinity = 1 / 0
const negativeInfinity = -1 / 0
const nAn = 'not a number' / 2

// string
const char = 'c'
const brendan = 'brendan'
console.log(`${brendan} hi!`) // 백틱(`)을 이용하자

// boolean
// false : 0, null, undefined, NaN, ''
// true : any other value

const test = 1>3  // false

// null
let nothing = null // 텅 빈 값으로 지정한 경우

// undefined
let x // 지정은 되었지만, 값이 없는 경우

// symbol, create unique identifiers for objects (고유한 식별자를 만들 때 사용)
const symbol1 = Symbol('id')
const symbol2 = Symbol('id')
console.log(symbol1 === symbol2) // false

const gSymbol1 = Symbol.for('id')
const gSymbol2 = Symbol.for('id')
console.log(gSymbol1 === gSymbol2) // true


// 5. Dynamic Typng : dynamically typed language
let text = 'hello'
console.log(text.charAt(0))
console.log(`value : ${text}, type : ${typeof text}`)
text = '1'
console.log(`value : ${text}, type : ${typeof text}`)
text = '7' + 5
console.log(`value : ${text}, type : ${typeof text}`)
text = '8' / '2'
console.log(`value : ${text}, type : ${typeof text}`)
console.log(text.charAt(0)) // 에러가 남

// objet, real-life object, data structure
const hong = {name : hong, age : 100}
hong.name = 'jy'
hong.age = '1000'