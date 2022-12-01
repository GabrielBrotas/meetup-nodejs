import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ensureAuth } from 'src/middlewares/auth';
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
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) =>
        ensureAuth(req, res, next, 'Senior Software Engineer'),
      )
      .exclude(
        { path: 'categories/(.*)', method: RequestMethod.GET },
        { path: 'categories', method: RequestMethod.GET },
      )
      .forRoutes(CategoriesController);
  }
}
