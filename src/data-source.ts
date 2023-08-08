import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "type_orm",
    password: "password",
    database: "TypeORM",
    entities: ["src/entity/*.{js,ts}"],
    logging: true,
    synchronize: true,
})
