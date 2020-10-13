<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td
        v-for="(cellData, cellIndex) in rowData"
        :key="cellIndex"
        :style="cellDataStyle(rowIndex, cellIndex)"
        @click="onClickTd(rowIndex, cellIndex)"
        @contextmenu.prevent="onRigthClickTd(rowIndex, cellIndex)"
      >
        <!-- contextmenu: 우클릭했을 때의 이벤트. prevent를 해줘야 브라우저 메뉴가 안뜬다-->
        {{ cellDataText(rowIndex, cellIndex) }}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState } from "vuex";
import { CODE } from "./store";
import store, {
  OPEN_CELL,
  FLAG_CELL,
  QUESTION_CELL,
  NORMALIZE_CELL,
  CLICK_MINE,
} from "./store";

export default {
  computed: {
    ...mapState(["tableData", "halted"]),
    cellDataStyle() {
      return (row, cell) => {
        switch (
          this.$store.state.tableData[row][cell] // 테이블의 각 행, 각 열마다 CODE를 검사한다. 그래서 CODE에 따라 스타일이 다르게 꾸미기 위해.
        ) {
          case CODE.NORMAL:
          case CODE.MINE:
            return {
              background: "#444",
            };
          case CODE.CLICKED_MINE:
          case CODE.OPENED:
            return {
              background: "white",
            };
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return {
              background: "red",
            };
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return {
              background: "yellow",
            };
          default:
            return {};
        }
      };
    },
    cellDataText() {
      return function (row, cell) {
        switch (
          this.$store.state.tableData[row][cell] // 테이블의 각 행, 각 열마다 CODE를 검사한다. 그래서 CODE에 따라 스타일이 다르게 꾸미기 위해.
        ) {
          case CODE.MINE:
            return "X";
          case CODE.NORMAL:
            return "";
          case CODE.FLAG_MINE:
          case CODE.FLAG:
            return "!";
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return "?";
          case CODE.CLICKED_MINE:
            return "펑";
          default:
            return this.$store.state.tableData[row][cell] || ""; // 주변 지뢰 갯수 몇개인지 보여주는 걸 기본으로, 0인 경우엔 '' 빈칸으로
        }
      };
    },
  },
  methods: {
    onClickTd(row, cell) {
      if (this.halted) {
        return; // 게임 중단됐을 땐 칸 클릭 못하게 함수 나가기
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
          return this.$store.commit(OPEN_CELL, { row, cell });
        case CODE.MINE:
          return this.$store.commit(CLICK_MINE, { row, cell });
      }
    },

    onRigthClickTd(row, cell) {
      if (this.halted) {
        return; // 게임 중단됐을 땐 칸 클릭 못하게 함수 나가기
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
        case CODE.MINE:
          this.$store.commit(FLAG_CELL, { row, cell });
          return;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          this.$store.commit(QUESTION_CELL, { row, cell });
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          this.$store.commit(NORMALIZE_CELL, { row, cell });
          return;
        default:
          return;
      }
    },
  },
};
</script>
