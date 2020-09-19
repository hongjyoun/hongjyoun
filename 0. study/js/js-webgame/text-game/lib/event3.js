
const hp_selected = document.querySelector('.hp')
hp_selected.textContent = '체력: 100'

///////////////// 2페이지 버튼 ///////////////////

const btn3yes =document.querySelector('#btn3yes')
btn3yes.addEventListener('click',() => {
    location.href="4_final.html"
})

const btn3no =document.querySelector('#btn3no')
btn3no.addEventListener('click',() => {
    location.href="3_1.html"
})