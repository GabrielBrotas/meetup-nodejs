import { Entity } from "domain/@shared/entity";
import { CategoryValidatorFactory } from "../validators";
import { EntityValidationError } from "domain/@shared/errors";

export type CategoryProperties = {
  name: string;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: string) {
    super(props, id);

    this.name = this.props.name;
    Category.validate(this.props);
  }

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  updateName(value: string): void {
    this.name = value;
    Category.validate(this.props);
  }
}
