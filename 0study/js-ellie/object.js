// object 객체는 '키'와 '밸류'의 집합체이다.
// object 객체 만드는 방법


// 1. Literals and properties
const obj1 = {} // 중괄호로 선언 -> 'object literal' syntax
const obj2 = new Object() // 클래스 템플릿을 이용해서 만드는 것 -> 'object constructor' syntax

const hong = {
    name : 'hong',  // name 이라는 키, 'hong'이라는 값
    age : 21,
    hobby : 'coding' 
}

function printPerson(person) {
    console.log(person.name)
    console.log(person.age)
}

printPerson(hong)

hong.hasjob = true; // 자바스크립트는 이렇게 뒤늦게 프로퍼티를 추가할 수 있다. 흔한 일은 아님...
console.log(hong.hasjob)

delete hong.hasjob  // 원하면 또 이렇게 삭제할 수 있음




// 2. Computed properties 계산된 프로퍼티
console.log(hong.name)
console.log(hong['name']) // computed properties
hong['hasJob'] = true
console.log(hong.hasJob)



function printValue(obj, key) {
    console.log(obj[key])
}

printValue(hong, 'name')




// 3. Property value shorthand
const person1 = { name : 'bob', age: 2 }
const person2 = { name : 'steve', age: 3 }
const person3 = { name : 'dave', age: 4 }
// const person4 = makePerson('hong', 30)
const person4 = Person('hong', 30)

// 4. Constructor function (클래스 같은 함수. 클래스가 없을 땐 이렇게 했다.)
function Person(name, age) {
    // this = {}
    this.name = name
    this.age = age
    // return this
}  

// 아래 함수와 같은 기능을 하는 것이 위의 컨스트럭터 함수.
// function makePerson(name, age) {
//     return {
//         name : name,
//         age : age
//     }
// }




// 5. in operator : property existence check (key in obj)
console.log('name' in hong)   // true
console.log('emmem' in hong)    // false



// 6. for .. in /  for .. of
// for (key in obj) : 오브젝트 안에 있는 것들을 찾을 때
for (key in hong) {
    console.log(key)
}

// for (value of iterable) : 배열, 리스트와 같은 순차적인 데이터일 때 사용
const data = [3,1,5,2]
for (d of data) {
    console.log(d)
}



// 7. Fun cloning
const user = {name : 'kang', age : 11}
const user2 = user
user2.name = 'ming'
console.log(user2.name)

// old way
const user3 = {}
for (key in user) {
    user3[key]  = user[key]
}
console.log(user3)

// New way
  
const user4 = {}
Object.assign(user4, user) // Object.assign() : 자바스크립트에서 이미 정의되어있는 디폴트 
console.log(user4)


const user5 = Object.assign({}, user) // 위와 동일. 이렇게 해도 됨.
console.log(user5)

// another example
const fruit1 = {color : 'red'} 
const fruit2 = {color : 'purple', size : 'big'}
const mixed = Object.assign({}, fruit1, fruit2)
console.log(mixed.color)
console.log(mixed.size)