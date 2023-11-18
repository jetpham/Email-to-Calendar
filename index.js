
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();

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
/*
export default function About() {
  return (
    <div>
      <Head>
        <title>Index</title>
      </Head>
      <main>
        <h1>Index</h1>
        <p>This is the inxed page of my Next.js website.</p>
      </main>
    </div>
  );
}*/