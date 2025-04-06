#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { NewsSearchSchema } from "./schemas/news-search-schema.js";
import naverNewsSearch from "./functions/naver-news-search.js";
import { NEWS_SEARCH_TOOL_DESCRIPTION } from "./const/tools-description.js";
import { NEWS_SEARCH_TOOL_NAME } from "./const/tools-name.js";

const server = new McpServer({
    name: "naver-news-mcp",
    version: "0.0.2",
});

if (!process.env.NAVER_CLIENT_ID) {
    throw new Error("NAVER_CLIENT_ID 환경 변수가 설정되지 않았습니다. 네이버 개발자 센터에서 발급받은 클라이언트 ID를 설정해주세요.");
}

if (!process.env.NAVER_CLIENT_SECRET) {
    throw new Error("NAVER_CLIENT_SECRET 환경 변수가 설정되지 않았습니다. 네이버 개발자 센터에서 발급받은 클라이언트 시크릿을 설정해주세요.");
}

server.tool(
    NEWS_SEARCH_TOOL_NAME, 
    NEWS_SEARCH_TOOL_DESCRIPTION,
    NewsSearchSchema,
    async (args) => {
        const result = await naverNewsSearch(
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