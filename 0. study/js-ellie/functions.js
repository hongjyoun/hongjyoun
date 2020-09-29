// Function
// - fundamental building block in the program
// - subprogram can be used multiple times
// - performs a task or calculate a value

// 1. Function declaration
// function name (param1, param2) { body... return; }
// one function === one thing
// naming : doSomething, command, verb
// e.g. createCardAndPoint -> createCard, createPoint 로 나누기
// function is object in JS

function printHello() {
    console.log('hello')
}

printHello()

function log(message) {
    console.log(message)
}

log('hahaha')






// 2. parameters
// promitive parameters : passed by value (밸류값이 전달됨)
// object parameters : reference가 전달됨

function changeName(obj) {
    obj.name = 'coder'
}

const hong = {name: 'hong'}
changeName(hong)
console.log(hong)





// 3. Default parameters (added in ES6)
function showMessage(message, from = 'unknown') {   // from의 파라미터값을 디폴트로 unknown으로 지정함
    // if (from === undefined) {
    //     from = 'unknown'
    // } from이라는 파라미터값을 전달받지 못했을 때, 이렇게 if 문을 작성했어야 했는데
    //   default parameter 값을 지정해놓으면 끝!
    console.log(`${message} by ${from}`)
}

showMessage('hi')



// 4. Rest Parameters (added in ES6)
function printAll (...args) {
    for (let i = 0; i < arguments.length; i++) {
        console.log(args[i])
    }


    // 위에꺼를 간단하게 아래처럼 바꿀 수 있음.
    for (const arg of args){
        console.log(arg)
    }

    args.forEach((arg) => console.log(args))
}

printAll('가', '나', '다')




// 5. Local scope   // 밖에서는 안이 보이지 않고, 안에서만 밖을 볼 수 있다.


// 6. Earyl return, early exit
    // bad
    function upgradeUser(user) {
        if(user.point > 10) {
            // long upgrade logic...
        }
    }

    // good
    function upgradeUser(user) {
        if(user.point <= 10) {
        return    // 이외의 상황은 빨리 함수를 종료시키는 것.
        }
        // long upgrade logic...
    }









// first class function
// '변수'로 담을 수 있고
// 다른 함수의 '인자'로 전달 가능하고
// '리턴값'으로도 보낼 수 있다

// 1. 함수 선언방법
// 1) 익명함수
const print = function() {
    console.log('print')
}
print()

const printAgain = print
printAgain()


// 2. Callback function
function randomQuiz(answer, printYes, printNo) {   // printyes, printNo라는 두가지의 콜백 함수가 전달됨
    if (answer === 'love you'){
        printYes()
    } else {
        printNo();
    }
}

const yes = function () {
    console.log('정답입니다')
}

const no = function () {
    console.log('틀렷엉')
}


randomQuiz('hong', yes, no)
randomQuiz('love you', yes, no)




// Arrow function (얘는 익명함수임)
const simplePrint = () => console.log('gkgkgk')
const add = (a,b) => a+b
const simpleAdd = (a,b) => {
    return a+b
}



// IIFE : 선언함과 동시에 호출하는 것 -> 함수를 ()로 감싸고, 끝에 ()를 붙이기
(function Hello() {
    console.log('hello')
})()



const calculate = (command, a,b) => {
    return command(a,b)
}
const adding = (a,b) => a+b
console.log(calculate(adding, 3, 5))
