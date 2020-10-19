const rowTag = document.querySelector("#row")
const cellTag = document.querySelector("#cell")
const mineTag = document.querySelector("#mine")
const logTag = document.querySelector("#log")

const button = document.querySelector("#button")
const table = document.querySelector("#table")

let cellsIndex = []
let gameOver = false
let openedCell = 0

const code = {
  opened : -1,
  question : -2,
  flag : -3,
  flagMine : -4,
  questionMine : -5,
  mine : 1,
  normal : 0
}


button.addEventListener('click', ()=>{
  table.innerHTML = ''
  cellsIndex = []
  logTag.textContent = ''
  gameOver = false
  openedCell = 0

  const howManyRows = parseInt(rowTag.value)
  const howManyColumns = parseInt(cellTag.value)
  const howManyMines = parseInt(mineTag.value)
  // console.log(typeof(howManyRows), howManyColumns, howManyMines)
  
  
  for (let i=0; i<howManyRows; i+=1){
    cellsIndex.push([])
    const tr = document.createElement('tr')
    for (let j=0; j<howManyColumns; j+=1){
      cellsIndex[i].push(code.normal)
      const td = document.createElement('td')

      // 오른쪽클릭했을 때
      td.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        
        if(gameOver) {
          return
        }

        const whichRow = e.currentTarget.parentNode
        const whichTable = e.currentTarget.parentNode.parentNode
        const cellIndex = Array.prototype.indexOf.call(whichRow.children, e.currentTarget)
        const rowIndex = Array.prototype.indexOf.call(whichTable.children, whichRow)
        // console.log(rowIndex, cellIndex)


        if(
          e.currentTarget.textContent === '' || 
          e.currentTarget.textContent === 'X'
        ) {
          e.currentTarget.textContent = '!'
          if(cellsIndex[rowIndex][cellIndex] === code.mine){
            cellsIndex[rowIndex][cellIndex] = code.flagMine
          } else{
            cellsIndex[rowIndex][cellIndex] = code.flag
          }
          
          e.currentTarget.classList.add('mineCheck')
        } else if (e.currentTarget.textContent === '!') {
          e.currentTarget.textContent = '?'    
          if(cellsIndex[rowIndex][cellIndex] === code.flagMine){
            cellsIndex[rowIndex][cellIndex] = code.questionMine
          } else{
            cellsIndex[rowIndex][cellIndex] = code.question
          }
        } else if (e.currentTarget.textContent === '?') {
            if (
              cellsIndex[rowIndex][cellIndex] === code.mine || 
              cellsIndex[rowIndex][cellIndex] === code.flagMine || 
              cellsIndex[rowIndex][cellIndex] === code.questionMine
              ){
              e.currentTarget.textContent = 'X'
              cellsIndex[rowIndex][cellIndex] = code.mine
              e.currentTarget.classList.remove('mineCheck')
            } else {
              e.currentTarget.textContent = ''
              cellsIndex[rowIndex][cellIndex] = code.normal
              e.currentTarget.classList.remove('mineCheck')
            }
        }        
      })



      // 클릭했을 때
      td.addEventListener('click', (e) => {  // 클릭했을 때 주변 지뢰 개수
        if (gameOver === true) {
          return
        }

        const whichRow = e.currentTarget.parentNode
        const whichTable = e.currentTarget.parentNode.parentNode
        const rowIndex = Array.prototype.indexOf.call(whichTable.children, whichRow)
        const cellIndex = Array.prototype.indexOf.call(whichRow.children, e.currentTarget)

        if ([code.opened, code.flag, code.flagMine, code.questionMine, code.question]
          .includes(cellsIndex[rowIndex][cellIndex])
          ) {
          return
        }

        e.currentTarget.classList.add('opened')
        openedCell += 1

        // console.log(rowIndex, cellIndex)
        // console.log(cellsIndex)
        if (cellsIndex[rowIndex][cellIndex] === code.mine) {
          e.currentTarget.textContent = '펑'
          logTag.textContent ='펑! 터졌습니다'
          gameOver = true
        } else {
          cellsIndex[rowIndex][cellIndex] = 1
          let around = [
            cellsIndex[rowIndex][cellIndex-1],
            cellsIndex[rowIndex][cellIndex+1],
          ]

          if (cellsIndex[rowIndex-1]){
            around = around.concat([
              cellsIndex[rowIndex-1][cellIndex-1],
              cellsIndex[rowIndex-1][cellIndex],
              cellsIndex[rowIndex-1][cellIndex+1],
            ])
          }
          if (cellsIndex[rowIndex+1]){
            around = around.concat([
              cellsIndex[rowIndex+1][cellIndex-1],
              cellsIndex[rowIndex+1][cellIndex],
              cellsIndex[rowIndex+1][cellIndex+1],
            ])
          }
          const aroundMineCount = around.filter((v)=> {
            return [code.mine, code.flagMine, code.questionMine].includes(v)
          }).length


          // 동시오픈하기- 재귀함수
          e.currentTarget.textContent = aroundMineCount || '' // aroundMineCount의 값이 거짓인 값('', 0, NaN, null, undefined, false)일 때 || 기호 다음을 실행해라
          cellsIndex[rowIndex][cellIndex] = code.opened

          if (aroundMineCount === 0) { 
            let aroundCell = []
            // console.log(table.children[rowIndex])
            // console.log(table.children[rowIndex].children[cellIndex-1])
            if (table.children[rowIndex-1]) {
              aroundCell = aroundCell.concat([
                table.children[rowIndex-1].children[cellIndex-1],
                table.children[rowIndex-1].children[cellIndex],
                table.children[rowIndex-1].children[cellIndex+1]                
              ])
            }
            aroundCell = aroundCell.concat([
              table.children[rowIndex].children[cellIndex-1],
              table.children[rowIndex].children[cellIndex+1]
            ])
            if (table.children[rowIndex+1]) {
              aroundCell = aroundCell.concat([
                table.children[rowIndex+1].children[cellIndex-1],
                table.children[rowIndex+1].children[cellIndex],
                table.children[rowIndex+1].children[cellIndex+1]
              ])
            }
            aroundCell
            .filter((v)=>!!v) // !!v 이건 배열에서 undefine나 null, 0, 빈 문자열 를 제거하는 코드
            .forEach(function(nextCell) {
              const nextTr = e.currentTarget.parentNode
              const nextTable = e.currentTarget.parentNode.parentNode
              const cellIdxofNextCell = Array.prototype.indexOf.call(nextTr.children, nextCell)
              const rowIdxofNextCell = Array.prototype.indexOf.call(nextTable.children, nextTr)
              if (cellsIndex[rowIdxofNextCell][cellIdxofNextCell] !==code.opened) {
                nextCell.click()
              }  
            })
          }
        }
        
        console.log(openedCell)
        if(openedCell === (howManyRows * howManyColumns) - howManyMines) {
          gameOver = true
          logTag.textContent ='이겼습니다!'
        }
      })
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }


  // 지뢰 숫자(위치) 뽑기
  const howManyCells = howManyRows*howManyColumns
  const tempNums = Array(howManyCells).fill().map((v,i)=>i)
  const mineNumbers = []

  for (i=0; i<howManyMines; i+=1){
    const randomNumber = Math.floor(Math.random()*tempNums.length)
    let spliced = tempNums.splice(randomNumber, 1)
    mineNumbers.push(spliced[0])
  }

  
   // 지뢰 심기
  for (let k=0; k<mineNumbers.length; k++){
    const first = Math.floor(parseInt(mineNumbers[k])/howManyColumns)
    const second = parseInt(mineNumbers[k])%howManyColumns
    table.children[first].children[second].textContent = 'X'
    cellsIndex[first][second] = code.mine
  }


  



})

