import { CreateCategoryUseCase } from '@gbrotas/categories-core/domain';

export class CreateCategoryDto implements CreateCategoryUseCase.Input {
  name: string;
}
