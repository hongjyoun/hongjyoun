const total = 19
const postsInPage = 10

let page = null
let temp = total/postsInPage

console.log(temp)
console.log(Math.floor(temp))
if(total === 0){
  page = 0
} else if(temp <= Math.floor(temp)) {
  page = temp
} else {
  page = Math.floor(temp) + 1
}

console.log(page)