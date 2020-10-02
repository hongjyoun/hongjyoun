// JSON

// 1. Object to JSON
// stringfy(obj)
let json = JSON.stringify(true)
console.log(json)

json = JSON.stringify(['apple', 'banana'])
console.log(json)

const rabbit = {
    name : 'tori',
    color : 'white',
    size : null,
    birthDate : new Date(),
    jump: () => {
        console.log(`${this.name} can jump!`)
    },
}


json = JSON.stringify(rabbit)   
console.log(json)   // jump함수는 포함하지 않는 것을 확인할 수 있음. JSON 으로 변환될 때 함수는 데이터가 아니라서 포함하지 않음.


json = JSON.stringify(rabbit, ["name"])   // 해당하는 프로퍼티(name)만 전달 할 수 있음.
console.log(json) 


json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key}, value: ${value}`)
    return value
})  
console.log(json) 


json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key}, value: ${value}`)
    return key === 'name' ? 'hong' : value
})  
console.log(json) 





// 2. JSON to Object
// parse(json)

const obj = JSON.parse(json)
console.log(obj)

const obj2 = JSON.parse(json, (key, value) => {
    console.log(`key: ${key}, value: ${value}`)
    return key === 'birthDate'? new Date() : value
})

console.log(obj2.birthDate.getDate())