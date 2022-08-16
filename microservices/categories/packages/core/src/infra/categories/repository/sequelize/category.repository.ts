import { Category } from "domain/categories/entities";
import { ICategoryRepository } from "domain/categories/repository";
import { CategoryModel } from "./category.model";

export namespace CategorySequelize {
  export class Repository implements ICategoryRepository.Repository {
    async insert(entity: Category): Promise<void> {
      await CategoryModel.create(entity.toJSON());
    }

    async findAll(): Promise<Category[]> {
      const categoriesModel = await CategoryModel.findAll();
      return categoriesModel.map((category) => {
        return new Category(category.toJSON());
      });
    }

    async findById(id: string): Promise<Category> {
      const categoryModel = await CategoryModel.findOne({ where: { id } });
      if (!categoryModel) throw new Error("Category not found");
      return new Category(categoryModel.toJSON());
    }

    async update(entity: Category): Promise<void> {
      await CategoryModel.update(entity.toJSON(), {
        where: { id: entity.id },
      });
    }

    async delete(id: string): Promise<void> {
      await CategoryModel.destroy({
        where: { id: id },
      });
    }
  }
}
