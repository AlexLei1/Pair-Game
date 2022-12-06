const cube = document.querySelector('.cube')
const items = Array.from(cube.querySelectorAll('.cube-item'))
const itemsNum = Array.from(cube.querySelectorAll('.num'))

// Формируем матрицу
let matrix = getMatrix(items.map((item) => Number(item.dataset.matrixId)))
setPositionItems(matrix)

// Cобытие кнопки mix
document.querySelector('.btn').addEventListener('click', () => {
	mixing()
})
console.log()
// Проверка на соответствие количества элементов item
if (items.length === 16) {

	// Игровой процесс
	function gameProcess() {
		let arrButtonActive = []
		let buttonItem = null
		cube.addEventListener('click', (event) => {
			buttonItem = event.target.closest('button'); // получаем item на который нажали
			
			if (buttonItem === null) {
				return
			}
			
			// присваеваем стили элементу
			buttonItem.style.transform = buttonItem.style.transform.replaceAll(/180deg/g, '0deg'); // поворачиваем элемент на 180 градусов
			buttonItem.children[0].style.color = '#fff' // добавляем цвет цивре элемента
			buttonItem.id = 'active'; // добавляем класс элементу
			arrButtonActive.push(buttonItem.children[0].textContent) // добавляем в массив номер элемента для дольнешего вычесления

			
			// подучаем индекс предпоследнего элемента массива arrButtonActive
			let indexButtonNode1 = arrButtonActive.length - 2
			// подучаем индекс последниго элемента массива arrButtonActive
			let indexButtonNode2 = arrButtonActive.length - 1
			

			
			// Если активно 2 элемента и их значения не равны
			if ((arrButtonActive.length % 2 === 0) && (arrButtonActive[indexButtonNode1] !== arrButtonActive[indexButtonNode2])){
				mixing()
			  arrButtonActive.length = 0;
				return console.log(`мимо, попробуй еще раз ${arrButtonActive}`)

			// Если активно 2 элемента и число активных элементов равно 16
			} else if ((arrButtonActive.length % 2 === 0) && (arrButtonActive.length === 16)){
				mixing()
				return console.log('вы выйграли')

			// Если активно 2 элемента и их значения равны
			} else if ((arrButtonActive.length % 2 === 0) && (arrButtonActive[indexButtonNode1] === arrButtonActive[indexButtonNode2])) {
				return console.log(`в цель, играй дальше ${arrButtonActive}`)
			} else {
				return
			}
		})
	}

	gameProcess()

} else if (items.length === 15) {

} else {
	throw new Error(`Ошибка не коректное число элементов для игры`)
}

/* Функции помошники */

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
	node.children[0].style.color = `black`
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