
const hp_selected = document.querySelector('.hp')
hp_selected.textContent = '체력: 0'

///////////////// 1_2페이지 버튼 ///////////////////

const restart =document.querySelector('#restart')
restart.addEventListener('click',() => {
    location.href="index.html"
})
