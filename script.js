'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

// const getTheLottery = new Promise(function (resolve, reject) {
//   console.log(`The Lottery is happening 🔮`);
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve(`You WIN 💰`);
//     } else {
//       reject(`You Loose 😭`);
//     }
//   }, 2000);
// });

// getTheLottery.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying

// const watch = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// watch(2)
//   .then(() => {
//     console.log(`2 Seconds Passed`);
//     return watch(1);
//   })
//   .then(() => console.log(`1 Second Passed`));

// Promisifying geolocation

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(
//       position => resolve(position),
//       err => reject(err)
//     );
//   });
// };

// // const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data) {
  let html = `
  <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
       <h3 class="country__name">${data.name.common}</h3>
       <h4 class="country__region">${data.region}</h4>
       <p class="country__row"><span>👫</span>${(
         data.population / 10000000
       ).toFixed(1)}M people</p>
       <p class="country__row"><span>🗣️</span>${
         Object.values(data.languages)[0]
       }</p>
       <p class="country__row"><span>💰</span>${
         Object.keys(data.currencies)[0]
       } </p>
     </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const whereAmI = function (lat, lng, errorMsg) {
//   getPosition()
//     .then(res => {
//       console.log(res);
//       const { latitude: lat, longitude: lng } = res.coords;
//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=885288862886469521098x120581`
//       );
//     })

//     .then(response => {
//       // console.log(response);

//       if (!response.ok) {
//         throw new Error(`Problem with geocoding ${response.status}`);
//       }

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       // Get the country data

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country cannot be found ${response.status}`);

//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}. Please try again!`));
// };

// // btn.addEventListener('click', function () {
// //   whereAmI();
// // });

// whereAmI();

// ------------------------- Async Await Functions ----------------------------------------

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('afterbegin', msg);
  countriesContainer.style.opacity = 1;
};

const whereAmI = async function () {
  try {
    // Get Geocode
    const geoCode = await getPosition();
    // console.log(geoCode);
    const { latitude, longitude } = geoCode.coords;

    // console.log(lat, lng);

    const getYourCountry = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=c0cb57276eaf46a3948c4745c7498089`
    );

    if (!getYourCountry.ok)
      throw new Error(`Could not get the Location details`);
    // console.log(getYourCountry);

    const countryData = await getYourCountry.json();
    // console.log(countryData);

    // Get Country Details
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryData.features[0].properties.country}`
    );
    if (!response.ok) throw new Error(`Could not get the Country details`);

    const data = await response.json();
    // console.log(data);

    renderCountry(data[1]);

    return `You are in ${countryData.features[0].properties.state_district}, ${countryData.features[0].properties.country}`;
  } catch (err) {
    // console.error(`Something went wrong. ${err.message}`);
    renderError(`Something went wrong. ${err.message}`);

    throw err;
  }
};

// whereAmI();

console.log(`1: Getting your country Details`);
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then(res => console.log(`2: ${res}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log(`3: Task completed`));

(async function () {
  try {
    const callWhereAMI = await whereAmI();
    console.log(callWhereAMI);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log(`3: Task completed`);
})();
