/* eslint-disable @typescript-eslint/no-namespace */

import { CreateCategoryUseCase } from '@gbrotas/categories-core/application';
import { ICategoryRepository } from '@gbrotas/categories-core/domain';
import { CategorySequelize } from '@gbrotas/categories-core/infra';

export namespace CATEGORY_PROVIDERS {
  export namespace REPOSITORIES {
    export const CATEGORY_SEQUELIZE_REPOSITORY = {
      provide: 'CategorySequelizeRepository',
      useFactory: () => {
        return new CategorySequelize.Repository();
      },
    };
  }

  export namespace USE_CASES {
    // export const CREATE_CATEGORY_USE_CASE = {
    //   provide: CreateCategoryUseCase.UseCase,
    //   useFactory: (categoryRepo: CategoryRepository.Repository) => {
    //     return new CreateCategoryUseCase.UseCase(categoryRepo);
    //   },
    //   inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    // };
    export const CREATE_CATEGORY_USE_CASE = {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: ICategoryRepository.Repository) => {
        return new CreateCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_SEQUELIZE_REPOSITORY.provide],
    };
  }
}
