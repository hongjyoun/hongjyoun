const text = 'aaaffffffbbccccccaaa'
let answer = []
let count = 1

for (i=0; i<text.length; i++){
  if(text.charAt(i+1)){
    
    if(text.charAt(i) === text.charAt(i+1)){
      count += 1
    } else if (text.charAt(i) !== text.charAt(i+1)){
      answer.push(text.charAt(i))
      answer.push(count)
      count = 1
    }

  } else if(!text.charAt(i+1)) {
    answer.push(text.charAt(i))
    answer.push(count)
    count = 1
  }
}


answer.join
console.log(answer.join(''))
