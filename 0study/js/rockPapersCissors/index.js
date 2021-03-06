const computerTag = document.querySelector('#computer');
computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0`;

let computerChoice = 'rock'
const rspCoord = {
    rock: '0',
    scissors: '-142px',
    paper:'-284px'
}

const intervalMaker = () => {
    return setInterval(()=>{
        if (computerChoice === 'rock'){
            computerChoice = 'scissors'
        } else if(computerChoice === 'scissors') {
            computerChoice = 'paper'
        } else if(computerChoice === 'paper'){
            computerChoice = 'rock'
        }
        computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${rspCoord[computerChoice]} 0`;
    
    },50);
}

let intervalId = intervalMaker()


const rockTag = document.querySelector('#rock')
const scissorsTag = document.querySelector('#scissors')
const paperTag = document.querySelector('#paper')

// 가위1, 바위0, 보-1
// 나/컴퓨터   가위   바위   보
//    가위      0      1     2    // 가위-가위   바위-가위    보-가위
//    바위      -1     0     1
//     보       -2     -1    0

const score = {
    rock: 0,
    scissors: 1,
    paper: -1
}


const clickButton = (myChoice) => ()=>{
        clearInterval(intervalId)
        const myScore = score[myChoice]
        const comScore = score[computerChoice]
        const diff = myScore - comScore
        const scoreTag = document.querySelector('#score')
        let accScore = Number(scoreTag.textContent)
        if(diff === 2 || diff === -1){
            accScore += 1
        }else if(diff === -2 || diff === 1){
            accScore -= 1
        }
        scoreTag.textContent = accScore
        setTimeout(()=>{
            intervalId = intervalMaker()
        }, 1000)
        
}  // 함수를 리턴하는 함수. 이 함수는 다른 함수를 리턴한다.
// 그냥 함수만 만들면, 함수는 무조건 return 값이 있어야 하는데, return값이 undefined이 기본이기 때문에, 함수를 리턴한다.


rockTag.addEventListener('click', clickButton('rock'))

scissorsTag.addEventListener('click', clickButton('scissors'))

paperTag.addEventListener('click', clickButton('paper'))