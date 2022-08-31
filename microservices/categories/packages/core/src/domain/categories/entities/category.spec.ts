import { Category } from "./category";

describe("Category Unit Tests", () => {
  beforeEach(() => {
    Category.validate = jest.fn();
  });

  test("constructor of meeting", () => {
    let category = new Category({
      name: "Docker",
    });
    console.log(category)
    expect(Category.validate).toHaveBeenCalled();

    expect(category.toJSON()).toStrictEqual({
      id: category.id,
      name: 'Docker',
    });
  });

});
