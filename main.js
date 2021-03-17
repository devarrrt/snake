const canvas = document.getElementById('game')//находим канвас 
const ctx = canvas.getContext('2d')//задаем контекст и говорим, что риовать будем в 2D

//задаем поле
const ground = new Image() 
ground.src = './img/ground.png'
//задаем картинку еды
const foodImg = new Image()
foodImg.src = 'img/food.png'

//один квадратик
let box = 32
//счет
let score = 0
//положение еды всегда случайно
let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box
}
//змейка(изначально пустой массив) всегда находится посередение поля (ее голова)
let snake = []
snake[0] = {
	x: 9 * box,
	y: 10 * box
}

//направление змейки
let dir
const direction = (e) => {
	if (e.keyCode == 37 && dir !== 'right') {
		dir = 'left'
	} else if (e.keyCode == 38 && dir !== 'down') {
		dir = 'top'
	} else if (e.keyCode == 39 && dir !== 'left') {
		dir = 'right'
	} else if (e.keyCode == 40 && dir !== 'top') {
		dir = 'down'
	}
}
document.addEventListener('keydown', direction)//на документ навешиваем обработчик события





//рисуем игру
const drawGame = () => {
	ctx.drawImage(ground, 0, 0) //поле
	ctx.drawImage(foodImg, food.x, food.y) //еда

	//проходимся по змейке и первый ее элемент делаем оранжевым, остальные - зеленым
	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? 'orange' : 'green'
		ctx.fillRect(snake[i].x, snake[i].y, box, box)//рисуем прямоугольник 
	}

	//рисуем счет белого цвета 45 размера и задаем координаты
	ctx.fillStyle = 'white'
	ctx.font = '45px Arial'
	ctx.fillText(score, box * 2.5, box * 1.6)

	let snakeX = snake[0].x
	let snakeY = snake[0].y


	//если змейка съела еду, то прибавляется счет и еда снова становится на случайное место
	if (snakeX == food.x && snakeY == food.y) {
		score++
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box
		}
	} else {
		snake.pop() //иначе удаляется последний элемент в змейке 
	}


	//если змейка выползла за границы поля, то игра останавливается
	if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
		clearInterval(game)
		alert( 'Game over' )
	}



	if (dir == 'left') snakeX -= box
	if (dir == 'right') snakeX += box
	if (dir == 'top') snakeY -= box
	if (dir == 'down') snakeY += box

	//голова змейки 
	let newHead = {
		x: snakeX,
		y: snakeY
	}

	eatTail(newHead, snake)
	snake.unshift(newHead) //добавляем голову в начало змейки
}

//если змейка ест хвост, то очищаем интервал и игра останавливается 
const eatTail = (head, arr) => {
	for (let i = 0; i < arr.length; i++) {
		if (head.x == arr[i].x && head.y == arr[i].y) {
			clearInterval(game)
		alert( 'Game over' )
		}
	}
}

let game = setInterval(drawGame, 400);//движение змейки 