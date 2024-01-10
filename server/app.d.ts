/// <reference types="lucia" />
declare namespace Lucia {
   type Auth = import('./utils/auth.js').Auth
   interface DatabaseUserAttributes {
     name: string
     email: string
   }
   interface DatabaseSessionAttributes { }
}
