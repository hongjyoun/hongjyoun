const rowTag = document.querySelector("#row")
const cellTag = document.querySelector("#cell")
const mineTag = document.querySelector("#mine")
const logTag = document.querySelector("#log")

const button = document.querySelector("#button")
const table = document.querySelector("#table")

const cellsIndex = []

button.addEventListener('click', ()=>{
  table.innerHTML = ''
  // cellsIndex = []
  const howManyRows = parseInt(rowTag.value)
  const howManyColumns = parseInt(cellTag.value)
  const howManyMines = parseInt(mineTag.value)
  // console.log(typeof(howManyRows), howManyColumns, howManyMines)
  
  
  for (let i=0; i<howManyRows; i+=1){
    cellsIndex.push([])
    const tr = document.createElement('tr')
    for (let j=0; j<howManyColumns; j+=1){
      cellsIndex[i].push(1)
      const td = document.createElement('td')
      td.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        

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
        } else if (e.currentTarget.textContent === '!') {
          e.currentTarget.textContent = '?'          
        } else if (e.currentTarget.textContent === '?') {
            if (cellsIndex[rowIndex][cellIndex] === 1){
            e.currentTarget.textContent = ''
            } else if (cellsIndex[rowIndex][cellIndex] === "지뢰"){
              e.currentTarget.textContent = 'X'
            }
        }


        
        
      })
      td.addEventListener('click', (e) => {  // 클릭했을 때 주변 지뢰 개수
        const whichRow = e.currentTarget.parentNode
        const whichTable = e.currentTarget.parentNode.parentNode
        const rowIndex = Array.prototype.indexOf.call(whichTable.children, whichRow)
        const cellIndex = Array.prototype.indexOf.call(whichRow.children, e.currentTarget)

        console.log(rowIndex, cellIndex)
        console.log(cellsIndex)
        if (cellsIndex[rowIndex][cellIndex] === '지뢰') {
          e.currentTarget.textContent = '펑'
          logTag.textContent ='펑! 터졌습니다'
          return
        } else {
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
              cellsIndex[rowIndex+1][cellIndex-1],
            ])
          }
          e.currentTarget.textContent = around.filter((v)=> {
            return v === '지뢰'
          }).length
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
    const first = Math.floor(parseInt(mineNumbers[k])/10)
    const second = parseInt(mineNumbers[k])%10
    table.children[first].children[second].textContent = 'X'
    cellsIndex[first][second] = '지뢰'
  }


  



})

