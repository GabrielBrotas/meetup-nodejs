import { UpdateCategoryUseCase } from '@gbrotas/categories-core/domain';

export class UpdateCategoryDto implements Omit<UpdateCategoryUseCase.Input, 'id'> {
    name: string;
}
