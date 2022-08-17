import { CategoryModel } from "infra/categories";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const sequelizeTestingOptions: SequelizeOptions = {
  dialect: "postgres",
  host: "categories-test-db",
  username: "postgres",
  password: "password123",
  database: "categories",
  port: 5432,
  define: {
    timestamps: true,
  },
  logging: false,
};

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

  beforeEach(async () => {
    try {
      _sequelize = new Sequelize({
        ...sequelizeTestingOptions,
        ...options,
      })
  
      _sequelize.addModels([CategoryModel]);
  
      await _sequelize.sync({ force: true });
    } catch(err) {
      console.log(err)
    }
  });

  afterEach(async () => {
    await _sequelize.drop({logging: false})
    await _sequelize.close();
  });

  return {
    get sequelize() {
      return _sequelize;
    },
  };
}

