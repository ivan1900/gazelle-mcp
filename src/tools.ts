import {
  ActivityTypesCollection,
  fetchGazelle,
  formatActivityTypes,
} from './helper.js';
import { prompt_start } from './prompts.js';

const API_BASE = 'http://localhost:3000/api';

function createMcpResponse(text: string, isError: boolean = false) {
  console.log(text);
  return {
    content: [
      {
        type: 'text' as const,
        text,
        annotation: {
          audience: ['human'],
        },
      },
    ],
    isError,
  };
}

export function startHere() {
  return createMcpResponse(prompt_start);
}

export async function getActivityTypes(args: { accountId: number }) {
  const url = `${API_BASE}/activity_type?account_id=${args.accountId}`;
  const data = await fetchGazelle<ActivityTypesCollection>(url);
  if (!data) {
    return createMcpResponse('Failed to retrieve activity types', true);
  }

  if (data.activityTypes.length === 0) {
    return createMcpResponse('No activity types found');
  }

  return createMcpResponse(
    `Found ${data.activityTypes.length} activity types:\n${formatActivityTypes(
      data.activityTypes
    )}`
  );
}

export async function createActivity(args: {
  name: string;
  description: string;
  activityTypeId: number;
  accountId: number;
}) {
  const url = `${API_BASE}/activity`;
  const body = {
    name: args.name,
    description: args.description,
    activityTypeId: args.activityTypeId,
    accountId: args.accountId,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Gazelle/1.0',
        'x-api-key': process.env.API_KEY!,
      },
      body: JSON.stringify(body),
    });

    if (!response) {
      return createMcpResponse('Failed to create activity', true);
    }

    const res = await response.json();
    return createMcpResponse(
      `Activity created successfully  ${JSON.stringify(res)}`
    );
  } catch (error) {
    console.error('Error creating activity:', error);
    return createMcpResponse('Error creating activity', true);
  }
}
