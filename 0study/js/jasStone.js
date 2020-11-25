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

  deckRecreate(who)
  fieldRecreate(who)

  data.field = true
  who.cost.textContent = nowCost - data.cost

}

function fieldRecreate(what) {
  what.field.innerHTML = ''
  what.dataField.forEach((data)=>{
    connectTag(data, what.field) 
  })
}
function deckRecreate(what) {
  what.deck.innerHTML = ''
  what.dataDeck.forEach((data)=>{
    connectTag(data, what.deck) 
  })
}
function heroRecreate(what) {
  what.hero.innerHTML=''
  connectTag(what.dataHero, what.hero, true)
}


// 화면 다시그리기
function screenRecreate(myscreen) {
  const who = myscreen ? mine : rival

  deckRecreate(who)
  fieldRecreate(who)
  heroRecreate(who)
}

function turnAction(tagCard, data, me) {
  let myTurn = me ? mine : rival
  let rivalTurn = me ? rival : mine
  if (tagCard.classList.contains('card-turnover')) {
    return
  }

  let rivalCardCheck = me? !data.mine : data.mine
  if (rivalCardCheck && myTurn.selectedCard) { 
    data.hp = data.hp - myTurn.dataSelected.att
    if(data.hp <= 0) {  // 카드가 죽었을 때
      const index = rivalTurn.dataField.indexOf(data)
      if (index > -1) {  // 쫄병이 죽었을 때
        rivalTurn.dataField.splice(index, 1)
      } else {  // 영웅이 죽었을 때
        alert('승리하셨습니다')
        startSetting()

      }
    }
    screenRecreate(!me)
    myTurn.selectedCard.classList.remove('card-selected')
    myTurn.selectedCard.classList.add('card-turnover')
    myTurn.selectedCard = null
    myTurn.dataSelected = null
    return

  } else if (rivalCardCheck){  
    return
  } 

  if (data.field) {  // 카드가 필드에 있으면
    tagCard.parentNode.querySelectorAll('.card').forEach((card)=>{
      card.classList.remove('card-selected')
    })  // 모든 카드들의 '선택됨' 태그를 없앤 후에
    tagCard.classList.add('card-selected')  // 내가 선택한 카드 1개만 선택될 수 있도록
    myTurn.selectedCard = tagCard
    myTurn.dataSelected = data

  } else {  // 필드에 없으면(덱에 있으면)
    if(deckToField(data, me) !== 'end') {
      me ? makeDeckMy(1) : makeDeckRival(1)
    }
  } 
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
    // console.log(tagCard)
  }

  tagCard.addEventListener('click', (card)=>{
    turnAction(tagCard, data, turn)
  })
  whichTag.appendChild(tagCard)
}


// 초기 세팅시, 카드만드는 관련 함수
function makeDeckRival(num) {
  for(let i=0; i<num; i++){
    rival.dataDeck.push(cardMaking())
  }
  deckRecreate(rival)
}
function makeDeckMy(num) {
  for(let i=0; i<num; i++){
    mine.dataDeck.push(cardMaking(false, true))
  }
  deckRecreate(mine)
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
  [rival, mine].forEach((item)=>{
    item.dataDeck = []
    item.dataHero = []
    item.dataField = []
    item.dataSelected = []
    item.selectedCard = []
  })
  makeDeckRival(5)
  makeDeckMy(5)
  makeHeroRival()
  makeHeroMy()
  screenRecreate(true)
  screenRecreate(false)
}


// 생성자
function Card(hero, myCard) {
  if(hero){
    this.att = Math.ceil(Math.random() * 2)
    this.hp = Math.ceil(Math.random() * 5) + 25
    this.hero = true
    this.field = true
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
  fieldRecreate(who)
  document.getElementById('my').classList.toggle('turn')
  heroRecreate(who)

  // 턴을 넘김
  turn = !turn    // false면 true로, true면 false로
  if (turn) {
    mine.cost.textContent = 10
  } else {
    rival.cost.textContent = 10
  }
})