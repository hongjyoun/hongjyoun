// tags
const table = document.getElementById('table')
const log = document.getElementById('log')
const button = document.getElementById('button')

// 가로 세로 갯수


let data = [] 
let gameOver = false
let openedCell = 0

const code = {
    normal: 10,
    normalflag: 15,
    normalQues: 19,
    mine: 20,
    mineflag: 25,
    mineQues: 29,
}



// data 데이터 배열을 만듬 -> 지뢰를 심고 -> 2차원 배열로 data 만듬
const dataCreate = (howManyCell, howManyRow, howManyMine) => {
    let tempNum = Array(howManyCell*howManyRow).fill().map(v => code.normal)

    let tempNum2 = Array(howManyCell*howManyRow).fill().map((v,i) => i+1)
    let shuffled = []
    for (i=0; i<howManyCell*howManyRow; i++){
        randomNum = Math.floor(Math.random()*(tempNum2.length))
        let spliced = []
        spliced = tempNum2.splice(randomNum, 1)
        shuffled = shuffled.concat(spliced)
    }
    
    let mineIdx = []
    mineIdx = shuffled.splice(0, howManyMine)
    
    mineIdx.forEach((v)=>{
        tempNum[v] = code.mine
    })
    
    for (i=0; i<howManyRow; i++) {
        data.push(tempNum.splice(0, howManyCell))
    }
}

// 화면 그리기 함수
const dataToScreen = (howManyCell, howManyRow, howManyMine) => {
    table.innerHTML = ''
    log.innerHTML = ''
    for (i=0; i<howManyRow; i++) {
        const tr = document.createElement('tr')
        for (j=0; j<howManyCell; j++) {
            const td = document.createElement('td')
            tr.appendChild(td)
            switch (data[i][j]) {
                case code.mine:
                    td.textContent = 'X'
                    break
                case code.normal:
                    td.textContent = ''
                    break
                case code.normalflag:
                    td.textContent = '!'
                    td.classList.add('flag')
                    break
                case code.mineflag:
                    td.textContent = '!'
                    td.classList.add('flag')
                    break
                case code.normalQues:
                    td.textContent = '?'
                    td.classList.add('ques')
                    break
                case code.mineQues:
                    td.textContent = '?'
                    td.classList.add('ques')
                    break
                default:
                    td.classList.add('opened')
                    td.textContent = data[i][j] || ''
                    break
            }
            table.appendChild(tr)
        }
    }
}

document.addEventListener('contextmenu', (e)=>{
    e.preventDefault()
    
    const rowIdx = e.target.parentNode.rowIndex
    const cellIdx = e.target.cellIndex
    console.log(data)
    switch(data[rowIdx][cellIdx]) {
        case code.normal:
            data[rowIdx][cellIdx] = code.normalflag
            break
        case code.normalflag:
            data[rowIdx][cellIdx] = code.normalQues
            break
        case code.normalQues:
            data[rowIdx][cellIdx] = code.normal
            break
        case code.mine:
            data[rowIdx][cellIdx] = code.mineflag
            break
        case code.mineflag:
            data[rowIdx][cellIdx] = code.mineQues
            break
        case code.mineQues:
            data[rowIdx][cellIdx] = code.mine
            break
    }

    dataToScreen()
})


const clickCell = (e, rowIdx, cellIdx) => {
    // (1) 주변 지뢰 갯수 세서 칸에 적기
    const countMine = () => {
        let around = []
        if(data[rowIdx-1]){
            around.push(
                data[rowIdx-1][cellIdx-1],
                data[rowIdx-1][cellIdx],
                data[rowIdx-1][cellIdx+1],
            )
        }
        around.push(
            data[rowIdx][cellIdx-1],
            data[rowIdx][cellIdx+1],
        )
        if(data[rowIdx+1]){
            around.push(
                data[rowIdx+1][cellIdx-1],
                data[rowIdx+1][cellIdx],
                data[rowIdx+1][cellIdx+1],
            )
        }
        let mineNums = around.filter((v) => v === code.mine).length
        return mineNums
    }
    e.target.classList.add('opened')
    openedCell += 1
    e.target.textContent = countMine() || ''
    data[rowIdx][cellIdx] = countMine()
    console.log(countMine())

    
    // (2) 빈칸 한꺼번에 열리게 하기
    if (countMine() === 0) {
        
        const currentRows = e.target.parentNode.parentNode.querySelectorAll('tr')
        // const upRows = currentRows[rowIdx-1].querySelectorAll('td')
        const middleRows = currentRows[rowIdx].querySelectorAll('td')
        // const downRows = currentRows[rowIdx+1].querySelectorAll('td')

        console.log(currentRows)
        console.log(currentRows[rowIdx])

        let aroundTd = []
        if (currentRows[rowIdx-1]){
            const upRows = currentRows[rowIdx-1].querySelectorAll('td')
            aroundTd.push(
                upRows[cellIdx-1],
                upRows[cellIdx],
                upRows[cellIdx+1],
            )
        }
        aroundTd.push(
            middleRows[cellIdx-1],
            middleRows[cellIdx+1],
        )
        if (currentRows[rowIdx+1]) {
            const downRows = currentRows[rowIdx+1].querySelectorAll('td')
            aroundTd.push(
                downRows[cellIdx-1],
                downRows[cellIdx],
                downRows[cellIdx+1],
            )
            
        }

        aroundTd.forEach((v)=>{
            if (!v) {
                return
            }
            if (v.classList.contains('opened')) {
            } else {
                v.click()
            } 
        })
    }
}

table.addEventListener('click', (e)=>{
    if(gameOver || e.target.classList.contains('opened')) {
        return
    }
    const rowIdx = e.target.parentNode.rowIndex
    const cellIdx = e.target.cellIndex

    // 지뢰 누르면
    if(data[rowIdx][cellIdx] === code.mine) {
        e.target.classList.add('opened')
        e.target.textContent = '펑'
        gameOver = true
        log.textContent ='지뢰밟았음. 게임 오버' 
    } 

    // 빈칸 누르면
    if (data[rowIdx][cellIdx] === code.normal) {
        clickCell(e, rowIdx, cellIdx)
        console.log(openedCell)

        if (openedCell === (howManyCell*howManyRow)-howManyMine) {
            gameOver = true
            log.textContent = '승리하였습니다'
        }
    } 

    // 물음표나 플래그 누르면, 무시    
    if (data[rowIdx][cellIdx] === code.normalflag, code.normalQues, code.mineflag, code.mineQues) {
        return
    }
})


button.addEventListener('click', ()=>{
    data = []
    const howManyCell = document.getElementById('cell').value
    const howManyRow = document.getElementById('row').value
    const howManyMine = document.getElementById('mine').value

    console.log(howManyCell, howManyRow, howManyMine)
    dataCreate(howManyCell, howManyRow, howManyMine)
    dataToScreen(howManyCell, howManyRow, howManyMine)
})


