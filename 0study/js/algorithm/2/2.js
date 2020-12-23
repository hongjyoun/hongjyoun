const input = 1112121298.0987



if(input.toString().includes('.')){
  const frontNum = input.toString().split('.')[0]
  const backNum = input.toString().split('.')[1]

  let cuts= []
  for (let i=0; Math.abs(i)<frontNum.length; i-=3) {
    const cut = frontNum.slice(-3+i, frontNum.length+i)
    cuts.unshift(cut)
  }
  console.log(cuts.join(',') + '.' + backNum)

} else {
  const num = input.toString().split('.')[0]
  let cuts= []
  for (let i=0; Math.abs(i)<num.length; i-=3) {
    const cut = num.slice(-3+i, num.length+i)
    cuts.unshift(cut)
  }
  console.log(cuts.join(','))
}
