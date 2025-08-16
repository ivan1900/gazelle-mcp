export const prompt_start = `
# Info

Gazelle is a platform for managing activities and tasks. 
This MCP server provides tools to interact with Gazelle's API.

If user tries to create an activity without specifying an activity type,
they will be prompted to select one from the available activity types.

If user tries to create an activity with and specified activity type by name,
use getActivityTypes to fetch the available activity types and look for the id you will need  to use in createActivity.
`;
