const computerTag = document.querySelector('#computer')
computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0`

let computerChoice = 'rock'
const Choice = {
    rock: '0',
    scissors: '-142px',
    paper: '-284px'
}

const intervalMaker = () => {   // 인터벌(간격)을 만드는 intervalMaker라는 함수를 정의. 함수가 실행되기 전까지는 작동하지 않는다.
    return setInterval(()=> {
        if(computerChoice === 'rock'){
            computerChoice = 'scissors'
        } else if(computerChoice === 'scissors'){
            computerChoice = 'paper'
        } else if(computerChoice === 'paper'){
            computerChoice = 'rock'
        }
        computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${Choice[computerChoice]} 0`
    }, 50)
}


let intervalId = intervalMaker() // 함수 실행


const rockTag = document.querySelector('#rock')
const scissorsTag = document.querySelector('#scissors')
const paperTag = document.querySelector('#paper')

const scoreTag = document.querySelector('#score')

const score = {
    rock: 0,
    scissors: 1, 
    paper: 2
}

const clickButton = (myChoice) => () =>{
    clearInterval(intervalId)
    const myScore = score[myChoice]
    const comScore = score[computerChoice]
    const diff = comScore - myScore
    let accScore = Number(scoreTag.textContent)

    if (diff === 1 || diff === -2){
        accScore += 1

    } else if (diff === -1 || diff === 2){
        accScore -= 1

    }

    scoreTag.textContent = accScore
    setTimeout(()=>{
        intervalId = intervalMaker()
    }, 1000)
}


rockTag.addEventListener('click', clickButton('rock'))
scissorsTag.addEventListener('click', clickButton('scissors'))
paperTag.addEventListener('click', clickButton('paper'))