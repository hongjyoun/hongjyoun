let rival = {
  hero : document.getElementById('rival-hero'),
  deck : document.getElementById('rival-deck'),
  field : document.getElementById('rival-cards'),
  cost : document.getElementById('rival-cost'),
  selectedCard: null,
  dataDeck: [],
  dataHero: null,
  dataField: [],
  dataSelected: null,
  
}

let mine = {
  hero : document.getElementById('my-hero'),
  deck : document.getElementById('my-deck'),
  field : document.getElementById('my-cards'),
  cost : document.getElementById('my-cost'),
  selectedCard: null,
  dataDeck: [],
  dataHero: null,
  dataField: [],
  dataSelected: null,
}


const tagTurnButton = document.getElementById('turn-button')
let turn = true   // true면 내 턴, false면 상대 턴


function deckToField(data, myturn) {
  const who = myturn ? mine : rival
  let nowCost = Number(who.cost.textContent)
      
  if (nowCost < data.cost) {
    return 'end'   // true를 리턴하면서 decktoField 함수가 종료됨
  }

  let idx = who.dataDeck.indexOf(data)
  who.dataDeck.splice(idx,1)
  who.dataField.push(data)
  who.deck.innerHTML = ''
  who.field.innerHTML = ''
  who.dataField.forEach((data)=>{
    connectTag(data, who.field) 
  })
  who.dataDeck.forEach((data)=>{
    connectTag(data, who.deck) 
  })

  data.field = true
  who.cost.textContent = nowCost - data.cost

}


// 화면 다시그리기
function screenRecreate(myscreen) {
  const who = myscreen ? mine : rival

  who.deck.innerHTML=''
  who.field.innerHTML=''
  who.hero.innerHTML=''
  
  who.dataField.forEach((data)=>{
    connectTag(data, who.field) 
  })
  who.dataDeck.forEach((data)=>{
    connectTag(data, who.deck) 
  })
  connectTag(who.dataHero, who.hero, true)
}


// 데이터와 화면(tag) 연결
function connectTag(data, whichTag, hero) {
  const tagCard = document.querySelector('.card-hidden .card').cloneNode(true)
  // cloneNode로 기존 태그를 그대로 복사 가능. 
  // 인자에 true 넣으면 내부까지 다 복사
  tagCard.querySelector('.card-cost').textContent = data.cost
  tagCard.querySelector('.card-att').textContent = data.att
  tagCard.querySelector('.card-hp').textContent = data.hp
  if (hero) {
    tagCard.querySelector('.card-cost').style.display = 'none'
    const nameHero = document.createElement('div')
    nameHero.textContent = '영웅'
    tagCard.appendChild(nameHero)
    console.log(tagCard)
  }

  tagCard.addEventListener('click', (card)=>{
    if (turn) {  // 내 턴인데
      if (tagCard.classList.contains('card-turnover')) {
        return
      }
      if (!data.mine && mine.selectedCard) { 
        // 상대 카드면서 && 내 카드가 선택되있을 때
        console.log(mine.dataSelected.att)
        console.log(data.hp)

        data.hp = data.hp - mine.dataSelected.att
        screenRecreate(false)
        mine.selectedCard.classList.remove('card-selected')
        mine.selectedCard.classList.add('card-turnover')
        mine.selectedCard = null
        mine.dataSelected = null

        console.log(data.hp)
        return

      } else if (!data.mine){  
        return
      } 

      if (data.field) {  // 필드에 있는 카드 선택()
        tagCard.parentNode.querySelectorAll('.card').forEach((card)=>{
          card.classList.remove('card-selected')
        })  // 모든 카드들의 '선택됨' 태그를 없앤 후에
        tagCard.classList.add('card-selected')  // 내가 선택한 카드 1개만 선택될 수 있도록
        mine.selectedCard = tagCard
        mine.dataSelected = data

      } else {  // 필드에 없으면(덱에 있으면)
        if(deckToField(data, true) !== 'end') {
          makeDeckMy(1)
        }
      } 
         
           
    } else {  // 상대 턴인데
      if (tagCard.classList.contains('card-turnover')) {
        return
      }
      if (data.mine && rival.selectedCard) { 
        // 내 카드를 누를 때 && 상대방 카드가 선택되어 있을 때
        console.log(rival.dataSelected.att)
        console.log(data.hp)

        data.hp = data.hp - rival.dataSelected.att
        screenRecreate(true)
        rival.selectedCard.classList.remove('card-selected')
        rival.selectedCard.classList.add('card-turnover')
        rival.selectedCard = null
        rival.dataSelected = null

        console.log(data.hp)
        return

      } else if (data.mine){ 
        return
      }

      if (data.field) {
        tagCard.parentNode.querySelectorAll('.card').forEach((card)=>{
          card.classList.remove('card-selected')
        })  // 모든 카드들의 '선택됨' 태그를 없앤 후에
        tagCard.classList.add('card-selected')  // 내가 선택한 카드 1개만 선택될 수 있도록
        rival.selectedCard = tagCard
        rival.dataSelected = data
      } else {
        if(deckToField(data, false) !== 'end'){
          makeDeckRival(1)
        }
      }  
    }
  })


  whichTag.appendChild(tagCard)
}







// 초기 세팅시, 카드만드는 관련 함수
function makeDeckRival(num) {
  for(let i=0; i<num; i++){
    rival.dataDeck.push(cardMaking())
  }
  rival.deck.innerHTML = ''
  rival.dataDeck.forEach((data)=>{
    connectTag(data, rival.deck)
  })
}
function makeDeckMy(num) {
  for(let i=0; i<num; i++){
    mine.dataDeck.push(cardMaking(false, true))
  }
  mine.deck.innerHTML = ''
  mine.dataDeck.forEach((data)=>{
    connectTag(data, mine.deck)
  })
}
function makeHeroRival() {
  rival.dataHero = cardMaking(true)
  connectTag(rival.dataHero, rival.hero, true)
}
function makeHeroMy() {
  mine.dataHero = cardMaking(true, true)
  connectTag(mine.dataHero, mine.hero, true)
}


// 초기 세팅
function startSetting() {
  makeDeckRival(5)
  makeDeckMy(5)
  makeHeroRival()
  makeHeroMy()
}


// 생성자
function Card(hero, myCard) {
  if(hero){
    this.att = Math.ceil(Math.random() * 2)
    this.hp = Math.ceil(Math.random() * 5) + 25
    this.hero = true
  } else {
    this.att = Math.ceil(Math.random() * 5)
    this.hp = Math.ceil(Math.random() * 5)
    this.cost = Math.floor((this.att + this.hp) / 2)
  }
  if(myCard){
    this.mine = true
  }
}

// 생성자로 카드 생성
function cardMaking(hero, myCard) {
  return new Card(hero, myCard)
}

startSetting()


tagTurnButton.addEventListener('click', ()=>{
  
  // 턴을 넘기기 전에, turnover된 카드들을 풀어줌
  const who = turn ? mine : rival
  document.getElementById('rival').classList.toggle('turn')
  document.getElementById('my').classList.toggle('turn')

  who.field.innerHTML=''
  who.hero.innerHTML=''
  
  who.dataField.forEach((data)=>{
    connectTag(data, who.field) 
  })
  connectTag(who.dataHero, who.hero, true)



  // 턴을 넘김
  turn = !turn    // false면 true로, true면 false로
  if (turn) {
    mine.cost.textContent = 10
  } else {
    rival.cost.textContent = 10
  }

})