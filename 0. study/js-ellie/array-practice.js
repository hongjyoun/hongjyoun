// Q1
// make a string out of an array
// 'JOIN'
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.join())


// Q2
// make an array out of a string
// 'split' 
const name = 'hong, kang, ming, mong'
console.log(name.split(','))


// Q3
// make this array look like this: [5, 4, 3, 2, 1]
// 'reverse' 
const array = [1, 2, 3, 4, 5];
// console.log(array.sort((a, b) => b - a))
console.log(array.reverse())


// Q4
// make new array without the first two elements
// 'slice'
const arr0 = [1, 2, 3, 4, 5];
arr0.slice(2, 5)
console.log(arr0)



class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}
const students = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88),
];
// Q5
// find a student with the score 90
// 'find'

// for (s of students) {
//     if (s.score != 90) {
//         continue
//     } else {
//         console.log(s.name)
//     }
// }

const result = students.find((student) => {
    return student.score === 90
})
console.log(result)



// Q6
// make an array of enrolled students
// 'filter'

// const arrStudents = []
// for (s of students) {
//     arrStudents.push(s.name)
// }
// console.log(arrStudents)
const result2 = students.filter((student) => student.enrolled)
console.log(result2)



// Q7
// make an array containing only the students' scores // result should be: [45, 80, 90, 66, 88]
// 'map'

// const arrScores = []
// for (s of students) {
//     arrScores.push(s.score)
// }
// console.log(arrScores)

const result3 = students.map((student) => student.score)  // 함수 줄임표현식(Arrow Function)이라서 return 이라는 글자가 생략된 것일뿐, {return student.scroe} 해준거다
console.log(result3)


// Q8
// check if there is a student with the score lower than 50
// 'some' 'every' 

// for (s of students) {
//     if (s.score > 50) {
//         continue
//     } else {
//         console.log(s.name)
//     }
// }
const result4 = students.some((student) => student.score < 50)  // some : 하나라도 있으면 True
console.log(result4)

const result5 = students.every((student) => student.score < 50)  // every : 모두 조건 만족해야 True
console.log(result5)


// Q9 
// compute students' average score
// 'reduce'  값을 누적하는 것
const result6 = students.reduce((prev, curr) => {
    return prev + curr.score
}, 0)
console.log(result6 / students.length)


// Q10
// make a string containing all the scores // result should be: '45, 80, 90, 66, 88'

// const arrScoress = []
// for (s of students) {
//     arrScoress.push(s.score)
// }
// const sorted = arrScoress.sort((a,b) => a-b)
// console.log(sorted.join(','))
{
    const result = students
        .map(student => student.score)
        .filter(score => score >= 50)
        .join()
    console.log(result)
}

{
    const result = students
        .map(student => student.score)
        .sort((a, b) => a - b)
        .join()
    console.log(result)
}