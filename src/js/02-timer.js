/*Задание 2 - таймер обратного отсчета
Выполняй это задание в файлах 02-timer.html и 02-timer.js. Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты. Такой таймер может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д. Посмотри демо видео работы таймера.

 countdown-timer-demo.mp4 
Элементы интефрейса
В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, при клике по которой таймер должен запускаться. Добавь минимальное оформление элементов интерфейса.

<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>
Библиотека flatpickr
Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса. Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, кроме того который описан в документации.

// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
Библиотека ожидает что её инициализируют на элементе input[type="text"], поэтому мы добавили в HTML документ поле input#datetime-picker.

<input type="text" id="datetime-picker" />
Вторым аргументом функции flatpickr(selector, options) можно передать необязательный объект параметров. Мы подготовили для тебя объект который нужен для выполнения задания. Разберись за что отвечает каждое свойство в документации «Options» и используй его в своем коде.

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
Выбор даты
Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr. Именно в нём стоит обрабатывать дату выбранную пользователем. Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.

Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.
Отсчет времени
При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и обновлять интерфейс таймера, показывая четыре цифры: дни, часы, минуты и секунды в формате xx:xx:xx:xx.

Количество дней может состоять из более чем двух цифр.
Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
💡 Не будем усложнять. Если таймер запущен, для того чтобы выбрать новую дату и перезапустить его - необходимо перезагрузить страницу.

Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
Форматирование времени
Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. Обрати внимание, что она не форматирует результат. То есть, если осталось 4 минуты или любой другой составляющей времени, то функция вернет 4, а не 04. В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов. Напиши функцию addLeadingZero(value), которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.

Библиотека уведомлений
⚠️ Следующий функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix. */

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


// const options = {
//   enableTime: true,  //Включает выбор времени
//   time_24hr: true,  //Отображает средство выбора времени в 24-часовом режиме без выбора AM/PM, если включено.
//   defaultDate: new Date(), //Устанавливает начальную выбранную дату (даты). Если вы используете mode: "multiple"или диапазонный календарь, Array укажите Dateобъекты или массив строк даты, которые следуют за вашим файлом dateFormat. В противном случае вы можете указать один объект Date или строку даты.
//   minuteIncrement: 1, //Регулирует шаг ввода минут (включая прокрутку)

// }



const startBtnRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');



let selectedDateRef = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
onClose(selectedDates) {
        selectedDateRef = selectedDates[0];
        
        if (selectedDateRef > Date.now()) {
            startBtnRef.disabled = false;
        } else {
            Notify.warning("Please choose a date in the future");
        }
  },
};
const inputDateRef = flatpickr("#datetime-picker", options);
startBtnRef.addEventListener("click", onstartBtnRefClick);
startBtnRef.disabled = true;

function onstartBtnRefClick(e) {
    setInterval(() => {
        const startTime = Date.now();
        const timer = selectedDateRef - startTime;
        const formatingTime = convertMs(timer);

        updateTimerFace(formatingTime);
    }, 1000);

    e.currentTarget.disabled = true;
};

function updateTimerFace({ days, hours, minutes, seconds }) {
    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minutesRef.textContent = minutes;
    secondsRef.textContent = seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
