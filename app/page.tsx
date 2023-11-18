import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-900">
      {!session ? (
        <div className="text-center">
          <button onClick={() => signIn('google')}>Log in with Google</button>
        </div>
      ) : (
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">
            Welcome, {session.user.email}!
          </h1>
          <p>
            You're now authenticated!
          </p>
          <button onClick={() => signOut()}>Log out</button>

          {/* ...rest of your component */}
        </div>
      )}
    </main>
  );
}
