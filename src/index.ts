import { Container, getContainer, getRandom } from '@cloudflare/containers'
import { env } from 'cloudflare:workers'
import { Hono } from 'hono'

const app = new Hono<{ Bindings: Env }>()

export class GraphitiMCPContainer extends Container {
  defaultPort = 8000
  sleepAfter = '1h'
  enableInternet = true
  envVars = {
    NEO4J_URI: env.NEO4J_URI,
    NEO4J_USER: env.NEO4J_USER,
    NEO4J_PASSWORD: env.NEO4J_PASSWORD,
    OPENAI_API_KEY: env.OPENAI_API_KEY,
  }

  async proxy(request: Request): Promise<Response> {
    return await getRandom(env.KNOWLEDGE_GRAPH_MCP_CONTAINER, 5)
      .then(container => container.fetch(request))
  }
}

app.all('*', async (context) => {
  // API: check for required env variables
  const container = getContainer(context.env.KNOWLEDGE_GRAPH_MCP_CONTAINER)
  const response = await container.fetch(context.req.raw)
  return response
})

export default app
