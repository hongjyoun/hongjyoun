const row = 5
const col = 6
const initPos = { X: 2, Y: 3 }

let currentPos = { X: null, Y: null}
let moveCount = 0
let fieldArray = []



/** 필드 만들기 */
const tempArray = Array(row * col).fill().map(v=>0)
for (let i=0; i<row; i++) {
  fieldArray.push(tempArray.splice(0, col))
}

// let arr = Array(row).fill(0).map(v=>Array(col).fill(0))


/** 바퀴벌레 무빙 : currentPos이 랜덤하게 바뀜 */
const drunkenMoving = () => {
  
  // 랜덤 무빙 짜기 // 8방향 포지션 [-1,-1]... 배열에 넣고 반복문
  let possibleIndex = []
  if(fieldArray[currentPos.X-1] != undefined) {
    if (fieldArray[currentPos.X-1][currentPos.Y-1] != undefined){
      possibleIndex.push([currentPos.X-1,currentPos.Y-1])
    } 
    if (fieldArray[currentPos.X-1][currentPos.Y] != undefined){
      possibleIndex.push([currentPos.X-1,currentPos.Y])
    } 
    if (fieldArray[currentPos.X-1][currentPos.Y+1] != undefined){
      possibleIndex.push([currentPos.X-1,currentPos.Y+1])
    } 
  }
  if(fieldArray[currentPos.X] != undefined) {
    if (fieldArray[currentPos.X][currentPos.Y-1] != undefined){
      possibleIndex.push([currentPos.X,currentPos.Y-1])
    } 
    if (fieldArray[currentPos.X][currentPos.Y+1] != undefined){
      possibleIndex.push([currentPos.X,currentPos.Y+1])
    } 
  }
  if(fieldArray[currentPos.X+1] != undefined) {
    if (fieldArray[currentPos.X+1][currentPos.Y-1] != undefined){
      possibleIndex.push([currentPos.X+1,currentPos.Y-1])
    } 
    if (fieldArray[currentPos.X+1][currentPos.Y] != undefined){
      possibleIndex.push([currentPos.X+1,currentPos.Y])
    } 
    if (fieldArray[currentPos.X+1][currentPos.Y+1] != undefined){
      possibleIndex.push([currentPos.X+1,currentPos.Y+1])
    }
  }
  let randomIndex = possibleIndex[Math.floor(Math.random()*possibleIndex.length)]

  // 포지션을 랜덤하게 바꿈
  currentPos = { X: randomIndex[0], Y: randomIndex[1] }
  moveCount += 1
}


/** 모든 칸을 움직였는지 체크(모든 칸이 0 이상인지)  */
let keepGoingFlag = () => {
  let filtered = []
  for (let i = 0; i<row; i++) {
    fieldArray[i].forEach(v=>{
      if(v>0){
        filtered.push(1)
      }
    })
  }
  if(filtered.length === row * col) {
    return false // 모든 칸이 0 이상이면, 그만 움직이기
  } else {
    return true
  }
}



/** 초기 */

const init = () => {  
  currentPos = initPos
  fieldArray[currentPos.X][currentPos.Y] += 1

  do {
    drunkenMoving() // currentPos 를 바꾸는 것
    fieldArray[currentPos.X][currentPos.Y] += 1
    if (!keepGoingFlag()) {
      console.log(fieldArray, moveCount)
      break
    }
  } while (keepGoingFlag())
}

init()