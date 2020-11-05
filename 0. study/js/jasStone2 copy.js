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


const connectTag = (data, whichtag, hero) => {   // data들을 실제 태그로 구현
  const card = document.querySelector('.card-hidden .card').cloneNode(true)  // card div를 복사
  card.querySelector('.card-cost').textContent = data.cost
  card.querySelector('.card-att').textContent = data.att
  card.querySelector('.card-hp').textContent = data.hp
  if(hero) {
    card.querySelector('.card-cost').style.display = 'none'
  }
  
  


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
  rival.dataDeck.forEach((data)=>{
    connectTag(data, rival.deck)
  })
}
const makeMineDeck = (num) => {  // data에 담고 + 화면에 그리고
  for (i=0; i<num; i++) {
    mine.dataDeck.push(makingCard())
  }
  mine.dataDeck.forEach((data)=>{
    connectTag(data, mine.deck)
  })
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
  makeRivalHero()
  makeMineHero()
  makeRivalDeck(7)
  makeMineDeck(7)

}

startSetting()