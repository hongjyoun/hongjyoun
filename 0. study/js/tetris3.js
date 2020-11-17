// tag
const table = document.getElementById('tabletag')
const nextTable = document.getElementById('nextblock')

const row = 20
const cell = 10

let currentBlockNum = null;
let currentBlockShape = null;
let currentX = 0;
let currentY = 3;

let data = []
let nextData = []
let block = null

let stopFlag = null
let noMoving = null
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
    currentBlockNum = Math.floor(Math.random()*7+1);
    currentBlockShape = 0;
    return blockData[currentBlockNum][currentBlockShape];
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

const blockOnData = () => {
    block = randomBlockMake()
    currentX = 0
    currentY = 3

    if (gameOver) {
        alert('게임오버')
        return
    }
    
    data[currentX][currentY] = block[0][0]
    data[currentX][currentY+1] = block[0][1]
    data[currentX][currentY+2] = block[0][2]
    data[currentX][currentY+3] = block[0][3]

    data[currentX+1][currentY] = block[1][0]
    data[currentX+1][currentY+1] = block[1][1]
    data[currentX+1][currentY+2] = block[1][2]
    data[currentX+1][currentY+3] = block[1][3]

    data[currentX+2][currentY] = block[2][0]
    data[currentX+2][currentY+1] = block[2][1]
    data[currentX+2][currentY+2] = block[2][2]
    data[currentX+2][currentY+3] = block[2][3]

    data[currentX+3][currentY] = block[3][0]
    data[currentX+3][currentY+1] = block[3][1]
    data[currentX+3][currentY+2] = block[3][2]
    data[currentX+3][currentY+3] = block[3][3]

    screenMake(data, row+4, cell, table)
}


const check = (direction) => {
    stopFlag = false
    
    let whichWay = direction

    if (whichWay === 'right') {
        
        console.log('오른쪽 체크해볼게요')
        console.log(data[currentX][currentY+4])
        if(currentY < 9) {
            let tempArr = []
            let tempBlock = blockData[currentBlockNum][currentBlockShape]
            
                tempArr.push(
                    data[currentX][currentY+1]+tempBlock[0][0],
                    data[currentX][currentY+2]+tempBlock[0][1],
                    data[currentX][currentY+3]+tempBlock[0][2],
                    data[currentX][currentY+4]+tempBlock[0][3],
    
                    data[currentX+1][currentY+1]+tempBlock[1][0],
                    data[currentX+1][currentY+2]+tempBlock[1][1],
                    data[currentX+1][currentY+3]+tempBlock[1][2],
                    data[currentX+1][currentY+4]+tempBlock[1][3],
    
                    data[currentX+2][currentY+1]+tempBlock[2][0],
                    data[currentX+2][currentY+2]+tempBlock[2][1],
                    data[currentX+2][currentY+3]+tempBlock[2][2],
                    data[currentX+2][currentY+4]+tempBlock[2][3],
    
                    data[currentX+3][currentY+1]+tempBlock[3][0],
                    data[currentX+3][currentY+2]+tempBlock[3][1],
                    data[currentX+3][currentY+3]+tempBlock[3][2],
                    data[currentX+3][currentY+4]+tempBlock[3][3],
                )

            console.log(tempArr)
            console.log(tempBlock)
    
            if(tempArr.includes(10)) {
                // noMoving = true
            } 
        } else {
            // noMoving = true
        }
    }

    if (whichWay === 'left') {

    }

    if (whichWay === 'down') {
        console.log('아래쪽 체크해볼게요')
       
        if(currentX < 20) {
            let tempBlock = blockData[currentBlockNum][currentBlockShape]
            let tempArr = []
                tempArr.push(
                    data[currentX+1][currentY]+tempBlock[0][0],
                    data[currentX+1][currentY+1]+tempBlock[0][1],
                    data[currentX+1][currentY+2]+tempBlock[0][2],
                    data[currentX+1][currentY+3]+tempBlock[0][3],
    
                    data[currentX+2][currentY]+tempBlock[1][0],
                    data[currentX+2][currentY+1]+tempBlock[1][1],
                    data[currentX+2][currentY+2]+tempBlock[1][2],
                    data[currentX+2][currentY+3]+tempBlock[1][3],
    
                    data[currentX+3][currentY]+tempBlock[2][0],
                    data[currentX+3][currentY+1]+tempBlock[2][1],
                    data[currentX+3][currentY+2]+tempBlock[2][2],
                    data[currentX+3][currentY+3]+tempBlock[2][3],
    
                    data[currentX+4][currentY]+tempBlock[3][0],
                    data[currentX+4][currentY+1]+tempBlock[3][1],
                    data[currentX+4][currentY+2]+tempBlock[3][2],
                    data[currentX+4][currentY+3]+tempBlock[3][3],
                )
    
            console.log(tempArr)
            console.log(tempBlock)
    
            if(tempArr.includes(10)) {
                stopFlag = true
            } 
        } else {
            stopFlag = true
        }

        

    }

    if (whichWay === 'change') {

    }

}


