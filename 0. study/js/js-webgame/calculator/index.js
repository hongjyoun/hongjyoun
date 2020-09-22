const numberInput = document.querySelector('#input');
const clearButton = document.querySelector('#clear');
const plusButton = document.querySelector('#plus');
const minusButton = document.querySelector('#minus');
const divideButton = document.querySelector('#divide');
const multiplyButton = document.querySelector('#multiply');
const calculateButton = document.querySelector('#calculate');
const resultInput = document.querySelector('#result');


let temp
let operator;


////더하기 버튼////
plusButton.addEventListener('click', ()=>{
    if(numberInput.value){
        temp = Number(numberInput.value)
        operator = '+'
        numberInput.value = ''
        resultInput.value = ''
    }    
})

////빼기 버튼////
minusButton.addEventListener('click', ()=>{
    if(numberInput.value){
        temp = Number(numberInput.value)
        operator = '-'
        numberInput.value = ''
        resultInput.value = ''
    }    
})

////곱하기 버튼////
multiplyButton.addEventListener('click', ()=>{
    if(numberInput.value){
        temp = Number(numberInput.value)
        operator = 'X'
        numberInput.value = ''
        resultInput.value = ''
    }    
})

////나누기 버튼////
divideButton.addEventListener('click', ()=>{
    if(numberInput.value){
        temp = Number(numberInput.value)
        operator = '/'
        numberInput.value = ''
        resultInput.value = ''
    }    
})

clearButton.addEventListener('click', ()=>{
    numberInput.value = ''
    temp = null
    operator = null   
})


calculateButton.addEventListener('click', ()=>{
    if(operator){
        if(numberInput.value){
            if (operator === '+'){
                resultInput.value = temp + Number(numberInput.value)
            } else if (operator === '-'){
                resultInput.value = temp - Number(numberInput.value)
            } else if (operator === '/'){
                resultInput.value = temp / Number(numberInput.value)
            } else {
                resultInput.value = temp * Number(numberInput.value)
            }
            temp = resultInput.value
        } 
    } else{
        if(numberInput.value){
            resultInput.value = temp;
        } 
    }


   
})