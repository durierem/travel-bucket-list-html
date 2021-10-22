import { Api } from './lib/api.js'

const api = new Api('http://localhost:3000')

export const getAll = async () => {
  return await api.get('/cities')
}

export const create = async (city) => {
  return await api.post('/cities', { body: city })
}

export const render = (cities) => {
  cities.forEach((city) => {
    const tableBody = document.querySelector(`table#cities tbody`)

    const template = document.querySelector('#city-template')
    const newNode = template.cloneNode(true)
    newNode.removeAttribute('id')
    newNode.removeAttribute('class')
    newNode.querySelector('.name').innerHTML = city.name
    newNode.querySelector('.country').innerHTML = city.country
    newNode.querySelector('.year').innerHTML = city.year
    newNode.querySelector('.duration').innerHTML = `${city.duration} ${city.unit}`
    newNode.querySelector('.visited').innerHTML = city.visited ? '✔️' : '❌'
    newNode.querySelector('.button.is-danger').addEventListener('click', () => {
      api.delete(`/cities/${city._id}`)
        .then(() => newNode.remove())
        .catch((error) => console.error(error))
    })
    newNode.querySelector('.button.is-success').addEventListener('click', () => {
      api.patch(`/cities/${city._id}`, {
        body: { visited: true }
      }).then(() => {
        newNode.querySelector('.visited').innerHTML = '✔️'
      }).catch((error) => {
        console.error(error)
      })

    })

    tableBody.appendChild(newNode)
  })
}
