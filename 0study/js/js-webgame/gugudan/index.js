
document.querySelector('#click').addEventListener('click', () => {
    const name = document.querySelector('#name').value
    const job = document.getElementById('job')
    const job_selected = job.options[job.selectedIndex].text
    const result_select = document.querySelector('#result')

    if (name!= null) {
        if (job_selected!= null) {
            result_select.textContent = name + " 님의 직업은" + job_selected + "입니다";

        } else {
            result_select.textContent = "직업을 선택해주세요"
        }

    } else {
        result_select.textContent = "이름을 알려주세요"
    }
})