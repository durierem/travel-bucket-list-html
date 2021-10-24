import { Api } from './lib/api.js'

const api = new Api('http://localhost:3000')

export const getAll = async () => {
  return await api.get('/cities')
}

export const create = async (city) => {
  return await api.post('/cities', { body: city })
}

export const render = (cities) => {
  cities.map((city) => city.visited ? renderVisited(city) : renderPlanned(city))
}

const renderVisited = (city) => {
  const tbody = document.querySelector(`#visited-cities`)
  const template = tbody.querySelector('#visited-city-template')

  const newNode = template.cloneNode(true)

  // Remove template-only attributes
  newNode.removeAttribute('id')
  newNode.removeAttribute('class')

  newNode.querySelector('[name=name]').innerHTML = city.name
  newNode.querySelector('[name=country]').innerHTML = city.country
  newNode.querySelector('[name=year]').innerHTML = city.year
  newNode.querySelector('[name=duration]').innerHTML = `${city.duration} ${city.unit}`
  newNode.querySelector('button[name=remove]').addEventListener('click', () => {
    api.delete(`/cities/${city._id}`)
      .then(() => newNode.remove())
      .catch((error) => console.error(error))
  })
  newNode.querySelector('input[type=checkbox]').addEventListener('click', (event) => {
    newNode.remove()
    if (event.target.checked) {
      api.patch(`/cities/${city._id}`, { body: { visited: true } })
        .then(() => document.querySelector('#visited-cities').appendChild(newNode))
        .catch((error) => console.error(error))
    } else {
      api.patch(`/cities/${city._id}`, { body: { visited: false } })
        .then(() => document.querySelector('#planned-cities').appendChild(newNode))
        .catch((error) => console.error(error))
    }
  })

  tbody.appendChild(newNode)
}

const renderPlanned = (city) => {
  const tbody = document.querySelector(`#planned-cities`)
  const template = tbody.querySelector('#planned-city-template')

  const newNode = template.cloneNode(true)

  // Remove template-only attributes
  newNode.removeAttribute('id')
  newNode.removeAttribute('class')

  newNode.querySelector('[name=name]').innerHTML = city.name
  newNode.querySelector('[name=country]').innerHTML = city.country
  newNode.querySelector('button[name=remove]').addEventListener('click', () => {
    api.delete(`/cities/${city._id}`)
      .then(() => newNode.remove())
      .catch((error) => console.error(error))
  })
  newNode.querySelector('input[type=checkbox]').addEventListener('click', (event) => {
    newNode.remove()
    if (event.target.checked) {
      api.patch(`/cities/${city._id}`, { body: { visited: true } })
        .then(() => document.querySelector('#visited-cities').appendChild(newNode))
        .catch((error) => console.error(error))
    } else {
      api.patch(`/cities/${city._id}`, { body: { visited: false } })
        .then(() => document.querySelector('#planned-cities').appendChild(newNode))
        .catch((error) => console.error(error))
    }
  })

  tbody.appendChild(newNode)
}
