

// 랜덤 함수를 활용한 랜덤 수 제작
let randomNumber = String(Math.floor(Math.random() * 1000000)).padStart(6,"0")
console.log(randomNumber);


// 이메일 마스킹 
let email = "codecamp@gmail.com";
let result = "";

if(email.includes("@")) {
    let splitEmail = email.split("@");
    let stringEmail = splitEmail[0];
    let domain = splitEmail[1];

    
    for(let i = 0; i < stringEmail.length; i++) {
        if(i >= stringEmail.length - 4) {
            result += "*";
        }else {
            result += stringEmail[i];
        }
    }

    result += "@" + domain;
}

console.log(result);

// 반복문 + 베틱 문법으로 출력
fruits = [
    {number: 1, title: "레드향"},
    {number: 2, title: "샤인머스켓"},
    {number: 3, title: "산청딸기"},
    {number: 4, title: "한라봉"},
    {number: 5, title: "사과"}
]

for(let i = 0; i < fruits.length; i++) {
    console.log(`과일 차트 ${fruits[i].number}위는 ${fruits[i].title}입니다.`);
}

