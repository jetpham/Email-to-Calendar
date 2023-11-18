// pages/api/gmail.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

// Function to get the list of email IDs
async function getListOfEmails(accessToken: string): Promise<string[]> {
  const gmail = google.gmail({ version: 'v1', auth: accessToken });
  const response = await gmail.users.messages.list({
    userId: 'me',
    maxResults: 10,
  });

  const messageIds = response.data.messages?.map((message) => message.id) || [];
  return messageIds;
}

// Function to get the details of a specific email
async function getEmailDetails(accessToken: string, id: string) {
  const gmail = google.gmail({ version: 'v1', auth: accessToken });
  const response = await gmail.users.messages.get({
    userId: 'me',
    id: id,
    format: 'full', // Use 'full', 'minimal', or 'raw' based on the required amount of detail
  });

  return response.data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Extract the access token from the request
    const accessToken = req.headers.authorization?.split(' ')[1];

    // Ensure the access token is present
    if (!accessToken) {
      return res.status(401).json({ error: 'Access Token is missing' });
    }

    if (req.method === 'GET') {
      // Call the Gmail API and send list of message IDs back to the client
      const emailIds = await getListOfEmails(accessToken);
      res.status(200).json({ emailIds });
    } else if (req.method === 'POST') {
      // Expecting a JSON body with 'emailId' to get details for
      const { emailId } = req.body;
      if (!emailId) {
        return res.status(400).json({ error: 'Missing email ID' });
      }
      const emailDetails = await getEmailDetails(accessToken, emailId);
      res.status(200).json(emailDetails);
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', 'GET, POST');
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error && error.message) {
      errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
  }
}
