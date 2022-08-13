import { Sequelize } from "sequelize-typescript";
import { db_test_config } from "infra/@shared/db-test-config";
import { CategoryModel } from "./category.model";
import { CategoryRepository } from "./category.repository";
import { Category } from "domain/categories/entities";

describe("Category repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    try {
      sequelize = new Sequelize(db_test_config);
    
      sequelize.addModels([CategoryModel]);
    
      await sequelize.sync({logging: false});
    } catch(err) {
      console.log(err)
    }
  });

  afterEach(async () => {
    await sequelize.drop({logging: false})
    await sequelize.close();
  });

  it("should create a new category", async () => {
    const categoriesRepository = new CategoryRepository();

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
    const categoriesRepository = new CategoryRepository();

    let category = new Category({ 
      name: "Docker",
    });

    await categoriesRepository.insert(category);
    const categoryFound = await categoriesRepository.findById(category.id);
    
    expect(categoryFound).toStrictEqual(category);
    expect(categoryFound).toBeInstanceOf(Category)
  })

  it("should return all categories", async () => {
    const categoriesRepository = new CategoryRepository();
    
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
  })

  it("should delete a category", async () => {
    const categoriesRepository = new CategoryRepository();

    let category = new Category({ 
      name: "Docker",
    });

    await categoriesRepository.insert(category);

    await categoriesRepository.delete(category.id);

    const categoriesFound = await categoriesRepository.findAll();

    expect(categoriesFound).toEqual([]);
  })

  it("should update a category", async () => {
    const categoriesRepository = new CategoryRepository();

    let category = new Category({ 
      name: "Docker",
    });

    await categoriesRepository.insert(category);

    category.updateName("Python");

    await categoriesRepository.update(category)

    const categoryFound = await categoriesRepository.findById(category.id);

    expect(categoryFound.name).toBe("Python")
    expect(categoryFound).toEqual(category)
  })
});
