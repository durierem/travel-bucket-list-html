export class Api {
  constructor (baseUrl, options = {}) {
    this.baseUrl = baseUrl
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    }
  }

  async consume (endpoint, options = {}) {
    const request = new Request(`${this.baseUrl}${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        ...this.headers,
        ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : null
    })

    const response = await fetch(request)
    return await response.json()
  }

  async get (endpoint, options = {}) {
    return await this.consume(endpoint, {
      method: 'GET',
      ...options
    })
  }

  async post (endpoint, options = {}) {
    return await this.consume(endpoint, {
      method: 'POST',
      ...options
    })
  }

  async put (endpoint, options = {}) {
    return await this.consume(endpoint, {
      method: 'PUT',
      ...options
    })
  }

  async patch (endpoint, options = {}) {
    return await this.consume(endpoint, {
      method: 'PATCH',
      ...options
    })
  }

  async delete (endpoint, options = {}) {
    return await this.consume(endpoint, {
      method: 'DELETE',
      ...options
    })
  }
}
