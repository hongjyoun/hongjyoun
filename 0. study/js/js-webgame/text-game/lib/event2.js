
const hp_selected = document.querySelector('.hp')
hp_selected.textContent = '체력: 100'

///////////////// 2페이지 버튼 ///////////////////

const btn2yes =document.querySelector('#btn2yes')
btn2yes.addEventListener('click',() => {
    location.href="3.html"
})

const btn2no =document.querySelector('#btn2no')
btn2no.addEventListener('click',() => {
    location.href="2_1.html"
})