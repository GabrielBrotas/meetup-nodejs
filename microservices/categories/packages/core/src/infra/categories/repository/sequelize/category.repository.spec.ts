import { CategoryModel } from "./category.model";
import { CategorySequelize } from "./category.repository";
import { Category } from "domain/categories/entities";
import { setupSequelize } from "infra/@shared/testing";

describe("Category repository test", () => {
  setupSequelize({});
  let categoriesRepository: CategorySequelize.Repository;

  beforeEach(async () => {
    categoriesRepository = new CategorySequelize.Repository();
  });

  it("should create a new category", async () => {
    let category = new Category({
      name: "Docker",
    });

    await categoriesRepository.insert(category);

    const categoryStored = await CategoryModel.findOne({
      where: { id: category.id },
    });

    expect(category.toJSON()).toStrictEqual(categoryStored.toJSON());
  });

  it("should find an meeting by id", async () => {
    let category = new Category({
      name: "Docker",
    });

    await categoriesRepository.insert(category);
    const categoryFound = await categoriesRepository.findById(category.id);

    expect(categoryFound).toStrictEqual(category);
    expect(categoryFound).toBeInstanceOf(Category);
  });

  it("should return all categories", async () => {
    let category1 = new Category({
      name: "Docker",
    });

    let category2 = new Category({
      name: "Python",
    });

    await categoriesRepository.insert(category1);
    await categoriesRepository.insert(category2);

    const categoriesFound = await categoriesRepository.findAll();

    expect(categoriesFound).toEqual([category1, category2]);
  });

  it("should delete a category", async () => {
    let category = new Category({
      name: "Docker",
    });

    await categoriesRepository.insert(category);

    await categoriesRepository.delete(category.id);

    const categoriesFound = await categoriesRepository.findAll();

    expect(categoriesFound).toEqual([]);
  });

  it("should update a category", async () => {
    let category = new Category({
      name: "Docker",
    });

    await categoriesRepository.insert(category);

    category.updateName("Python");

    await categoriesRepository.update(category);

    const categoryFound = await categoriesRepository.findById(category.id);

    expect(categoryFound.name).toBe("Python");
    expect(categoryFound).toEqual(category);
  });
});
