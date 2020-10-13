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
  NORMAL: -1,  // 게임 시작 시, 모든 칸은 모두 -1. 빈칸.
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
}

const plantMine = (row, cell, mine) => {
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  })
  console.log(candidate.length)

  const shuffle = []
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    shuffle.push(chosen)
  }
  console.log(shuffle)

  const data = []
  for (let i=0; i<row; i++){
    const rowData = []
    data.push(rowData)
    for (let j=0; j<cell; j++){
      rowData.push(CODE.NORMAL)
    }
  }
  console.log(data)

  for (let k=0; k<shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell)
    console.log(ver)
    const hor = shuffle[k] % cell
    console.log(hor)
    data[ver][hor] = CODE.MINE
  }

  return data;
}


export default new Vuex.Store({
  state: {
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    halted: true, // 중단된, 초기에는 게임이 중단된 상태, 게임 시작을 눌러야 게임이 시작된 상태(false)
    result: '',
    openedCount: 0,
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
      state.timer = 0
      state.halted = false
      state.openedCount = 0
      state.result = ''
    },
    [OPEN_CELL](state, { row, cell }) {
      let openedCount = 0
      const checked = []
      function checkAround(row, cell) {
        let checkRowOrCellUndefined = row<0 || row >= state.tableData.length || cell <0 || cell >= state.tableData[0].length
        if (checkRowOrCellUndefined){
          return
        } // 셀이나 열 바깥으로 나가버리면 undefined가 되니까, 그걸 방지해주기 위해 체크하는 것
        if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])){
          return
        } // 주변 칸이 이미 열렸거나, 깃발이 있거나, 물음표이거나 등등일 땐, 끝내기
        if (checked.includes(row + '/' + cell)){
          return // 한 번 열었던 칸이면, return해서 종료해버리고
        } else {
          checked.push(row + '/' + cell) // 열지 않았던 칸이면, checked 배열에 기록을 해줌
        } // 스택오버플로우 방지하기 위해 

        let around = [] // 8가지 귀퉁이를 다 추가해줌
        if (state.tableData[row-1]) { // row-1 이 undefined면 에러가 나니까, 보호 연산자로 감싸줌
          around = around.concat([
            state.tableData[row-1][cell-1],
            state.tableData[row-1][cell],
            state.tableData[row-1][cell+1]
          ])
        }
        around = around.concat([
          state.tableData[row][cell-1],
          state.tableData[row][cell+1]
        ])
        if (state.tableData[row+1]) {
          around = around.concat([
            state.tableData[row+1][cell-1],
            state.tableData[row+1][cell],
            state.tableData[row+1][cell+1]
          ])
        }
        const counted = around.filter(function(v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
        })
        if(counted.length === 0 && row > -1) { 
          const near = []
          if (row - 1 > -1) { // 주변 칸에 지뢰가 하나도 없다면, 주변 8칸 좌표 넣어줌
            near.push([row-1, cell-1])
            near.push([row-1, cell])
            near.push([row-1, cell+1])
          }
          near.push([row, cell-1])
          near.push([row, cell+1])
          if (row + 1 < state.tableData.length) {
            near.push([row+1, cell-1])
            near.push([row+1, cell])
            near.push([row+1, cell+1])
          }
          near.forEach((n) => {
            if (state.tableData[n[0]][n[1]] !== CODE.OPENDED ) {
              checkAround(n[0], n[1])
            }
          })
        }
        if (state.tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1
        }
        Vue.set(state.tableData[row],cell, counted.length)
      }
      checkAround(row, cell)
      let halted = false
      let result
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        halted = true
        result = `${state.timer}초만에 승리하였습니다`
      }
      state.openedCount += openedCount
      state.halted = halted
      state.result = result
    }, 
    [CLICK_MINE](state, { row, cell }) {
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
  actions: {}, 
});
