const memberArray = ['a', 'b', 'c']
console.log(memberArray[1])

const memberObject = {
    manager : 'aaa',
    developer: 'bddd',
    designer : 'kang'
}

console.log(memberObject.manager)
console.log(memberObject['manager'])
memberObject.designer = 'hong'
console.log(memberObject['designer'])
delete memberObject.manager
console.log(memberObject.manager)