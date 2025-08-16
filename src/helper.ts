import { USER_AGENT } from './index.js';

export interface ActivityTypesCollection {
  activityTypes: ActivityType[];
}

interface ActivityType {
  id: number;
  name: string;
  isProductive: boolean;
  color: string;
  accountId: number;
}

export async function fetchGazelle<T>(url: string): Promise<T | null> {
  const headers = {
    'User-Agent': USER_AGENT || 'Gazelle/1.0',
    'x-api-key': process.env.MPC_API_KEY || '..',
  };
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error('Error fetching activity types:', error);
    return null;
  }
}

export async function createActivity(
  name: string,
  description: string,
  activityTypeId: number,
  accountId: number
) {
  const headers = {
    'User-Agent': USER_AGENT || 'Gazelle/1.0',
    'x-api-key': process.env.MPC_API_KEY || '..',
  };
  const url = `http://localhost:3000/api/activity`;
  const body = {
    name,
    description,
    activityTypeId,
    accountId,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export function formatActivityTypes(activityTypes: ActivityType[]): string {
  return activityTypes
    .map(
      (type) =>
        `ID: ${type.id}, Name: ${type.name}, Productive: ${type.isProductive}, Color: ${type.color}`
    )
    .join('\n');
}
