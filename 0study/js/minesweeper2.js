const tagRow = document.getElementById('row')
const tagCol = document.getElementById('col')
const tagMine = document.getElementById('mine')
const tagLog = document.getElementById('log')

const tagTable = document.getElementById('table')
const startButton = document.getElementById('button')

let data = []
let gameOver = false
let openedCell = 0

const code = {
  normal : 0,
  mine : 1,
  opened : -1,
  question : 9,
  questionMine : 90,
  flag : 8,
  flagMine : 80,

}


startButton.addEventListener('click', ()=>{
  table.innerHTML = ''
  data = []
  gameOver = false

  const howManyRow = tagRow.value
  const howManyCol = tagCol.value
  const howManyMine = tagMine.value
  // console.log(howManyRow,howManyCol,howManyMine)

  const fragment = document.createDocumentFragment()
  for (i=0; i<howManyRow; i++) {
    data.push([])
    const tr = document.createElement('tr')
    for (j=0; j<howManyCol; j++) {
      data[i].push(code.normal)
      const td = document.createElement('td')


      // 칸을 눌렀을 때
      td.addEventListener('click', (e)=>{
        if (gameOver) {
          return
        }

        const whichRow = e.currentTarget.parentNode
        const whichTable = e.currentTarget.parentNode.parentNode
        const rowIndex = Array.prototype.indexOf.call(whichTable.children, whichRow)
        const cellIndex = Array.prototype.indexOf.call(whichRow.children, e.currentTarget)
        
        e.currentTarget.classList.add('opened')
        openedCell += 1


        if (data[rowIndex][cellIndex] === code.mine) {
          e.currentTarget.textContent='펑'
          gameOver = true
          
        } else {
          data[rowIndex][cellIndex] = code.opened
          let around = [
            data[rowIndex][cellIndex-1],
            data[rowIndex][cellIndex+1]
          ]
          if (data[rowIndex-1]) {
            around = around.concat([
              data[rowIndex-1][cellIndex-1],
              data[rowIndex-1][cellIndex],
              data[rowIndex-1][cellIndex+1],
            ])
          }
          if (data[rowIndex+1]) {
            around = around.concat([
              data[rowIndex+1][cellIndex-1],
              data[rowIndex+1][cellIndex],
              data[rowIndex+1][cellIndex+1],
            ])
          }

          const aroundMineCount = around.filter((v)=>{
            return [code.mine, code.questionMine, code.flagMine].includes(v)
          }).length

          e.currentTarget.textContent = aroundMineCount || ''
          console.log(data)

          // 재귀함수
          if (aroundMineCount === 0) {
            let aroundCell = []
            if (table.children[rowIndex-1]) {
              aroundCell = aroundCell.concat([
                table.children[rowIndex-1].children[cellIndex-1],
                table.children[rowIndex-1].children[cellIndex],
                table.children[rowIndex-1].children[cellIndex+1],
              ])
            }
            aroundCell = aroundCell.concat([
              table.children[rowIndex].children[cellIndex-1],
              table.children[rowIndex].children[cellIndex+1],
            ])
            if (table.children[rowIndex+1]) {
              aroundCell = aroundCell.concat([
                table.children[rowIndex+1].children[cellIndex-1],
                table.children[rowIndex+1].children[cellIndex],
                table.children[rowIndex+1].children[cellIndex+1],
              ])
            }

            aroundCell
            .filter((v)=>!!v)
            .forEach((nextCell)=>{
              const nextTr = e.currentTarget.parentNode
              const nextTable = e.currentTarget.parentNode.parentNode
              console.log(nextTr, nextTable)
              const cellIdxNextCell = Array.prototype.indexOf.call(nextTr.children, nextCell)
              const rowIdxNextCell = Array.prototype.indexOf.call(nextTable.children, nextTr)
              console.log(cellIdxNextCell, rowIdxNextCell)
              if (data[rowIdxNextCell][cellIdxNextCell] !== code.opened) {
                nextCell.click()
              }
            })
          }

          if (openedCell === (howManyRow * howManyCol) - howManyMine) {
            gameOver = true
            tagLog.textContent = '이겼습니다!'

          }
        }
      })

      tr.appendChild(td)
    }
    fragment.appendChild(tr)
  }
  tagTable.appendChild(fragment)
  console.log(data)


  // 지뢰 숫자 뽑기
  const howManyCells = howManyRow * howManyCol
  const tempNum = Array(howManyCells).fill().map((v,i)=>i)
  const mineNumbers = []
  for (let i=0; i<howManyMine; i++){
    const randomNum = Math.floor(Math.random()*tempNum.length)
    let spliced = tempNum.splice(randomNum, 1)
    mineNumbers.push(spliced[0])
  }
  console.log(mineNumbers)

  // 지뢰 심기 (뽑은 숫자가 25이면, 2,5,로 나눠서 2번째 row, 5번째 col 좌표에 넣음)
  for (let k=0; k<mineNumbers.length; k++){
    const firstIdx = Math.floor(mineNumbers[k]/howManyCol)
    const secondIdx = mineNumbers[k]%howManyCol

    table.children[firstIdx].children[secondIdx].textContent = 'X'
    data[firstIdx][secondIdx] = code.mine // 데이터에 담고
  }


})
