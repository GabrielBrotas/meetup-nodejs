import { UpdateCategoryUseCase } from '@gbrotas/categories-core/application';

export class UpdateCategoryDto implements Omit<UpdateCategoryUseCase.Input, 'id'> {
    name: string;
}