const move = (direction) => {
    let whichWay = direction

    if (whichWay === 'down') {
        for (let i=0; i<row+4; i++) {
            data[i].forEach((v, idx)=>{
                if (v === 1) {
                    data[i][idx] = 0
                }
            })
        }

        let tempBlock = blockData[currentBlockNum][currentBlockShape]
        console.log(tempBlock)

        data[currentX+1][currentY] += tempBlock[0][0],
        data[currentX+1][currentY+1] += tempBlock[0][1],
        data[currentX+1][currentY+2] += tempBlock[0][2],
        data[currentX+1][currentY+3] += tempBlock[0][3],
    
        data[currentX+2][currentY] += tempBlock[1][0],
        data[currentX+2][currentY+1] += tempBlock[1][1],
        data[currentX+2][currentY+2] +=tempBlock[1][2],
        data[currentX+2][currentY+3] +=tempBlock[1][3],
    
        data[currentX+3][currentY] += tempBlock[2][0],
        data[currentX+3][currentY+1] += tempBlock[2][1],
        data[currentX+3][currentY+2] += tempBlock[2][2],
        data[currentX+3][currentY+3] += tempBlock[2][3],
    
        data[currentX+4][currentY] += tempBlock[3][0],
        data[currentX+4][currentY+1] += tempBlock[3][1],
        data[currentX+4][currentY+2] += tempBlock[3][2],
        data[currentX+4][currentY+3] += tempBlock[3][3],


        console.log(data)
        currentX += 1
        screenMake(data, row+4, cell, table)
    }



    if (whichWay === 'right') {
        for (let i=0; i<row+4; i++) {
            data[i].forEach((v, idx)=>{
                if (v === 1) {
                    data[i][idx] = 0
                }
            })
        }

        let tempBlock = blockData[currentBlockNum][currentBlockShape]

        data[currentX][currentY+1] += tempBlock[0][0],
        data[currentX][currentY+2] += tempBlock[0][1],
        data[currentX][currentY+3] += tempBlock[0][2],
        data[currentX][currentY+4] += tempBlock[0][3],
    
        data[currentX+1][currentY+1] += tempBlock[1][0],
        data[currentX+1][currentY+2] += tempBlock[1][1],
        data[currentX+1][currentY+3] +=tempBlock[1][2],
        data[currentX+1][currentY+4] +=tempBlock[1][3],
    
        data[currentX+2][currentY+1] += tempBlock[2][0],
        data[currentX+2][currentY+2] += tempBlock[2][1],
        data[currentX+2][currentY+3] += tempBlock[2][2],
        data[currentX+2][currentY+4] += tempBlock[2][3],
    
        data[currentX+3][currentY+1] += tempBlock[3][0],
        data[currentX+3][currentY+2] += tempBlock[3][1],
        data[currentX+3][currentY+3] += tempBlock[3][2],
        data[currentX+3][currentY+4] += tempBlock[3][3],

        currentY += 1
        screenMake(data, row+4, cell, table)


    }
}


