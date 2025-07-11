import { Container, getContainer } from '@cloudflare/containers'
import { Hono } from 'hono'

const app = new Hono<{ Bindings: Env }>()

export class GraphitiMCPContainer extends Container {
  defaultPort = 8000
  sleepAfter = '1h'

  async proxy(request: Request): Promise<Response> {
    const response = await this.containerFetch('https://container/sse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body),
    })

    return response
  }
}

app.all('*', async (context) => {
  const container = getContainer(context.env.GRAPHITI_MCP_CONTAINER)
  const result = await container.proxy(context.req.raw)
  return context.json(result)
})

export default app
