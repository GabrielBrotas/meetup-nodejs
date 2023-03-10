import { Provider } from '@nestjs/common';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { CategoryModel } from '@gbrotas/categories-core/infra';
import { databaseConfig } from './database.config';

function validateDBConfig(databaseConfig) {
  let isValid = true;

  if (!databaseConfig.username) isValid = false;
  if (!databaseConfig.password) isValid = false;
  if (!databaseConfig.database) isValid = false;
  if (!databaseConfig.host) isValid = false;
  if (!databaseConfig.port) isValid = false;
  if (!databaseConfig.dialect) isValid = false;

  if (!isValid) {
    console.error('Invalid DB Config', databaseConfig);
    process.exit(1);
  }
}

export const databaseProviders: Provider<any>[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      validateDBConfig(databaseConfig);

      let sequelize = new Sequelize({
        ...(databaseConfig as SequelizeOptions),
        retry: {
          max: 10,
        },
      });

      sequelize.addModels([CategoryModel]);

      async function syncDb(sequelize: Sequelize) {
        try {
          await sequelize.sync({
            logging: true,
          });
          console.log('DB synced');

          return sequelize;
        } catch (error) {
          console.error(`error trying sync database`, error);
          console.log('Retrying...');
          setTimeout(async () => {
            await syncDb(sequelize);
          }, 5000);
        }
      }

      sequelize = await syncDb(sequelize);
      return sequelize;
    },
  },
];
