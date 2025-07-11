# syntax=docker/dockerfile:1.9

# The build steps for this image are largely the same as the official Graphiti MCP server
# @see https://github.com/getzep/graphiti/blob/main/mcp_server/Dockerfile
FROM python:3.10-slim

# Set shell options for better error handling
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl=* \
    tar=* \
    ca-certificates=* \
    && rm -rf /var/lib/apy/lists/*

# Install uv using the official install script
ADD https://astral.sh/uv/install.sh /uv-installer.sh
RUN sh /uv-installer.sh && rm /uv-installer.sh

# Add uv to PATH
ENV PATH="/root/.local/bin:${PATH}"

# Configure uv for optimal Docker usage
ENV UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_PYTHON_DOWNLOADS=never \
    MCP_SERVER_HOST="0.0.0.0" \
    PYTHONUNBUFFERED=1

# Create non-root user
RUN groupadd -r app && useradd -r -d /app -g app app

# Sparse checkout the mcp_server directory from the official MCP repo
WORKDIR /app
RUN curl -sSL https://github.com/getzep/graphiti/archive/refs/heads/main.tar.gz \
| tar -xz --strip-components=2 graphiti-main/mcp_server

# Install dependencies first (better layer caching)
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev

# Change ownership to app user
RUN chown -Rv app:app /app

# Switch to non-root user
USER app

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["uv", "run", "graphiti_mcp_server.py"]
