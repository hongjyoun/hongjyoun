<template>
  <div>
    <mine-form><mine-form>
    <div>{{timer}}</div>
    <table-component><table-component>
    <div>{{result}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "./store";  
// 현재 이 파일이 최상위컴포넌트임. Vue와 Vuex를 연결해주고 나서, 최상위컴포넌트와 store를 연결해주어야 하기 때문에 위와 같은 선언을 해줌.
// (아래 dufault에도 store 적어주고) 
// 이렇게 연결을 해주어야 this.$store를 쓸 수 있는 거임.

import TableComponent from './TableComponent'
import MineForm from './MineForm'

export default {
  store, // store를 최상위 컴터넌트와 연결해준 것임.
  components: { // 자식 컴퍼넌트, 불러올 컴퍼넌트를 다 여기에 넣어줘야 함. 위에 import 로도 해줘야되고.
    TableComponent,   // 'table-component' : TableComponent  -> 이걸 축약한 것임 (파스칼케이스와 케밥케이스가 서로 호환될 때만 가능)
    MineForm,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['timer', 'result'])
  },
  methods: {

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
