import { assert } from 'node:console'
import { describe } from 'vitest'

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>

describe('hello World worker', () => {
  // TODO: currently the Cloudflare test suite doesn't work with containers.
  assert(IncomingRequest)
})
