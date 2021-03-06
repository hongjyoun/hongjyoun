// tag
const table = document.getElementById('tabletag')
const nextTable = document.getElementById('nextblock')

const row = 20
const cell = 10

let currentBlock = null;
let currentBlockShape = null;
let currentX = 0;
let currentY = 3;

let data = []
let nextData = []
let block = null

let stopFlag = null
let gameOver = null


// 블록들 
const blockData = {
    1: [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
        ],
    ],
    2: [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
        ],
    ],
    3: [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
    ],
    4: [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 1, 0, 0],
        ],
    ],
    5: [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
        ],
    ],
    6: [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
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
    currentBlockShape = 0;
    return blockData[currentBlock][currentBlockShape];
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
    console.log(block)
    if (gameOver) {
        alert('게임오버')
        return
    }
        matchingBlock(block)

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

const matchingBlock = (changedBlock) => {


    for(i=0; i<4; i++){
        for(k=0; k<4; k++){
            
        }
    }
  
    // data[currentX][currentY] = changedBlock[0][0]
    // data[currentX][currentY+1] = changedBlock[0][1]
    // data[currentX][currentY+2] = changedBlock[0][2]
    // data[currentX][currentY+3] = changedBlock[0][3]

    // data[currentX+1][currentY] = changedBlock[1][0]
    // data[currentX+1][currentY+1] = changedBlock[1][1]
    // data[currentX+1][currentY+2] = changedBlock[1][2]
    // data[currentX+1][currentY+3] = changedBlock[1][3]

    // data[currentX+2][currentY] = changedBlock[2][0]
    // data[currentX+2][currentY+1] = changedBlock[2][1]
    // data[currentX+2][currentY+2] = changedBlock[2][2]
    // data[currentX+2][currentY+3] = changedBlock[2][3]

    // data[currentX+3][currentY] = changedBlock[3][0]
    // data[currentX+3][currentY+1] = changedBlock[3][1]
    // data[currentX+3][currentY+2] = changedBlock[3][2]
    // data[currentX+3][currentY+3] = changedBlock[3][3]
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
            clearInterval(gameInterval)
            changeBlock()
            gameInterval = setInterval(movingDownWithCheck, 200)
            return
        case 'ArrowDown':
            console.log('아래쪽')
            clearInterval(gameInterval)
            movingDownWithCheck()
            gameInterval = setInterval(movingDownWithCheck, 200)
            return


        case 'Space':
            console.log('스페이스바, 한번에 가기')
            clearInterval(gameInterval)
            // movingDownWithCheck()
            gameInterval = setInterval(movingDownWithCheck, 200)

    }
}




window.addEventListener('keydown', e => {
    movingArrow(e.key);
    console.log('currentX : ', currentX, 'currentY : ', currentY)
    console.log('현재', currentBlock, '번 블록, ', currentBlockShape,' 번째 모양')

});




const movingDown = () => {

    for (let i=0; i<data.length; i++) {
        data[data.length-i-1].forEach((v, idx)=>{
            if (v === 1) {
                // console.log('1 찾았다')
                
                if (data[data.length-i]) {
                    data[data.length-i][idx] = 1
                    data[data.length-i-1][idx] = 0
                }
            }
        })
    }
    currentX += 1
    screenMake(data, row+4, cell, table)
}

const movingRight = () => {

    outer : for(let i=data.length-1; i>-1; i--){
        inner : for (let k=data[0].length-1; k>-1; k--) {
            if (data[i][k] === 1) {
                if (k===9) {
                    break outer
                } else  {
                    data[i][k+1] =1
                    data[i][k] = 0    
                }               
            }
        }
    }
    if (currentY === 9){
    } else {
        currentY += 1
    }

    screenMake(data, row+4, cell, table)
}

const movingLeft = () => {

    outer : for(let i=data.length-1; i>-1; i--){
        inner : for (let k=0; k<data[0].length; k++) {
            if (data[i][k] === 1) {
                if (k===0) {
                    break outer
                } else {
                    data[i][k-1] =1
                    data[i][k] = 0
                }               
                
            }
        }
        
    }
    if (currentY === 0){
    } else {
        currentY -= 1
    }
    
    screenMake(data, row+4, cell, table)
}


const changeBlock = () => {
    
    let willChange = null
    if (currentBlockShape === 3) {
        console.log('3번째모양이다')
        willChange = blockData[currentBlock][0]
        currentBlockShape = 0
        matchingBlock(willChange)
        screenMake(data, row+4, cell, table)
    } else {
        willChange = blockData[currentBlock][currentBlockShape+1]
        currentBlockShape += 1
        matchingBlock(willChange)
        screenMake(data, row+4, cell, table)
    }

}


const checkDown = () => {

    /**
     * game over check
     */
    if (data[4][4] === 9) {
        gameOver = true
    }




    /**
     * stop check
     */
    stopFlag = false;
    for (let i=0; i<data.length; i++) {// 데이터 끝줄 부터 1이 있는지 확인하기
        data[data.length-i-1].forEach((v, idx)=>{   // 
            if (v===1){
                if (data[data.length-i]) {  
                    if (data[data.length-i][idx] === 9) {
                            // console.log('다음칸에 뭐가 있어 멈춰')
                            stopFlag = true
                        } else {
                            // console.log('멈추지마')                            
                        }
                } else if (!data[data.length-i]){  
                    // console.log('다음줄 없다')
                    stopFlag = true
                }
            }
        })
    }
}


const movingDownWithCheck = () => {  
    // console.group();
    checkDown();
    if (stopFlag) {
        // console.log('플래그가 멈추래')
        nineSolid()

        // 줄 없애기
        for (let i=0; i<data.length; i++) {// 데이터 끝줄 부터 1이 있는지 확인하기
            let filledNum = data[data.length-i-1].filter(v => v === 9).length
            console.log(filledNum)
            if(filledNum === 10) {
                console.log('1줄 다 찼다')
                console.log(data[data.length-i-1])
                data.splice(data.length-i-1, 1)
                data.unshift([0,0,0,0,0,0,0,0,0,0])
                screenMake(data, row+4, cell, table)
            }
        }


        currentX = 0;
        currentY = 3;
        blockOnData()

    } else if (!stopFlag) {
        // console.log('플래그가 계속 가래')
        movingDown()
    }
    // console.groupEnd();
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
// let gameInterval = setInterval(movingDownWithCheck, 200)





    // data reverse 
    let tempArr = []
    for (let i=0; i<cell; i++){
        tempArr.push([])
    }
    for (let i=0; i<data.length; i++){
        data[i].forEach((v, idx)=>{
            tempArr[idx].push(v)
        })
    }
    console.log(tempArr)