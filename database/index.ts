import { DataSource } from "typeorm";
import { Profile } from "./models/Profile";
import { User } from "./models/User";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "didik27",
  password: "Didik.,.88",
  database: "db_typeorm",
  synchronize: true,
  entities: [Profile, User]
});

export default AppDataSource;