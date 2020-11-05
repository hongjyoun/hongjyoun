const wrapper = document.querySelector('#wrapper')
const colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink']
const row = 4
const col = 3
let colorsBackup = colors.slice()
let shuffledColors = []

let data = []
let clickData = []
let winCard = []

let clickFlag = true

let startTime = null
let endTime = null

const shuffle = () => {
  for (i=0; colorsBackup.length>0; i++) {
    let temp = colorsBackup.splice(Math.floor(Math.random()*colorsBackup.length),1)
    shuffledColors= shuffledColors.concat(temp)
  }
  // console.log(shuffledColors)
}

const cardSetting = (r,c) => {
  clickFlag = false
  for (i=0; i<r*c; i++){
    const card = document.createElement('div')
    card.className = 'card'
  
    const cardInner = document.createElement('div')
    cardInner.className = 'card-inner'
  
    const cardFront = document.createElement('div')
    cardFront.className = 'card-front'
  
    const cardBack = document.createElement('div')
    cardBack.className = 'card-back'
    cardBack.style.backgroundColor = shuffledColors[i]
    
    cardInner.appendChild(cardFront)
    cardInner.appendChild(cardBack)
    card.appendChild(cardInner)
    

    // 카드 클릭했을 때

    card.addEventListener('click', ()=>{
      if (clickFlag) {
        card.classList.toggle('flipped')
        clickData.push(card)
        console.log(clickData)
  
        if (clickData.length === 2) {
          if (
            clickData[0].querySelector('.card-back').style.backgroundColor === 
            clickData[1].querySelector('.card-back').style.backgroundColor
          ) {  // 두 장의 색이 같을 경우
            console.log('같습니다')
            winCard.push(clickData[0])
            winCard.push(clickData[1])
            clickData = []
            
            console.log(winCard)
            
            if(winCard.length === row * col) { // 모든 카드를 찾았을 때
              endTime = new Date()
              totalTime = (endTime - startTime) / 1000
              alert(`이겼습니다. 걸린 시간: ${totalTime}`)

              document.querySelector('#wrapper').innerHTML = ''
              colorsBackup = colors.slice()
              shuffledColors = []
              winCard = []
              startTime = null

              shuffle()
              cardSetting(row,col)

            }
          } else {  // 두 장의 색이 다를 경우
            clickFlag = false
            console.log('다릅니다')
            setTimeout(()=>{
              clickData[0].classList.remove('flipped')
              clickData[1].classList.remove('flipped')
              clickData = []
              clickFlag = true
            }, 1000)
          }
        }
      }
    })
    wrapper.appendChild(card)
  }


  // 처음에 잠깐 보여주고, 가림
   document.querySelectorAll('.card').forEach((v, i)=>{
    setTimeout(()=>{
      v.classList.add('flipped')
    },1000 + 100*i)
   })

   setTimeout(()=>{
     document.querySelectorAll('.card').forEach((v, i)=>{
       v.classList.remove('flipped')
     })
     clickFlag = true
     startTime = new Date()
   },5000)
}






shuffle()
cardSetting(row,col)
