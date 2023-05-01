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
		newLi.classList.add('complete');
	}

	newSpan.textContent = inputData;
	newLi.appendChild(newBtn);
	newLi.appendChild(newSpan);
	todoList.appendChild(newLi);

	todoInput.value = "";

	saveItem();
};

const checkKeyCode = () => {
	if (window.event.keyCode === 13 && todoInput.value !== "") {
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

	if(saveItems.length === 0) {
		localStorage.removeItem('todo-list');
	}
	else {
		localStorage.setItem('todo-list', JSON.stringify(saveItems));
	}
	

};

const savedTodoList = JSON.parse(localStorage?.getItem("todo-list"));
console.log(savedTodoList);

for(let i = 0; i < savedTodoList.length; i++) {
	createTodoList(savedTodoList[i]);
}