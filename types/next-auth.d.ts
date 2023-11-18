import "next-auth";

declare module "next-auth" {
    /**
        * The shape of the user object returned in the JWT and session.
        * Extend this if you are adding more properties.
        */
    interface User {
        id_token?: string;
    }

    /**
        * The shape of the session object.
        * Extend this if you are adding more properties.
        */
    interface Session {
        user?: User;
        id_token?: string;
        accessToken?: string;
    }
}
