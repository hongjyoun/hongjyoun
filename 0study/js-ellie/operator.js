// 1. String concatenation
console.log('my' + ' cat')
console.log('1'+2)
console.log(`string leterals: 1+2 = ${1+2}`)



// 2. Numeric operators
console.log(1+1)
console.log(1-1)
console.log(1/1)
console.log(1*1)
console.log(5%2)
console.log(2**3)



// 3. Increament and decreament operators
let counter = 2
const preIncreament = ++ counter // counter에 1을 더한 후에, 그 값을 preIncrement에 넣음
const postIncreament = counter ++ // postIncreament에 counter 값을 넣고, 그 다음에 1을 더함


// 4. Logical operator: || (or), && (and), ! (not)
// !는 값을 바꿔준다. !true -> true의 값을 반대로 바꿔줌=false

// ==  loose equality
// === stricr equality


console.log(0 == false)  // true
console.log(0 === false)  // false
console.log('' == false) // true
console.log('' === false) // false
console.log(null == undefined) // true
console.log(null === undefined) // false


// ternary operator (if 문 간단하게 쓸 때, 간단할 때만 쓰는 게 좋음)
// condition ? value1 : value2

// console.log(name === 'hong'? 'yes' : 'no')


// switch
const browser = 'IE'
switch (browser) {
    case 'IE':
        console.log('go away!')
        break
    case 'Chrome':
    case 'Firefox':
        console.log('love you!')
        break
    default:
        console.log('same all!')
        break
}
