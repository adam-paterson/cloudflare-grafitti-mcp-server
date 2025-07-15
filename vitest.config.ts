import { defineWorkersProject } from '@cloudflare/vitest-pool-workers/config'

export default defineWorkersProject({
  test: {
    testTimeout: 15_000,
    name: 'graphiti-mcp-worker',
    poolOptions: {
      workers: {
        singleWorker: true,
        wrangler: {
          configPath: './wrangler.jsonc',
        },
      },
    },
  },
})
