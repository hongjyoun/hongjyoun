////// 입력창과 버튼 가져오기
const input = document.querySelector('#input')
const input_button = document.querySelector('#input_button')
const logs = document.querySelector('#logs')

////// 정답 랜덤 뽑기
const answer = [] // ==> 정답 4자리
const temp_num = []
for (n=0; n<10; n++){
    temp_num.push(n)
}

for (i=0; i<4; i++) {
    const index = Math.floor(Math.random()*(10-i))
    answer.push(temp_num[index])
    temp_num.splice(index, 1)
}



////// 시도횟수 세기
let count = 0;

console.log(answer)
////// 인풋과 정답 비교하기


input_button.addEventListener('click', () => {
    const value = String(input.value)
    if (value && value.length === 4){
        if (value === answer.join('')){ // 인풋과 정답이 완전히 일치한다면
            logs.appendChild(document.createTextNode('홈런'))
        } else { // 일치하지 않는다면
            let strike=0;
            let ball=0;
            // console.log(value)
            // console.log()

            for(i=0; i<4; i++){
                for(n=0; n<4; n++){
                    // console.log(value.charAt(i))
                    // console.log(answer[i])
                    if (value.charAt(i) === String(answer[n])){
                        if (i === n){
                            strike++
                        } else {
                            ball++
                        }
                    }
                }
            }

            //로그에 스트라이크와 볼 개수 표시
            logs.appendChild(document.createTextNode(`${strike}스트라이크, ${ball}볼`))
            logs.appendChild(document.createElement('br'))
            if(count<10){
                count++
            } else {
                logs.appendChild(document.createTextNode(`게임오버: 정답은 ${answer.join('')}`))
            }
        }
    }
})