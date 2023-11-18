// app/page.tsx
import dynamic from 'next/dynamic';
import EmailList from './components/EmailList'; 

export default function Home() {
    return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-900">
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold">Welcome to the Website!</h1>
                    <p className="text-sm mt-2">
                        This site is currently under construction. Soon, it will automatically
                        convert emails into Google Calendar events using OpenAI's GPT-4.
                    </p>

                    {/* The Client Component that fetches and displays email IDs */}
                        <EmailList />
                    <div className="my-8">
                        <img
                            src="/schema.png" // Make sure the image is in the public folder
                            alt="Website Schematic"
                            width="700" // Specify the width
                            height="681" // Specify the height
                        />
                    </div>
                </div>
            </main>
            );
}
