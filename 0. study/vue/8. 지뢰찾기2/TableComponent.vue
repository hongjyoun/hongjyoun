<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td v-for="(cellData, cellIndex) in rowData" 
      :key="cellIndex" 
      :style="cellDataStyle(rowIndex, cellIndex)"
      @click="onClickTd(rowIndex, cellIndex)"
      @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"  
      >{{cellDataText(rowIndex, cellIndex)}}</td>  <!-- prevent를 붙여줘야 오른쪽마우스 클릭했을 때 뜨는 메뉴창이 안뜸-->
    </tr>
  </table>
</template>

<script>
  import { mapState } from 'vuex' 
  import { OPEN_CELL, FLAG_CELL, NORMALIZE_CELL, QUESTION_CELL, CLICK_MINE } from './store'
  import { CODE } from './store'
  
  export default {
    computed: {
      ...mapState(['tableData', 'halted']),
    cellDataStyle(state) {
      return (row, cell) => {
          switch (this.$store.state.tableData[row][cell]) {
            case CODE.NORMAL:
            case CODE.MINE:
              return {
                background: '#444',
              }
            case CODE.CLICKED_MINE:
            case CODE.OPENED:
              return {
                background: 'white',
              }
            case CODE.FLAG:
            case CODE.FLAG_MINE:
              return {
                background: 'red',
              }
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
              return {
                background: 'yellow',
              }
            default:
              return {}
          }
        }
      },

    cellDataText(state) {
      return (row, cell) => {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.MINE:
            return 'X'
          case CODE.NORMAL:
            return ''
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return '!'
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return '?'
          case CODE.CLICKED_MINE:
            return '펑'
          default:
            return this.$store.state.tableData[row][cell] || ''
          }
        }
      },
    },
      
    methods: {
      onClickTd(row, cell) {
        console.log('열려라')
        if (this.halted) {
          return
        }
        switch (this.tableData[row][cell]) {
          case CODE.NORMAL:
            console.log('지뢰없음')
            return this.$store.commit(OPEN_CELL, { row, cell })
          case CODE.MINE:
            console.log('지뢰인데')
            console.log(this.halted)
            return this.$store.commit(CLICK_MINE, { row, cell })
          default:
            return
        }


        
      },
      onRightClickTd(row, cell) {
        if (this.halted) {
          return
        }

        switch (this.tableData[row][cell]) {
          case CODE.NORMAL:
          case CODE.MINE:
            this.$store.commit(FLAG_CELL, { row, cell })
            return
          case CODE.FLAG_MINE:
          case CODE.FLAG:
            this.$store.commit(QUESTION_CELL, { row, cell })
            return
          case CODE.QUESTION_MINE:
          case CODE.QUESTION:
            this.$store.commit(NORMALIZE_CELL, { row, cell })
            return
          default:
            return
        }
      }
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