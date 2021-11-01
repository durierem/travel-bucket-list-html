import { api } from './api.js'

export class Cities {
  static load () {
    handleCreationForm()
    loadAllCities()
  }
}

const handleCreationForm = () => {
  const form = document.forms['new-city']
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    api.post('/cities', {
      body: {
        name: form.name.value,
        country: form.country.value,
        year: form.year.value,
        duration: form.duration.value,
        unit: form.unit.value,
        visited: form.visited.checked
      }
    }).then((city) => {
        form.reset()
        render(city)
      })
      .catch((error) => console.error(error))
  })

  const checkbox = document.querySelector('input[name=visited]')
  const formNext = form.querySelector('fieldset[disabled]')
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      formNext.classList.remove('is-hidden')
      formNext.removeAttribute('disabled')
    } else {
      formNext.classList.add('is-hidden')
      formNext.setAttribute('disabled', 'disabled')
    }
  })
}

const loadAllCities = () => {
  api.get('/cities')
    .then((cities) => cities.forEach((city) => render(city)))
    .catch((error) => console.error(error))
}

const render = (city) => {
  const container = document.querySelector('#cities-container')
  const element = `
    <wc-city  _id="${city._id}"
              name="${city.name}"
              country="${city.country}"
              ${city.visited ? 'visited="visited"' : ''}
              year="${city.year}"
              duration="${city.duration}"
              unit="${city.unit}">
    </wc-city>
  `
  container.insertAdjacentHTML('beforeend', element)
}
