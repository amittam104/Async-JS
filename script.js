'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const loadCountry = function (data, className = '') {
  let html = `
  <article class="country ${className}">
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
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('afterbegin', msg);
  // countriesContainer.style.opacity = 1;
};
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

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      loadCountry(data[0]);
      console.log(data);

      const neighbour = data[0].borders?.[0];
      console.log(neighbour);
      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => loadCountry(data[0], 'neighbour'))
    .catch(error => {
      console.error(`${error} 💥💥`);
      renderError(`Something went wrong. ${error.message}. Try Again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  getCountryData('bharat');
});
