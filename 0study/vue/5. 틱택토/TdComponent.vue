<template>
  <td @click="onClickTd">
    {{ cellData }}
  </td>
</template>

<script>
export default {
  props: {
    cellData: String,
    cellIndex: Number,
    rowIndex: Number,
  },
  methods: {
    onClickTd() {
      if (this.cellData) return; // 만약, 칸에 뭐가 있을 땐 return 해서 함수 중단해버리기
      
      const rootData = this.$root.$data;
      // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn; // tableData의 가로행수(rowIndex) 와 세로 열 수(cellIndex)를 하면, 그 칸을 가리킨다. 그걸 현재 턴('o' or 'x')을 입력한다
      this.$set(
        rootData.tableData[this.rowIndex],
        this.cellIndex,
        rootData.turn
      ); // tableData의 가로행수(rowIndex) 와 세로 열 수(cellIndex)를 하면, 그 칸을 가리킨다. 그걸 현재 턴('o' or 'x')을 입력한다

      let win = false;

      if (
        rootData.tableData[this.rowIndex][0] === rootData.turn &&
        rootData.tableData[this.rowIndex][1] === rootData.turn &&
        rootData.tableData[this.rowIndex][2] === rootData.turn
      ) {
        win = true;
      }

      if (
        rootData.tableData[0][this.cellIndex] === rootData.turn &&
        rootData.tableData[1][this.cellIndex] === rootData.turn &&
        rootData.tableData[2][this.cellIndex] === rootData.turn
      ) {
        win = true;
      }

      if (
        rootData.tableData[0][0] === rootData.turn &&
        rootData.tableData[1][1] === rootData.turn &&
        rootData.tableData[2][2] === rootData.turn
      ) {
        win = true;
      }

      if (
        rootData.tableData[0][2] === rootData.turn &&
        rootData.tableData[1][1] === rootData.turn &&
        rootData.tableData[2][0] === rootData.turn
      ) {
        win = true;
      }

      if (win) {
        // 이겼을 때
        rootData.winner = rootData.turn;
        rootData.turn = "O";
        rootData.tableData = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
      } else {
        // 무승부
        let all = true // all이 true 이면 무승부
        rootData.tableData.forEach((row)=>{ // 무승부 검사, 모든 칸에 O나 X가 다 차 있는지 검사하는 것
          row.forEach((cell)=>{
            if (!cell){
              all = false;
            }
          })
        })

        if (all) {  // 무승부가 되면
          rootData.noWinner = "무승부 입니다"
          rootData.turn = "O";
          rootData.winner = ''
          rootData.tableData = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
          ]
          rootData.noWinner = ""
        } else { // 승자도 없고 무승부도 아니면, 게임이 아직 안끝난 것
          rootData.turn = rootData.turn === 'O' ? 'X' : 'O'
        }
      }

      // rootData.turn = rootData.turn === "O" ? "X" : "O";
    },
  },
};
</script>
