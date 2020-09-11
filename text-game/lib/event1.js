
const hp_selected = document.querySelector('.hp')
hp_selected.textContent = '체력: 100'

///////////////// 1페이지 버튼 ///////////////////

const btn1yes =document.querySelector('#btn1yes')
btn1yes.addEventListener('click',() => {
    location.href="2.html"
})

const btn1no =document.querySelector('#btn1no')
btn1no.addEventListener('click',() => {
    location.href="1_1.html"
})