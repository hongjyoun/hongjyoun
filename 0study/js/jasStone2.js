let rival = {
  cost: document.getElementById('rival-cost'),
  hero: document.getElementById('rival-hero'),
  field: document.getElementById('rival-cards'),
  deck: document.getElementById('rival-deck'),
  selected: null,

  dataDeck: [],
  dataField: [],
  dataHero: [],
  dataSelected: null,
}

let mine = {
  cost: document.getElementById('my-cost'),
  hero: document.getElementById('my-hero'),
  field: document.getElementById('my-cards'),
  deck: document.getElementById('my-deck'),
  selected: null,

  dataDeck: [],
  dataField: [],
  dataHero: [],
  dataSelected: null,
}

let turnButton = document.getElementById('turn-button')
let turn = true // true일땐 mine턴, false일땐 rival턴

const deckToField = (data, myturn) => {  // myturn이 true면 mine, false면 rival
  let who = myturn ? mine : rival

  let nowCost = Number(who.cost.textContent)
  if(nowCost < data.cost) {
    return 'end'
  }

  let idx = who.dataDeck.indexOf(data)  // 선택된 data가 deck데이터에서 몇번째 카드인지
  who.dataDeck.splice(idx, 1)  // 선택된 data를 deck데이터에서 빼기
  who.dataField.push(data)  // 선택된 data를 필드데이터에 넣기

  recreateDeck(who)
  recreateField(who)

  data.field = true
  who.cost.textContent = nowCost - data.cost
}

const recreateField = (who) => {
  who.field.innerHTML = ''
  who.dataField.forEach((data)=>{
    connectTag(data, who.field)
  })
}
const recreateDeck = (who) => {
  who.deck.innerHTML = ''
  who.dataDeck.forEach((data)=>{
    connectTag(data, who.deck)
  })
}
const recreateHero = (who) => {
  who.hero.innerHTML = ''
  connectTag(who.dataHero, who.hero, true)
}
const recreateScreen = (myscreen) => {
  let who = myscreen ? mine : rival
  recreateField(who)
  recreateDeck(who)
  recreateHero(who)
}


const turnAction = (card, data, turn) => {   // card는 div 태그이고, data는 배열에 담김 실제 Card 데이터
  let myTurn = turn? mine : rival
  let otherTurn = turn? rival : mine  // turn이 false면 rival 턴이니까 myTurn이 rival이 되고, otherTurn이 mine이 됨
  
  if(card.classList.contains('card-turnover')){
    return
  }

  console.log(turn)
  console.log(data)
  let otherCard = turn? !data.mine : data.mine
  if(otherCard && myTurn.selected) { // 상대영역(otherCard)을 클릭할 때 && 내 선택카드가 있을 떄
    data.hp = data.hp - myTurn.dataSelected.att
    if (data.hp <= 0) {
      let idx = otherTurn.dataField.indexOf(data)
      if (idx > -1) {
        otherTurn.dataField.splice(idx, 1)
      } else { 
        alert('승리하셨습니다')
        startSetting()
      }
    }
    recreateScreen(!turn) // 지금 턴의 반대쪽의 화면을 다시 그리기
    
    myTurn.selected.classList.remove('card-selected')
    myTurn.selected.classList.add('card-turnover')
    myTurn.selected = null
    myTurn.dataSelected = null
    return
  } else if (otherCard) {
    console.log(otherCard)
    console.log(!data.mine)
    return
  }


  if(data.field) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.classList.remove('card-selected')
    })
    card.classList.add('card-selected')
    myTurn.selected = card
    myTurn.dataSelected = data
    // console.log(card)
    // console.log(data)
  } else {
    if (deckToField(data, turn) !== 'end') {
      console.log('what?')
      turn ? makeMineDeck(1) : makeRivalDeck(1)
    }
  }
}




const connectTag = (data, whichtag, hero) => {   // data들을 실제 태그로 구현
  const card = document.querySelector('.card-hidden .card').cloneNode(true)  // card div를 복사
  card.querySelector('.card-cost').textContent = data.cost
  card.querySelector('.card-att').textContent = data.att
  card.querySelector('.card-hp').textContent = data.hp
  if(hero) {
    card.querySelector('.card-cost').style.display = 'none'
  }
  
  card.addEventListener('click', ()=>{
    turnAction(card, data, turn)
  })

  whichtag.appendChild(card)
}







const makeRivalHero = () => {  // data에 담고 + 화면에 그리고
  rival.dataHero = makingCard(true)
  connectTag(rival.dataHero, rival.hero, true) 
}
const makeMineHero = () => {  // data에 담고 + 화면에 그리고
  mine.dataHero = makingCard(true, true)
  connectTag(mine.dataHero, mine.hero, true)
}
const makeRivalDeck = (num) => {  // data에 담고 + 화면에 그리고
  for (i=0; i<num; i++) {
    rival.dataDeck.push(makingCard())
  }
  recreateDeck(rival)
}
const makeMineDeck = (num) => {  // data에 담고 + 화면에 그리고
  for (i=0; i<num; i++) {
    mine.dataDeck.push(makingCard(false, true))
  }
  recreateDeck(mine)
}


function Card(hero, mine) {
  if (hero) {
    this.att = Math.ceil(Math.random() * 5)
    this.hp = Math.ceil(Math.random() * 5) + 25
    this.hero = true
    this.field = true
  } else {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5)
    this.cost = Math.floor((this.att + this.hp) / 2)
  }
  if (mine) {
    this.mine = true
  }
}

const makingCard = (hero, mine) => {
  return new Card(hero, mine)
}

const startSetting = () => {
  [rival, mine].forEach(function (item) {
    item.dataHero = []
    item.dataField = []
    item.dataDeck = []
    item.selected = []
    item.dataSelected = []
  })
  makeRivalHero()
  makeMineHero()
  makeRivalDeck(5)
  makeMineDeck(5)
  recreateScreen(true)
  recreateScreen(false)
}

turnButton.addEventListener('click', ()=>{
  let who = turn ? mine : rival
  document.getElementById('rival').classList.toggle('turn')
  document.getElementById('my').classList.toggle('turn')
  recreateField(who)
  recreateHero(who)
  turn = !turn
  if(turn) {
    mine.cost.textContent = 10
  } else {
    rival.cost.textContent = 10
  }
})



startSetting()