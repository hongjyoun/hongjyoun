const thousand = Array(1000).fill().map((v,i)=>i+1)
// console.log(thousand)

let numbers = []

thousand.forEach((v)=>{
  if(v<10) {
    numbers.push(v)
  } else if(v<100) {
    numbers.push(Math.floor(v/10))
    numbers.push(Math.floor(v%10))
  } else if(v<1000) {
    numbers.push(Math.floor(v/100))
    numbers.push(Math.floor((v%100)/10))
    numbers.push(Math.floor(v%10))
  } else {
    numbers.push(1,0,0,0)
  }
})

// console.log(numbers)
const filteredCount = (num) => {
  const number = numbers.filter((v)=>{
    return v === num
  })
  return number.length
}

for(i=0; i<10; i++){
  console.log(i+'숫자가 나온 횟수:' + filteredCount(i))
}
