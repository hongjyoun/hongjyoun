const winSection = document.querySelector('#winSection')
const bunusSection = document.querySelector('#bunusSection')

//1-45 숫자 뽑기
const tempNum = Array(45).fill().map((v,i) => i+1)
console.log(tempNum.length)


//무작위 숫자로 만들어서 7개 추출하기 + 내림차순 정렬
const Shuffle = (arr) => {
    for (let i = arr.length-1; i>0; i--){
        let j = Math.floor(Math.random() * arr.length)
        let x = arr[i]
        arr[i] = arr[j]
        arr[j] = x
    }
    return arr
}
const tempNumShuffled = Shuffle(tempNum)
const winNumbers = tempNumShuffled.splice(0, 7)
const winNumbersSorted = winNumbers.sort((p,c)=>{
    return p-c
})

console.log(winNumbersSorted)


//함수: 화면에 표시
const showNumber = (i, section) => {
        const div = document.createElement('div')
        div.className = "ball"
        div.textContent = winNumbersSorted[i]
        if (winNumbersSorted[i] < 10) {
            div.style.background = "red"
            div.style.color = "white"
        } else if (winNumbersSorted[i] < 20){
            div.style.background = "yellow"
        } else if (winNumbersSorted[i] < 30){
            div.style.background = "orange"
        } else if (winNumbersSorted[i] < 40){
            div.style.background = "green"
        } else if (winNumbersSorted[i] < 50){
            div.style.background = "blue"
            div.style.color = "white"
        }
        let divInsert = section.appendChild(div)
        return divInsert
}


//당첨번호 6개 표시
for (let i=0; i<6; i++){
    setTimeout(() => {
        showNumber(i,winSection)
    }, 1000 * (i+1))
}

    

//보너스번호 1개 표시
setTimeout(() => {
    showNumber(6,bunusSection)
}, 1000 * 7)


