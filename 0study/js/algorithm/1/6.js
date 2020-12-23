const text = 'aaaffffffbbccccccaaae'
let answer = []
let count = 1

for (i=0; i<text.length; i++){
  if(text.charAt(i+1)){
    
    if(text.charAt(i) === text.charAt(i+1)){
      count += 1
    } else {
      answer.push(text.charAt(i), count)
      // answer.push(count)
      count = 1
    }

  } else {
    answer.push(text.charAt(i), count)
    // answer.push(count)
    // count = 1
  }
}

console.log(answer.join(''))
