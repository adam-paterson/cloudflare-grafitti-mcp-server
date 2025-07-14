# Graphiti Cloud

[![License][license-src]][license-href]

A Cloudflare Container Worker that serves as a proxy for the Graphiti MCP (Model Context Protocol) server, providing scalable, serverless access to AI agent memory capabilities through Neo4j-backed knowledge graphs.

## Overview

Graphiti Cloud bridges the gap between AI applications and persistent memory by leveraging Cloudflare's new container service to host and proxy requests to a Graphiti MCP server. This enables AI agents to maintain context and memory across interactions using a powerful knowledge graph backend.

## Features

- **Serverless Architecture**: Built on Cloudflare Workers with container support
- **AI Memory Service**: Persistent memory for AI agents via knowledge graphs
- **Neo4j Integration**: Robust graph database for complex relationship storage
- **Auto-scaling**: Up to 5 container instances with intelligent sleep management
- **Global Edge Network**: Deployed across Cloudflare's global infrastructure
- **Secure**: Environment-based configuration for sensitive credentials

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   AI Client     │───▶│  Graphiti Cloud  │───▶│  Graphiti MCP   │
│   Application   │    │  Worker Proxy    │    │   Container     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   Cloudflare     │    │     Neo4j       │
                       │   Infrastructure │    │   Knowledge     │
                       └──────────────────┘    │     Graph       │
                                               └─────────────────┘
```

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) package manager
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- Neo4j database instance
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/adam-paterson/graphiti-cloud.git
cd graphiti-cloud
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables in `.dev.vars`:
```bash
NEO4J_URI=neo4j://your-neo4j-instance:7687
NEO4J_USER=your-username
NEO4J_PASSWORD=your-password
OPENAI_API_KEY=your-openai-api-key
```

### Development

Start the development server:
```bash
pnpm dev
```

The worker will be available at `http://localhost:8787`

### Deployment

Deploy to Cloudflare:
```bash
wrangler deploy
```

## Configuration

### Container Settings

The `GraphitiMCPContainer` class extends Cloudflare's Container with these configurations:

- **Default Port**: 8000
- **Sleep Timeout**: 1 hour of inactivity
- **Internet Access**: Enabled for external API calls
- **Max Instances**: 5 containers
- **Image**: `knowledge-graph-mcp:0.4.0`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEO4J_URI` | Neo4j database connection string |
| `NEO4J_USER` | Neo4j username |
| `NEO4J_PASSWORD` | Neo4j password |
| `OPENAI_API_KEY` | OpenAI API key for AI functionality |

## Usage

### Basic Proxy Request

All requests are proxied to the Graphiti MCP container:

```javascript
// Example client request
const response = await fetch('https://your-worker.your-subdomain.workers.dev/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    // MCP protocol request
  })
})
```

### Integration with AI Applications

Graphiti Cloud is designed to work with AI applications that support the MCP protocol:

```javascript
import { MCPClient } from '@modelcontextprotocol/client'

const client = new MCPClient({
  serverUrl: 'https://your-worker.your-subdomain.workers.dev/'
})

// Use the client to interact with the knowledge graph
await client.addMemory({
  content: 'User prefers dark mode',
  context: 'user-preferences'
})
```

## Development

### Project Structure

```
graphiti-cloud/
├── src/
│   └── index.ts          # Main worker and container logic
├── test/
│   ├── index.spec.ts     # Test specifications
│   └── env.d.ts          # Environment type definitions
├── wrangler.jsonc        # Cloudflare Worker configuration
├── package.json          # Project dependencies
└── README.md            # This file
```

### Scripts

- `pnpm dev` - Start development server
- `pnpm lint` - Run ESLint
- `pnpm types` - Generate Wrangler types

### Testing

Currently, Cloudflare's test suite doesn't fully support containers. Integration testing is recommended using the deployed worker.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Related Projects

- [Graphiti](https://github.com/getzep/graphiti) - The underlying MCP server for knowledge graphs
- [Model Context Protocol](https://modelcontextprotocol.io/) - The protocol specification
- [Cloudflare Containers](https://developers.cloudflare.com/containers/) - Cloudflare's container service

## License

[MIT](./LICENSE.md) License  [Adam Paterson](https://github.com/adam-paterson)

## Support

- Email: [your-email@example.com]
- Issues: [GitHub Issues](https://github.com/adam-paterson/graphiti-cloud/issues)
- Discussions: [GitHub Discussions](https://github.com/adam-paterson/graphiti-cloud/discussions)

---

<p align="center">
  <sub>Built with  using Cloudflare Workers and the power of knowledge graphs</sub>
</p>

<!-- Badges -->
[license-src]: https://img.shields.io/github/license/adam-paterson/graphiti-cloud.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/adam-paterson/graphiti-cloud/blob/main/LICENSE.md
