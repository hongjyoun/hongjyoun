const testArray = [1,3,5,6,7,13,14,20]
let gaps = []

for(let i=0; i<testArray.length; i++){
  if(testArray[i+1]){
    const gap = Math.abs(testArray[i] - testArray[i+1])
    gaps.push(gap)
  }
}

const min = Math.min.apply(null, gaps)

let index = []
gaps.forEach((v, idx)=>{
  if (v === min) {
    index.push(idx)
  }
})


// 좌표 구하는 함수
const getX = (index) => {
  let tempArr = []
  tempArr.push(testArray[index])
  tempArr.push(testArray[index+1])
  return console.log(tempArr)
}

index.forEach(v=>{
  getX(v)
})
