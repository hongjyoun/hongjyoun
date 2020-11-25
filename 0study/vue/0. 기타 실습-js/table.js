const bodySelect = document.body
const tableElement = document.createElement('table')
const rows = []
const cells = []
let turn = 'X'

const winLog = document.createElement('div')

const clickCell = (e) => {
  console.log(e.target)
  console.log(e.target.parentNode)

  const rowIndex = rows.indexOf(e.target.parentNode)
  const cellIndex = cells[rowIndex].indexOf(e.target)
  console.log(rowIndex)  // 몇 번째 줄인지
  console.log(cellIndex)  // 몇 번째 칸인지


  // 빈칸이면 O,X 표기하기
  if (cells[rowIndex][cellIndex].textContent !== ''){ // 칸이 이미 채워져 있는가?
  } else { // 빈칸이면
    cells[rowIndex][cellIndex].textContent = turn
    // if(turn === 'X'){
    //   turn = 'O'
    // } else {
    //   turn = 'X'
    // }


    let win = false
    if ( // 가로줄 검사
      cells[rowIndex][0].textContent === turn &&
      cells[rowIndex][1].textContent === turn &&
      cells[rowIndex][2].textContent === turn 
    ) {
      win = true
      console.log(win)
    }

    if ( // 세로줄 검사
      cells[0][cellIndex].textContent === turn &&
      cells[1][cellIndex].textContent === turn &&
      cells[2][cellIndex].textContent === turn 
    ) {
      win = true
      console.log(win)
    }
    if (rowIndex - cellIndex === 0 || Math.abs(rowIndex - cellIndex) === 2 ){ // 대각선 검사 필요한 경우
      if ( 
        cells[0][0].textContent === turn &&
        cells[1][1].textContent === turn &&
        cells[2][2].textContent === turn 
      ) {
        win = true
        console.log(win)
      } else if (
        cells[0][2].textContent === turn &&
        cells[1][1].textContent === turn &&
        cells[2][0].textContent === turn 
      ){
        win = true
        console.log(win)
      }
    }

    if ( win ) {
      winLog.textContent = `${turn} 님이 승리!`
      bodySelect.appendChild(winLog)
      cells.forEach((row)=>{
        row.forEach((cell)=>{
          setTimeout(()=>{
            cell.textContent = ''
            winLog.textContent = ''
          },1000)
        })
      })
      turn = 'X'
    } else {
      if(turn === 'X'){
        turn = 'O'
      } else {
        turn = 'X'
      }
    }

  }
  
  // 3칸이 다 채워졌을 때
  




}


for (let i=0; i<3; i+=1) {
  const rowElement = document.createElement('tr')
  rows.push(rowElement)
  cells.push([])
  for (let j=0; j<3; j+=1) {
    const cellElement = document.createElement('td')
    cellElement.addEventListener('click', clickCell)
    rowElement.appendChild(cellElement)
    // cells[i].push([j])
    cells[i].push(cellElement)
    // console.log(rows)

  }
  tableElement.appendChild(rowElement)
}
bodySelect.appendChild(tableElement)
console.log(cells, rows)