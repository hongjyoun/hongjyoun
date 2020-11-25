<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball
        v-for="ball in winBalls"
        :key="ball"
        v-bind:number="ball"
      ></lotto-ball>
    </div> 
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한번 더!</button>
  </div>
</template>

<script>
import LottoBall from "./LottoBall";
function getWinNumbers() {
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const Numbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...Numbers, bonusNumber];
}

const timeouts = []

export default {
  components: {
    "lotto-ball": LottoBall,
  },
  data() {
    return {
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    };
  },
  computed: {},
  methods: {
    onClickRedo() {
      this.winNumbers = getWinNumbers();
      this.winBalls = [];
      this.bonus = null;
      this.redo = false;

    },
    showBalls() {
      for (let i = 0; i < this.winNumbers.length - 1; i++) {
        timeouts[i] = setTimeout(() => {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
      timeouts[6] = setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.redo = true;
      }, 7000);
    },
  },

  mounted() {
    this.showBalls()
  },

  beforeDestroy() {
    timeouts.forEach((t) => {
      clearTimeout(t)
    })
  },

  watch: {    // 변수를 감시. 근데 가급적 안쓰는게 좋음, 최후의 수단으로 쓰셈
    // winBalls(value, oldVal) {    // winBalls 의 값이 바뀔 때, 추가적인 동작을 하게끔 함
    //   console.log(value, oldVal)
    //   if(value.length === 0) {
    //     this.showBalls()
    //   }
    // }
    bonus(value, oldVal) {    // bonus 의 값이 바뀔 때, 추가적인 동작을 하게끔 함
        console.log(value, oldVal)
        if(value === null) {
          this.showBalls()
        }
    },
  }
};
</script>

<style scoped>
</style>
