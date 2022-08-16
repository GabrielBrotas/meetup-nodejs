import { CreateCategoryUseCase } from '@gbrotas/categories-core/application';

export class CreateCategoryDto implements CreateCategoryUseCase.Input {
  name: string;
}
