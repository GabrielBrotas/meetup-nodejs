import { ICategoryRepository } from 'domain/categories/repository';
import { IUseCase } from '../../dto/use-case';

export namespace DeleteCategoryUseCase {
  
	export class UseCase implements IUseCase<Input, Output> {
    constructor(private categoriesRepository: ICategoryRepository.Repository) {}
  
    async execute(input: Input): Promise<Output> {
      await this.categoriesRepository.delete(input.id);
    }
  }

  export type Input = {
    id: string
  };
  
  export type Output = void;
  
}