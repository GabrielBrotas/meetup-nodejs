import {
  CategoryValidator,
  CategoryValidatorFactory
} from "../category.validator";

describe("Category Validator Tests", () => {
  let validator: CategoryValidator;

  beforeEach(() => (validator = CategoryValidatorFactory.create()));

  test("invalidation cases for name field", () => {
    validator.validate({} as any)

    expect(validator.errors.name).toEqual([
      "name should not be empty",
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);

    validator.validate({name: null} as any)

    expect(validator.errors.name).toEqual([
      "name should not be empty",
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);

    validator.validate({name: ""} as any)

    expect(validator.errors.name).toEqual([
      "name should not be empty"
    ]);

    validator.validate({name: 5} as any)

    expect(validator.errors.name).toEqual([
      "name must be a string",
      "name must be shorter than or equal to 255 characters"
    ]);

  });

});
