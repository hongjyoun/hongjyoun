
const hp_selected = document.querySelector('.hp')
hp_selected.textContent = '체력: 100'

///////////////// 1_1페이지 버튼 ///////////////////

const btn1_1yes =document.querySelector('#btn1_1yes')
btn1_1yes.addEventListener('click',() => {
    location.href="1_2.html"
})

const btn1_1no =document.querySelector('#btn1_1no')
btn1_1no.addEventListener('click',() => {
    location.href="1.html"
})