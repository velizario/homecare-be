import { User } from "../entity/Entities";
import { FlattenedUser } from "./types";

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DATABASE: string;
        NODE_ENV: "development" | "production";
        PORT: string;
        JWT_SECRET: string;
        DATABASE_PASSWORD: string;
        DATABASE_PASS_PLACEHOLDER: string;
        JWT_EXPIRES_IN: string;
      }
    }

    namespace Express {
        interface Request {
        // should not be limited to User
        user?: FlattenedUser;
        
        }
        interface Response {
        // should not be limited to User
        user?: User;
        }
    }
  }
