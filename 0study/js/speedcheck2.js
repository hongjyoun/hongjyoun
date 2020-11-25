const screen = document.getElementById('screen')
const record = document.getElementById('record')

let startTime = null

screen.addEventListener('click', ()=>{
  
  console.log(startTime)

  if (screen.className === 'waiting') {
    screen.innerHTML = '초록색이 되면 클릭하세요'
    screen.classList.remove('waiting')
    screen.classList.add('ready')
    timeout = setTimeout(()=>{
      startTime = new Date()
      screen.click()
    }, Math.floor(Math.random()*7)*1000)

  } else if (screen.className === 'ready'){
    if (!startTime) {
      screen.innerHTML = '너무 성급하시네요!'
      screen.classList.remove('ready')
      screen.classList.add('waiting')
    } else {
      screen.innerHTML = '클릭!'
      screen.classList.remove('ready')
      screen.classList.add('now')
    }


  } else if (screen.className === 'now') {
    nowTime = new Date()
    let totalTime = nowTime - startTime
    console.log(totalTime)
    record.innerHTML = totalTime
    screen.innerHTML = '다시 시작하려면 클릭하세요'
    screen.classList.remove('now')
    screen.classList.add('waiting')
 }


})