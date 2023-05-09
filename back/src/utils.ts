import { DataSource } from "typeorm";
import { Recipe } from "./entity/Recipe";
import { Ingredient } from "./entity/Ingredient";
import { Category } from "./entity/Category";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Recipe, Ingredient,Category],
  logging:["query","error"]
});

export default dataSource;