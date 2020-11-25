const tempNum = Array(9).fill().map((v,i)=>i+1)

//함수 - 무작위로 섞기
const Shuffle = (arr) => {
    for (let i = arr.length-1; i>0; i--){
        let j = Math.floor(Math.random() * arr.length)
        let x = arr[i]
        arr[i] = arr[j]
        arr[j] = x
    }
    return arr
}

//섞은 숫자 배열에서 4개 뽑기
const tempNumShuffled = Shuffle(tempNum)
const winNum = tempNumShuffled.splice(0,4)

console.log(winNum)

//화면 요소 가져오기
const inputNumber = document.querySelector('#inputNumber')
const button = document.querySelector('#button')
const logs = document.querySelector('#logs')

let count = 0;

//클릭시 비교하기
button.addEventListener('click', () => {
    const input = inputNumber.value
    if(input && input.length === 4) {
        if(input === winNum.join('')){
            logs.appendChild(document.createTextNode('홈런'))
        } else {
            let ball = 0;
            let strike = 0;
            for (let i=0; i<4; i++){
                for (let n=0; n<4; n++){
                    console.log(winNum[i], Number(input.charAt(n)))
                    if (winNum[i] === Number(input.charAt(n)))
                        if(i === n){
                            strike ++
                        } else {
                            ball++    
                        }
                }
            }
            logs.appendChild(document.createTextNode(`${strike}스트라이크, ${ball}볼`))
            logs.appendChild(document.createElement('br'))
            if(count>9){
                logs.appendChild(document.createTextNode(`게임오버! 정답은 : ${winNum.join('')}`))
            } else {
                count ++
            }
        }



    }
})
