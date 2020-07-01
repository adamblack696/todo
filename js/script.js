'use script';

const planInput = document.querySelector('.plan__input'),
			planForm = document.querySelector('.plan__form'),
			planList = document.querySelector('.plan-list > ul'),
			planListDone = document.querySelector('.plan-list_done > ul'),
			todoData = JSON.parse(localStorage.getItem('todoData')) || [];

const addLocalStorage = () => {
	const string = JSON.stringify(todoData);
	console.log(string);
	localStorage.setItem('todoData', string);
}
const render = () => {
	planInput.value = '';
	planList.textContent = '';
	planListDone.textContent = '';
	todoData.forEach((item, i) => {
		const li = document.createElement('li');
		li.innerHTML = `
			<span>${item.value}</span>
			<div class="plan-list__buttons">
				<button class="plan-list__button-remove"></button>
				<button class="plan-list__button-add"></button>
			</div>
		`;
		if(item.completed) {
			planListDone.append(li);
		} else {
			planList.append(li);
		}
		const buttonAdd = li.querySelector('.plan-list__button-add');
		buttonAdd.addEventListener('click', () => {
			item.completed = !item.completed;
			addLocalStorage();
			render();
		});
		const buttonRemove = li.querySelector('.plan-list__button-remove');
		buttonRemove.addEventListener('click', () => {
			todoData.splice(i, 1);
			addLocalStorage();
			render();
		});
	});
}
const planListAdd = (event) => {
	event.preventDefault();
	if(planInput.value) {
		const newTodo = {
			value: planInput.value,
			completed: false
		};
		todoData.push(newTodo);
		addLocalStorage();
		render();
	}
}
render();
planForm.addEventListener('submit', planListAdd);