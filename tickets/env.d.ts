declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_AUTH_TOKEN: string;
        NODE_ENV: 'development' | 'production';
        JWT_SECRET: string;
        JWT_EXPIRE: string;
        PORT?: string;
        PWD: string;
        JWT_AGE: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}