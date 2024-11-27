import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

console.log('xxxx : ', resolve(__dirname, '../**/*.entity{.ts,.js}')); 
console.log('xxxx : ', resolve(__dirname, '../migrations/*{.ts,.js}'));  

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE || "resources-db",
  synchronize: NODE_ENV === "dev" ? false : false,
  //logging logs sql command on the treminal
  logging: NODE_ENV === "dev" ? false : false,
  //entities: ["src/**/*.entity{.ts,.js}"],
  // migrations: ["src/migrations/*{.ts,.js}"],
  entities: [resolve(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [resolve(__dirname, '../migrations/*{.ts,.js}')],
  subscribers: [],
});