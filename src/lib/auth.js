import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('healthcare');

export const auth = betterAuth({

    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),

    advanced: {
        disableOriginCheck: true,
    },

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_SECRET, 
        }, 
    },
    
    user: {
        additionalFields: {
            role: {
                defaultValue: 'patient',
            },
            gender: {
                type: "string",
                input: true,
            },
            profileImage: {
                type: "string",
                input: true,
            },
            clinicRole:{
                type: "string",
                input: true,
            },
            verified: {
                type: "string",
                input: true,
            }
        }
    },

    session: {
        cookieCache: {
            enabled: true,
            maxAge: 7 * 60 * 60,
            strategy: "jwt",
        }
    },
    
    plugins: [ jwt() ]
});