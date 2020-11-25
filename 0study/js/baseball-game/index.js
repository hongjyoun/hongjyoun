const input = document.querySelector('#input')
const check = document.querySelector('#check')
const logs = document.querySelector('#logs')


let count = 0
let answer = [];
let numbers = [];
for (let n=0; n<=9; n++){
    numbers.push(n)
}

for(i=0; i<4; i++){     
    const index = Math.floor(Math.random() * (10-i))
    answer.push(numbers[index])   //number에서 고른 숫자를 answer 배열에 넣어줌
    numbers.splice(index, 1) // numbers에 있는 숫자를 하나씩 빼고, 배열의 길이를 그 만큼 잘라냄(splice)
}

console.log(answer)
console.log(answer.join(''))     // answer 배열 안에 있는 값들을 하나로 합쳐서 문자열로 만듬 (3,4,5,6) -> '3456'



check.addEventListener('click', () =>{
    const value = input.value
    if(value && value.length === 4){
        if (answer.join('') === value){
            logs.appendChild(document.createTextNode('홈런'))  // 계속 로그 텍스트를 추가해줌
        } else {
            
            let strike = 0
            let ball = 0

            for (const [aIndex, anumber] of answer.entries()){  //for-of 문 // answer(랜덤하게 뽑힌 정답숫자) 배열의 숫자들을 차례로 불러와서 number라는 변수에 담아줌
                for (const [iIndex, istring] of input.value.split('').entries()){   //원래 input.value 의 input 값을 가져오는거였는데, entries()를 붙이기 위해 (몇번째 자리인지 파악하기 위해) input.value를 나눠서(split)배열로 만든다음에 entries를 붙임
                    if(anumber === Number(istring)){
                        if(aIndex === iIndex){
                            strike += 1
                        }else {
                            ball += 1
                        }
                    }
                }
            }
            const message = document.createTextNode(`${input.value} : ${strike}스트라이크 ${ball}볼`)
            logs.appendChild(message)   //strike+'스트라이크 '+ball+'볼'
            logs.appendChild(document.createElement('br'))
            if(count>10){
                logs.appendChild(document.createTextNode(`게임오버: ${answer.join('')}`))
            } else {
                count ++
            }
        }
    }

});

