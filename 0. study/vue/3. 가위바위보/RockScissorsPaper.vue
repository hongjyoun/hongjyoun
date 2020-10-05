<template>
    <div>
        <div id="computer" :style="computedStyleObject"></div>   <!-- :class :style    ===> v-bind 축약  -->
        <div>
            <button @click="onClickButton('바위')">바위</button>
            <button @click="onClickButton('가위')">가위</button>
            <button @click="onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}}점</div>
    </div>
</template>

<script>
    const rspCoord = {
        바위 : '0',
        가위 : '-142px',
        보 : '-284px'
    }

    const scores = {
        가위: 1,
        바위: 0,
        보: -1,
    }

    const computerChoice = (imgCoord) => {
        return Object.entries(rspCoord).find(function(v) {
            return v[1] === imgCoord
        })[0]
    }

    let interval = null
    export default {
    data() {
        return {
            imgCoord : rspCoord.가위,         
            result : '',
            score : 0,

        }
    },
    computed: {      
        computedStyleObject() {
            return { 
               background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0` 
            }
        }

    },
    methods: {
        changeHand() {
            interval = setInterval(() => {
                if(this.imgCoord === rspCoord.바위) {
                    this.imgCoord = rspCoord.가위
                } else if(this.imgCoord === rspCoord.가위) {
                    this.imgCoord = rspCoord.보
                } else if(this.imgCoord === rspCoord.보) {
                    this.imgCoord = rspCoord.바위
                }
            }, 100)
        },
        onClickButton(choice) {
            clearInterval(interval)
            const myScore = scores[choice]
            const cpuScore = scores[computerChoice(this.imgCoord)]
            const diff = myScore - cpuScore
            if(diff === 0) {
                console.log('비김')
                this.result = '비겼습니다'
            } else if ([-1, 2].includes(diff)) {
                console.log('이김')
                this.result =  '이겼습니다'
                this.score += 1
            } else {
                console.log('짐')                
                this.result = '졌습니다'
                this.score -= 1
            }
            setTimeout(()=> {
                this.changeHand()
            }, 1000)
        },
       
    },
    beforeCreate() {     
        console.log('beforeCreat')
    },
    created() {      // 컴포넌트가 생성될때 (자바스크립트 상에서 존재할 때, 화면에 나타나기 전)
        console.log('created')
    },
    beforeMount() {   
        console.log('beforemount')
    },
    mounted() {      // 화면에 존재할 때  << 화면 관련된 것은 여기서 수정
        console.log('mounted')
        this.changeHand()
    },
    beforeUpdate() {   
        console.log('beforeUpdate')
    },
    updated() {      // 화면의 데이터가 바뀌어서 화면이 다시 그려질 때
        console.log('updated')    
    },
    beforeDestroy() {
        clearInterval(interval)
    },
    destroyed() {    // 컴포넌트가 화면에서 없어질 때
        console.log('destroyed')
    },
}
</script>

<style scoped>
    #computer {
        width : 142px;
        height : 200px;
        background-position: 0 0;
    }
</style>
