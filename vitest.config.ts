import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: { configPth: './wrangler.jsonc' },
      },
    },
  },
})
