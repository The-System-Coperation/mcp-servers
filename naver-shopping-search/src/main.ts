#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ShoppingSearchSchema } from "./schemas/shopping-search-schema.js";
import naverShoppingSearch from "./functions/naver-shopping-search.js";
import { SHOPPING_SEARCH_TOOL_DESCRIPTION } from "./const/tools-description.js";
import { SHOPPING_SEARCH_TOOL_NAME } from "./const/tools-name.js";

const server = new McpServer({
    name: "naver-shopping-search-mcp",
    version: "0.0.1",
});


if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET) {
    throw new Error("NAVER_CLIENT_ID and NAVER_CLIENT_SECRET must be set");
}

server.tool(
    SHOPPING_SEARCH_TOOL_NAME, 
    SHOPPING_SEARCH_TOOL_DESCRIPTION,
    ShoppingSearchSchema,
    async (args) => {
        const result = await naverShoppingSearch(
            {
                query: args.query,
                display: args.display,
                start: args.start,
                sort: args.sort,
            }
        );
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result),
                },
            ],
        };
    },
);

const transport = new StdioServerTransport();
await server.connect(transport);