const movingChecking = (direction) => {
    check(direction)
    if (stopFlag) {
        nineSolid()
        // 줄 없애기 넣기
        blockOnData()
    } else if (!stopFlag && !noMoving) {
        move(direction)
    } 
}







// const matchingBlock = (matchBlock) => {
//     console.log('블록을 데이터로')
//     console.log(currentY<row)
    
//     if (currentY < row) {// 바뀌려는 블록이 줄 끝에 다다랐을 때
//         // 아무일도 일어나지 않음
//     } else {
//         for(i=0; i<4; i++){
//             for(k=0; k<4; k++){
                
//             }
//         }
//     }




    // for(i=0; i<4; i++){
    //     for(k=0; k<4; k++){
    //         if(matchBlock[i][k] === 1){
    //             if(data[currentX+i][currentY+k] !=9) { // 바뀌려는 자리 data 값이 9가 아닐때
    //                 console.log('주변에 9 없어')
    //                 console.log(data)
    //                 data[currentX+i][currentY+k] = matchBlock[i][k]
    //             } else { // 바뀌려는 자리 data 값이 9일 때
    //                 console.log('뭐야')
    //                 break
    //             }
    //         } else {
    //             if(data[currentX+i][currentY+k] === 9) {
    //                 data[currentX+i][currentY+k] = 9
    //             } else {
    //                 data[currentX+i][currentY+k] = 0
    //             }
    //         }
    //     }
    // }
  
    // data[currentX][currentY] = matchBlock[0][0]
    // data[currentX][currentY+1] = matchBlock[0][1]
    // data[currentX][currentY+2] = matchBlock[0][2]
    // data[currentX][currentY+3] = matchBlock[0][3]

    // data[currentX+1][currentY] = matchBlock[1][0]
    // data[currentX+1][currentY+1] = matchBlock[1][1]
    // data[currentX+1][currentY+2] = matchBlock[1][2]
    // data[currentX+1][currentY+3] = matchBlock[1][3]

    // data[currentX+2][currentY] = matchBlock[2][0]
    // data[currentX+2][currentY+1] = matchBlock[2][1]
    // data[currentX+2][currentY+2] = matchBlock[2][2]
    // data[currentX+2][currentY+3] = matchBlock[2][3]

    // data[currentX+3][currentY] = matchBlock[3][0]
    // data[currentX+3][currentY+1] = matchBlock[3][1]
    // data[currentX+3][currentY+2] = matchBlock[3][2]
    // data[currentX+3][currentY+3] = matchBlock[3][3]
// }


const movingArrow = (keyCode) => {
    switch (keyCode) {
        case 'ArrowLeft':
            console.log('왼쪽키')
            // clearInterval(gameInterval)
            // movingLeft()
            // gameInterval = setInterval(movingDownWithCheck, 200)
            return
        case 'ArrowRight':
            console.log('오른쪽키')
            movingChecking('right')
            // clearInterval(gameInterval)
            // movingRight()
            // gameInterval = setInterval(movingDownWithCheck, 200)
            return
        case 'ArrowUp':
            console.log('위쪽키, 도형바꾸기')
            // clearInterval(gameInterval)
            // changeBlock()
            // gameInterval = setInterval(movingDownWithCheck, 200)
            return
        case 'ArrowDown':
            console.log('아래쪽')
            movingChecking('down')
            // clearInterval(gameInterval)
            // movingDownWithCheck()
            // gameInterval = setInterval(movingDownWithCheck, 200)
            return


        case 'Space':
            console.log('스페이스바, 한번에 가기')
            // clearInterval(gameInterval)
            // movingDownWithCheck()
            // gameInterval = setInterval(movingDownWithCheck, 200)

    }
}


window.addEventListener('keydown', e => {
    console.log('currentX : ', currentX, 'currentY : ', currentY)
    movingArrow(e.key);
    console.log('currentX : ', currentX, 'currentY : ', currentY)
    console.log('현재', currentBlockNum, '번 블록, ', currentBlockShape,' 번째 모양')
    console.log(stopFlag)
});




