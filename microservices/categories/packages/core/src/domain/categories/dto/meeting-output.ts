import { Category } from "domain/categories/entities";

export type CategoryOutput = {
  id: string
  name: string;
};

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutput {
    return entity.toJSON();
  }
}