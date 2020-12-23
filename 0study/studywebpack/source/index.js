import hello_word from './hello_word'
import world_word from './world_word'
import css_powderblue_tomato from './style.css'
document.querySelector('#root').innerHTML = hello_word + ' ' + world_word



// 터미널에서 아래 명령어를 입력하면, 번들 js 파일 만들어짐
// npx webpack --entry ./source/index.js --output-path ./public/index_bundle.js
// "entry 파일은 index.js 파일이야, 그걸 어디로 출력할거냐면(--output) index_bundle.js 이름으로 새로 파일 만들어서 여기에 합쳐놔" 라고 명령하는 것

// 근데 이렇게 cLi로 계속 명령을 하는 건 귀찮은 일.
// 그래서 config 파일을 만들게 됨