/* eslint-disable @typescript-eslint/no-namespace */

import { ICategoryRepository } from '@gbrotas/categories-core/domain';
import { CategorySequelize } from '@gbrotas/categories-core/infra';
import {
  CreateCategoryUseCase,
  FindAllCategoriesUseCase,
  FindOneCategoryUseCase,
  DeleteCategoryUseCase,
} from '@gbrotas/categories-core/application';

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
    export const CREATE_CATEGORY_USE_CASE = {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: ICategoryRepository.Repository) => {
        return new CreateCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_SEQUELIZE_REPOSITORY.provide],
    };

    export const FIND_ALL_CATEGORY_USE_CASE = {
      provide: FindAllCategoriesUseCase.UseCase,
      useFactory: (categoryRepo: ICategoryRepository.Repository) => {
        return new FindAllCategoriesUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_SEQUELIZE_REPOSITORY.provide],
    };

    export const FIND_ONE_CATEGORY_USE_CASE = {
      provide: FindOneCategoryUseCase.UseCase,
      useFactory: (categoryRepo: ICategoryRepository.Repository) => {
        return new FindOneCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_SEQUELIZE_REPOSITORY.provide],
    };

    export const DELETE_CATEGORY_USE_CASE = {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (categoryRepo: ICategoryRepository.Repository) => {
        return new DeleteCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_SEQUELIZE_REPOSITORY.provide],
    };
  }
}
