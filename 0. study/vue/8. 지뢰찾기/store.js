import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);  // Vue랑 Vuex 를 연결해주어야 함. store 갖다 쓰기 전에 반드시 이렇게 연결해줘야 오류가 안뜸


// 함수를 '변수'로 지정해준 것 (ES2015 문법임 : object dynamic property)
// export로 붙임으로서 모듈로 만듬. 다른 파일에서도 쓸 수 있게
export const START_GAME = 'START_GAME'  
export const OPEN_CELL = 'OPEN_CELL'
export const CLICK_MINE = 'CLICK_MINE'
export const FLAG_CELL = 'FLAG_CELL'
export const QUESTION_CELL = 'QUESTION_CELL'
export const NORMALIZE_CELL = 'NORMALIZE_CELL'
export const INCREMENT_TIMER = 'INCREMENT_TIMER'


export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0 // 0 이상이면 다 opened, 주변 지뢰 갯수 표시
}


const plantMine = (row, cell, mine) => {
  let tempData = [] 
  let tempNum = Array(cell*row).fill().map(v => CODE.NORMAL)

  let tempNum2 = Array(cell*row).fill().map((v,i) => i+1)
  let shuffled = []
  for (i=0; i<cell*row; i++){
      randomNum = Math.floor(Math.random()*(tempNum2.length))
      let spliced = []
      spliced = tempNum2.splice(randomNum, 1)
      shuffled = shuffled.concat(spliced)
  }
  
  let mineIdx = []
  mineIdx = shuffled.splice(0, mine)
    mineIdx.forEach((v)=>{
      tempNum[v] = CODE.MINE
  })
  
  for (i=0; i<row; i++) {
      tempData.push(tempNum.splice(0, cell))
  }
  console.log(tempData)
  return tempData
}


export default new Vuex.Store({   // export default로 export 한 애들은 import store from './store' 이렇게 store라는 임의의 이름을 사용할 수 있지만,
// 위에 export const START_GAME 이렇게 export 한 애들은 import { START_GAME } from './store' 이렇게 정확한 이름을 {} 안에 넣어야 import 해야 함
// import { START_GAME, OPEN_CELL } 이런 식으로 여러 개 동시에 가져올 수도 있고.
  state: {  // 데이터로 관리할 것
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    result: '',
  },
  getters: { // vue의 computed와 비슷

  }, 
  mutations: { // state를 수정할 때 사용함. 동기적으로. state를 바꿀 때, 바로 바꾸는 게 아니라 mutation을 통해서 바꾸는 걸 권장함
    [START_GAME](state, { row, cell, mine }) {   // data 객체 안의 row, cell, mine 을 구조분해 해서 { row, cell, mine } 이런 식으로 가져올 수 있음
      // 만약 다른 vue 컴포넌트에서 START_GAME을 this.$store.commit 을 통해서 가져올 때,
      // this.$sotre.commit(START_GAME, { row: this.row, cell: this.cell, mine: this.mine }) 이런 식으로 인자들을 전달 할 수 있음. this는 다른 Vue 컴포넌트를 가리키는 거고,
      // row: this.row 를 받아오면, 받아온 row가 아래 식을 통해서 store.js의 data를 바꾸게 됨.
      state.data = {
        row,
        cell,
        mine,
      }
      state.tableData = plantMine(row, cell, mine)
      state.timer = 0
    },
    // START_GAME () {} 원래 이런 식의 함수인데, [START_GAME] 이렇게 양 옆에 대괄호를 붙이면 이 함수를 '변수'로 뺄 수 있다.
    [OPEN_CELL](state) {
      // state.tableData[row][cell] ==> 이런 식으로 배열의 인덱스를 사용해서 수정하면, 데이터는 바뀌어도 화면은 안바뀌는 현상이 있기 때문에
      // Vue.set을 써줘야 함
      // Vue.set(바꾸는 배열, 바뀌는 인덱스, 무얼로 바꿀지)
      // Vue.set(state.tableData[row], cell, state.turn)
      // 그리고 맨 위에 Vue를 import를 해야 함
    },
    [CLICK_MINE](state) {},
    [FLAG_CELL](state) {},
    [QUESTION_CELL](state) {},
    [NORMALIZE_CELL](state) {},
    [INCREMENT_TIMER](state) {},
  }, 

  actions: { // 비동기를 사용할 때 또는 여러 mutation을 연달아 실행할 때

  }
});
