const inputNumber = document.querySelector('#inputNumber')

const resetButton = document.querySelector('#resetButton')
const plusButton = document.querySelector('#plusButton')
const minusButton = document.querySelector('#minusButton')
const multiplyButton = document.querySelector('#multiplyButton')
const devideButton = document.querySelector('#devideButton')
const caculateButton = document.querySelector('#caculateButton')

const outputNumber = document.querySelector('#outputNumber')


//계산 함수



let temp=[]
let sign


//계산
plusButton.addEventListener('click', ()=>{
    if(inputNumber.value){
        sign = '+'
        console.log(inputNumber.value)
        temp.push(inputNumber.value)
        temp.push(sign)
        console.log(temp)
        inputNumber.value =''
        outputNumber.value =''
    }
})

minusButton.addEventListener('click', ()=>{
    if(inputNumber.value){
        sign = '-'
        console.log(inputNumber.value)
        temp.push(inputNumber.value)
        temp.push(sign)
        console.log(temp)
        inputNumber.value =''
        outputNumber.value =''
    }
})

multiplyButton.addEventListener('click', ()=>{
    if(inputNumber.value){
        sign = '*'
        console.log(inputNumber.value)
        temp.push(inputNumber.value)
        temp.push(sign)
        console.log(temp)
        inputNumber.value =''
        outputNumber.value =''
    }
})

devideButton.addEventListener('click', ()=>{
    if(inputNumber.value){
        sign = '/'
        console.log(inputNumber.value)
        temp.push(inputNumber.value)
        temp.push(sign)
        console.log(temp)
        inputNumber.value =''
        outputNumber.value =''
    }
})

resetButton.addEventListener('click', ()=>{

        inputNumber.value =''
        outputNumber.value =''
        temp = []
        sign = ''

})


caculateButton.addEventListener('click', ()=>{
    if(sign){
        if(inputNumber.value){
            result = eval(temp.join('')+inputNumber.value)
            outputNumber.value = result
        }
        
    } else {
        if(inputNumber.value){
            outputNumber.value = inputNumber.value
        }
    }
})


// caculateButton.addEventListener('click', ()=>{
//     if(sign){
//         if(inputNumber.value){
//             if(sign === '+'){
//                 console.log(temp)
//                 outputNumber.value = temp + Number(inputNumber.value)
//             } else if(sign ==='-'){
//                 outputNumber.value = temp - Number(inputNumber.value)
//             } else if(sign === '*'){
//                 outputNumber.value = temp * Number(inputNumber.value)
//             } else if(sign === '/'){
//                 outputNumber.value = temp / Number(inputNumber.value)
//             }
//             temp = resultInput.value

//         }
        
//     } else {
//         if(inputNumber.value){
//             outputNumber.value = temp;
//         }
//     }
// })





    

