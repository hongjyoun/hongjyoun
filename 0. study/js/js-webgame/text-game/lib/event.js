const hp_selected = document.querySelector('.hp')
hp_selected.textContent = '체력: 100'

window.onload = function() {
    ///////////////// start 버튼 ///////////////////
    const start_btn = document.querySelector('#start-button')
    if (start_btn) {
        start_btn.addEventListener('click',() => {
            const job = document.getElementById('job')
            const job_selected = job.options[job.selectedIndex].value
    
            if(job_selected == "baeksoo"){
                location.href="1.html"
            }
        })
    }
    


    ///////////////// 1페이지 버튼 ///////////////////

    const btn1yes = document.querySelector('#btn1yes')
    if (btn1yes) {
        btn1yes.addEventListener('click', () => {
            location.href="2.html"
        })
    }
    

    const btn1no =document.querySelector('#btn1no')
    if (btn1yes) {
        btn1no.addEventListener('click',() => {
            location.href="1-1.html"
        })
    }

    ///////////////// 2페이지 버튼 ///////////////////
    

};



function btnClick(btnId, filename) {
    const btn1yes =document.querySelector(btnId)
    btn1yes.addEventListener('click',() => {
        location.href = filename;
    })
}
