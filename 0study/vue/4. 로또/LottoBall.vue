<template>
  <div class="ball" :style="styleObject">
    {{ number }}
  </div>
</template>

<script>
export default {
  name: "LottoBall",
  props: {
    // 부모 컴퍼넌트가 자식 컴퍼넌트에 값을 물려줄 때, 값을 받는 것들. 값을 읽을 수만 있다.
    number: Number, // 자료형을 써줘야 한다
  },
  computed: {
    styleObject() {
      let background;
      if (this.number <= 10) {
        background = 'red';
      } else if (this.number <= 20) {
        background = 'orange';
      } else if (this.number <= 30) {
        background = 'yellow';
      } else if (this.number <= 40) {
        background = 'green';
      } else {
        background = 'blue';
      }
      return {
        background,
      };
    },
  },
};
</script>


<style scoped>
.ball {
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
}
</style>
