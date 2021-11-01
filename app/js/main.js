// Define web components
import './components/city.js'

// Import modules
import { Common } from './modules/common.js'
import { Cities } from './modules/cities.js'

document.addEventListener('DOMContentLoaded', () => {
  Common.load()
  Cities.load()
})
