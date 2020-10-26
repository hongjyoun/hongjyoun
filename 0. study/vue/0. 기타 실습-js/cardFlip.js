const row = 4
const col = 3
let colorTemp = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink']
let colorBackup = colorTemp.slice()
let color = []
let clickFlag = true
let clickData = []
let winCard = []
let startTime = null


// 카드 색깔 섞기
function Shuffle() {
  for (let i=0; colorBackup.length > 0; i+=1) {
    color = color.concat(colorBackup.splice(Math.floor(Math.random()*colorBackup.length), 1))
  }
}




// 카드 놓기
function cardSetting(r, c) {
  clickFlag = false

  // 화면에 그리기
  for (let i=0; i<r * c; i+=1) {
    const card = document.createElement('div')
    card.className ='card'

    const cardInner = document.createElement('div')
    cardInner.className ='card-inner'

    const cardFront = document.createElement('div')
    cardFront.className ='card-front'

    const cardBack = document.createElement('div')
    cardBack.className ='card-back'
    cardBack.style.backgroundColor=color[i]

    cardInner.appendChild(cardFront)
    cardInner.appendChild(cardBack)
    card.appendChild(cardInner)


    // 카드 클릭했을 때 이벤트 각각 부여하기
    card.addEventListener('click', ()=>{
      if (clickFlag && !winCard.includes(card)) {
        card.classList.toggle('flipped') // toggle: 스위치같은 기능. flipped가 없으면 넣고, 있으면 빼줌
        clickData.push(card)
        if (clickData.length === 2) {
          // console.log(clickData[0].querySelector('.card-back').style.backgroundColor)
          // console.log(clickData[1].querySelector('.card-back').style.backgroundColor)
          if ( // 뒤집은 카드 2개의 색이 같으면
          clickData[0].querySelector('.card-back').style.backgroundColor ===
          clickData[1].querySelector('.card-back').style.backgroundColor
          ) {
            winCard.push(clickData[0])
            winCard.push(clickData[1])
            clickData= []
            // console.log(winCard)
            // 이겼을 때
            if (winCard.length === row * col) {
              const endTime = new Date()
              alert(`성공! ${(endTime - startTime)/1000}초 걸렸습니다`)

              // 초기화
              document.querySelector('#wrapper').innerHTML = ''
              colorBackup = colorTemp.slice()
              color = []
              winCard = []
              startTime = null
              Shuffle()
              cardSetting(row, col)
            }
          } else { // 뒤집은 카드 2개의 색이 다르면
            clickFlag = false
            setTimeout(()=>{
              clickData[0].classList.remove('flipped')
              clickData[1].classList.remove('flipped')
              clickFlag = true
              clickData = []
            }, 1000)
          }
        }
      }
    })

    // 카드 최종적으로 div(wrapper)에 그리기
    document.querySelector('#wrapper').appendChild(card)
  }


  // 카드 0.1초씩 연달아 여는 효과
  document.querySelectorAll('.card').forEach((card, index)=>{
    setTimeout(()=>{
      card.classList.add('flipped')
    }, 1000 + 100 * index)
  })

  // 다 보여준 뒤, 5초 후에 다시 뒤집음
  setTimeout(()=>{
    document.querySelectorAll('.card').forEach((card, index) =>{
      card.classList.remove('flipped')
    })
    clickFlag = true
    startTime = new Date()
  }, 5000)
}


// 위 함수 실행
Shuffle()
console.log(colorBackup)
cardSetting(row, col)