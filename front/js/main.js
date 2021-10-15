'use strict';

import { fetchApi } from './api.js';

let cities;
(async function () {
  try {
    cities = await fetchApi('/cities');
    renderCities(cities);
  } catch (e) {
    console.log('Failed: to retrieve cities: ' + e);
  }
  addFormEventListener();
})();

function addFormEventListener() {
  let form = document.getElementById('addform');
  addform.addEventListener('submit', (e) => {
    e.preventDefault();
    let city = {
      name: form.city.value,
      country: form.country.value,
      year: form.year.value,
      duration: form.duration.value,
      unit: document.getElementsByName('inputCityDuration')[0].value,
      visited: form.visited.checked
    }

    fetchApi('/cities', city, 'POST')
      .then((response) => { renderCities([city]); })
      .catch((response) => { console.log('T-T'); })
  })
}

function renderCities(cities) {
  cities.forEach((city) => {
    let citiesTable = document.getElementById(`${city.visited ? '' : 'unvisited-'}cities-list`)
    let tr = document.createElement('tr');
    tr.dataset.id = city._id;

    let cityContainer = document.createElement('td');
    let cityName = document.createTextNode(city.name);

    let country = document.createElement('td');
    let countryName = document.createTextNode(city.country);

    let action = document.createElement('td');
    let addToWishList = document.createElement('button');
    addToWishList.setAttribute('class', 'btn btn-danger');
    addToWishList.innerText = 'Remove';
    addToWishList.addEventListener('click', () => {
      fetchApi(`/cities/${city._id}`, null, 'DELETE')
        .then(() => tr.remove())
    })

    cityContainer.appendChild(cityName);
    country.appendChild(countryName);
    action.appendChild(addToWishList);

    tr.appendChild(cityContainer);
    tr.appendChild(country);
    tr.appendChild(action);

    citiesTable.appendChild(tr);
  })
}

