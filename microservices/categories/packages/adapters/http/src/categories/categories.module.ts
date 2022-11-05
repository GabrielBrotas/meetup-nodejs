import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoriesController } from './categories.controller';

import { CATEGORY_PROVIDERS } from './categories.providers';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),

    // CreateCategoryUseCase.UseCase
    // {
    //   provide: CreateCategoryUseCase.UseCase,
    //   useFactory: (categoriesRepo: 'CategoriesRepository') => {
    //     return new CreateCategoryUseCase.UseCase(categoriesRepo);
    //   },
    // },
    // {
    //   provide: 'CategoriesRepository',
    //   useClass: CategoryRepository,
    // },
  ],
})
export class CategoriesModule { }
