import { api } from '../modules/api.js'

class City extends HTMLElement {
  static get observedAttributes () {
    return [
      '_id',
      'name',
      'country',
      'visited',
      'year',
      'duration',
      'unit'
    ]
  }

  constructor () {
    super()

    this._id = this.getAttribute('_id')
    this.name = this.getAttribute('name')
    this.country = this.getAttribute('country')
    this.visited = this.getAttribute('visited') ?? false
    this.year = this.getAttribute('year')
    this.duration = this.getAttribute('duration')
    this.unit = this.getAttribute('unit')

    this.template = document.querySelector('#city-template').content
    this.appendChild(this.template.cloneNode(true))
  }

  connectedCallback () {
    this.render()
    this.addRemoveEventListener()
    this.addVisitedEventListener()
  }

  attributeChangedCallback (attribute, _oldValue, newValue) {
    this[attribute] = newValue
    this.render()
  }

  render () {
    this.querySelector('[name=city]').innerHTML = this.name
    this.querySelector('[name=country]').innerHTML = this.country

    if (this.visited) {
      this.querySelectorAll('[if=visited]').forEach((elem) => {
        elem.classList.remove('is-hidden')
      })
      this.querySelectorAll('[if=planned]').forEach((elem) => {
        elem.classList.add('is-hidden')
      })
      this.querySelector('header').classList.add('has-background-success-light')
      this.querySelector('[name=duration]').innerHTML = this.duration
      this.querySelector('[name=unit]').innerHTML = this.unit
      this.querySelector('[name=year]').innerHTML = this.year
    } else {
      this.querySelectorAll('[if=planned]').forEach((elem) => {
        elem.classList.remove('is-hidden')
      })
      this.querySelectorAll('[if=visited]').forEach((elem) => {
        elem.classList.add('is-hidden')
      })
      this.querySelector('header').classList.add('has-background-info-light')
    }
  }

  addRemoveEventListener () {
    const button = this.querySelector('button[name=remove]')
    button.addEventListener('click', () => {
      api.delete(`/cities/${this._id}`)
        .then(() => this.remove())
        .catch((error) => console.error(error))
    })
  }

  addVisitedEventListener () {
    const button = this.querySelector('button[name=visited]')
    button.addEventListener('click', () => {
      const modal = document.querySelector('#update-modal')
      modal.classList.add('is-active')
      const form = modal.querySelector('form')
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        form.querySelector('button').classList.add('is-loading')
        const body = {
          visited: true,
          duration: form.duration.value,
          year: form.year.value,
          unit: form.unit.value
        }
        api.patch(`/cities/${this._id}`, { body: body })
          .then((city) => {
            Object.keys(this).forEach((key) => {
              console.log(key)
              console.log(city[key])
              this.setAttribute(key, city[key])
            })
            modal.classList.remove('is-active')
          })
          .catch((error) => console.error(error))
      })
    })
  }
}

customElements.define('wc-city', City)
