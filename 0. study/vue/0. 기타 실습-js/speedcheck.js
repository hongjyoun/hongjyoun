const screen = document.querySelector('#screen')
const recordTag = document.querySelector('#record')

let startTime
let endTime
let record = []

const timeout = null

screen.addEventListener('click', ()=>{
  
  if(screen.classList.contains('waiting')){
    screen.classList.remove('waiting')
    screen.classList.add('ready')
    screen.textContent = '준비...'
    timeout = setTimeout(()=>{
      startTime = new Date()
      screen.click()
    }, Math.floor(Math.random()*1000+2000))

  } else if(screen.classList.contains('ready')){
      if(!startTime) {
        clearTimeout(timeout)
        screen.classList.remove('ready')
        screen.classList.add('waiting')
        screen.textContent = '너무 성급하시네요! 다시!'
      } else {
        screen.classList.remove('ready')
        screen.classList.add('now')
        screen.textContent = '클릭하세요'
      }

  } else if(screen.classList.contains('now')){
    endTime = new Date()
    record.push(endTime - startTime)
    startTime = null
    endTime = null
    screen.classList.remove('now')
    screen.classList.add('waiting')
    screen.textContent = '클릭해서 시작하세요'
    recordTag.textContent = `기록: ${record}`
  }
})