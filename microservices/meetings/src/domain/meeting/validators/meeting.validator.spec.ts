import { v4 } from "uuid";
import {
  MeetingValidator,
  MeetingValidatorFactory
} from "./meeting.validator";

describe("Meeting Validator Tests", () => {
  let validator: MeetingValidator;

  beforeEach(() => (validator = MeetingValidatorFactory.create()));

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

  test("valid cases for fields", () => {
    type Arrange = {
      name: string;
      category_id: string;
      category_name: string;
      participants_username: Array<string>;
      date: Date;
      duration_min?: number;
    };

    const arrange: Arrange[] = [
      { 
        name: "xpto",
        category_id: v4(),
        category_name: "category xpto",
        participants_username: [],
        date: new Date(), 
      },
      { 
        name: "xpto",
        category_id: v4(),
        category_name: "category xpto",
        participants_username: ["abc"],
        date: new Date(), 
      },
    ];

    arrange.forEach((item) => {
      const isValid = validator.validate(item);
      expect(isValid).toBeTruthy();
      
      expect(validator.errors).toEqual({});
    });
  });
});
