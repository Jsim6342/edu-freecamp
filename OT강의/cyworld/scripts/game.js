const wordCheck = () => {
    let nowWord = document.getElementById("word").innerText;
    let userWord = document.getElementById("myword").value;

    if(nowWord[nowWord.length - 1] == userWord[0]) {
        document.getElementById("word").innerText = userWord;
        document.getElementById("result").innerText = "정답입니다.";
        document.getElementById("result").style = "color: green;";
    }else {
        document.getElementById("result").innerText = "오답입니다.";
        document.getElementById("result").style = "color: red;";
    }

}

const createLotto = () => {
    let numbers = [];

    // 랜덤 번호 생성
    for(let i = 0; i < 6; i++) {
        numbers.push(String(Math.floor(Math.random() * 46)));
    }

    console.log(numbers);
    
    document.getElementById("lotto_numbers").innerHTML
    = `<span>${numbers[0]}</span>
    <span>${numbers[1]}</span>
    <span>${numbers[2]}</span>
    <span>${numbers[3]}</span>
    <span>${numbers[4]}</span>
    <span>${numbers[5]}</span>`;


}