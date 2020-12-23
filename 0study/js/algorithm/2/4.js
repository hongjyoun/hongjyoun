const input = 30000
let tenetNumberArr = []

const splitCheckAdd = (n) => {
  const strNum = String(n)
  const length = strNum.length
  let head = []
  let toe = []

  // split
  for(let i=0; i<Math.floor(length/2); i++) {
    head.push(strNum[i])
    toe.push(strNum[length-1-i])
  }

  // check & add
  if (head.join() === toe.join()) {
    tenetNumberArr.push(n)
    console.log(tenetNumberArr);
  }
}

const init = () => {
  for (let k=0; tenetNumberArr.length !== input; k++) {
    splitCheckAdd(k)
  }
  console.log(tenetNumberArr[tenetNumberArr.length-1])
}

init()
