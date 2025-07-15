import { env } from 'cloudflare:test'
import { describe, expect, it } from 'vitest'
import app from '../src'

describe('authorization', () => {
  it('responds with unauthorised when no bearer token is provided', async () => {
    const response = await app.request('/sse', {}, env)

    expect(response.status).toBe(401)
    expect(await response.text()).toBe('Unauthorized')
  })

  it('responds with unauthorised when bearer token is invalid', async () => {
    const response = await app.request('/sse', { headers: { Authorization: 'Bearer invalid' } }, env)

    expect(response.status).toBe(401)
    expect(await response.text()).toBe('Unauthorized')
  })
})
