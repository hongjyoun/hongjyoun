'use strict'

// hoisting 호이스팅 : var, function 변수와 함수 선언들이 자동적으로 제일 위로 올라가는 것


// 동기적 콜백
function printImmediately(print) {
    print()
}
printImmediately(()=>console.log('hahah'))

// 비동기적 콜백
function printWithDelay(print, timeout) {
    setTimeout(print, timeout)
}


printWithDelay(()=> console.log('비동기적 실행'), 2000)




///////////////
// 콜백 지옥 //
///////////////

class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(()=> {
            if (
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id)
            } else {
                onError(new Error('not found'))
            }
        }, 2000)
    }

    getRoles(user, onSuccess, onError){
        setTimeout(()=> {
            if (user === 'ellie') {
                onSuccess({name : 'ellie', role: 'admin'})
            } else {
                onError(new Error('no access'))
            }
        }, 1000)
    }
}


const userStorage = new UserStorage()
const id = prompt('enter your id')
const password = prompt('enter your password')

userStorage.loginUser(
    id, 
    password, 
    (user) => {
        userStorage.getRoles(
            user, 
            (userWithRole) => {        
                alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`)
            },
            (error) => {
                console.log(error)
            }
        )
    }, 
    (error) => {
        console.log(error)
    }
)


