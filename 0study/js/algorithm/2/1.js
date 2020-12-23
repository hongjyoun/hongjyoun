const input = ".... .  ... .-.. . . .--. ...  . .- .-. .-.. -.--";

const codes = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
};

const inputSliced = input.split(' ');
const answer = [];
inputSliced.forEach((v,i)=>{
  for(char in codes) {
    console.log(char);
    if (v === codes[char]) {
      answer.push(char);
      break;
    } 
  }
})

console.log(answer.join(''));