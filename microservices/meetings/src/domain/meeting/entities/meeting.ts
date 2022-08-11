import { Entity } from "domain/@shared/entity";
import { MeetingValidatorFactory } from "../validators";
import { EntityValidationError } from "domain/@shared/errors";

export type MeetingProperties = {
  name: string;
  category_id: string;
  category_name: string;
  participants_username?: Array<string>;
  date: Date;
  duration_min?: number;
};

type MeetingCategoryProps = {
  id: string
  name: string
}

export class Meeting extends Entity<MeetingProperties> {
  constructor(public readonly props: MeetingProperties, id?: string) {
    super(props, id);

    Meeting.validate(props);
    this.name = this.props.name;
    this.props.duration_min = this.props.duration_min ?? 60;
    this.props.participants_username = this.props.participants_username ?? [];
  }

  updateCategory(value: MeetingCategoryProps): void {
    this.category = value
    Meeting.validate(this.toJSON());
  }

  static validate(props: MeetingProperties) {
    const validator = MeetingValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get name() {
    return this.props.name;
  }

  private set name(value) {
    this.props.name = value;
  }

  get category(): MeetingCategoryProps {
    return {
      id: this.props.category_id,
      name: this.props.category_name
    };
  }

  private set category(value: MeetingCategoryProps) {
    this.props.category_id = value.id
    this.props.category_name = value.name
  }

}
