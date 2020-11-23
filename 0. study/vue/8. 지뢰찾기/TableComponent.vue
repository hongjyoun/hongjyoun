<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
    </tr>
  </table>
</template>

<script>
  import { mapState } from 'vuex'  // mapState를 쓰기 위해서 vuex에서 미리 개발해놓은 것. 이렇게 불러오면 됨
  
  export default {

    // store의 mutation은 store.commit으로 실행하고,
    // store의 state / getters 를 가져올 땐 computed에 표기한다

    computed: {  // store의 state 들을 가져오려면, computed에서 명시해줘야 함.
    // 아래와 같이 쓰면 됨
    // tableData() {
    //  return this.$store.state.tableData 
    // }
    // timer() {
    //  return this.$store.state.timer 
    // }
    // 위에 것도 귀찮기 때문에 ...mapState를 쓴다.

      ...mapState(['tableData']),

    // 예를 들어
    // cellData(){
    //  return this.$store.state.tableData[this.rowIndex][this.cellIndex]
    // }
    // tableData(){
    //  return this.$store.state.tableData
    // }
    // turn(){
    //  return this.$store.state.turn
    // }
    // 이렇게 가져온 state들이 있었다면, 아래와 같이 ...mapState로 바꿀 수 있따.
    
    // ...mapState({
    //  tableData: state => state.tableData,
    //  turn: state => state.turn,
    //  cellData(state){
    //    return state.tableData[this.rowIndex][this.cellIndex]
    //   }
    // })

    // ...mapState(['tableData']) 이렇게 간단히 쓸 수도 있고


    },
    beforeCreate() {
      console.log(1);
    },
    created(){
      console.log(2);
      console.log(tableData);
    },
    beforeMount() {
      console.log(3);
    },
    mounted() {
      console.log(4);
    },
    beforeUpdate() {
      console.log(5);
    },
    updated() {
      console.log(6);
    }
    
  }
</script>