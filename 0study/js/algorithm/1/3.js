// 각자리수 더하고 n 자신을 더한 숫자 = sum
const sum = (num) => {
  let sum = 0
  const numStr = String(num)
  for(i=0; i<numStr.length; i++) {
    // console.log(numStr.length)
    sum += parseInt(numStr.charAt(i))
  }
  // console.log(sum)
  return sum + num
}


// not Self Numbers Array = sums[]
let sums = []
for(let i=0; i<5000; i++){
  sums.push(sum(i))
}


// 비교해서 일치하지 않는 숫자 추출
let numsArray = Array(5000).fill().map((v,i)=> i+1)
let selfNumbers = []
numsArray.forEach((v)=>{
  if(!sums.includes(v))
  selfNumbers.push(v)
})
// console.log(selfNumbers)



// 셀프 넘버들의 합계
let selfNumbersSum = null
selfNumbers.forEach((v)=>{
  selfNumbersSum += v
})
console.log(selfNumbersSum)
