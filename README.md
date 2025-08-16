### MCP SERVER GAZELLE

This is an example of mcp server for learning purposes

## What handle this mpc?

Can get list of activity types and create activities

## Usage

This is mpc uses stdioStdioClientTransport, is already configurated in gazelle aplication.

If need use with other cliente has vscode, you could config like this example:

```JSON
"gazelle": {
			"command": "npx",
			"args": [
				"-y",
				"tsx",
				""
			],
			"env": {
				"PATH": "",
				"NODE_PATH": "",
				"API_KEY": ""
			},
			"type": "stdio"
		}
```
