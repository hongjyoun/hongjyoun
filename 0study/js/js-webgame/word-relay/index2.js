const display = document.querySelector('#display')
const inputText = document.querySelector('#inputText')
const button = document.querySelector('#button')
const alert = document.querySelector('#alert')


button.addEventListener('click', ()=>{
    
    const word = display.innerHTML
    let lastWord = word.charAt(word.length-1)
    firstWord = inputText.value.charAt(0)
    if(firstWord === lastWord){
        display.innerHTML = inputText.value
        inputText.value =''
    } else {
        alert.innerHTML = "잘못 입력하셨습니다"
        inputText.value =''
    }

})