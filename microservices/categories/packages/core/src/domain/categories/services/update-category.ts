import { ICategoryRepository } from 'domain/categories/repository';
import { IUseCase } from '../../@shared/dto/use-case';
import { CategoryOutput, CategoryOutputMapper } from '../dto';

export namespace UpdateCategoryUseCase {
  
	export class UseCase implements IUseCase<Input, Output> {
    constructor(private categoriesRepository: ICategoryRepository.Repository) {}
  
    async execute(input: Input): Promise<Output> {
      const meeting = await this.categoriesRepository.findById(input.id);

      meeting.updateName(input.name)

      await this.categoriesRepository.update(meeting)
      
      return CategoryOutputMapper.toOutput(meeting)
    }
  }

  export type Input = {
    id: string
    name: string;
  };
  
  export type Output = CategoryOutput;
  
}