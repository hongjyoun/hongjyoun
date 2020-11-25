const btn = document.querySelector('#button')


btn.addEventListener('click',() => {
    // debugger;
    const word = document.querySelector('#word').textContent
    const input = document.querySelector('#input').value
    const lastIndex = word.length-1

    if (word[lastIndex] === input[0]){
        document.querySelector('#word').textContent = input
        document.querySelector('#error').textContent = ''
        document.querySelector('#input').value = ''
        document.querySelector('#input').focus()

    }else{
        document.querySelector('#error').textContent = '다시 입력하세요'
        document.querySelector('#input').value = ''
        document.querySelector('#input').focus()
    }

})