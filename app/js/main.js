'use strict'

import * as Cities from './cities.js'

document.addEventListener('DOMContentLoaded', () => {
  addFormSubmitEventListener()
  addVisistedCityEventListener()
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

const addVisistedCityEventListener = () => {
  const checkbox = document.querySelector('input[name=visited]')
  const formNext = document.querySelector('#form-next')
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      formNext.classList.remove('is-hidden')
    } else {
      formNext.classList.add('is-hidden')
    }
  })
}

const addFormSubmitEventListener = () => {
  const form = document.getElementById('addform')
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
        form.reset()
        Cities.render([city])
      })
      .catch((error) => console.error(error))
  })
}
