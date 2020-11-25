// class를 이용해서 새로운 인스턴스를 생성하면 -> 그게 Object(객체)!
// Class : 붕어빵 틀
// - template
// - declare once
// - no data in

// Object : 붕어빵 / 팥붕어빵 / 크림붕어빵 ... 등등
// - instance of a class
// - created many times
// - data in


'use strict'

// 클래스 선언
class Person {
    // constructor
    constructor(name, age){
        //fields
        this.name = name
        this.age = age
    }

    // methods
    speak() {
        console.log(`${this.name}: hello`)
    }
}

const hong = new Person('hong', 50)
console.log(hong.name)
console.log(hong.age)
hong.speak()




// Getter & Setter
class User {
    constructor(firstName, lastName, age){
        this.firstName = firstName
        this.lastName = lastName
        this.myage = age
    }

    get myage() {     //값을 리턴하고
        return this._age
    }

    set myage(value) {      // 값을 설정한다
        // if(value < 0) {
        //     throw Error('age can not be negative')
        // }
        // this._age = value
        this._age = value < 0 ? 0 : value

    }
}
const user1 = new User('steve', 'jobs', -1)
console.log(user1.myage)



// public & provate, Static 
// https://youtu.be/_DLhUBWsRtw?list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&t=841



// 상속 & 다양성
// https://youtu.be/_DLhUBWsRtw?list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2
// 브라우저에 도형을 만든다면? 네모, 세모, 동그라미...
// 얘네의 공통점은 도형이라는 것!
// 도형(shape)을 만들어서 재사용하면 되지 않을까.

class Shape {
    constructor(width, height, color) {
        this.width = width
        this.height = height
        this.color = color
    }

    draw() {
        console.log(`drawing ${this.color} color!`)
    }

    getArea() {
        return this.width * this.height
    }
}

class Rectangle extends Shape {}   // extends를 이용해서 Shape 클래스를 상속함
class Triagle extends Shape {      // 상속한 후, getArea 함수 다시 재정의함(overwriting 덮어쓰기)
    draw() {
        super.draw();  //부모 클래스에 정의된 draw 함수도 불러오면서
        console.log('삼각형입니당')   //새로 추가로 정의
    }
    
    getArea() {
        return this.width * this.height / 2
    }
}

const rect1 = new Rectangle(20, 20, 'blue')
rect1.draw()
console.log(rect1.getArea())

const tri1 = new Triagle(20, 20, 'red')
tri1.draw()
console.log(tri1.getArea())










// class checking : instanceOf   왼쪽 오브젝트가 오른쪽 클래스의 오브젝트인지 아닌지 확인: True 와 False 리턴
console.log(rect1 instanceof Rectangle)


