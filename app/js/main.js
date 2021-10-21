'use strict'

import * as Cities from './cities.js'

document.addEventListener('DOMContentLoaded', () => {
  addFormEventListener()
  Cities.getAll()
    .then((cities) => {
      Cities.render(cities)
      document.querySelector('#status').classList.add('is-hidden')
      document.querySelector('#cities').classList.remove('is-hidden')
    })
    .catch((error) => {
      document.querySelector('#status').classList.add('has-text-danger')
      document.querySelector('#status').innerHTML = `😞 Failed to retrieve cities: ${error}`
    })
})

const addFormEventListener = () => {
  let form = document.getElementById('addform')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    Cities.create({
      name: form.city.value,
      country: form.country.value,
      year: form.year.value,
      duration: form.duration.value,
      unit: document.getElementsByName('inputCityDuration')[0].value,
      visited: form.visited.checked
    }).then((city) => {
        Cities.render([city])
      })
  })
}
