// tag
const table = document.getElementById('tabletag')
const nextTable = document.getElementById('nextblock')

const row = 20
const cell = 10

let currentBlock = null;
let currnetBlockShape = null;
let currentPosX = null;
let currentPosY = null;

let data = []
let nextData = []
let block = null

let stopFlag = null
let gameOver = null


// 블록들 
const blockData = {
    1: [
        [
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 1],
        ],
        [
            [1, 1, 0],
            [1, 0, 0],
            [1, 0, 0],
        ],
        [
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 0],
        ],
        [
            [0, 0, 1],
            [0, 0, 1],
            [0, 1, 1],
        ],
    ],
    2: [
        [
            [0, 0, 0],
            [0, 1, 0],
            [1, 1, 1],
        ],
        [
            [1, 0, 0],
            [1, 1, 0],
            [1, 0, 0],
        ],
        [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0],
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 0, 1],
        ],
    ],
    3: [
        [
            [0, 0, 0],
            [0, 0, 1],
            [1, 1, 1],
        ],
        [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0],
        ],
        [
            [1, 1, 1],
            [1, 0, 0],
            [0, 0, 0],
        ],
        [
            [0, 1, 1],
            [0, 0, 1],
            [0, 0, 1],
        ],
    ],
    4: [
        [
            [0, 0, 0],
            [1, 1, 0],
            [1, 1, 0],
        ],
    ],
    5: [
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1],
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0],
        ],
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0],
        ],
    ],
    6: [
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0],
        ],
        [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
        ],
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1],
        ],
    ],
    7: [
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
        ],

    ],
}

// 테트리스 데이터 만들기
const makeData = () => {
    const tempNum = Array((row+4) * cell).fill().map(v => v = 0)
    for (i = 0; i < row+4; i++) {
        data.push(tempNum.splice(0, cell))
    }
}

// nextBlock 데이터 만들기
const makeNextData = () => {
    const tempNum = Array(4 * 4).fill().map(v => v = 0)
    for (i = 0; i < 4; i++) {
        nextData.push(tempNum.splice(0, 4))
    }
}

// 블록 랜덤생성
const randomBlockMake = () => {
    currentBlock = Math.floor(Math.random()*7+1);
    currnetBlockShape = 0;
    return blockData[currentBlock][currnetBlockShape];
}

// 화면 그리기
const screenMake = (whichData, rowNum, cellNum, whichTable) => {
    whichTable.innerHTML = ''
    for (i = 0; i < rowNum; i++) {
        const tr = document.createElement('tr')
        for (j = 0; j < cellNum; j++) {
            const td = document.createElement('td')



            if (whichData[i][j] === 0) {
                td.textContent = ''
            } else if (whichData[i][j] === 1) {
                td.classList.add('movingblock')
            } else if (whichData[i][j] === 9) {
                td.classList.add('movingblock')
            }




            tr.appendChild(td)
        }
        whichTable.appendChild(tr)
    }

    if (whichTable === table) {
        const hiddenrow = table.querySelectorAll('tr')
        hiddenrow[0].style.background = 'grey'
        hiddenrow[1].style.background = 'grey'
        hiddenrow[2].style.background = 'grey'
        hiddenrow[3].style.background = 'grey'
        // hiddenrow[0].style.display = 'none'
        // hiddenrow[1].style.display = 'none'
        // hiddenrow[2].style.display = 'none'
        // hiddenrow[3].style.display = 'none'
    }
}

const blockOnData = () => {
    block = randomBlockMake()
    if (gameOver) {
        alert('게임오버')
        return
    }
    if (block.length === 3) {
        data[1][3] = block[0][0]
        data[1][4] = block[0][1]
        data[1][5] = block[0][2]

        data[2][3] = block[1][0]
        data[2][4] = block[1][1]
        data[2][5] = block[1][2]

        data[3][3] = block[2][0]
        data[3][4] = block[2][1]
        data[3][5] = block[2][2]

    } else if (block.length === 4) {
       
        data[0][3] = block[0][0]
        data[0][4] = block[0][1]
        data[0][5] = block[0][2]
        data[0][6] = block[0][3]

        data[1][3] = block[1][0]
        data[1][4] = block[1][1]
        data[1][5] = block[1][2]
        data[1][6] = block[1][3]

        data[2][3] = block[2][0]
        data[2][4] = block[2][1]
        data[2][5] = block[2][2]
        data[2][6] = block[2][3]

        data[3][3] = block[3][0]
        data[3][4] = block[3][1]
        data[3][5] = block[3][2]
        data[3][6] = block[3][3]
    }
    // return data
    screenMake(data, row+4, cell, table)
}


