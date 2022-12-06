// получаем компоненты html
const cube = document.querySelector('.cube');
const items = Array.from(cube.querySelectorAll('.cube-item'));
const itemsNum = Array.from(cube.querySelectorAll('.num'));
const gameBtn = document.querySelector('#game');


// Формируем матрицу
let matrix = getMatrix(items.map((item) => Number(item.dataset.matrixId)))
setPositionItems(matrix)

// Создаем событие кнопке mix
document.querySelector('#mix').addEventListener('click', () => {
	mixing()
})

// Проверка на соответствие количества элементов item (для распознования игры которую мы выбрали)
if (items.length === 16) {
	gameBtn.addEventListener('click', (event) => {
		showItems()
		setTimeout(() => {
			for(let i = 0; i < itemsNum.length; i++){
				itemsNum[i].style.opacity = `0`;
			}
		}, 5000)
		pairGame()
		event.target.disabled = true
	})
} else if (items.length === 15) {

} else {
	throw new Error(`Ошибка: некорректное число элементов для игры`)
}

/* Функции помошники */

// Функция показывает эллементы 
function showItems() {
	for(let i = 0; i < itemsNum.length; i++){
			itemsNum[i].style.opacity = `1`;
	}
}
// Функция скрывает эллементы 
function hidesItem() {
	for(let i = 0; i < itemsNum.length; i++){
		itemsNum[i].style.opacity = `0`;
	}
}

// Функция формирует матрицу из массива
function getMatrix(arr){
	const matrix = [[],[],[],[]]
	let y = 0
	let x = 0

	for(let i = 0; i < arr.length; i++){
		if (x >= 4) {
			y++;
			x = 0;
		}
		matrix[y][x] = arr[i]
		x++;
	}
	return matrix;
}

// Функция устанавливает позиции элементам внутри блока
function setPositionItems(matrix) {
	for(let y = 0; y < matrix.length; y++) {
		for(let x = 0; x < matrix[y].length; x++) {
			const value = matrix[y][x];
			const node = items[value - 1];
			setNodeStyles(node, x, y);
		}
	}
}

// Функция добавляет стиль элементу с вычислиными значениями
function setNodeStyles(node, x, y) {
	const shiftPs = 100;
	const RotatePs = 180
	
	node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%,  0) rotateY(${RotatePs}deg)`
	node.children[0].style.opacity = `0`
	node.removeAttribute('id');
}

// Функция перетасовывает массив
function shuffleArray(arr) {
	return arr 
		.map(value => ({value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({value}) => value)
}

// Функция перемешьвает элементы  
function mixing(){
	const shuffledArray = shuffleArray(matrix.flat())
	matrix = getMatrix(shuffledArray);
	setPositionItems(matrix);
}

// Функция с логикой игры
function pairGame() {
	let arrButtonActive = []
	let buttonItem = null
	cube.addEventListener('click', (event) => {
		// Получаем элемент матрицы
		buttonItem = event.target.closest('button'); 
		// Если элемент уже был получен, прекрощаем событие
		if (buttonItem === null) {
			return
		}
		
		// Присваеваем стили для трансформации элемента
		buttonItem.style.transform = buttonItem.style.transform.replaceAll(/180deg/g, '0deg'); 
		buttonItem.children[0].style.opacity = `1`;
		buttonItem.id = 'active'; 
		arrButtonActive.push(buttonItem.children[0].textContent);

		// Подучаем индекс предпоследнего и последнего элемента массива arrButtonActive
		let indexButtonNode1 = arrButtonActive.length - 2
		let indexButtonNode2 = arrButtonActive.length - 1
		
		// Если активно 2 элемента и их значения не равны
		if ((arrButtonActive.length % 2 === 0) && (arrButtonActive[indexButtonNode1] !== arrButtonActive[indexButtonNode2])){
			mixing()
			arrButtonActive.length = 0;
			console.log(`мимо, попробуй еще раз ${arrButtonActive}`)
			return gameBtn.disabled = false

		// Если активно 2 элемента и число активных элементов равно 16
		} else if ((arrButtonActive.length % 2 === 0) && (arrButtonActive.length === 16)){
			mixing()
			console.log('вы выйграли')
			return gameBtn.disabled = false

		// Если активно 2 элемента и их значения равны
		} else if ((arrButtonActive.length % 2 === 0) && (arrButtonActive[indexButtonNode1] === arrButtonActive[indexButtonNode2])) {
			 console.log(`в цель, играй дальше ${arrButtonActive}`)
		} 
	});
}