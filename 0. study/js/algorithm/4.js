const firstArray = Array(10000).fill().map((v,i)=>i+1)
let nums = []

firstArray.forEach(v=>{
  const vChar = String(v)
  for (let i=0; i<vChar.length; i++) {
    nums.push(parseInt(vChar[i]))
  }
})

console.log(nums)

const eightNums = nums.filter((v)=>{
  return v===8
})

console.log(eightNums.length)