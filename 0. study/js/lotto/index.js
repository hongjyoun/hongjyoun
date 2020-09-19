const number = Array(45).fill().map((v,i) => i+1)   //v가 값이고, i는 자리수 (v나 i는 내가 임의로 정할 수 있음. 첫번째가 값, 두번째가 자리수)
const shuffle = [];


//숫자 섞기 : number의 숫자들을 무작위로 뽑아서 shuffle에 넣음

while(number.length>0){   
    const random = Math.floor(Math.random()* number.length)
    const spliceArray = number.splice(random, 1)
    const value = spliceArray[0]

    shuffle.push(value)
    // splice는 잘라낸 값을 배열로 리턴한다.
    // 그래서 값으로 변수에 담으려면, 0번째 배열값을 불러오는 거임
    // [1,2,3].splice(2,1)  ==> 2번째 인덱스의 1개의 값만 가져온다 ==> [3] ==> 배열로 나옴
    // [1,2,3].splice(2,1)[0] ==> 3
}

const winNumbers = shuffle.splice(0,6).sort((p,c)=>{
    return p-c; // 리턴하는 p-c 값이 0보다 크면 자리를 바꾼다. ex) [1,2,3,1] ==> 3,1 일 때 3-1>0 이므로, 앞뒤 자리를 바꿈
}) 

// sort() ==> 사전 순으로 정렬해주는 것(숫자순이 아님) 
// 그래서 숫자 순으로 하기 위해서 sort 안에 다시 함수를 인자로 넣어줌.
// p,c 에는 앞뒤로 두개씩 쌍으로 들어감.
// const winNumbers = shuffle.splice(0,6).sort((p,c)=> p-c)
const bonus = shuffle[6]

console.log(winNumbers)
console.log(bonus)

// 색칠하는 함수만들기

function colorize(number, tag) {
    if (number < 10) {tag.style.backgroundColor = 'red'; tag.style.color='white'}
        else if (number < 20) {tag.style.backgroundColor = 'orange'}
        else if (number < 30) {tag.style.backgroundColor = 'yellow'}
        else {tag.style.backgroundColor = 'green'}
}

// 화면에 표시하기
// 6개 숫자
const lottoSection = document.querySelector('#lotto')
for (let i=0; i<6; i++){
    setTimeout(()=>{   //1초에 한개씩 나올 수 있도록
        const ball = document.createElement('div')
        ball.className = 'ball'
        colorize(winNumbers[i], ball)
        ball.textContent = winNumbers[i]
        lottoSection.appendChild(ball)

    }, 1000 * (i+1))
}

winNumbers.forEach((ballnum, index)=>{  //배열(=>winNumbers)에 들어있는 요소를 하나씩 ballnum이라는 변수로 받아서, 돌아가며 반복 실행

    setTimeout(()=>{
        const ball = document.createElement('div')
        ball.className = 'ball'
        colorize(ballnum, ball)
        ball.textContent = ballnum
        lottoSection.appendChild(ball)
    }, 1000 * (index+1))
})



// 보너스 숫자
const bonusSection = document.querySelector('#bonus')
setTimeout(() => {
    const bonusBall = document.createElement('div')
    bonusBall.className = 'ball'
    colorize(bonus, bonusBall)
    bonusBall.textContent = bonus
    bonusSection.appendChild(bonusBall)
}, 7000)