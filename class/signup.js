
// 휴대폰 번호로 인증번호 인증 로직
const checkPhoneNumber = function() {

    let phoneNumber1 = document.getElementById("phoneNumber1").value;
    let phoneNumber2 = document.getElementById("phoneNumber2").value;
    let phoneNumber3 = document.getElementById("phoneNumber3").value;

    // 포커스 이동
    if(phoneNumber1.length == 3) {
        document.getElementById("phoneNumber2").focus();
    }

    if(phoneNumber2.length == 4) {
        document.getElementById("phoneNumber3").focus();
    }

    // 값 채워짐 확인
    if(phoneNumber1.length == 3 && phoneNumber2.length == 4 && phoneNumber3.length == 4) {
        document.getElementById("createNumber").disabled = false;
    }else {
        document.getElementById("createNumber").disabled = true;
    }
}

// 인증번호 발송
let isTimerStarted = false; // 타이머 반복 조건 제어 변수
const createRandomNumber = () => {
    
    if(isTimerStarted === false) {
        isTimerStarted = true;
        document.getElementById("submit").disabled = false;

        // 랜던 번호 생성
        let randomNumber = String(Math.floor(Math.random() * 1000000)).padStart(6,"0")
        document.getElementById('randomNumber').innerText = randomNumber;

        let countSecond = 180;
        
        let timer; // interval 변수 초기화를 위한 할당
        timer = setInterval(function() {

        // 시간 초과 시 로직
        if(countSecond === 0) {
            alert("시간이 초과되었습니다. 다시 인증번호를 재발송 해주세요.");
        
            document.getElementById("submit").disabled = true;
            isTimerStarted = false;
        
            clearInterval(timer); // interval 초기화
        }

        // 시, 분 표현
        let minute = Math.floor(countSecond / 60);
        let second = String(countSecond % 60).padStart(2, "0");
        countSecond -= 1;
        document.getElementById('time').innerText = minute + ":" + second;
        
        }, 1000);

    }

}

// 인증하기
const certificate = () => {
    let randomNumber = document.getElementById("randomNumber").innerText;
    let inputNumber = document.getElementById("checkNumber").value;
    
    if(randomNumber === inputNumber) {
        alert("인증이 완료되었습니다.");
    }else {
        alert("잘못된 인증번호입니다.");
    }

    console.log(randomNumber)
    console.log(inputNumber)
}