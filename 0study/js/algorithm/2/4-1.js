const input = 1000000
let NumberArr = [0, ]
let k = 1


const numMaking = () => {
    // console.log(Math.pow(10, 0))
  outer: do {
    inner: for (let i=1*Math.pow(10, Math.ceil(k/2)-1); i<10*Math.pow(10, Math.ceil(k/2)-1); i++) {
      if(NumberArr.length === input) {
        break outer
      }
      let temp = null
      let half = Math.floor(k/2)
      temp = String(i)
      // console.log(temp)
      for (let m = half-1; m>-1; m--){
        temp = temp + String(temp[m])
      }
      NumberArr.push(Number(temp))

    }
    k += 1
  } while (NumberArr.length < input)
  console.log(NumberArr[NumberArr.length-1])
}

numMaking()





