const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

const createTodoList = () => {
	const inputData = todoInput.value;

	const newLi = document.createElement("li");
	const newSpan = document.createElement("span");
	const newBtn = document.createElement("button");

	newBtn.addEventListener("click", () => {
		newLi.classList.toggle("complete");
	});

	newLi.addEventListener("dblclick", () => {
		newLi.remove();
	});

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

	console.log(saveItems);
};
