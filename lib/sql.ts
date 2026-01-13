import postgres, { Sql } from "postgres";

const connectionString = process.env.DATABASE_URL;

if ( !connectionString ) {
    throw new Error("DATABASE_URL is not set");
};

const sql: Sql = postgres(connectionString, {
    ssl: "require",
    prepare: false,    
});

export default sql;