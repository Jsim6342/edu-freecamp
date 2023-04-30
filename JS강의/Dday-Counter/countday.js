const countBox = document.getElementById("count-box");
const message = document.getElementById("message");

const createTargetDate = () => {
	let year = document.querySelector("#year").value;
	let month = document.querySelector("#month").value;
	let day = document.querySelector("#day").value;
	console.log(year, month, day);

	if (isNaN(year) || isNaN(month) || isNaN(day)) {
		return NaN;
	}

	return new Date(`${year}-${month}-${day}`).setHours(0, 0, 0, 0);
};

const countRemainDate = (inputDate) => {
	let nowDate = new Date();
	let remainDate = (inputDate - nowDate) / 1000; // ms -> s로 단위 변경
	console.log(inputDate);
	console.log(remainDate);

	if (remainDate <= 0) {
		console.log("타이머가 종료되었습니다.");
		message.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
		countBox.style.display = "none";
		message.style.display = "flex";

		document.getElementById("count-start").disabled = false;
		localStorage.removeItem("saved-date");

		for (let i = 0; i < intervalIdArr.length; i++) {
			console.log("진입!");
			clearInterval(intervalIdArr[i]);
		}

		return;
	} else if (isNaN(remainDate)) {
		console.log("유효한 시간대가 아닙니다.");
		message.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
		countBox.style.display = "none";
		message.style.display = "flex";

		document.getElementById("count-start").disabled = false;
		localStorage.removeItem("saved-date");

		for (let i = 0; i < intervalIdArr.length; i++) {
			console.log("진입!");
			clearInterval(intervalIdArr[i]);
		}

		return;
	}

	const remainObj = {
		day: Math.floor(remainDate / 3600 / 24),
		hour: String(Math.floor(remainDate / 3600) % 24).padStart(2, "0"),
		minute: String(Math.floor(remainDate / 60) % 60).padStart(2, "0"),
		second: String(Math.floor(remainDate) % 60).padStart(2, "0"),
	};

	const documentObj = {
		day: document.getElementById("return-day"),
		hour: document.getElementById("return-hour"),
		minute: document.getElementById("return-minute"),
		second: document.getElementById("return-second"),
	};

	countBox.style.display = "flex";

	let documentKeys = Object.keys(documentObj);

	for (let i = 0; i < documentKeys.length; i++) {
		documentObj[documentKeys[i]].textContent = remainObj[documentKeys[i]];
	}
};

const intervalIdArr = [];
let isStarting = false;
const starter = () => {
	if (isStarting === true) {
		return;
	}
	isStarting = true;
	countBox.style.display = "flex";
	message.style.display = "none";
	document.getElementById("count-start").disabled = true;

	let inputDate = new Date();
	if (!localStorage.getItem("saved-date")) {
		inputDate = createTargetDate();
		localStorage.setItem("saved-date", inputDate);
	} else {
		inputDate = localStorage.getItem("saved-date");
	}

	countRemainDate(inputDate);
	const intervalId = setInterval(() => countRemainDate(inputDate), 1000);

	intervalIdArr.push(intervalId);
	console.log(intervalIdArr);
};

const setClearInterval = () => {
	if (isStarting === false) {
		return;
	}
	console.log("클리어!");
	isStarting = false;
	countBox.style.display = "none";
	message.innerHTML = "<h3>D-day를 입력해주세요.</h3>";
	message.style.display = "flex";
	document.getElementById("count-start").disabled = false;
	localStorage.removeItem("saved-date");

	for (let i = 0; i < intervalIdArr.length; i++) {
		console.log("진입!");
		clearInterval(intervalIdArr[i]);
	}
};

if (!localStorage.getItem("saved-date")) {
	countBox.style.display = "none";
	message.innerHTML = "<h3>D-day를 입력해주세요.</h3>";
} else {
	starter();
}
