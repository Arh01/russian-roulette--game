/*
 1. При нажатии на кнопку "Начать":
 	1.1. Сделать кнопку не активной
 	1.2. Вставить патрон в барабан
 	1.3. Начать крутить барабан
 	1.4. Скрыть пулю
 	1.5. Записать случайное число от 1 до 6, это число отвечает за место пули в барабане
 	1.6. Отобразить револьвер
 	1.7. Изменить текст кнопки на "Сделать выстрел"
 	1.8. Сделать кнопку активной
 2. При нажатии на кропку "Сделать выстрел"
 	2.1. Проверяется число выстрела
 	2.2. Если пуля совпадает числу пули в барабане, то персонаж убит
 	2.3. Иначе револьвер переворачивается и далее повторяется п.2
 	2.4. При успешном выстреле залить соответствующую иконку красной жидкостью
 	2.5. Прокрутить барабан
3. При завершении игры
    3.1. Изменить текст кнопки на "Рестарт"
    3.2. При нажатии на эту кнопку перезагрузить страницу
*/

var countShot = 0;
var bulletPosition = random(1, 6);
var btnShot = document.querySelector("#shot");
var revolver = document.querySelector("#revolver");
var currentPlayer = 1;
var baraban = document.querySelector("#baraban");
var rotateBaraban = 0;

btnShot.onclick = start;

// Первый клик по кнопке "Начать"
function start() {
    // присваиваем кнопке класс "off"
    btnShot.className = "off";
    // клик по кнопке делаем "пустым"
    btnShot.onclick = "";
    // выбираем пулю и делаем ее видимой, а после и револьвер
    var bullet = document.querySelector("#bullet");
    bullet.style.display = "block";
    revolver.style.display = "block";
    // переменная для вращения барабана.
    var rotate = 0;
    // создаем таймер (повторяется каждые 20 милисекунд)
    var timer = setInterval(function() {
        rotate += 10;
        // поворачиваем барабан на 10 ("rotate") градусов
        baraban.style.transform = "rotate(" + rotate + "deg)";
        // если rotate больше 300, то убираем пулю (делаем ее невидимой)
        if (rotate > 300) {
            bullet.style.display = "none";
        }
        // если прокрутился барабан 2 раза (rotate == 720), то очищаем таймер, изменяем текст кнопки, класс для кнопки и функцию клика по кнопке
        if (rotate == 720) {
            clearInterval(timer);
            btnShot.innerText = "Сделать выстрел";
            btnShot.onclick = shot;
            btnShot.className = "";
        }
    }, 20)
}

// функция выстрела: увеличивает счёт выстрела, и выполняет условия
function shot() {
    countShot += 1;
    // если позиция пули равна счёту выстрела, то создаём "div" с id = "blood", выбираем текущего игрока и добавляем в него этот "div" (добавляем кровь)
    if (bulletPosition == countShot) {
        var blood = document.createElement("div");
        blood.id = "blood";
        var player = document.querySelector("#player" + currentPlayer);
        console.log(player)
        player.appendChild(blood);
        // выполняем функцию конца игры
        endGame();
    } else {
        // если текущий первый игрок, то револьвер вправо и текущий игрок становится вторым
        if (currentPlayer == 1) {
            rotationRight();
            currentPlayer = 2;
        // иначе револьвер влево и текущий игрок становится первым
        } else {
            rotationLeft();
            currentPlayer = 1;
        }
        // здесь делаем поворот барабана на 60 градусов после выстрела
        var rotate = rotateBaraban;
        var timer = setInterval(function() {
            rotate = rotate + 10;
            baraban.style.transform = "rotate(" + rotate + "deg)";
            if (rotate == rotateBaraban + 60) {
                clearInterval(timer);
                rotateBaraban = rotate;
            }
        }, 10)
    }
}

// поворот револьвера вправо
function rotationRight() {
    revolver.style.background = 'url("images/revolver-right.png") no-repeat';
}

// поворот револьвера влево
function rotationLeft() {
    revolver.style.background = 'url("images/revolver-left.png") no-repeat';
}

// в конце игры меняем текст кнопки, назначаем ей функцию рестарта и выводим модальное окно с сообщением "Game over"
function endGame() {
    btnShot.innerText = "Рестарт";
    btnShot.onclick = restart;
    alert("Game over");
}

// функция рестарта перезагружает страницу
function restart() {
    location.reload();
}

// функция рандомного получения числа в диапазоне от "min" до "max"
function random(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}
