const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

const createTodoList = (savedData) => {
	let inputData = todoInput.value;
	if (savedData !== undefined) {
		inputData = savedData.contents;
	}

	const newLi = document.createElement("li");
	const newSpan = document.createElement("span");
	const newBtn = document.createElement("button");

	newBtn.addEventListener("click", () => {
		newLi.classList.toggle("complete");
		saveItem();
	});

	newLi.addEventListener("dblclick", () => {
		newLi.remove();
		saveItem();
	});

	if (savedData?.complete === true) {
		newLi.classList.add("complete");
	}

	newSpan.textContent = inputData;
	newLi.appendChild(newBtn);
	newLi.appendChild(newSpan);
	todoList.appendChild(newLi);

	todoInput.value = "";

	saveItem();
};

const checkKeyCode = () => {
	if (window.event.keyCode === 13 && todoInput.value.trim() !== "") {
		createTodoList();
	}
};

const deleteAll = () => {
	const liList = document.querySelectorAll("li");
	for (let li of liList) {
		li.remove();
	}
	saveItem();
};

const saveItem = () => {
	const saveItems = [];

	for (let li of todoList.children) {
		const todoObj = {
			contents: li.querySelector("span").textContent,
			complete: li.classList.contains("complete"),
		};

		saveItems.push(todoObj);
	}

	if (saveItems.length === 0) {
		localStorage.removeItem("todo-list");
	} else {
		localStorage.setItem("todo-list", JSON.stringify(saveItems));
	}
};

const savedTodoList = JSON.parse(localStorage?.getItem("todo-list"));

if (savedTodoList !== null) {
	for (let i = 0; i < savedTodoList.length; i++) {
		createTodoList(savedTodoList[i]);
	}
}

const weatherDataActive = ({ location, weather }) => {
	const weatherMainList = [
		"Clear",
		"Clouds",
		"Drizzle",
		"Rain",
		"Snow",
		"Thunderstorm",
	];

	weather = weatherMainList.includes(weather) ? weather : "Fog";

	const locationName = document.getElementById("location-name");
	locationName.textContent = location;
	document.body.style.backgroundImage = url(`./images/${weather}.jpg`);
};

const weatherSearch = ({ latitude, longitude }) => {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=128ee7caa27c6b445554a50a583fdd94`
	)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			console.log(json.name, json.weather[0].main);
			const weatherData = {
				location: json.name,
				weather: json.weather[0].main,
			};
			weatherDataActive(weatherData);
		})
		.catch((err) => {
			// 에러 발생시
			console.error(err);
		});
};

const accessLocation = ({ coords }) => {
	const { latitude, longitude } = coords;
	const positionObj = {
		latitude, // key, value가 똑같으면 key 생략 가능. -> shorthand property
		longitude,
	};

	console.log(positionObj);

	// weatherSearch(positionObj);
};

const getLocationAPI = () => {
	navigator.geolocation.getCurrentPosition(accessLocation, (err) => {
		console.log(err);
	});
};
getLocationAPI();

// const promiseTest = () => {
// 	return new Promise((resolver, reject) => {
// 		setTimeout(() => {
// 			resolver("success"); // 성공
// 			reject("error"); // 실패
// 		}, 5000);
// 	});
// };

// promiseTest().then((res) => {
// 	console.log(res);
// });
