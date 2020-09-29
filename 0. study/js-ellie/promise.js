// state( 현재 상태) 
// pending (프로미스가 만들어져서 우리가 지정한 오퍼레이션이 수행 중일 떄) -> fulfilled (성공적으로 임무를 마친 상황) or rejected(파일을 찾을 수 없었다면)
// Producer (데이터 만들어내는) vs Consumer (데이터를 소비하는)


// 1. producer
// 새로운 promise가 만들어질 때는, 전달한 함수가 바로 자동적으로 실행된다. ('뭐 하는중' 콘솔로그 실행된 것처럼)
const promise = new Promise((resolve, reject)=>{
    // doing some heavy work () 네트워크에서 데이터를 받아온다던가....
    // network 에서 불러온다던지, read file 하는 것들은 promise를 이용해 비동기적으로 처리하는 것이 좋다.
    console.log('뭐 하는중...')
    setTimeout(() => {
        resolve('ellie')
        // reject(new Error('no network'))
    }, 2000)


})



// 2. Consumers: then, catch, finally
promise
    .then((value) => {    //then 이란, promise에서 정상적으로 잘 수행되었을 때, resolve라는 콜백함수를 통해서 전달한 값을 받아서 실행함.
        console.log(value)
    })
    .catch(error => {
        console.log(error)
    })
    .finally(()=> {
        console.log('finally')  //finally : 실패하든 성공하든 무조건 마지막에 실행함
    })


// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(()=> resolve(1), 1000)
})

fetchNumber
.then(num => num * 2)
.then(num => num * 3)
.then(num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num-1), 1000)
    })
})
.then(num => console.log(num))




// 4. Error Handling
const getHen = () =>
    new Promise((resolve, reject)=> {
        setTimeout(() => resolve('닭'), 1000)
    })
const getEgg = hen =>
    new Promise((resolve, reject)=> {
        setTimeout(() => resolve(`${hen} -> 계란`), 1000)
    })
const cook = egg =>
    new Promise((resolve, reject)=> {
        setTimeout(() => resolve(`${egg} -> 후라이`), 1000)
    })

getHen()
    .then(hen => getEgg(hen))
    .then(egg => cook(egg))
    .then(meal => console.log(meal))

// 위 수식은 아래와 같이 간략히 적을 수 있다
getHen()
    .then(getEgg)
    .then(cook)
    .then(console.log)



/////////////// 에러가 났을 때
const getHen = () =>
    new Promise((resolve, reject)=> {
        setTimeout(() => resolve('닭'), 1000)
    })
const getEgg = hen =>
    new Promise((resolve, reject)=> {
        setTimeout(() => reject(new Error(`error! ${hen} -> 계란`)), 1000)
    })
const cook = egg =>
    new Promise((resolve, reject)=> {
        setTimeout(() => resolve(`${egg} -> 후라이`), 1000)
    })

getHen()
    .then(hen => getEgg(hen))
    .then(egg => cook(egg))
    .then(meal => console.log(meal))

// 위 수식은 아래와 같이 간략히 적을 수 있다
getHen()
    .then(getEgg)
    .catch(error => {
        return '빵'
    })
    .then(cook)
    .then(console.log)
    .catch(console.log)