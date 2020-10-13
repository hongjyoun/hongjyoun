import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";
export const NO_WINNER = "NO_WINNER";

export default new Vuex.Store({
  state: {
    tableData: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    turn: "O",
    winner: "",
  }, // vue 의 데이터 속성과 비슷
  getters: {
    turnMessage(state) {
      return state.turn + '님이 승리하셨습니다.'
    }
  }, // vue 의 컴퓨티드와 비슷
  mutations: {
    [SET_WINNER](state, winner) {
      state.winner = winner;
    },
    [CLICK_CELL](state, { row, cell }) {
      Vue.set(state.tableData[row], cell, state.turn); // 배열을 인덱스로 수정할 경우에는, 이렇게 Vue.set을 써줘야 함.
    },
    [CHANGE_TURN](state) {
      state.turn = state.turn === "O" ? "X" : "O";
    },
    [RESET_GAME](state) {
      state.turn = "O";
      state.tableData = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
    },
    [NO_WINNER](state) {
      state.winner = "";
    },
  }, // state를 수정할 때 사용. 동기적으로
  actions: {}, // 비동기 처리를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때
});