const nineSolid = () => {
    for (let i=0; i<data.length; i++) {
        data[i].map((v,idx)=>{
            if(v===1) {
                data[i][idx] = 9
            }
        })
    }
    screenMake(data, row+4, cell, table)
}


const movingArrow = (keyCode) => {
    switch (keyCode) {
        case 'ArrowLeft':
            console.log('왼쪽키')
            clearInterval(gameInterval)
            movingLeft()
            gameInterval = setInterval(movingDownWithCheck, 200)
            return
        case 'ArrowRight':
            console.log('오른쪽키')
            clearInterval(gameInterval)
            movingRight()
            gameInterval = setInterval(movingDownWithCheck, 200)
            return
        case 'ArrowUp':
            console.log('위쪽키, 도형바꾸기')
            // clearInterval(gameInterval)
            changeBlock()
            // gameInterval = setInterval(movingDownWithCheck, 200)
            return
        case 'ArrowDown':
            console.log('아래쪽')
            clearInterval(gameInterval)
            movingDownWithCheck()
            gameInterval = setInterval(movingDownWithCheck, 200)
            return
        
    }
}

/**
 * 화살표 눌렀을 때 처리
 */
window.addEventListener('keydown', e => {
    movingArrow(e.key);
});

const movingDown = () => {

    for (let i=0; i<data.length; i++) {
        data[data.length-i-1].forEach((v, idx)=>{
            if (v === 1) {
                console.log('1 찾았다')
                
                if (data[data.length-i]) {
                    data[data.length-i][idx] = 1
                    data[data.length-i-1][idx] = 0
                }
            }
        })
    }
    screenMake(data, row+4, cell, table)
}

const movingRight = () => {

    for(let i=data.length-1; i>-1; i--){
        for (let k=data[0].length-1; k>-1; k--) {
            if (data[i][k] === 1) {

                data[i][k+1] =1
                data[i][k] = 0
                
            }
        }
    }
    screenMake(data, row+4, cell, table)
}

const movingLeft = () => {

    for(let i=data.length-1; i>-1; i--){
        for (let k=0; k<data[0].length; k++) {
            if (data[i][k] === 1) {

                data[i][k-1] =1
                data[i][k] = 0
                
            }
        }
    }
    screenMake(data, row+4, cell, table)
}


const changeBlock = () => {
    console.log(data)
    /**
     * ToDo
     * 1. currentBlockShape을 다음 값으로 넣어준다 (1~4)
     * 2. 바뀐 도형으로 화면에 그렵준다. (기존에 화면에 그리는 것, currentPos 활용)
     */


}






const checkDown = () => {

    /**
     * game over check
     */

    /**
     * stop check
     */
    stopFlag = false;
    for (let i=0; i<data.length; i++) {// 데이터 끝줄 부터 1이 있는지 확인하기
        data[data.length-i-1].forEach((v, idx)=>{   // 
            if (v===1){
                if (data[data.length-i]) {  
                    if (data[data.length-i][idx] === 9) {
                            console.log('다음칸에 뭐가 있어 멈춰')
                            stopFlag = true
                        } else {
                            console.log('멈추지마')
                            // stopFlag = false
                        }
                } else if (!data[data.length-i]){  
                    console.log('다음줄 없다')
                    stopFlag = true
                }
            }
        })
    }
}




const movingDownWithCheck = () => {  
    console.group();
    checkDown();
    if (stopFlag) {
        console.log('플래그가 멈추래')
        nineSolid()
        blockOnData()

    } else if (!stopFlag) {
        console.log('플래그가 계속 가래')
        movingDown()
    }
    console.groupEnd();
}


const init = () => {
    table.innerHTML = ''
    nextTable.innerHTML = ''

    data = []
    nextData = []

    block = null
    stopFlag = null
    gameOver = null


    makeData()
    makeNextData()

    screenMake(data, row+4, cell, table)
    screenMake(nextData, 4, 4, nextTable)
    
}



init()
stopFlag = false
blockOnData()
// movingDownWithCheck()
// let gameInterval = setInterval(movingDownWithCheck, 200)



console.log(stopFlag)




    // // data reverse 
    // let tempArr = []
    // for (let i=0; i<cell; i++){
    //     tempArr.push([])
    // }
    // for (let i=0; i<data.length; i++){
    //     data[i].forEach((v, idx)=>{
    //         tempArr[idx].push(v)
    //     })
    // }
    // console.log(tempArr)