// pages/api/gmail.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

async function getListOfEmails(accessToken: string): Promise<string[]> {
  const gmail = google.gmail({ version: 'v1', auth: accessToken });
  const response = await gmail.users.messages.list({
    userId: 'me',
    maxResults: 10,
  });

  const messageIds = response.data.messages?.map(message => message.id) || [];
  return messageIds;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Extract the access token from the request
      const accessToken = req.headers.authorization?.split(' ')[1];

      // Ensure the access token is present
      if (!accessToken) {
        return res.status(401).json({ error: 'Access Token is missing' });
      }

      // Call the Gmail API using the access token
      const emailIds = await getListOfEmails(accessToken);

      // Send list of message IDs back to the client
      res.status(200).json({ emailIds });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
