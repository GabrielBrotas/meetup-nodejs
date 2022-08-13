import { IUseCase } from '../../dto/use-case';
import { ICategoryRepository } from "domain/categories/repository";
import { Category } from "domain/categories/entities";
import { CategoryOutput, CategoryOutputMapper } from '../dto';

export namespace CreateCategoryUseCase {
  
	export class UseCase implements IUseCase<Input, Output> {
    constructor(private categoriesRepository: ICategoryRepository.Repository) {}
  
    async execute(input: Input): Promise<Output> {
      const entity = new Category(input);
      await this.categoriesRepository.insert(entity);
      return CategoryOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
		name: string;
  };
  
  export type Output = CategoryOutput;
  
}