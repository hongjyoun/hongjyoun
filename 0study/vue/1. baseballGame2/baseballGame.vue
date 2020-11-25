<template>
  <div>
    <h1>{{ end }}</h1>
    <h2>{{ answer }}</h2>
    <form v-if="regame" @submit.prevent="reGame">
      <button>다시하기</button>
    </form>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" minlength="4" maxlength="4" v-model="value" />
      <button type="submit">입력</button>
    </form>
    <div>시도: {{ tries.length }} 회</div>
    <ul>
      <li v-for="(t, idx) in tries" :key="'try' + idx">
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
  </div>
</template>


<script>
const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

export default {
  data() {
    return {
      answer: getNumbers(),
      tries: [],
      value: "",
      end: "",
      regame: false,
    };
  },

  methods: {
    reGame() {
      this.answer = getNumbers();
      this.value = "";
      this.tries = [];
      this.$refs.answer.focus();
      this.regame = false;
      this.end = "";
    },
    onSubmitForm() {
      if (this.value === this.answer.join("")) {
        this.tries.push({
          try: this.value,
          result: "홈런",
        });
        this.regame = true;
        this.end = "홈런입니다!";
      } else {
        if (this.tries.length >= 9) {
          this.regame = true;
          this.end = `시도횟수가 초과되었습니다. 정답은 ${this.answer} 였습니다!`;
          this.regame = true;
        }
        let strike = 0;
        let ball = 0;
        const valueArray = this.value.split("").map((v) => parseInt(v));
        for (let i = 0; i < 4; i++) {
          if (valueArray[i] === this.answer[i]) {
            strike++;
          } else if (this.answer.includes(valueArray[i])) {
            ball++;
          }
        }
        this.tries.push({
          try: this.value,
          result: `${strike}스트라이크 ${ball}볼 입니다`,
        });
        this.value = "";
        this.$refs.answer.focus();
      }
    },
  },
};
</script>
