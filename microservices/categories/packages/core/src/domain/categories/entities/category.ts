import { CategoryValidatorFactory } from "../validators";
import { EntityValidationError } from "domain/@shared/errors";
import { AggregateRoot } from "domain/@shared/entity/aggregate-root";
import { CategoryEvents } from '../events'
export type CategoryProperties = {
  name: string;
};

export class Category extends AggregateRoot<CategoryProperties> {

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
    
    this.addDomainEvent(new CategoryEvents.CategoryUpdated(this.id, value))

    Category.validate(this.props);
  }
}
