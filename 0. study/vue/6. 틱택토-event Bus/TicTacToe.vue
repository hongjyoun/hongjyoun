<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <table-component :table-data="tableData" />
    <div v-if="winner">{{ winner }}님의 승리!</div>
    <div v-if="noWinner">{{ noWinner }}</div>
  </div>
</template>

<script>
import TableComponent from "./TableComponent";
import EventBus from "./EventBus"

export default {
  components: {
    TableComponent, //    "table-component": TableComponent, 를 축약한 것. PascalCase를 자동으로 Kebab-case로 인식한다
  },
  data() {
    return {
      tableData: [
        // [rowIndex] [cellIndex]
        ["", "", ""], // [0][0], [0][1], [0][2]
        ["", "", ""], // [1][0], [1][1], [1][2]
        ["", "", ""], // [2][0], [2][1], [2][2]
      ],
      turn: "O",
      winner: "",
      noWinner: "",
    };
  },
  methods: {
    // onChangeData() {
    //   // this.tableData[1][0] = 'X'; 작동하지 않으니까 Vue.set을 사용
    //   this.$set(this.tableData[1], 0, 'x')   // Vue.set과 동일
    // }
    onClickTd(rowIndex, cellIndex) {
      this.$set(
        this.tableData[rowIndex],
        cellIndex,
        this.turn
      ); 

      let win = false;

      if (
        this.tableData[rowIndex][0] === this.turn &&
        this.tableData[rowIndex][1] === this.turn &&
        this.tableData[rowIndex][2] === this.turn
      ) {
        win = true;
      }

      if (
        this.tableData[0][cellIndex] === this.turn &&
        this.tableData[1][cellIndex] === this.turn &&
        this.tableData[2][cellIndex] === this.turn
      ) {
        win = true;
      }

      if (
        this.tableData[0][0] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][2] === this.turn
      ) {
        win = true;
      }

      if (
        this.tableData[0][2] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][0] === this.turn
      ) {
        win = true;
      }

      if (win) {
        // 이겼을 때
        this.winner = this.turn;
        this.turn = "O";
        this.tableData = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
      } else {
        // 무승부
        let all = true // all이 true 이면 무승부
        this.tableData.forEach((row)=>{ // 무승부 검사, 모든 칸에 O나 X가 다 차 있는지 검사하는 것
          row.forEach((cell)=>{
            if (!cell){
              all = false;
            }
          })
        })

        if (all) {  // 무승부가 되면
          this.noWinner = "무승부 입니다"
          this.turn = "O";
          this.winner = ''
          this.tableData = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
          ]
          this.noWinner = ""
        } else { // 승자도 없고 무승부도 아니면, 게임이 아직 안끝난 것
          this.turn = this.turn === 'O' ? 'X' : 'O'
        }
      }
    }
  },
  created() {
    EventBus.$on('clickTd', this.onClickTd)
  },
};
</script>


<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>
