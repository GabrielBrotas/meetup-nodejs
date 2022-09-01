import { ICategoryRepository } from 'domain/categories/repository';
import { IUseCase } from '../../@shared/dto/use-case';
import { CategoryOutput, CategoryOutputMapper } from '../dto';

export namespace FindAllCategoriesUseCase {
  
	export class UseCase implements IUseCase<Input, Output> {
    constructor(private categoriesRepository: ICategoryRepository.Repository) {}
  
    async execute(): Promise<Output> {
      const meetings = await this.categoriesRepository.findAll();
      
      return meetings.map(meet => CategoryOutputMapper.toOutput(meet))
    }
  }

  export type Input = {};
  
  export type Output = CategoryOutput[];
  
}