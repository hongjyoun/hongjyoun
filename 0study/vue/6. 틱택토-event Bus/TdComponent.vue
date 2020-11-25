<template>
  <td @click="onClickTd">
    {{ cellData }}
  </td>
</template>

<script>
import EventBus from './EventBus'
export default {
  props: {
    cellData: String,
    cellIndex: Number,
    rowIndex: Number,
  },
  methods: {
    onClickTd() {
      if (this.cellData) return; // 만약, 칸에 뭐가 있을 땐 return 해서 함수 중단해버리기
      // rootData.turn = rootData.turn === "O" ? "X" : "O";
      EventBus.$emit('clickTd', this.rowIndex, this.cellIndex)
    },
  },
};
</script>
