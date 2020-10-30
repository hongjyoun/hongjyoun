const table = document.getElementById('table')
const scoreIndex = document.getElementById('score')
let data = []
const tempNum = [1,2,3,4]


function startGame() {
  const fragment = document.createDocumentFragment()
  tempNum.forEach(() => {
    let colData = []
    data.push(colData)
    const tr = document.createElement('tr')
    tempNum.forEach(()=>{
      colData.push(0)
      const td = document.createElement('td')
      tr.appendChild(td)
    })
    fragment.appendChild(tr)
  })
  table.appendChild(fragment)
  // console.log(data)
}

function randomMake() {
  let blank = []
  data.forEach((row, i)=>{
    row.forEach((col, j)=>{
      if (!col) {
        blank.push([i,j])
      }
    })
  })
  // console.log(blank)

  // 칸이 다 찼을 경우
  
  if(blank.length === 0) {
    alert('게임 오버!: ' + scoreIndex.textContent)
    table.innerHTML = ''
    startGame()
  } else {
    let randomCellIdx = blank[Math.floor(Math.random() * blank.length)]
    data[randomCellIdx[0]][randomCellIdx[1]] = 2
    create()
  }
}


// 데이터를 화면에 그려주는 함수
function create() {
  data.forEach((row, i)=>{
    row.forEach((col, j)=>{
      if (col > 0) {
        table.children[i].children[j].textContent = col
      } else {
        table.children[i].children[j].textContent = ''
      }
    })
  })
}






startGame()
randomMake()
// create()



// 방향 좌표구하기
let dragStart = false
let draging = false
let xyStart = []
let xyEnd = []
let direction = null

window.addEventListener('mousedown', (e)=>{  // 마우스 누를때
  dragStart = true
  xyStart = [e.clientX, e.clientY]
})

window.addEventListener('mousemove', (e)=>{  // 마우스 움직임
  if (dragStart){
    draging = true
  }
})

window.addEventListener('mouseup', (e)=>{  // 마우스 뗄 때
  xyEnd = [e.clientX, e.clientY]
  if (draging) {
    
    const xDiff = xyEnd[0] - xyStart[0]
    const yDiff = xyEnd[1] - xyStart[1]
  
    if (xDiff < 0 && Math.abs(xDiff) / Math.abs(yDiff) > 1) {
      direction = 'left'  
    } else if (xDiff > 0 && Math.abs(xDiff) / Math.abs(yDiff) > 1) {
      direction = 'right' 
    } else if (yDiff > 0 && Math.abs(xDiff) / Math.abs(yDiff) < 1) {
      direction = 'down' 
    } else if (yDiff < 0 && Math.abs(xDiff) / Math.abs(yDiff) < 1) {
      direction = 'up'  
    }
    console.log(direction)
  }
  dragStart = false
  draging = false


  // 어느 방향이냐에 따라 달라지는 숫자 움직임
   switch (direction) {
    // 방향에 따라 바뀌는 데이터 (newData)를 새로 만듬
    case 'left':
      const newData3 = [
        [],
        [],
        [],
        []
      ]

      data.forEach((row, i)=>{
        row.forEach((col, j)=>{ 
          if (col) {
            if (newData3[i][newData3[i].length-1] && newData3[i][newData3[i].length-1] === col) {
              // console.log('same')
              newData3[i][newData3[i].length-1] *= 2
              const nowScore = parseInt(scoreIndex.textContent, 10)
              scoreIndex.textContent = nowScore +  newData3[newData3.length - 1]

            } else {
              newData3[i].push(col)
            }
          }
        })
      })

      
      // 바뀐 데이터(newData)를 최종 데이터(data)에 '왼쪽정렬로' 담음
      tempNum.forEach((col, i) =>{
        tempNum.forEach((row, j)=>{
          data[i][j] = newData3[i][j] || 0
        })
      })
      break
    case 'right':
      const newData4 = [
        [],
        [],
        [],
        []
      ]

      console.log(newData4)
      data.forEach((row, i)=>{
        row.forEach((col, j)=>{
          if (col) {
            if (newData4[i][0] && newData4[i][0] === col) {
              newData4[i][0] *= 2
              const nowScore = parseInt(scoreIndex.textContent, 10)
              scoreIndex.textContent = nowScore +  newData4[i][0]

            } else {
              newData4[i].unshift(col)
            }
          } 
        })
      })

       tempNum.forEach((col, i) =>{
        tempNum.forEach((row, j)=>{
          data[i][tempNum.length-1-j] = newData4[i][j] || 0
        })
      })

      break
    case 'up':
      const newData = [
        [],[],[],[]
      ]
      
      data.forEach((row, i)=>{
        row.forEach((col, j)=>{
          if (col) {
            if (newData[j][newData[j].length -1] && newData[j][newData[j].length -1] === col) {
              // console.log('same')
              newData[j][newData[j].length -1] *= 2
              const nowScore = parseInt(scoreIndex.textContent, 10)
              scoreIndex.textContent = nowScore +  newData[j][newData[j].length -1]

            } else {
              newData[j].push(col)
            }
          } 
        })
      })

      

      tempNum.forEach((col, i) =>{
        tempNum.forEach((row, j)=>{
          data[j][i] = newData[i][j] || 0
          console.log(data)
        })
      })
      break
    case 'down':
      const newData2 = [
        [],[],[],[]
      ]

      console.log(newData2)

      data.forEach((row, i)=>{
        row.forEach((col, j)=>{
          if (col) {
            if (newData2[j][0] && newData2[j][0] === col) {
              // console.log('same')
              newData2[j][0] *= 2
              const nowScore = parseInt(scoreIndex.textContent, 10)
              scoreIndex.textContent = nowScore +  newData2[j][0]

            } else {
              newData2[j].unshift(col)
            }
          } 
        })
      })


      tempNum.forEach((col, i) =>{
        tempNum.forEach((row, j)=>{
          data[tempNum.length-1-j][i] = newData2[i][j] || 0
        })
      })
      break
  }

  // data를 새로 화면에 그려주고
  create()

  // 랜덤한 숫자 하나 더 만들고
  randomMake()
})

