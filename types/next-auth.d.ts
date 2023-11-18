// types/next-auth.d.ts or any other .d.ts file at the root of your project

import 'next-auth';

// This augments the existing Session type from next-auth
declare module 'next-auth' {
  /**
   * The shape of the session object.
   **/
  interface Session {
    user?: {
      // Add the id_token property to the user object within the Session interface
      id_token?: string;
    };
  }
}
