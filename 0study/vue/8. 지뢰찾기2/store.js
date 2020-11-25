import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);  


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
  OPENED: 0 
}


const plantMine = (row, cell, mine) => {
  let tempData = [] 
  let tempNum = Array(cell*row).fill().map(v => CODE.NORMAL)

  let tempNum2 = Array(cell*row).fill().map((v,i) => i+1)
  let shuffled = []
  for (let i=0; i<cell*row; i++){
      const randomNum = Math.floor(Math.random()*(tempNum2.length))
      let spliced = []
      spliced = tempNum2.splice(randomNum, 1)
      shuffled = shuffled.concat(spliced)
  }
  
  let mineIdx = []
  mineIdx = shuffled.splice(0, mine)
    mineIdx.forEach((v)=>{
      tempNum[v] = CODE.MINE
  })
  
  for (let i=0; i<row; i++) {
      tempData.push(tempNum.splice(0, cell))
  }
  console.log(tempData)
  return tempData
}


export default new Vuex.Store({   
  state: {  // 데이터로 관리할 것
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    halted: true, // true일 때, 게임이 중단됨. 게임이 시작되면 false로 
    result: '',
  },
  getters: { 

  }, 
  mutations: { 
    [START_GAME](state, { row, cell, mine }) { 
      state.data = {
        row,
        cell,
        mine,
      }
      state.tableData = plantMine(row, cell, mine)
      // console.log(state.tableData)
      state.timer = 0
      state.halted = false
      state.openedCount = 0
      console.log(state.halted)
    },

    [OPEN_CELL](state, { row, cell }) {
      // state.tableData[row][cell] = CODE.OPENED  // 배열에서 index로 데이터에 접근할 때는 값이 안바뀌기 때문에(vue 특) Vue.set을 써줘야 함
      console.log('열림')
      let openedCount = 0;
      const checked = [];

      function checkAround(row, cell) { // 주변 8칸 지뢰인지 검색
        const checkRowOrCellIsUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
        if (checkRowOrCellIsUndefined) {
          return;
        }
        if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
          return;
        }
        if (checked.includes(row + '/' + cell)) {
          return;
        } else {
          checked.push(row + '/' + cell);
        }
        let around = [];
        if (state.tableData[row - 1]) {
          around = around.concat([
            state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]
          ]);
        }
        around = around.concat([
          state.tableData[row][cell - 1], state.tableData[row][cell + 1]
        ]);
        if (state.tableData[row + 1]) {
          around = around.concat([
            state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1]
          ]);
        }
        const counted = around.filter(function(v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        });
        if (counted.length === 0 && row > -1) { // 주변칸에 지뢰가 하나도 없으면
          const near = [];
          if (row - 1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row + 1 < state.tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.forEach((n) => {
            if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        }
        if (state.tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1;
        }
        Vue.set(state.tableData[row], cell, counted.length);
      }


      checkAround(row, cell);
      let halted = false;
      let result = '';

      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다.`;
      }

      state.openedCount += openedCount;
      state.halted = halted;
      state.result = result;

    },

    [CLICK_MINE](state, { row, cell }) {
      console.log('지뢰를 클릭함')
      state.halted = true
      Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE)

    },

    [FLAG_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] === CODE.MINE) {
        Vue.set(state.tableData[row], cell, CODE.FLAG_MINE)
      } else {
        Vue.set(state.tableData[row], cell, CODE.FLAG)
      }
    },

    [QUESTION_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] === CODE.FLAG_MINE) {
        Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE)
      } else {
        Vue.set(state.tableData[row], cell, CODE.QUESTION)
      }
    },

    [NORMALIZE_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
        Vue.set(state.tableData[row], cell, CODE.MINE)
      } else {
        Vue.set(state.tableData[row], cell, CODE.NORMAL)
      }
    },

    [INCREMENT_TIMER](state) {
      state.timer += 1
    },

  }, 

  actions: { 
  }
});
