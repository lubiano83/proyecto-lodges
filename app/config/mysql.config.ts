// app/lib/typeorm-data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import UserEntity from "../entity/user.entity";

// Tomamos las variables que SÍ tienes en tu .env
const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, HOST_DB_PORT } =
  process.env;

// 👇 Next.js se conecta al puerto del host (3307) en 127.0.0.1
const DB_HOST = "127.0.0.1";
const DB_PORT = Number(HOST_DB_PORT ?? 3306);

if (!MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_DATABASE) {
  throw new Error(
    "⚠️ Faltan variables MYSQL_USER / MYSQL_PASSWORD / MYSQL_DATABASE en tu .env"
  );
}

let dataSource: DataSource;

function createDataSource() {
  return new DataSource({
    type: "mysql",
    host: DB_HOST, // 127.0.0.1 (host)
    port: DB_PORT, // 3307 (mappeado desde Docker)
    username: MYSQL_USER, // bootuser
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    entities: [UserEntity],
    synchronize: false, // true solo si quieres que TypeORM cree/ajuste tablas en dev
    logging: false,
  });
}

// Evita múltiples conexiones durante el hot reload en desarrollo
const globalForDataSource = globalThis as unknown as {
  dataSource: DataSource | undefined;
};

export async function getDataSource(): Promise<DataSource> {
  if (!globalForDataSource.dataSource) {
    globalForDataSource.dataSource = createDataSource();
  }

  if (!globalForDataSource.dataSource.isInitialized) {
    await globalForDataSource.dataSource.initialize();
    console.log("✅ Conexión establecida con MySQL (TypeORM)");
  }

  return globalForDataSource.dataSource;
}
