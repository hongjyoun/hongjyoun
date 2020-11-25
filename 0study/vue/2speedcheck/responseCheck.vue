<!-- 컴포넌트 만듬 -->

<template>
    <div>
        <div id="screen" :class="state" @click="onClickScreen"> {{message}} </div>    <!--   v-bind:class 축약 :class  -->
        <template v-show="result.length">  <!-- ""따옴표 안의 내용이 True 면 이 div가 실행되고, false면 실행 안됨 / v-if와의 차이점은 : 주석처리가 됨 v-show는 태그가 있지만 display: none 일뿐-->
            <div>평균 시간: {{average}}ms</div>   <!-- 배열의 값들을 다 더하는 코드 : result.reduce((a,c)=> a+c, 0) --> <!-- || 0  기본값으로 0 주는 것 -->
            <button @click="onReset">리셋</button>   <!--   v-on:click 축약 @click  -->
        </template>  <!-- div 대신 template 쓰면 : 이건 없는셈 침.  -->
    </div>    <!-- template 안에 바로 template을 못쓴다 -->
</template>

<script>
let startTime = 0
let endTime = 0
let timeout = null
export default {
    data() {
        return {
            result : [],
            state : 'waiting',
            message : '클릭해서 시작하세요'
        }
    },
    computed: {      // 데이터를 가공해서 쓸때
        average() {
            return this.result.reduce((a,c)=> a+c, 0) / this.result.length || 0
        }
    },

    methods: {
        onReset() {
            this.result = []
        },
        onClickScreen() {
            if(this.state === 'waiting') {
                this.state = 'ready'
                this.message = '초록색이 되면 클릭하세요'
                timeout = setTimeout(()=>{
                    this.state = 'now'
                    this.message = '지금 클릭!'
                    startTime = new Date()
                }, Math.floor(Math.random()*1000) + 2000)
            } else if (this.state === 'ready') {
                clearTimeout(timeout)
                this.state = 'waiting'
                this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요'
            } else if (this.state === 'now') {
                endTime = new Date()
                this.state = 'waiting'
                this.message = '클릭해서 시작하세요'
                this.result.push(endTime - startTime)
            }
        }
    }
}
</script>

<style scoped>
    #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting {
        background-color: aqua;
    }
    #screen.ready {
        background-color: red;
        color: white;
    }
    #screen.now {
        background-color: greenyellow;
    }
</style>
