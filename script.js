'use strict';

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// const loadCountry = function (data, className = '') {
//   let html = `
//   <article class="country ${className}">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//        <h3 class="country__name">${data.name.common}</h3>
//        <h4 class="country__region">${data.region}</h4>
//        <p class="country__row"><span>👫</span>${(
//          data.population / 10000000
//        ).toFixed(1)}M people</p>
//        <p class="country__row"><span>🗣️</span>${
//          Object.values(data.languages)[0]
//        }</p>
//        <p class="country__row"><span>💰</span>${
//          Object.keys(data.currencies)[0]
//        } </p>
//      </div>
//   </article>
//   `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   // countriesContainer.style.opacity = 1;
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('afterbegin', msg);
//   // countriesContainer.style.opacity = 1;
// };
///////////////////////////////////////

// const getCountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     loadCountry(data);

//     const neibhour = data.borders?.[0];

//     if (!neibhour) return;

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neibhour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       loadCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountry('bharat');
// // getCountry('usa');

// ------------ Fetch() and Promise -------------
// const getJSON = function (url, errorMsg = 'Somethiong went wrong') {
//   return fetch(url).then(response => {
//     console.log(response);

//     if (!response.ok) throw new Error(errorMsg);

//     return response.json();
//   });
// };
// const getCountryData = function (country) {
//   getJSON(
//     `https://restcountries.com/v3.1/name/${country}`,
//     'Country does not exsist'
//   )
//     .then(data => {
//       loadCountry(data[0]);

//       const neighbour = data[0].borders?.[0];
//       // const neighbour = 'jzsdvjsdv';

//       if (!neighbour) throw new Error(`Neighbouring Country does not exsist`);

//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country does not exsist'
//       );
//     })
//     .then(data => loadCountry(data[0], 'neighbour'))
//     .catch(error => {
//       console.error(`${error} 💥💥`);
//       renderError(`Something went wrong 💥💥 ${error.message}. Try Again!`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', function () {
//   getCountryData('bharat');
// });
// getCountryData('jhsadhj');

//-------------- Event Loop --------------

// console.log(`Test start`);
// setTimeout(() => console.log('0 Sec timer'), 0);
// Promise.resolve('Resloved promise').then(res => console.log(res));

// Promise.resolve('Resolve 2nd Promise').then(res => {
//   for (let i = 0; i < 100000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

// -------------- New Promise, Promisifying --------------

const getTheLottery = new Promise(function (resolve, reject) {
  console.log(`The Lottery is happening 🔮`);
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve(`You WIN 💰`);
    } else {
      reject(`You Loose 😭`);
    }
  }, 2000);
});

getTheLottery.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying

const watch = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

watch(2)
  .then(() => {
    console.log(`2 Seconds Passed`);
    return watch(1);
  })
  .then(() => console.log(`1 Second Passed`));
