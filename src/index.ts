#!/usr/bin/env node

import 'dotenv/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { createActivity, getActivityTypes, startHere } from './tools.js';

const API_BASE = 'http://localhost:3000/api';
export const USER_AGENT = 'Gazelle/1.0';

// Create server instance
const server = new McpServer({
  name: 'gazelle-mcp-server',
  version: '1.0.0',
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  'start',
  'Start here to get context and how to interact with it',
  {},
  startHere
);

// Get Activity Types Tool
server.tool(
  'getActivityTypes',
  'Fetches activity types from the Gazelle API',
  {
    accountId: z.number(),
  },
  getActivityTypes
);

// Create Activity Tool
server.tool(
  'createActivity',
  'Creates a new activity in Gazelle',
  {
    name: z.string(),
    description: z.string(),
    activityTypeId: z.number(),
    accountId: z.number(),
  },
  createActivity
);

// Connect to transport AFTER registering all tools
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Gazelle MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
