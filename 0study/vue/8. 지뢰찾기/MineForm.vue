<template>
  <div>
    <input type="number" placeholder="세로" :value="row" @change="onChangeRow" />
    <input type="number" placeholder="가로" :value="cell" @change="onChangeCell" />
    <input type="number" placeholder="지뢰" :value="mine" @change="onChangeMine" />
    <button @change="onClickBtn">시작</button>
  </div>
</template>

<script>
  import { START_GAME } from './store'

  // props 부모 컴포넌트에서 가져온 값. read only라서 props 값은 바꾸지 못한다
  export default {
    data() {
      return {
        row: 10,
        cell: 10,
        mine: 20,
      }
    },
    methods: {
      onChangeRow(e) {
        this.row = e.target.value
      },
      onChangeCell(e) {
        this.cell = e.target.value
      },
      onChangeMine(e) {
        this.mine = e.target.value
      },

      onClickBtn() {
        // store에 있는 mutation을 가져올 때, this.$store.commit을 쓴다.
        // this.$store.commit(START_GAME) ==> store에 있는 START_GAME 이 실행된다.
        // 그리고 위에 import 해줘야 함. import { START_GAME } from './store'
        this.$store.commit(START_GAME, { row: this.row, cell: this.cell, mine: this.mine })
      }
    }
    
  }
</script>