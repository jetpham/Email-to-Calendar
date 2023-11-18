// components/EmailList.tsx
"use client";
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

export default function EmailList() {
  const [emailIds, setEmailIds] = useState<string[]>([]);
  const [emailDetails, setEmailDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      
      if (session) {
        const tokenString = session.accessToken ? `Bearer ${session.accessToken}` : '';
        try {
          // Fetch the email IDs
          const idResponse = await fetch('/api/gmail', {
            method: 'GET',
            headers: { 'Authorization': tokenString },
          });

          if (idResponse.ok) {
            const data = await idResponse.json();
            setEmailIds(data.emailIds);

            // Fetch the details of each email
            const details = await Promise.all(data.emailIds.map(async (id: string) => {
              const detailResponse = await fetch('/api/gmail', {
                method: 'POST',
                headers: {
                  'Authorization': tokenString,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailId: id }),
              });
              if (detailResponse.ok) {
                return detailResponse.json();
              } else {
                throw new Error(`Failed to load details for email ID ${id}`);
              }
            }));

            setEmailDetails(details);
          } else {
            throw new Error('Failed to load Gmail message IDs');
          }
        } catch (error: any) {
          console.error('An error occurred while fetching: ', error.message);
        }
      }
    };

    fetchData();
  }, []);

  // Optionally, display the emails in their JSON format
  // Here you can create a new component to better format this if necessary
  return (
    <div className="email-list">
      {
        emailDetails.length === 0 ? (
          <div>Loading emails...</div>
        ) : (
          emailDetails.map((email, index) => (
            <pre key={emailIds[index]}>{JSON.stringify(email, null, 2)}</pre>
          ))
        )
      }
    </div>
  );
}
