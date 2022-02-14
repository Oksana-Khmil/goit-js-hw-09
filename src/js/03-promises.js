/*
Задание 3 - генератор промисов
Выполняй это задание в файлах 03-promises.html и 03-promises.js. Посмотри демо видео работы генератора промисов.

 promise-generator-demo.mp4 
В HTML есть разметка формы, в поля которой пользователь будет вводить первую задержку в миллисекундах, шаг увеличения задержки для каждого промиса после первого и количество промисов которое необходимо создать.

<form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form>
Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз, сколько ввели в поле amount. При каждом вызове передай ей номер создаваемого промиса (position) и задержку учитывая введенную пользователем первую задержку (delay) и шаг (step).

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется или отклоняется через delay времени. Значением промиса должен быть объект, в котором будут свойства position и delay со значениями одноименных параметров. Используй начальный код функции для выбора того, что нужно сделать с промисом - выполнить или отклонить.

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
Библиотека уведомлений
⚠️ Следующий функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

Для отображения уведомлений пользователю вместо console.log() используй библиотеку notiflix.
 */

import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('[name = delay]');
const step = document.querySelector('[name = step]');
const amount = document.querySelector('[name = amount]');
  
 form.addEventListener('submit', onFormSubmit)

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
 
  if (shouldResolve) {
resolve({position, delay})
  } else {
  reject({position, delay})
  }
        }, delay)
  })
}

function onFormSubmit(event) {
  event.preventDefault()  
  
  let delay = Number(inputDelay.value);
  let amountNumber = Number(amount.value);
  let stepDelay = Number(step.value);

    for (let i = 1; i <= amountNumber; i += 1) {
 
// createPromise(i, delay)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

    createPromise(i, delay)
  .then(({ position, delay }) => {
   Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })

     delay += stepDelay 
}

}