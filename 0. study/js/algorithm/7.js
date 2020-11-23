const row = 19
const col = 9
let data = []

// data 만들기
for(let i=0; i<row; i++){
  data.push([])
  for(let k=0; k<col; k++){
    data[i].push([])
  }
}


const cycle = (startnum, posX, posY, row, col, whichdata) => {
 // 161, 4, 4, row 11, col 1

  console.log((col===1))
  console.log(!(row===1))
    /** 정방향 */ 
    for (let i=0; i<col; i++){
      whichdata[posX][posY+i] = startnum + i
    }

    /** 아래방향 */
    for (let k=0; k<row-1; k++){
      whichdata[posX+1+k][posY+(col-1)] = startnum + col + k
    }

    if (!(row===1) && !(col===1)) {
      /** 역방향 */
      for (let j=0; j<col-1; j++){
        whichdata[posX+(row-1)][posY+(col-1)-1-j] = startnum + col + (row-1) + j
      }
   
      /** 위방향 */
      for (let n=0; n<row-2; n++){
        whichdata[posX+(row-2)-n][posY] = startnum + col + (row-1) + (col-1) + n
      }
    }
}


// cycle(1, 0, 0, row, col, data)
// cycle(23, 1, 1, row-2, col-2, data)
// cycle(37, 2, 2, row-4, col-4, data)


// // let initNum = startnum + col + (row-1) + (col-1) + (row-2)




let initNum = 1
let pow = 0
let currentRow = row-pow
let currentCol = col-pow

const gijoon = row > col ? col : row

cycle(1, 0, 0, currentRow, currentCol, data)
// console.log(initNum, currentRow, currentCol) 1, 7, 6
initNum = initNum + currentCol + (currentRow-1) + (currentCol-1) + (currentRow-2)

for(let m=1; m<Math.ceil((gijoon/2)); m++) {  

  pow = m * 2
  currentRow = row-pow
  currentCol = col-pow
  cycle(initNum, m, m, currentRow, currentCol, data)
  initNum = initNum + currentCol + (currentRow-1) + (currentCol-1) + (currentRow-2)

}


console.log(data)