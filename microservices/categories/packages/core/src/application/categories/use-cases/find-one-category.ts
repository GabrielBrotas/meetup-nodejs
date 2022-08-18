import { ICategoryRepository } from 'domain/categories/repository';
import { IUseCase } from '../../dto/use-case';
import { CategoryOutput, CategoryOutputMapper } from '../dto';

export namespace FindOneCategoryUseCase {
  
	export class UseCase implements IUseCase<Input, Output> {
    constructor(private categoriesRepository: ICategoryRepository.Repository) {}
  
    async execute(input: Input): Promise<Output> {
      const meeting = await this.categoriesRepository.findById(input.id);
      return CategoryOutputMapper.toOutput(meeting)
    }
  }

  export type Input = {
    id: string
  };
  
  export type Output = CategoryOutput;
  
}