// const movingDown = () => {

//     for (let i=0; i<data.length; i++) {
//         data[data.length-i-1].forEach((v, idx)=>{
//             if (v === 1) {
//                 // console.log('1 찾았다')
                
//                 if (data[data.length-i]) {
//                     data[data.length-i][idx] = 1
//                     data[data.length-i-1][idx] = 0
//                 }
//             }
//         })
//     }
//     currentX += 1
//     screenMake(data, row+4, cell, table)
// }

// const movingRight = () => {

//     outer : for(let i=data.length-1; i>-1; i--){
//         inner : for (let k=data[0].length-1; k>-1; k--) {
//             if (data[i][k] === 1) {
//                 if (k===9) {
//                     break outer
//                 } else  {
//                     data[i][k+1] =1
//                     data[i][k] = 0    
//                 }               
//             }
//         }
//     }
//     if (currentY === 9){
//     } else {
//         currentY += 1
//     }

//     screenMake(data, row+4, cell, table)
// }

// const movingLeft = () => {

//     outer : for(let i=data.length-1; i>-1; i--){
//         inner : for (let k=0; k<data[0].length; k++) {
//             if (data[i][k] === 1) {
//                 if (k===0) {
//                     break outer
//                 } else {
//                     data[i][k-1] =1
//                     data[i][k] = 0
//                 }               
                
//             }
//         }
        
//     }
//     if (currentY === 0){
//     } else {
//         currentY -= 1
//     }
    
//     screenMake(data, row+4, cell, table)
// }


// const changeBlock = () => {
    
//     let willChange = null
//     if (currentBlockShape === 3) {
//         console.log('3번째모양이다')
//         willChange = blockData[currentBlockNum][0]
//         currentBlockShape = 0
//         matchingBlock(willChange)
//         screenMake(data, row+4, cell, table)
//     } else {
//         willChange = blockData[currentBlockNum][currentBlockShape+1]
//         currentBlockShape += 1
//         matchingBlock(willChange)
//         screenMake(data, row+4, cell, table)
//     }

// }


// const checkDown = () => {

//     /**
//      * game over check
//      */
//     if (data[4][4] === 9) {
//         gameOver = true
//     }




//     /**
//      * stop check
//      */
//     stopFlag = false;
//     for (let i=0; i<data.length; i++) {// 데이터 끝줄 부터 1이 있는지 확인하기
//         data[data.length-i-1].forEach((v, idx)=>{   // 
//             if (v===1){
//                 if (data[data.length-i]) {  
//                     if (data[data.length-i][idx] === 9) {
//                             // console.log('다음칸에 뭐가 있어 멈춰')
//                             stopFlag = true
//                         } else {
//                             // console.log('멈추지마')                            
//                         }
//                 } else if (!data[data.length-i]){  
//                     // console.log('다음줄 없다')
//                     stopFlag = true
//                 }
//             }
//         })
//     }
// }


// const movingDownWithCheck = () => {  
//     // console.group();
//     checkDown();
//     if (stopFlag) {
//         // console.log('플래그가 멈추래')
//         nineSolid()

//         // 줄 없애기
//         for (let i=0; i<data.length; i++) {// 데이터 끝줄 부터 1이 있는지 확인하기
//             let filledNum = data[data.length-i-1].filter(v => v === 9).length
//             console.log(filledNum)
//             if(filledNum === 10) {
//                 console.log('1줄 다 찼다')
//                 console.log(data[data.length-i-1])
//                 data.splice(data.length-i-1, 1)
//                 data.unshift([0,0,0,0,0,0,0,0,0,0])
//                 screenMake(data, row+4, cell, table)
//             }
//         }


//         currentX = 0;
//         currentY = 3;
//         blockOnData()

//     } else if (!stopFlag) {
//         // console.log('플래그가 계속 가래')
//         movingDown()
//     }
//     // console.groupEnd();
// }


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





    // data reverse 
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