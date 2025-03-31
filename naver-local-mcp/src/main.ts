import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { NAVER_LOCAL_SEARCH_TOOL_NAME } from './const/naver-local-tools-name.js';
import { NAVER_LOCAL_SEARCH_TOOL_DESCRIPTION } from './const/naver-local-tools-description.js';
import { naverLocalSearchRequestSchema } from './schemas/naver-local-schema.js';
import { naverLocalSearchApi } from './fuctions/naver-local-search-api.js';
const server = new McpServer({
    name: 'namver-local-mcp',
    version: '0.0.1',
});

server.tool(
    NAVER_LOCAL_SEARCH_TOOL_NAME,
    NAVER_LOCAL_SEARCH_TOOL_DESCRIPTION,
    naverLocalSearchRequestSchema,
    async (args) => {
        const response = await naverLocalSearchApi(
            {
                query: args.query,
                display: args.display,
                start: args.start,
                sort: args.sort,
            }
        );

        return {
            content: [{
                type: 'text',
                text: JSON.stringify(response),
                mimeType: 'application/json',
            }],
        };
    }
);


const transport = new StdioServerTransport();
server.connect(transport);

