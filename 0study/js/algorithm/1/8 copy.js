// let data = [
//   [[],[]],
//   [[],[]],
//   [[],[]],
//   [[],[]],
//   [[],[]],
//   [[],[]],
//   [[],[]],
// ]
const startX = 0
const startY = 0
let n = 0
let data = []

const body = document.querySelector('body')


// data 만들기
const makeData = () => {
  let rowNum = 2 * n + 3
  for (k = 0; k < rowNum; k++) {
    data.push([])
    for (j = 0; j < n + 2; j++) {
      data[k].push([''])
    }
  }
  return data
}


//A
const lineA = () => {
  for (let i = 0; i < n; i++) {
    data[startX][startY + 1 + i] = '-'
  }
  // data[startX][startY] = 'ㅡ'
  // data[startX][startY+1] = 'ㅡ'
  // data[startX][startY+2] = 'ㅡ'
  return data
}

const lineD = () => {
  for (let i = 0; i < n; i++) {
    data[startX + 1 + n][startY + 1 + i] = '-'
  }
  return data
}

const lineG = () => {
  for (let i = 0; i < n; i++) {
    data[startX + 2 + 2 * n][startY + 1 + i] = '-'
  }
  return data
}

const lineB = () => {
  for (let i = 0; i < n; i++) {
    data[startX + (n - i)][startY] = '|'
  }
  return data
}

const lineC = () => {
  for (let i = 0; i < n; i++) {
    data[startX + (n - i)][startY + (n + 2 - 1)] = '|'
  }
  return data
}

const lineE = () => {
  for (let i = 0; i < n; i++) {
    data[startX + 1 + ((2 * n) - i)][startY] = '|'
  }
  return data
}

const lineF = () => {
  for (let i = 0; i < n; i++) {
    data[startX + 1 + ((2 * n) - i)][startY + (n + 2 - 1)] = '|'
  }
  return data
}

// console.log(lineA())
// console.log(lineD())
// console.log(lineG())

// console.log(lineB())
// console.log(lineC())
// console.log(lineE())



const drawing = (a, b, c, d, e, f, g) => {
  if (a) {
    lineA()
  }
  if (b) {
    lineB()
  }
  if (c) {
    lineC()
  }
  if (d) {
    lineD()
  }
  if (e) {
    lineE()
  }
  if (f) {
    lineF()
  }
  if (g) {
    lineG()
  }
}

const whichNumber = (num) => {
  if (num === 1) {
    drawing(false, false, true, false, false, true, false)
  }
  if (num === 2) {
    drawing(true, false, true, true, true, false, true)
  }
  if (num === 3) {
    drawing(true, false, true, true, false, true, true)
  }
  if (num === 4) {
    drawing(false, true, true, true, false, true, false)
  }
  if (num === 5) {
    drawing(true, true, false, true, false, true, true)
  }
  if (num === 6) {
    drawing(true, true, false, true, true, true, true)
  }
  if (num === 7) {
    drawing(true, false, true, false, false, true, false)
  }
  if (num === 8) {
    drawing(true, true, true, true, true, true, true)
  }
  if (num === 9) {
    drawing(true, true, true, true, false, true, true)
  }
  if (num === 0) {
    drawing(true, true, true, false, true, true, true)
  }
}

const screening = (size, printnum) => {
  n = size
  let row = 2 * n + 3

  makeData()
  whichNumber(printnum)

  // html 화면이랑 연동하기

  const div = document.createElement('div')
  const table = document.createElement('table')
  for (let i = 0; i < row; i++) {
    const tr = document.createElement('tr')
    table.appendChild(tr)


    for (let k = 0; k < n + 2; k++) {
      const td = document.createElement('td')
      td.textContent = data[i][k]
      tr.appendChild(td)

    }

  }
  console.log(div)
  div.appendChild(table)
  body.appendChild(div)
  console.log(data)

  // 초기화
  data = []
  n = 0
}


const init = (size, number) => {
  let charNum = String(number)

  // console.log(charNum.length, parseInt(charNum[0]), size)
  for (let i = 0; i < charNum.length; i++) {
    screening(size, parseInt(charNum[i]))
  }


}
// screening(3, 1)
// screening(3, 2)
// screening(3, 3)
// screening(3, 4)
// screening(3, 5)

init(4, 12309867)

