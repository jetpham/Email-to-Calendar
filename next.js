import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {session ? (
        <div>
          <p>Welcome, {session.user.name}!</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <div>
          <p>You are not signed in</p>
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}
