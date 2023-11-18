// components/EmailList.tsx or wherever you prefer to keep your components
"use client"; 
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

export default function EmailList() {
  const [emailIds, setEmailIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        try {
          const response = await fetch('/api/gmail', {
            headers: {
              'Authorization': `Bearer ${session.accessToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setEmailIds(data.emailIds);
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

  // If you want to display the email IDs, you can map them here
  return (
    <div className="email-list">
      {emailIds.map((id) => (
        <div key={id}>{id}</div>
      ))}
    </div>
  );
}
