#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { BLOG_SEARCH_TOOL_NAME } from "./const/tools-name.js";
import { BLOG_SEARCH_TOOL_DESCRIPTION } from "./const/tools-description.js";
import { BlogSearchSchema } from "./schemas/blog-search-schema.js";
import naverBlogSearch from "./functions/naver-blog-search.js";


const server = new McpServer({
    name: "naver-blog-search-mcp",
    version: "0.0.1",
});


if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET) {
    throw new Error("NAVER_CLIENT_ID and NAVER_CLIENT_SECRET must be set");
}

server.tool(
    BLOG_SEARCH_TOOL_NAME, 
    BLOG_SEARCH_TOOL_DESCRIPTION,
    BlogSearchSchema,
    async (args) => {
        const result = await naverBlogSearch(
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