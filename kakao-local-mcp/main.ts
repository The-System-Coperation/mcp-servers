#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { searchKakaoLocalApi } from "./fuctions/kakao_map_local_api";
import { keywordSearchSchemaShape, KeywordSearchSchemaType } from "./schemas/keyword_search_schema";
import { KEYWORD_SEARCH_TOOL_DESCRIPTION } from "./const/tool_descriptions";
import { KEYWORD_SEARCH_TOOL_NAME } from "./const/tool_name";
const server = new McpServer({
    transport: new StdioServerTransport(),
    name: "kakao-local-mcp-server",
    version: "0.0.1",
});

server.tool(
    KEYWORD_SEARCH_TOOL_NAME,
    KEYWORD_SEARCH_TOOL_DESCRIPTION,
    keywordSearchSchemaShape,
    async (args: KeywordSearchSchemaType) => {
        const result = await searchKakaoLocalApi({
            query: args.query,
            category_group_code: args.category_group_code,
            x: args.x,
            y: args.y,
            radius: args.radius,
            rect: args.rect,
            page: args.page,
            size: args.size,
            sort: args.sort = 'accuracy',
        });
        
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result),
                    mimeType: "application/json",
                },
            ],
        };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);

